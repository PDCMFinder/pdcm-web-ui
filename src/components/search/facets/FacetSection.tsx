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
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`facet-section-${name}`}
        aria-expanded={open}
        variant="light"
        className="w-100 text-left align-middle facet-section-heading facet-heading mb-3 border-0 bg-white px-0"
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
        <div id={`facet-section-${name}`}>
          {facets?.map(({ facetId, name, type, options }) => {
            return (
              <div key={facetId} className="pb-2">
                <Facet
                  facetId={facetId}
                  name={name}
                  options={options}
                  selection={
                    sectionSelection && sectionSelection[facetId]
                      ? sectionSelection[facetId]
                      : ([] as string[])
                  }
                  operator={
                    sectionOperators && sectionOperators[facetId]
                      ? sectionOperators[facetId]
                      : undefined
                  }
                  type={type}
                  onSelectionChange={(v, op) => {
                    if (onSelectionChange) onSelectionChange(facetId, v, op);
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
