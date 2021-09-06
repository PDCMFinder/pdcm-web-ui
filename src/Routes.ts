export interface IRoute {
  path: string;
  name: string;
}

export const routes = [
  { path: "/home", name: "Home" },
  { path: "/data", name: "Data" },
  { path: "/data/search", name: "Search" },
  {
    path: "/data/:providerId/:modelId/",
    name: "Details",
  },
  {
    path: "/data/platform/:platformId/",
    name: "Platform",
  },
];
