import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useState } from "react";
import { Button, Col, Row, Collapse } from "react-bootstrap";

export interface IFacetProps {
  filters: Array<any>;
}

export const Facets: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Row>
        <Col xs={6} sm={12} md={6}>
          <div className="footer-heading text-secondary">Filter by:</div>
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
          <Row>
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
          <Row>
            <Col>Test</Col>
          </Row>
        </div>
      </Collapse>
    </>
  );
};
