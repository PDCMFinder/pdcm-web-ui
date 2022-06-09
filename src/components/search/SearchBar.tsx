// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useState } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";
import { AsyncTypeahead, Option, Typeahead } from "react-bootstrap-typeahead";
import "./SearchBar.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { IOptionProps } from "../../models/Facet.model";
import { useQuery } from "react-query";
import { autoCompleteFacetOptions } from "../../apis/Search.api";

export interface ISearchBarProps {
  searchValues?: Array<Option>;
  searchAllowMultipleTerms?: boolean;
  onSearchChange?(newValue: Array<string>): void;
}

export const SearchBar: FunctionComponent<ISearchBarProps> = ({
  searchValues,
  searchAllowMultipleTerms,
  onSearchChange,
}) => {
  const [query, setQuery] = useState("");
  const optionsQuery = useQuery(query, () =>
    autoCompleteFacetOptions("search_terms", query)
  );
  return (
    <Form className="w-100">
      <div className="align-items-center">
        <Form.Group as={Col} xs={12}>
          <InputGroup>
            <AsyncTypeahead
              id="search-bar-type-ahead"
              single={!searchAllowMultipleTerms}
              multiple={searchAllowMultipleTerms}
              onChange={(s) => {
                onSearchChange(s);
              }}
              options={optionsQuery.data}
              placeholder="Search by cancer diagnosis (e.g. Melanoma)"
              selected={searchValues}
              clearButton
              style={{ minHeight: "50px" }}
              className="w-100 search-bar-type-ahead"
              isLoading={optionsQuery.isLoading}
              caseSensitive={false}
              onSearch={(query) => {
                setQuery(query);
              }}
            />
            <InputGroup.Text
              className="bg-primary text-white text-center"
              style={{ width: "50px" }}
            >
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: "25px" }} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </div>
    </Form>
  );
};
