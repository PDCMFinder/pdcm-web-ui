import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Facets } from "../components/search/Facets";
import { SearchBar } from "../components/search/SearchBar";
import { ResultsTable } from "../components/search/ResultsTable";
import { ResultCol, SearchResult } from "../models/SearchResult.model";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import "./SearchPage.scss";
import { FacetSection } from "../models/Facet.model";

export interface ISearchPageProps {
  /**
   * Text input value for the search bar
   */
  searchValues: Array<string>;
  searchOptions: Array<string>;
  searchMultiple: boolean;
  /**
   * List of Search Results displayed on the results table. Each Search result has
   */
  searchResults: Array<SearchResult>;
  displayColumns: Array<ResultCol>;
  facetsSections: Array<FacetSection>;
  onSearchChange(value: string): void;
}

export const SearchPage: FunctionComponent<ISearchPageProps> = ({
  searchValues,
  searchOptions,
  searchMultiple,
  searchResults,
  displayColumns,
  facetsSections,
  onSearchChange,
}) => {
  return (
    <GeneralTemplate>
      <Container fluid className="h-100">
        <Row className="flex-xl-nowrap h-100 px-0">
          <Col
            xs={12}
            md={3}
            xl={2}
            className="shadow-sm h-auto py-3 py-sm-5 mt-3 mt-sm-0"
            id="sidebar-wrapper"
          >
            <Facets facetSections={facetsSections} />
          </Col>
          <Col
            xs={12}
            md={9}
            xl={10}
            id="page-content-wrapper"
            className="py-5 px-md-3 px-lg-5 px-0"
          >
            <div className="mx-auto">
              <SearchBar
                values={searchValues}
                options={searchOptions}
                multiple={searchMultiple}
                onChange={onSearchChange}
              ></SearchBar>
            </div>
            <div>
              <ResultsTable
                results={searchResults}
                displayColumns={displayColumns}
              ></ResultsTable>
            </div>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
