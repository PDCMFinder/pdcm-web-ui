import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";

export interface ISearchBarProps {
  value: string;
  onChange(newValue: string): void;
}

export const SearchBar: FunctionComponent<ISearchBarProps> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <Form.Row>
      <Form.Group as={Col}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            placeholder="Search by cancer diagnosis (e.g. Melanoma)"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
          />
        </InputGroup>
      </Form.Group>
    </Form.Row>
  );
};
