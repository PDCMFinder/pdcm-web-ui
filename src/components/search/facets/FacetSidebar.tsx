import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { Button, Col, Row, Collapse, Form } from "react-bootstrap";
import { IFacetSidebarProps } from "../../../models/Facet.model";
import { FacetSection } from "./FacetSection";
import "./FacetSidebar.scss";

export const FacetSidebar: FunctionComponent<IFacetSidebarProps> = ({
  facetSections = [],
  sidebarSelection = {},
  sidebarOperators = {},
  onSelectionChange,
  onReset,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Row>
        <Col xs={6}>
          <div className="filter-section-heading text-info">Filter by:</div>
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
            className="mt-2 mt-lg-0 mw-50 border-0"
            size="sm"
            onClick={() => onReset()}
            block
            disabled={Object.keys(sidebarSelection).length === 0}
          >
            <FontAwesomeIcon icon={faTimes} />
            &nbsp;Reset
          </Button>
        </Col>
      </Row>
      <Collapse in={open} className="d-md-block">
        <div>
          <Row className="mb-3">
            <Col sm={12} className="text-center">
              <Button
                variant="outline-danger"
                className="mt-3 mt-lg-0 mw-50 d-md-none"
                size="sm"
                onClick={() => onReset()}
                block
                disabled={Object.keys(sidebarSelection).length === 0}
              >
                <FontAwesomeIcon icon={faTimes} />
                &nbsp;Reset
              </Button>
            </Col>
          </Row>
          <Form>
            {facetSections.map((section) => {
              return (
                <div className="my-3 facet-section" key={section.key}>
                  <FacetSection
                    key={section.key}
                    name={section.name}
                    facets={section.facets}
                    sectionSelection={sidebarSelection[section.key]}
                    sectionOperators={sidebarOperators[section.key]}
                    onSelectionChange={(facetKey, values, operator) => {
                      onSelectionChange(
                        section.key,
                        facetKey,
                        values,
                        operator
                      );
                    }}
                  ></FacetSection>
                </div>
              );
            })}
          </Form>
        </div>
      </Collapse>
    </>
  );
};
