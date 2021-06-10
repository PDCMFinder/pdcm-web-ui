import { faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { Button, Col, Row, Collapse, Accordion, Card } from "react-bootstrap";
import { FacetSection } from "../../models/Facet.model";

export interface IFacetsProps {
  facetSections: Array<FacetSection>;
}

const Section: FunctionComponent<FacetSection> = ({ name }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls={`facet-section-${name}`}
        aria-expanded={open}
        variant="light"
        className="w-100 text-left px-0 bg-white border-0 facet-section-heading"
      >
        {name}
        {"  "}
        <FontAwesomeIcon
          icon={faAngleRight}
          className="facet-section-heading-caret"
        />
      </Button>
      <Collapse in={open}>
        <div id={`facet-section-${name}`}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </>
  );
};

export const Facets: FunctionComponent<IFacetsProps> = ({ facetSections }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Row>
        <Col xs={6} sm={12} md={6}>
          <div className="filter-section-heading text-secondary">
            Filter by:
          </div>
        </Col>
        <Col xs={6} className="d-sm-none">
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
      <Collapse in={open} className="d-sm-block">
        <div>
          <Row className="mb-3">
            <Col xs={6}>
              <Button
                variant="outline-danger"
                className="w-100 mt-3 mt-lg-0 mw-50 d-sm-none"
                size="sm"
              >
                <FontAwesomeIcon icon={faTimes} />
                &nbsp;Reset
              </Button>
            </Col>
          </Row>
          {facetSections.map((facetSection) => {
            return <Section key={facetSection.name} {...facetSection} />;
          })}
        </div>
      </Collapse>
    </>
  );
};
