import React, { FunctionComponent, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import "./MainNavBar.scss";

export const MENU = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/search",
    name: "Search",
  },
  {
    link: "/about",
    name: "About",
    children: [
      { link: "/about/objectives", name: "Objectives" },
      { link: "/about/data-summary", name: "Data Summary" },
      { link: "/about/how-to-cite", name: "How to cite?" },
      { link: "/about/data-flow", name: "Data Flow" },
      { link: "/about/privacy-policy", name: "Privacy Policy" },
      { link: "/about/term-of-use", name: "Terms of Use" },
    ],
  },
  {
    link: "/submit",
    name: "Submit",
  },
  {
    link: "/contact",
    name: "Contact",
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
      className="py-1 py-md-3 shadow-sm main-nav"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={`${process.env.PUBLIC_URL}/pdcm-hor.png`}
            height="40px"
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
          <Nav className="ml-auto text" activeKey={location?.pathname}>
            {MENU.map((menuItem) => {
              if (!menuItem.children) {
                return (
                  <Nav.Link key={menuItem.link} as={Link} to={menuItem.link}>
                    {menuItem.name}
                  </Nav.Link>
                );
              } else {
                const key = menuItem.link.replace("/", "");
                return (
                  <NavDropdown
                    title={menuItem.name}
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
                );
              }
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
