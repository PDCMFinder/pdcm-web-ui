import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Switch } from "react-router-dom";
import { routes } from "./Routes";

const queryClient = new QueryClient();

function App() {
  return (
    <HashRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <Switch>
          {routes.map(({ path, name, component }) => (
            <Route exact path={path} key={name} component={component} />
          ))}
        </Switch>
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
