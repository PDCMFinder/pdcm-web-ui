import React from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangeTracker = ({ history }: { history: any }) => {
  history.listen((location: any, action: any) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};

export default withRouter(RouteChangeTracker);
