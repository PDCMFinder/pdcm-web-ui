import React, { Fragment, FunctionComponent } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useRouteMatch, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { MainNavBar } from "../components/common/MainNavBar";
import "./GeneralTemplate.scss";
import { routes } from "../Routes";

export const GeneralTemplate: FunctionComponent = ({ children }) => {
  const MainNavBarWithRouter = withRouter(MainNavBar);
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <Fragment>
      <MainNavBarWithRouter />
      {breadcrumbs.length > 0 ? (
        <div style={{ backgroundColor: "#e9ecef" }}>
          <Container>
            <Breadcrumb>
              {breadcrumbs.map((crumb) => (
                <Breadcrumb.Item
                  key={crumb.link}
                  linkAs={Link}
                  linkProps={{ to: crumb.link }}
                >
                  {crumb.name}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </Container>
        </div>
      ) : null}

      <main className="main-content">{children}</main>
      <Footer className="footer"></Footer>
    </Fragment>
  );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useBreadcrumbs(
  routes: Array<any>
): Array<{ link: string; name: string }> {
  const currentPath = useRouteMatch();
  const crumbs = routes
    .filter(({ path }) => currentPath.path.includes(path))
    .map(({ path, ...rest }) => ({
      link: Object.keys(currentPath.params).length
        ? Object.keys(currentPath.params).reduce((path, param) => {
            const paramsObj: any = currentPath.params;
            return path.replace(`:${param}`, paramsObj[param]);
          }, path)
        : path,
      ...rest,
    }));
  return crumbs;
}
