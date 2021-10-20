import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { ContactPage } from "./pages/ContactPage";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { SearchPage } from "./pages/SearchPage";
import { SubmitPage } from "./pages/SubmitPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { routes } from "./Routes";
import CookieConsent from "react-cookie-consent";
import { Button } from "react-bootstrap";

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
      <CookieConsent
        buttonText="I agree, dismiss this banner"
        containerClasses="p-lg-5 p-3 bg-white text-dark border-top border-primary"
        style={{ borderWidth: "5px !important" }}
        buttonClasses="btn btn-primary"
        disableButtonStyles={true}
      >
        This website requires cookies, and the limited processing of your
        personal data in order to function. By using the site you are agreeing
        to this as outlined in our{" "}
        <Link to="/about/privacy-policy">Privacy Notice</Link> and{" "}
        <Link to="/about/terms-of-use">Terms of Use</Link>.
      </CookieConsent>
    </HashRouter>
  );
}

export default App;
