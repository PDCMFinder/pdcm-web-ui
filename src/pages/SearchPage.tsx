import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getSearchFacets,
  getSearchOptions,
  getSearchParams,
  getSearchResults,
  parseSelectedFacetFromUrl,
  parseOperatorsFromUrl,
  useQueryParams,
  getFacetOptions,
} from "../apis/Search.api";

import {
  IFacetSidebarOperators,
  IFacetSidebarSelection,
} from "../models/Facet.model";
import { useQueries, useQuery } from "react-query";
import { SearchTemplate } from "../templates/SearchTemplate";

const resultTableColumns = [
  { displayName: "Model", key: "model" },
  { displayName: "Histology", key: "datasource" },
  { displayName: "Primary", key: "sourceId" },
  { displayName: "Collection", key: "patient.age" },
  { displayName: "Type", key: "patient.gender" },
  { displayName: "Data available", key: "patient.ethnicity" },
];

export const SearchPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Search";
  let [searchValues, facetsByKey, operatorsByKey] = useQueryParams();

  let history = useHistory();
  let [facetSelection, setFacetSelection] = useState<IFacetSidebarSelection>(
    {}
  );
  let [facetOperators, setFacetOperators] = useState<IFacetSidebarOperators>(
    {}
  );
  let [activePage, setActivePage] = useState<number>(1);
  let [pageSize, setPageSize] = useState<number>(10);

  const searchFacetSectionsQuery = useQuery("search-facet-sections", () =>
    getSearchFacets()
  );
  const searchFacetSections = searchFacetSectionsQuery.data;
  const searchFacetQueries = useQueries(
    searchFacetSections
      ? searchFacetSections
          .flatMap((facetSection) => facetSection.facets)
          .map((facet) => {
            const fn = () => getFacetOptions(facet?.facetId || "");
            return {
              queryKey: ["facet", facet?.facetId],
              queryFn: ["multivalued", "autocomplete"].includes(
                facet?.type || ""
              )
                ? () => []
                : fn,
            };
          })
      : []
  );
  searchFacetSections
    ?.flatMap((facetSection) => facetSection.facets)
    .forEach((facet, index) => {
      if (
        facet &&
        !searchFacetQueries[index].isLoading &&
        !searchFacetQueries[index].isError &&
        searchFacetQueries[index].data
      ) {
        facet.options = searchFacetQueries[index].data || [];
      } else if (facet && searchFacetQueries[index].isLoading) {
        facet.loading = true;
      }
    });
  const searchResultsQuery = useQuery(
    [
      "search-results",
      { searchValues, facetSelection, facetOperators, pageSize, activePage },
    ],
    async () =>
      getSearchResults(
        searchValues,
        facetSelection,
        facetOperators,
        activePage,
        pageSize
      )
  );

  if (
    !searchFacetSectionsQuery.isLoading &&
    Object.keys(facetsByKey).length > 0 &&
    Object.keys(facetSelection).length === 0 &&
    searchFacetQueries.every((query) => !query.isLoading)
  ) {
    const sections = searchFacetSectionsQuery.data || [];
    setFacetSelection(parseSelectedFacetFromUrl(facetsByKey));
  }

  if (
    !searchFacetSectionsQuery.isLoading &&
    Object.keys(operatorsByKey).length > 0 &&
    Object.keys(facetOperators).length === 0 &&
    searchFacetQueries.every((query) => !query.isLoading)
  ) {
    setFacetOperators(parseOperatorsFromUrl(operatorsByKey));
  }

  const updateSearchParams = (
    searchValues: Array<string>,
    facetSelection: any,
    facetOperators: any
  ) => {
    setActivePage(1);
    history.push({
      pathname: "/data/",
      search: getSearchParams(searchValues, facetSelection, facetOperators),
    });
  };

  return (
    <SearchTemplate
      facetSections={
        searchFacetSectionsQuery.data ? searchFacetSectionsQuery.data : []
      }
      facetSelection={facetSelection}
      facetOperators={facetOperators}
      loadingFacetSidebar={searchFacetSectionsQuery.isLoading}
      searchValues={searchValues}
      searchResults={searchResultsQuery.data ? searchResultsQuery.data[1] : []}
      loadingSearchResults={searchResultsQuery.isLoading}
      resultTableColumns={resultTableColumns}
      activePage={activePage}
      totalResults={searchResultsQuery?.data ? searchResultsQuery?.data[0] : 0}
      pageSize={pageSize}
      onFacetSidebarChange={(
        facetSelection: IFacetSidebarSelection,
        facetOperators: IFacetSidebarOperators
      ) => {
        setFacetSelection(facetSelection);
        setFacetOperators(facetOperators);
        updateSearchParams(searchValues, facetSelection, facetOperators);
      }}
      onSearchBarChange={(searchValues: Array<string>) => {
        updateSearchParams(searchValues, facetSelection, facetOperators);
        setFacetOperators({});
      }}
      onPaginationChange={(activePage: number) => {
        setActivePage(activePage);
        window.scrollTo(0, 0);
      }}
      onPageSizeChange={(pageSize: number) => {
        setPageSize(pageSize);
        window.scrollTo(0, 0);
      }}
    ></SearchTemplate>
  );
};
