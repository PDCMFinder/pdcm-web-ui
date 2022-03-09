import { Fragment, FunctionComponent } from "react";
import { withRouter } from "react-router";
import { Footer } from "../components/common/Footer";
import { MainNavBar } from "../components/common/MainNavBar";
import "./GeneralTemplate.scss";
import { Breadcrumbs } from "../components/common/Breadcrumbs";

export const GeneralTemplate: FunctionComponent = ({ children }) => {
  const MainNavBarWithRouter = withRouter(MainNavBar);
  const BreadcrumbsWithRouter = withRouter(Breadcrumbs);
  return (
    <div className="px-5 m-auto" style={{ height: "100%", maxWidth: "2000px" }}>
      <MainNavBarWithRouter />
      {process.env.REACT_APP_UNDER_CONSTRUTION === "true" ? (
        <BreadcrumbsWithRouter />
      ) : null}
      <main className="main-content">{children}</main>
      <Footer className="footer"></Footer>
    </div>
  );
};
