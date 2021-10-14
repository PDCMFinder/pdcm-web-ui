import { FunctionComponent, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  getSearchFacets,
  getSearchOptions,
  getSearchResults,
} from "../apis/Search.api";
import {
  IFacetSectionProps,
  IFacetSidebarOperators,
  IFacetSidebarSelection,
  IOptionProps,
} from "../models/Facet.model";
import { useQuery } from "react-query";
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
  let [searchTermKeys, facetsByKey, operatorsByKey] = useQueryParams();
  let history = useHistory();
  let [searchValues, setSearchValues] = useState<Array<IOptionProps>>([]);
  let [facetSelection, setFacetSelection] = useState<IFacetSidebarSelection>(
    {}
  );
  let [facetOperators, setFacetOperators] = useState<IFacetSidebarOperators>(
    {}
  );
  let [activePage, setActivePage] = useState<number>(1);
  let [pageSize, setPageSize] = useState<number>(10);
  let [totalPages, setTotalPages] = useState<number>(20);

  const searchOptionsQuery = useQuery("search-options", getSearchOptions);
  const searchFacetsQuery = useQuery("search-facets", getSearchFacets);
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
    !searchOptionsQuery.isLoading &&
    searchTermKeys.length > 0 &&
    searchValues.length === 0
  ) {
    const values = searchTermKeys.map((key: string) =>
      searchOptionsQuery.data.find((option: IOptionProps) => option.key === key)
    );
    setSearchValues(values);
  }

  if (
    !searchFacetsQuery.isLoading &&
    Object.keys(facetsByKey).length > 0 &&
    Object.keys(facetSelection).length === 0
  ) {
    const sections = searchFacetsQuery.data || [];
    setFacetSelection(parseSelectedFacetFromUrl(sections, facetsByKey));
  }

  if (
    !searchFacetsQuery.isLoading &&
    Object.keys(operatorsByKey).length > 0 &&
    Object.keys(facetOperators).length === 0
  ) {
    setFacetOperators(parseOperatorsFromUrl(operatorsByKey));
  }

  const updateSearchParams = (
    searchValues: Array<IOptionProps>,
    facetSelection: any,
    facetOperators: any
  ) => {
    let search = "";
    if (searchValues.length > 0) {
      search += "?q=" + searchValues.map((o) => o.key).join(",");
    }
    let facetString = "";
    Object.keys(facetSelection).forEach((facetSectionKey) => {
      Object.keys(facetSelection[facetSectionKey]).forEach((facetKey) => {
        if (facetSelection[facetSectionKey][facetKey].length === 0) return;
        facetString += `${
          facetString === "" ? "" : " AND "
        }${facetSectionKey}.${facetKey}:${facetSelection[facetSectionKey][
          facetKey
        ].map((o: IOptionProps) => o.key)}`;
      });
    });
    if (facetString !== "")
      search += `${search === "" ? "?" : "&"}facets=${facetString}`;

    let facetOperatorString = "";
    Object.keys(facetOperators).forEach((facetSectionKey) => {
      Object.keys(facetOperators[facetSectionKey]).forEach((facetKey) => {
        if (
          facetOperators[facetSectionKey][facetKey]?.length === 0 ||
          facetOperators[facetSectionKey][facetKey] === undefined
        )
          return;
        facetOperatorString += `${
          facetOperatorString === "" ? "" : " AND "
        }${facetSectionKey}.${facetKey}:${
          facetOperators[facetSectionKey][facetKey]
        }`;
      });
    });
    if (facetOperatorString !== "")
      search += `${
        search === "" ? "?" : "&"
      }facet.operators=${facetOperatorString}`;
    setActivePage(1);
    history.push({
      pathname: "/data/",
      search: search,
    });
  };

  return (
    <SearchTemplate
      facetSections={searchFacetsQuery.data ? searchFacetsQuery.data : []}
      facetSelection={facetSelection}
      facetOperators={facetOperators}
      loadingFacetSidebar={searchFacetsQuery.isLoading}
      searchValues={searchValues}
      searchOptions={searchOptionsQuery.data}
      loadingSearchBarOptions={searchOptionsQuery.isLoading}
      searchResults={searchResultsQuery.data ? searchResultsQuery.data[1] : []}
      loadingSearchResults={searchResultsQuery.isLoading}
      resultTableColumns={resultTableColumns}
      activePage={activePage}
      totalPages={Math.ceil(
        (searchResultsQuery?.data ? searchResultsQuery?.data[0] : 1) / pageSize
      )}
      onFacetSidebarChange={(
        facetSelection: IFacetSidebarSelection,
        facetOperators: IFacetSidebarOperators
      ) => {
        setFacetSelection(facetSelection);
        setFacetOperators(facetOperators);
        updateSearchParams(searchValues, facetSelection, facetOperators);
      }}
      onSearchBarChange={(searchValues: Array<IOptionProps>) => {
        updateSearchParams(searchValues, facetSelection, facetOperators);
        setSearchValues(searchValues);
        setFacetOperators({});
      }}
      onPaginationChange={(activePage: number) => {
        setActivePage(activePage);
        window.scrollTo(0, 0);
      }}
    ></SearchTemplate>
  );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQueryParams() {
  const search = new URLSearchParams(useLocation().search);
  let searchTermKeys: Array<string> = [];
  const queryParam = search.get("q");
  if (queryParam !== null) {
    searchTermKeys = queryParam.split(",");
  }
  let facetSelection: any = {};
  const facets = search.get("facets")?.split(" AND ") || [];
  facets.forEach((facetString) => {
    const [key, values] = facetString.split(":");
    facetSelection[key] = values.split(",");
  });
  let facetOperators: any = {};
  const facetOperatorParam =
    search.get("facet.operators")?.split(" AND ") || [];
  facetOperatorParam.forEach((facetString) => {
    const [key, value] = facetString.split(":");
    facetOperators[key] = value;
  });
  return [searchTermKeys, facetSelection, facetOperators];
}

function parseSelectedFacetFromUrl(
  facetSections: Array<IFacetSectionProps>,
  facetsByKey: any
): IFacetSidebarSelection {
  const facetSidebarSelection: IFacetSidebarSelection = {};
  Object.keys(facetsByKey).forEach((compoundKey: string) => {
    const [sectionKey, facetKey] = compoundKey.split(".");
    const urlFacetSelection = facetsByKey[compoundKey];
    const facetSection = facetSections?.find(({ key }) => sectionKey === key);
    const facet = facetSection?.facets?.find(({ key }) => facetKey === key);
    if (!facetSidebarSelection[sectionKey]) {
      facetSidebarSelection[sectionKey] = {};
    }
    facetSidebarSelection[sectionKey][facetKey] =
      facet?.options.filter((option) =>
        urlFacetSelection.includes(option.key)
      ) || [];
  });
  return facetSidebarSelection;
}

function parseOperatorsFromUrl(operatorsByKey: any): IFacetSidebarOperators {
  const facetSidebarSelection: IFacetSidebarOperators = {};
  Object.keys(operatorsByKey).forEach((compoundKey: string) => {
    const [sectionKey, facetKey] = compoundKey.split(".");
    const urlOperator = operatorsByKey[compoundKey];
    if (!facetSidebarSelection[sectionKey]) {
      facetSidebarSelection[sectionKey] = {};
    }
    facetSidebarSelection[sectionKey][facetKey] = urlOperator;
  });
  return facetSidebarSelection;
}
