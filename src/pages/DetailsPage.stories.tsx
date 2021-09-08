import React from "react";
import { Meta } from "@storybook/react";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { DetailsPage } from "./DetailsPage";
import StoryRouter from "storybook-react-router";

export default {
  title: "Pages/Details",
  component: DetailsPage,
  decorators: [
    StoryRouter(undefined, {
      initialEntries: ["/data/CRL/CRL-2128"],
      initialIndex: 0,
    }),
  ],
} as Meta;

export const Default = () => (
  <Route path="/data/:providerId/:modelId">
    <DetailsPage />
  </Route>
);
