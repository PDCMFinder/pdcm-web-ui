// @ts-nocheck
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { IFacetProps } from "../../../models/Facet.model";
import { TypeaheadFacet } from "./TypeaheadFacet";

export const Facet: FunctionComponent<IFacetProps> = ({
  name,
  type,
  options,
  selection,
  operator,
  onSelectionChange,
}) => {
  const [open, setOpen] = useState(selection.length > 0);

  const renderOptions = () => {
    switch (type) {
      case "check":
        return options.map((option) => {
          return (
            <Form.Check
              key={option.key}
              custom
              type="checkbox"
              label={option.name}
              id={option.key}
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
            name={name}
            options={options}
            values={selection}
            onSelectionChange={onSelectionChange}
            operator={operator ? operator : "any"}
            displayOperators={true}
          />
        );

      case "autocomplete":
        return (
          <TypeaheadFacet
            name={name}
            options={options}
            values={selection}
            onSelectionChange={onSelectionChange}
            operator={operator}
            displayOperators={false}
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
        variant={open ? "primary" : "outline-primary"}
        className="w-100 text-left align-middle facet-heading mb-3"
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
