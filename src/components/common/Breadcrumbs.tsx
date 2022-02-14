import React, { FunctionComponent } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { routes } from "../../Routes";

export const Breadcrumbs: FunctionComponent<RouteComponentProps> = ({
  match,
}) => {
  const crumbs = routes
    .filter(({ path }) => match.path.includes(path))
    .map(({ path, ...rest }) => ({
      link: Object.keys(match.params).length
        ? Object.keys(match.params).reduce((path, param) => {
            const paramsObj: any = match.params;
            return path.replace(`:${param}`, paramsObj[param]);
          }, path)
        : path,
      ...rest,
    }));

  return crumbs.length > 1 &&
    match.path !== "/data" &&
    !match.path.includes("/under-construction") &&
    !match.path.includes("/articles") ? (
    <div style={{ backgroundColor: "#e9ecef" }}>
      <Container>
        <Breadcrumb>
          {crumbs.map((crumb) => (
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
  ) : null;
};
