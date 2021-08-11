import { FunctionComponent, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FacetSidebar } from "../components/search/facets/FacetSidebar";
import { SearchBar } from "../components/search/SearchBar";
import { ResultsTable } from "../components/search/ResultsTable";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import "./SearchPage.scss";
import { useHistory, useLocation } from "react-router-dom";
import { getSearchFacets, getSearchOptions } from "../apis/Search.api";
import {
  IFacetSectionProps,
  IFacetSidebarOperators,
  IFacetSidebarSelection,
  IOptionProps,
} from "../models/Facet.model";
import { QueryViewer } from "../components/search/QueryViewer";
import { useQuery } from "react-query";
import { ResultsPagination } from "../components/search/facets/ResultsPagination";

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
        if (facetOperators[facetSectionKey][facetKey].length === 0) return;
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

    history.push({
      pathname: "/data/search",
      search: search,
    });
  };

  return (
    <GeneralTemplate>
      <Container fluid className="h-100">
        <Row className="flex-xl-nowrap h-100 px-0 mt-0">
          <Col
            xs={12}
            md={3}
            lg={3}
            className="shadow h-100 py-3 py-md-4 pl-lg-5"
            id="sidebar-wrapper"
          >
            <FacetSidebar
              facetSections={searchFacetsQuery.data}
              sidebarSelection={facetSelection}
              sidebarOperators={facetOperators}
              onSelectionChange={(section, facet, options) => {
                let newSelection = {
                  ...facetSelection,
                  [section]: {
                    ...facetSelection[section],
                    [facet]: options,
                  },
                };
                newSelection = deleteEmptyFacetSelection(newSelection);
                setFacetSelection(newSelection);
                updateSearchParams(searchValues, newSelection, facetOperators);
              }}
              onOperatorChange={(section, facet, operator) => {
                const newOperators = {
                  ...facetOperators,
                  [section]: {
                    ...facetOperators[section],
                    [facet]: operator,
                  },
                };
                setFacetOperators(newOperators);
                updateSearchParams(searchValues, facetSelection, newOperators);
              }}
              onReset={() => {
                setFacetSelection({});
                updateSearchParams(searchValues, {}, {});
              }}
            />
          </Col>
          <Col
            xs={12}
            md={9}
            lg={9}
            id="page-content-wrapper"
            className="py-3 py-md-4 px-lg-5 px-2"
          >
            <div className="mx-auto">
              <SearchBar
                searchValues={searchValues}
                searchOptions={searchOptionsQuery.data}
                searchAllowMultipleTerms={true}
                onSearchChange={(values) => {
                  setSearchValues(values);
                  updateSearchParams(values, facetSelection, facetOperators);
                }}
                isLoading={searchOptionsQuery.isLoading}
              ></SearchBar>
            </div>
            <div className="mb-3">
              <QueryViewer
                searchTerms={searchValues}
                facetSelection={facetSelection}
                facetOperators={facetOperators}
                facetNames={getFacetNames(
                  searchFacetsQuery.data,
                  facetSelection
                )}
                onRemoveFacet={(sectionKey, facetKey, optionKey) => {
                  let newFacetSelection = { ...facetSelection };
                  newFacetSelection[sectionKey][facetKey] = newFacetSelection[
                    sectionKey
                  ][facetKey].filter((option) => option.key !== optionKey);
                  newFacetSelection = deleteEmptyFacetSelection(
                    newFacetSelection
                  );
                  setFacetSelection(newFacetSelection);
                  updateSearchParams(
                    searchValues,
                    newFacetSelection,
                    facetOperators
                  );
                }}
                onRemoveSearchTerm={(searchTermKey) => {
                  setSearchValues(
                    searchValues.filter((o) => o.key !== searchTermKey)
                  );
                  updateSearchParams(
                    searchValues.filter((o) => o.key !== searchTermKey),
                    facetSelection,
                    facetOperators
                  );
                }}
              ></QueryViewer>
            </div>
            <div>
              <ResultsTable
                results={[]}
                displayColumns={resultTableColumns}
              ></ResultsTable>
            </div>
            <div>
              <ResultsPagination
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={setActivePage}
              ></ResultsPagination>
            </div>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
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

function getFacetNames(
  facetSections: Array<IFacetSectionProps> | undefined,
  facetSidebarSelection: IFacetSidebarSelection
): { [sectionFacetKey: string]: string } {
  if (!facetSections) return {};
  const facetNames: { [sectionFacetKey: string]: string } = {};
  Object.keys(facetSidebarSelection).forEach((sectionKey) => {
    const section = facetSections?.find(({ key }) => sectionKey === key);
    if (section && section.facets) {
      section.facets.forEach((facet) => {
        if (facetSidebarSelection[sectionKey][facet.key]) {
          facetNames[
            `${sectionKey}.${facet.key}`
          ] = `${section.name}/${facet.name}`;
        }
      });
    }
  });
  return facetNames;
}

function deleteEmptyFacetSelection(facetSelection: any): any {
  const newFacetSelection: any = {};
  Object.keys(facetSelection).forEach((sectionKey) => {
    const section = facetSelection[sectionKey];
    const newSection: any = {};
    Object.keys(section).forEach((facetKey) => {
      const facet = section[facetKey];
      if (facet.length > 0) {
        newSection[facetKey] = facet;
      }
    });
    if (Object.keys(newSection).length > 0) {
      newFacetSelection[sectionKey] = newSection;
    }
  });
  return newFacetSelection;
}
