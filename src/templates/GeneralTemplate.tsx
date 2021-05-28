import React, { Fragment, FunctionComponent } from "react";
import { Footer } from "../common/Footer";
import { MainNavBar } from "../common/MainNavBar";
import "./GeneralTemplate.scss";
import { withRouter } from "react-router";

export const GeneralTemplate: FunctionComponent = ({ children }) => {
  return (
    <Fragment>
      <MainNavBar></MainNavBar>
      <main className="main-content">{children}</main>
      <Footer className="footer"></Footer>
    </Fragment>
  );
};
