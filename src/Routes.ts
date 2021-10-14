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
  {
    path: "/contact",
    name: "Contact",
  },
  {
    path: "/submit",
    name: "Submit",
  },
  {
    path: "/about/privacy-policy",
    name: "Privacy policy",
  },
  {
    path: "/about/terms-of-use",
    name: "Terms of use",
  },
];
