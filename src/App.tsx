import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/search">
          <SearchPage />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
