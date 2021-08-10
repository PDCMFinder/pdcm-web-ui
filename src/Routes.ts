import { FunctionComponent } from "react";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";

export interface IRoute {
  path: string;
  name: string;
  component: FunctionComponent;
}

export const routes = [
  { path: "/:test", name: "Home", component: HomePage },
  { path: "/data", name: "Data", component: SearchPage },
  { path: "/data/search", name: "Search", component: SearchPage },
  { path: "/data/:modelId/details/", name: "Details", component: DetailsPage },
];
