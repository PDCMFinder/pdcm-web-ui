import React, { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FacetSidebar } from "../components/search/facets/FacetSidebar";
import { ResultsPagination } from "../components/search/ResultsPagination";
import { QueryViewer } from "../components/search/QueryViewer";
import { ResultsTable } from "../components/search/ResultsTable";
import { SearchBar } from "../components/search/SearchBar";
import {
  IFacetSectionProps,
  IFacetSidebarOperators,
  IFacetSidebarSelection,
  IOptionProps,
} from "../models/Facet.model";
import { ResultCol, SearchResult } from "../models/Search.model";
import { GeneralTemplate } from "./GeneralTemplate";
import "./SearchTemplate.scss";
import { ResultsPageSizeSelect } from "../components/search/ResultsPageSizeSelect";

export interface ISearchTemplateProps {
  facetSections: Array<IFacetSectionProps>;
  facetSelection: IFacetSidebarSelection;
  facetOperators: IFacetSidebarOperators;
  loadingFacetSidebar: boolean;

  searchOptions: Array<IOptionProps>;
  loadingSearchBarOptions: boolean;
  searchValues: Array<IOptionProps>;

  searchResults: Array<SearchResult>;
  loadingSearchResults: boolean;
  resultTableColumns: Array<ResultCol>;
  activePage: number;
  totalPages: number;
  pageSize: number;
  onFacetSidebarChange: (
    facetSelection: IFacetSidebarSelection,
    facetOperators: IFacetSidebarOperators
  ) => void;
  onSearchBarChange: (searchValues: Array<IOptionProps>) => void;
  onPaginationChange: (page: number) => void;
  onPageSizeChange: (page: number) => void;
}

export const SearchTemplate: FunctionComponent<ISearchTemplateProps> = ({
  facetSections,
  facetSelection = {},
  facetOperators,
  loadingFacetSidebar,
  searchOptions,
  searchValues = [],
  loadingSearchBarOptions,
  searchResults,
  loadingSearchResults,
  resultTableColumns,
  activePage,
  totalPages,
  pageSize,
  onSearchBarChange,
  onFacetSidebarChange,
  onPaginationChange,
  onPageSizeChange,
}) => {
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
              facetSections={facetSections}
              sidebarSelection={facetSelection}
              sidebarOperators={facetOperators}
              onSelectionChange={(section, facet, options, operator) => {
                let newSelection = {
                  ...facetSelection,
                  [section]: {
                    ...facetSelection[section],
                    [facet]: options,
                  },
                };
                const newOperators = {
                  ...facetOperators,
                  [section]: {
                    ...facetOperators[section],
                    [facet]: operator,
                  },
                };
                newSelection = deleteEmptyFacetSelection(newSelection);
                onFacetSidebarChange(newSelection, newOperators);
              }}
              onReset={() => {
                onFacetSidebarChange({}, {});
              }}
            />
          </Col>
          <Col
            xs={12}
            md={9}
            lg={9}
            id="page-content-wrapper"
            className="py-3 py-md-5 px-lg-5 px-3"
          >
            <Row className="mx-auto">
              <SearchBar
                searchValues={searchValues}
                searchOptions={searchOptions}
                searchAllowMultipleTerms={true}
                onSearchChange={(values) => {
                  onSearchBarChange(values);
                }}
                isLoading={loadingSearchBarOptions}
              ></SearchBar>
            </Row>
            <Row className="mb-3 mx-auto">
              <QueryViewer
                searchTerms={searchValues}
                facetSelection={facetSelection}
                facetOperators={facetOperators}
                facetNames={getFacetNames(facetSections, facetSelection)}
                onRemoveFacet={(sectionKey, facetKey, optionKey) => {
                  let newFacetSelection = { ...facetSelection };
                  newFacetSelection[sectionKey][facetKey] = newFacetSelection[
                    sectionKey
                  ][facetKey].filter((option) => option.key !== optionKey);
                  newFacetSelection = deleteEmptyFacetSelection(
                    newFacetSelection
                  );
                  onFacetSidebarChange(newFacetSelection, facetOperators);
                }}
                onRemoveSearchTerm={(searchTermKey) => {
                  onSearchBarChange(
                    searchValues.filter(
                      (option) => option.key !== searchTermKey
                    )
                  );
                }}
              ></QueryViewer>
            </Row>
            <Row className="mx-auto pb-3 justify-content-end">
              <div
                style={{
                  maxWidth: "200px",
                  width: "30%",
                  display: "inline-flex",
                  justifyContent: "space-between",
                  whiteSpace: "nowrap",
                  alignItems: "center",
                }}
              >
                Models per page:{" "}
                <ResultsPageSizeSelect
                  pageSize={pageSize}
                  onChange={onPageSizeChange}
                ></ResultsPageSizeSelect>
              </div>
            </Row>
            <Row className="mx-auto">
              <ResultsTable
                displayColumns={resultTableColumns}
                results={searchResults || []}
                loading={loadingSearchResults}
              ></ResultsTable>
            </Row>
            <Row className="mx-auto justify-content-end">
              <ResultsPagination
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={onPaginationChange}
              ></ResultsPagination>
            </Row>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};

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
