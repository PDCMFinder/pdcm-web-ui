// @ts-nocheck
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { IFacetProps } from "../../../models/Facet.model";
import { TypeaheadFacet } from "./TypeaheadFacet";

export const Facet: FunctionComponent<IFacetProps> = ({
  facetId,
  name,
  type,
  options,
  selection,
  operator,
  loading,
  placeholder,
  onSelectionChange,
}) => {
  const [open, setOpen] = useState(selection.length > 0);

  const renderOptions = () => {
    switch (type) {
      case "check":
        return options.map((option) => {
          return (
            <Form.Check
              key={option}
              type="checkbox"
              label={option}
              id={option}
              checked={selection.includes(option)}
              onChange={(e) => {
                let newSelection = [...selection];
                if (e.target.checked) {
                  newSelection.push(option);
                } else {
                  newSelection = newSelection.filter(
                    (selectedKey) => selectedKey !== option
                  );
                }
                onSelectionChange(newSelection);
              }}
            />
          );
        });

      case "multivalued":
        return (
          <TypeaheadFacet
            facetId={facetId}
            name={name}
            values={selection}
            onSelectionChange={onSelectionChange}
            operator={operator ? operator : "any"}
            displayOperators={true}
            placeholder={placeholder}
            loading={loading}
          />
        );

      case "autocomplete":
        return (
          <TypeaheadFacet
            facetId={facetId}
            name={name}
            values={selection}
            onSelectionChange={onSelectionChange}
            operator={operator}
            displayOperators={false}
            placeholder={placeholder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`facet-section-${name}`}
        aria-expanded={open}
        variant={open ? "light" : "outline-light"}
        className="w-100 text-left align-middle facet-heading mb-3 border-0 bg-white px-0"
      >
        {name}
        {"  "}
        <span className="float-right">
          <FontAwesomeIcon
            icon={faAngleRight}
            className="facet-heading-caret align-middle"
          />
        </span>
      </Button>
      <Collapse in={open}>
        <div id={`facet-section-${name}`}>{renderOptions()}</div>
      </Collapse>
    </>
  );
};
