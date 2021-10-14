import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ContactPage } from "./pages/ContactPage";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { SearchPage } from "./pages/SearchPage";
import { SubmitPage } from "./pages/SubmitPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { routes } from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
const routeComponentMap: any = {
  Home: HomePage,
  Data: SearchPage,
  Search: SearchPage,
  Details: DetailsPage,
  Contact: ContactPage,
  Submit: SubmitPage,
  "Privacy policy": PrivacyPolicyPage,
  "Terms of use": TermsOfUsePage,
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
