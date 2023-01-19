import { FunctionComponent } from "react";
import { withRouter } from "react-router";
import { Footer } from "../components/common/Footer";
import { MainNavBar } from "../components/common/MainNavBar";
import "./GeneralTemplate.scss";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import FloatingWidget from "../components/common/FloatingWidget";

export const GeneralTemplate: FunctionComponent<{
  showRecaptcha?: boolean;
}> = ({ showRecaptcha, children }) => {
  const MainNavBarWithRouter = withRouter(MainNavBar);
  const BreadcrumbsWithRouter = withRouter(Breadcrumbs);
  return (
    <div className="m-auto" style={{ height: "100%", maxWidth: "2000px" }}>
      <MainNavBarWithRouter />
      {showRecaptcha ? (
        <style>{`.grecaptcha-badge {
        bottom: 140px !important;
        }`}</style>
      ) : (
        <style>{`.grecaptcha-badge {
        display: none !important;
        }`}</style>
      )}

      {process.env.REACT_APP_UNDER_CONSTRUTION === "true" ? (
        <BreadcrumbsWithRouter />
      ) : null}
      <main className="main-content px-5">{children}</main>
      <FloatingWidget link="https://docs.google.com/forms/d/e/1FAIpQLSeRJQ7Xu1pMqegYvs4KVdA17bucM6XzW2zzA2yHaroPfSR7Sg/viewform">
        Help us improve - take our user survey
      </FloatingWidget>
      <Footer className="footer"></Footer>
    </div>
  );
};
