import { faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { Button, Col, Row, Collapse, Form } from "react-bootstrap";
import { FacetSection } from "../../models/Facet.model";
import "./Facets.scss";

export interface IFacetsProps {
  facetSections?: Array<FacetSection>;
  facetSelection?: any;
  onChange(facetState: any): any;
}

export const Facets: FunctionComponent<IFacetsProps> = ({
  facetSections = [],
  facetSelection = {},
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [facetState, setFacetState] = useState<any>(facetSelection);

  const updateFacetState = (optionId: string, value: any) => {
    const currentSelection = { ...facetState };
    if (!currentSelection[optionId]) {
      currentSelection[optionId] = null;
    }
    if (value) {
      currentSelection[optionId] = value;
    } else {
      delete currentSelection[optionId];
    }
    onChange(currentSelection);
    setFacetState(currentSelection);
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <div className="filter-section-heading text-secondary">
            Filter by:
          </div>
        </Col>
        <Col xs={6} className="d-md-none">
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className={
              "float-right navbar-toggler uarr" + (!open ? " collapsed" : "")
            }
          >
            <span className="icon-bar filter"></span>
            <span className="icon-bar filter"></span>
            <span className="icon-bar filter"></span>
          </button>
        </Col>
        <Col xs={6} sm={6} md={6} className="d-none d-md-block">
          <Button
            variant="outline-danger"
            className="w-100 mt-2 mt-lg-0 mw-50"
            size="sm"
          >
            <FontAwesomeIcon icon={faTimes} />
            &nbsp;Reset
          </Button>
        </Col>
      </Row>
      <Collapse in={open} className="d-md-block">
        <div>
          <Row className="mb-3">
            <Col xs={12} className="text-right">
              <Button
                variant="outline-danger"
                className="w-50 mt-3 mt-lg-0 mw-50 d-sm-none"
                size="sm"
              >
                <FontAwesomeIcon icon={faTimes} />
                &nbsp;Reset
              </Button>
            </Col>
          </Row>
          <Form>
            {facetSections.map((section) => {
              return (
                <div className="my-3" key={section.key}>
                  <Section key={section.key} name={section.name} group>
                    {section.facets?.map((facet) => {
                      return (
                        <Section key={facet.key} name={facet.name}>
                          {facet.options.map((option) => {
                            if (facet.type === "check") {
                              return (
                                <Form.Check
                                  key={option.key}
                                  custom
                                  type="checkbox"
                                  label={option.name}
                                  id={option.key}
                                  checked={
                                    facetState[
                                      `${section.key}.${facet.key}.${option.key}`
                                    ] || false
                                  }
                                  onChange={(e) =>
                                    updateFacetState(
                                      `${section.key}.${facet.key}.${option.key}`,
                                      e.target.checked
                                    )
                                  }
                                />
                              );
                            } else {
                              return null;
                            }
                          })}
                        </Section>
                      );
                    })}
                  </Section>
                </div>
              );
            })}
          </Form>
        </div>
      </Collapse>
    </>
  );
};

const Section: FunctionComponent<FacetSection & { group?: boolean }> = ({
  name,
  children,
  group,
}) => {
  const [open, setOpen] = useState(false);

  let toggleButtonClasses = "w-100 text-left align-middle facet-heading mb-2";
  toggleButtonClasses += group ? " bg-white " : "";
  let buttonVariant = group ? "light" : open ? "outline-primary" : "light";

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`facet-section-${name}`}
        aria-expanded={open}
        variant={buttonVariant}
        className={toggleButtonClasses}
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
        <div id={`facet-section-${name}`}>{children}</div>
      </Collapse>
    </>
  );
};
