// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useRef } from "react";
import {
  Form,
  Col,
  InputGroup,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Token, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { IFacetProps } from "./Facet";
import "./TypeaheadFacet.scss";

export const TypeaheadFacet: FunctionComponent<IFacetProps> = ({
  values,
  options,
  operator,
  onSelectionChange,
  displayOperators,
}) => {
  const ref = useRef();
  return (
    <>
      <Form.Row className="align-items-center">
        <Form.Group as={Col} xs={12}>
          <InputGroup>
            <Typeahead
              id="search-bar-type-ahead"
              multiple
              onChange={(s) => {
                onSelectionChange(s, operator);
              }}
              caseSensitive={false}
              filterBy={["name"]}
              options={options}
              selected={values}
              labelKey="name"
              className="w-100 typeahead-facet"
              size="sm"
              ref={ref}
            />
            <InputGroup.Append
              className="bg-primary text-white"
              onClick={() => ref.current.focus()}
            >
              <InputGroup.Text className="text-center bg-primary text-white">
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      {displayOperators ? (
        <Form.Row className="justify-content-end mr-1 mb-1">
          <ToggleButtonGroup
            type="radio"
            name="operator"
            value={operator}
            onChange={(newOperator: string) => {
              onSelectionChange(values, newOperator);
            }}
          >
            <ToggleButton value="any" variant="light" size="sm" disabled>
              Contains
            </ToggleButton>
            <ToggleButton value="any" variant="outline-primary" size="sm">
              ANY
            </ToggleButton>
            <ToggleButton value="all" variant="outline-primary" size="sm">
              ALL
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Row>
      ) : null}
      <div className="form-control-sm" style={{ height: "inherit" }}>
        {values.map((value) =>
          value ? (
            <Token
              key={value.key}
              option={value}
              readOnly={false}
              onRemove={() => {
                const newSelection = [...values].filter((v) => v !== value);
                onSelectionChange(newSelection, operator);
              }}
            >
              {value.name}
            </Token>
          ) : null
        )}
      </div>
      {values.length > 0 ? (
        <div className="w-100 text-right py-2">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              onSelectionChange([], operator);
            }}
          >
            Clear <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      ) : null}
    </>
  );
};
