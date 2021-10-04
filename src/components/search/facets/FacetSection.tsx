import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { IFacetSectionProps, IOptionProps } from "../../../models/Facet.model";
import { Facet } from "./Facet";
import "./FacetSidebar.scss";

export const FacetSection: FunctionComponent<IFacetSectionProps> = ({
  name,
  facets,
  sectionSelection,
  sectionOperators,
  onSelectionChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`facet-section-${name}`}
        aria-expanded={open}
        variant="light"
        className="w-100 text-left align-middle facet-heading mb-3 border-0 bg-white"
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
        <div id={`facet-section-${name}`} className="px-2">
          {facets?.map(({ key, name, type, options }) => {
            return (
              <div key={key} className="pb-2">
                <Facet
                  key={key}
                  name={name}
                  options={options}
                  selection={
                    sectionSelection && sectionSelection[key]
                      ? sectionSelection[key]
                      : ([] as IOptionProps[])
                  }
                  operator={
                    sectionOperators && sectionOperators[key]
                      ? sectionOperators[key]
                      : undefined
                  }
                  type={type}
                  onSelectionChange={(v, op) => {
                    if (onSelectionChange) onSelectionChange(key, v, op);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Collapse>
    </>
  );
};
