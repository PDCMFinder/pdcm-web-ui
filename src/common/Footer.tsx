import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Footer: FunctionComponent = () => {
  return (
    <footer className="container py-5 px-15 bg-dark text-light">
      <div className="row">
        <div className="col-12 col-md">
          <img
            src={`${process.env.PUBLIC_URL}/pdcm-dark.png`}
            height="100"
            className="d-inline-block align-top"
            alt="PDCM logo"
          />
          <small className="d-block mb-3 text-muted text-center">
            &copy; 2017-2021
          </small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                Cool stuff
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Random feature
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Team feature
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Stuff for developers
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Another one
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Last time
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                Resource
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Resource name
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Another resource
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Final resource
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                Business
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Education
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Government
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Gaming
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
