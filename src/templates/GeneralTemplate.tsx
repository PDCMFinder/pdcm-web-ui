import React, { Fragment, FunctionComponent } from "react";
import { withRouter } from "react-router";
import { Footer } from "../components/common/Footer";
import { MainNavBar } from "../components/common/MainNavBar";
import "./GeneralTemplate.scss";

export const GeneralTemplate: FunctionComponent = ({ children }) => {
  const MainNavBarWithRouter = withRouter(MainNavBar);
  return (
    <Fragment>
      <MainNavBarWithRouter />
      <main className="main-content">{children}</main>
      <Footer className="footer"></Footer>
    </Fragment>
  );
};
