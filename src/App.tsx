import { QueryClient, QueryClientProvider } from "react-query";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
import { ContactPage } from "./pages/ContactPage";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";
import { PrivacyPolicyPage } from "./pages/about/PrivacyPolicyPage";
import { ProvidersPage } from "./pages/about/ProvidersPage";
import { SearchPage } from "./pages/SearchPage";
import { SubmitPage } from "./pages/SubmitPage";
import { TermsOfUsePage } from "./pages/about/TermsOfUsePage";
import { routes } from "./Routes";
import CookieConsent from "react-cookie-consent";
import { AboutPage } from "./pages/about/AboutPage";
import { HowToCitePage } from "./pages/about/HowToCitePage";
import { DataFlowPage } from "./pages/about/DataFlowPage";
import { MISPage } from "./pages/about/MISPage";
import { UnderConstructionPage } from "./pages/UnderConstructionPage";
import { StaticArticlePage } from "./pages/StaticArticlePage";
import RouteChangeTracker from "./components/common/RouteChangeTracker";
import ReactGA from "react-ga4";
import { ProviderPage } from "./pages/ProviderPage";
import ScrollToTop from "./components/common/ScrollToTop";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

ReactGA.initialize("G-34S5KH94SX");

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
  "Data providers": ProvidersPage,
  "Terms of use": TermsOfUsePage,
  About: AboutPage,
  "How to cite?": HowToCitePage,
  "Data flow": DataFlowPage,
  "PDX - MI Standard": MISPage,
  "Under construction": UnderConstructionPage,
  Articles: StaticArticlePage,
  Provider: ProviderPage,
};

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LepEiwjAAAAAN9QFU8RpeY0QXCFoRRVVis2B-iF">
      <BrowserRouter basename="/">
        <ScrollToTop />
        {process.env.REACT_APP_ENV === "production" ? (
          <RouteChangeTracker />
        ) : null}
        <QueryClientProvider client={queryClient}>
          <Switch>
            {routes.map(({ path, name }) => (
              <Route
                exact
                path={path}
                key={name}
                component={
                  process.env.REACT_APP_UNDER_CONSTRUCTION === "true"
                    ? UnderConstructionPage
                    : routeComponentMap[name]
                }
              />
            ))}
          </Switch>
        </QueryClientProvider>
        <CookieConsent
          buttonText="I agree, dismiss this banner."
          containerClasses="p-lg-5 p-3 bg-white text-dark border-top border-primary"
          style={{ borderWidth: "5px !important" }}
          buttonClasses="btn btn-primary"
          disableButtonStyles={true}
          enableDeclineButton
          declineButtonText="Reject"
          declineButtonClasses="btn btn-outline-primary me-2"
        >
          This website requires cookies, and the limited processing of your
          personal data in order to function. By using the site you are agreeing
          to this as outlined in our{" "}
          <Link to="/about/privacy-policy">Privacy Notice</Link> and{" "}
          <Link to="/about/terms-of-use">Terms of Use</Link>.
        </CookieConsent>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;
