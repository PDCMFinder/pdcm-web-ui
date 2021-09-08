import React, { Fragment, FunctionComponent } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useRouteMatch, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { MainNavBar } from "../components/common/MainNavBar";
import "./GeneralTemplate.scss";
import { routes } from "../Routes";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

export const GeneralTemplate: FunctionComponent = ({ children }) => {
  const MainNavBarWithRouter = withRouter(MainNavBar);
  const BreadcrumbsWithRouter = withRouter(Breadcrumbs);
  return (
    <Fragment>
      <MainNavBarWithRouter />
      <BreadcrumbsWithRouter />
      <main className="main-content">{children}</main>
      <Footer className="footer"></Footer>
    </Fragment>
  );
};
