import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.scss";

const MENU = [
  {
    name: "Quick links",
    children: [
      { name: "How to cite PDCM Finder?", link: "/about/how-to-cite" },
      {
        name: "PDCM Minimum Information standard publication",
        link: "/about/minimum-information-standard",
      },
      { name: "PDCM Finder Privacy Policy", link: "/about/privacy-policy" },
      { name: "PDCM Finder Terms of Use", link: "/about/terms-of-use" },
    ],
  },
  {
    name: "Contacts",
    children: [{ name: "Submit models / Feedback", link: "#" }],
  },
];

export interface IFooterProps {
  className?: string;
}

export const Footer: FunctionComponent<IFooterProps> = ({ className }) => {
  return (
    <footer className={`py-5 bg-dark text-light ${className}`}>
      <Container>
        <Row>
          <Col xs={12} md={2} className="text-center">
            <img
              src={`${process.env.PUBLIC_URL}/img/pdcm-dark.png`}
              style={{ width: "100%", maxWidth: "200px" }}
              className="d-inline-block align-top"
              alt="PDCM logo"
            />
            <small className="d-block mb-3 text-muted text-right">
              &copy; 2017-2021
            </small>
          </Col>
          {MENU.map((menu) => (
            <Col xs={6} md={3} key={menu.name}>
              {" "}
              <h5 className="footer-heading">{menu.name}</h5>
              <ul className="list-unstyled text-small">
                {menu.children.map((menuItem) => (
                  <li key={menuItem.link}>
                    <a className="text-muted" href={menuItem.link}>
                      {menuItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
          <Col xs={6} md={4}>
            <p className="text-muted">
              <a
                href="https://www.ebi.ac.uk/about/people/helen-parkinson"
                className="text-light"
              >
                EMBL-EBI
              </a>{" "}
              and{" "}
              <a
                href="https://www.jax.org/research-and-faculty/research-labs/the-bult-lab"
                className="text-light"
              >
                The Jackson Laboratory
              </a>{" "}
              are co-developers of PDCM Finder. This work is supported by the
              National Institutes of Health/National Cancer Institute U24
              CA204781 01 (ended 31.08.2020), U24 CA253539 01 and R01 CA089713.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
