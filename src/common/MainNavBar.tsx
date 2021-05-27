import React, { FunctionComponent, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./MainNavBar.scss";
import logo from "../logo.svg";

export const MainNavBar: FunctionComponent = () => {
  const [show, setShow] = useState(false);

  const showDropdown = (e: any) => {
    setShow(!show);
  };
  const hideDropdown = (e: any) => {
    setShow(false);
  };

  return (
    <Navbar bg="white" collapseOnSelect expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={`${process.env.PUBLIC_URL}/pdcm-hor.png`}
            height="40"
            className="d-inline-block align-top"
            alt="PDCM logo"
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
          <Nav className="ml-auto text">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Search</Nav.Link>
            <NavDropdown
              title="About"
              id="about-dropdown"
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <NavDropdown.Item eventKey="4.1">Objectives</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Data Summary</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3">How to cite?</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.4">Data Flow</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.5">Privacy Policy</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.6">Terms of Use</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Submit</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
