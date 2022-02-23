import {
  faCaretDown,
  faCompass,
  faInfo,
  faInfoCircle,
  faSearch,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, FunctionComponent, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";

import "./MainNavBar.scss";

export const MENU = [
  {
    link: "/data/search",
    name: "SEARCH",
    icon: faSearch,
  },
  {
    link: "/data/explore",
    name: "EXPLORE",
    icon: faCompass,
  },
  {
    link: "/submit",
    name: "SUBMIT",
    icon: faUpload,
  },
  {
    icon: faInfoCircle,
    link: "/about",
    name: "About",
    children: [
      { link: "/about/objectives", name: "Objectives" },
      { link: "/about/data-summary", name: "Data summary" },
      { link: "/about/how-to-cite", name: "How to cite?" },
      {
        link: "/about/minimum-information-standard",
        name: "PDX - MI Standard",
      },
      { link: "/about/data-flow", name: "Data flow" },
      { link: "/about/privacy-policy", name: "Privacy policy" },
      { link: "/about/terms-of-use", name: "Terms of use" },
    ],
  },
];

export const MainNavBar: FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  const [show, setShow] = useState(false);

  const showDropdown = (e: any) => {
    setShow(!show);
  };
  const hideDropdown = (e: any) => {
    setShow(false);
  };

  return (
    <Navbar
      bg="white"
      collapseOnSelect
      expand="md"
      className="py-1 py-md-3 main-nav"
      sticky="top"
    >
      <Container fluid className="px-0">
        <Navbar.Brand as={Link} to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/pdcm-hor.svg`}
            className="d-inline-block align-top"
            alt="PDCM Finder logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="uarr"
          type="button"
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            activeKey={location?.pathname}
            className="w-100"
            style={{ justifyContent: "space-between" }}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {MENU.map((menuItem) => {
              if (!menuItem.children) {
                return (
                  <Nav.Link
                    key={menuItem.link + menuItem.name}
                    //active={location?.pathname.includes(menuItem.link)}
                    as={Link}
                    to={menuItem.link}
                  >
                    <FontAwesomeIcon icon={menuItem.icon} />
                    {"  "} {menuItem.name}
                  </Nav.Link>
                );
              } else {
                const key = menuItem.link;
                return (
                  <Fragment key={key}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <NavDropdown
                      title={
                        <span>
                          {" "}
                          <FontAwesomeIcon icon={menuItem.icon} /> {"  "}
                          {menuItem.name}
                        </span>
                      }
                      active={location?.pathname.includes(key)}
                      key={key}
                      id={`${key}-dropdown`}
                      show={show}
                      onMouseEnter={showDropdown}
                      onMouseLeave={hideDropdown}
                    >
                      {menuItem.children.map((childItem) => {
                        return (
                          <NavDropdown.Item
                            as={Link}
                            key={childItem.link}
                            to={childItem.link}
                          >
                            {childItem.name}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  </Fragment>
                );
              }
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
