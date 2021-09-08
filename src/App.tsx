import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ContactPage } from "./pages/ContactPage";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { SubmitPage } from "./pages/SubmitPage";
import { routes } from "./Routes";

const queryClient = new QueryClient();
const routeComponentMap: any = {
  Home: HomePage,
  Data: SearchPage,
  Search: SearchPage,
  Details: DetailsPage,
  Contact: ContactPage,
  Submit: SubmitPage,
};

function App() {
  return (
    <HashRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <Switch>
          {routes.map(({ path, name }) => (
            <Route
              exact
              path={path}
              key={name}
              component={routeComponentMap[name]}
            />
          ))}
        </Switch>
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
