import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Facets } from "../components/search/Facets";
import { SearchBar } from "../components/search/SearchBar";
import { ResultsTable } from "../components/search/ResultsTable";
import { ResultCol, SearchResult } from "../models/SearchResult.model";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import "./SearchPage.scss";

export interface ISearchPageProps {
  /**
   * Text input value for the search bar
   */
  searchValue: string;
  /**
   * List of Search Results displayed on the results table. Each Search result has
   */
  searchResults: Array<SearchResult>;
  displayColumns: Array<ResultCol>;
  onSearchChange(value: string): void;
}

export const SearchPage: FunctionComponent<ISearchPageProps> = ({
  searchValue,
  searchResults,
  displayColumns,
  onSearchChange,
}) => {
  return (
    <GeneralTemplate>
      <Container fluid className="h-100">
        <Row className="flex-xl-nowrap h-100">
          <Col
            xs={12}
            md={3}
            lg={2}
            className="shadow-sm h-100"
            id="sidebar-wrapper"
          >
            <Facets />
          </Col>
          <Col xs={12} md={9} lg={10} id="content-wrapper" className="p-5">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
            ></SearchBar>
            <ResultsTable
              results={searchResults}
              displayColumns={displayColumns}
            ></ResultsTable>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
