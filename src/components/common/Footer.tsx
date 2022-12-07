import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getDataReleaseInformation } from "../../apis/Explore.api";
import "./Footer.scss";

const MENU = [
  {
    name: "Quick links",
    children: [
      // { name: "How to cite PDCM Finder?", link: "/about/how-to-cite" },
      // {
      //   name: "PDCM Minimum Information standard publication",
      //   link: "/about/minimum-information-standard",
      // },
      { name: "PDCM Finder Privacy Policy", link: "/about/privacy-policy" },
      { name: "PDCM Finder Terms of Use", link: "/about/terms-of-use" },
    ],
  },
  {
    name: "",
    children: [
      { name: "Submit models", link: "/submit" },
      { name: "Feedback", link: "/contact" },
    ],
  },
];

export interface IFooterProps {
  className?: string;
}

export const Footer: FunctionComponent<IFooterProps> = ({ className }) => {
  let releaseInfo = useQuery("releaseInfo", () => {
    return getDataReleaseInformation();
  });
  return (
    <footer className={`py-5 bg-dark text-white ${className}`}>
      <Container>
        <Row>
          <Col xs={12} md={2} className="text-center">
            <img
              src={`${process.env.PUBLIC_URL}/img/pdcm-dark.png`}
              style={{ width: "100%", maxWidth: "200px" }}
              className="d-inline-block align-top"
              alt="PDCM Finder logo"
            />
            <small className="d-block mb-3 text-white text-right">
              &copy; 2017-2022
            </small>
          </Col>
          {MENU.map((menu) => (
            <Col xs={6} md={3} key={menu.name}>
              {" "}
              <p className="footer-heading h5">{menu.name}</p>
              <ul className="list-unstyled text-small">
                {menu.children.map((menuItem) => (
                  <li key={menuItem.link}>
                    <Link className="text-white" to={menuItem.link}>
                      {menuItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
          <Col xs={6} md={4}>
            <p className="text-white">
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
        <Row>
          {releaseInfo.data ? (
            <Col xs={12} className="text-end small text-light">
              Data Release {releaseInfo.data.name.replace("dr", "")} |{" "}
              {new Date(releaseInfo.data.date).toISOString().substring(0, 10)}
            </Col>
          ) : null}
        </Row>
      </Container>
    </footer>
  );
};
