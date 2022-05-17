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
  name,
  values,
  options,
  operator,
  onSelectionChange,
  displayOperators,
}) => {
  const ref = useRef();
  return (
    <>
      <div className="align-items-center">
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
            <InputGroup.Text
              className="text-center bg-primary text-white"
              onClick={() => ref.current.focus()}
            >
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </div>
      {displayOperators ? (
        <div className="justify-content-end mr-1 mb-1">
          <ToggleButtonGroup
            type="radio"
            name={`${name}-operator-group`}
            value={operator}
            defaultValue="any"
            size="sm"
            onChange={(newOperator: string) => {
              onSelectionChange(values, newOperator);
            }}
          >
            <ToggleButton
              id={`${name}-contains-toggle`}
              value="contains"
              variant="light"
              disabled
            >
              Contains
            </ToggleButton>
            <ToggleButton
              id={`${name}-any-toggle`}
              value="any"
              variant="outline-primary"
            >
              ANY
            </ToggleButton>
            <ToggleButton
              id={`${name}-all-toggle`}
              value="all"
              variant="outline-primary"
            >
              ALL
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      ) : null}
      <div className="form-control-sm px-0" style={{ height: "inherit" }}>
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
