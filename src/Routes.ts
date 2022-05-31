export interface IRoute {
  path: string;
  name: string;
}

export const routes = [
  { path: "/", name: "Home" },
  { path: "/about/under-construction", name: "Under construction" },
  { path: "/data", name: "Data" },
  { path: "/data/search", name: "Search" },
  {
    path: "/data/models/:providerId/:modelId/",
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
  {
    path: "/about/",
    name: "About",
  },
  {
    path: "/about/how-to-cite",
    name: "How to cite?",
  },
  {
    path: "/about/data-flow",
    name: "Data flow",
  },
  {
    path: "/about/minimum-information-standard",
    name: "PDX - MI Standard",
  },
  {
    path: "/about/provider/:providerId",
    name: "Provider",
  },
  {
    path: "/articles/:fileName",
    name: "Articles",
  },
];
