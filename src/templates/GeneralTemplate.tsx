import React, { Fragment, FunctionComponent } from "react";
import { Footer } from "../components/common/Footer";
import { MainNavBar } from "../components/common/MainNavBar";
import "./GeneralTemplate.scss";

export const GeneralTemplate: FunctionComponent = ({ children }) => {
  return (
    <Fragment>
      <MainNavBar></MainNavBar>
      <main className="main-content">{children}</main>
      <Footer className="footer"></Footer>
    </Fragment>
  );
};
