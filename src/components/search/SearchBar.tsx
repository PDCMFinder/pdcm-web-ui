// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";
import { Option, Typeahead } from "react-bootstrap-typeahead";
import "./SearchBar.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { IOptionProps } from "../../models/Facet.model";

export interface ISearchBarProps {
  searchValues?: Array<Option>;
  searchOptions?: Array<Option>;
  searchAllowMultipleTerms?: boolean;
  isLoading: boolean;
  onSearchChange?(newValue: Array<IOptionProps>): void;
}

export const SearchBar: FunctionComponent<ISearchBarProps> = ({
  searchValues = [],
  searchOptions = [],
  searchAllowMultipleTerms,
  isLoading,
  onSearchChange,
}) => {
  return (
    <Form className="w-100">
      <Form.Row className="align-items-center">
        <Form.Group as={Col} xs={12}>
          <InputGroup>
            <Typeahead
              id="search-bar-type-ahead"
              single={!searchAllowMultipleTerms}
              multiple={searchAllowMultipleTerms}
              onChange={(s) => {
                onSearchChange(s);
              }}
              options={searchOptions}
              placeholder="Search by cancer diagnosis (e.g. Melanoma)"
              selected={searchValues || []}
              clearButton
              style={{ minHeight: "50px" }}
              className="w-100 search-bar-type-ahead"
              labelKey="name"
              isLoading={isLoading}
            />
            <InputGroup.Append className="bg-primary text-white">
              <InputGroup.Text
                style={{ width: "50px" }}
                className="text-center bg-primary text-white"
              >
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: "25px" }} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};
