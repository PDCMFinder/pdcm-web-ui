// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "./SearchBar.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";

export interface ISearchBarProps {
  searchValues?: Array<string>;
  searchOptions?: Array<string>;
  searchAllowMultipleTerms?: boolean;
  onSearchChange?(newValue: Array<string>): void;
}

export const SearchBar: FunctionComponent<ISearchBarProps> = ({
  searchValues,
  searchOptions,
  searchAllowMultipleTerms,
  onSearchChange,
}) => {
  const [inputValues, setInputValues] = useState<Array<string>>([]);
  useEffect(() => {
    setInputValues(searchValues);
  }, [searchValues]);
  return (
    <Form className="w-100">
      <Form.Row className="align-items-center">
        <Form.Group as={Col} xs={12}>
          <InputGroup>
            <Typeahead
              id="basic-typeahead-multiple"
              single={!searchAllowMultipleTerms}
              multiple={searchAllowMultipleTerms}
              onChange={(s) => {
                setInputValues(s);
                onSearchChange(s);
              }}
              options={searchOptions}
              placeholder="Search by cancer diagnosis (e.g. Melanoma)"
              selected={inputValues}
              clearButton
              style={{ minHeight: "50px" }}
              className="w-100"
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
