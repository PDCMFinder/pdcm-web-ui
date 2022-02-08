import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { MainNavBar } from "./MainNavBar";
import { RouteComponentProps } from "react-router-dom";
import StoryRouter from "storybook-react-router";

export default {
  title: "Components/Common/Main navigation bar",
  component: MainNavBar,
  decorators: [StoryRouter(undefined, { initialEntries: ["/data/search"] })],
} as Meta;

const Template: Story<RouteComponentProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <MainNavBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  location: { pathname: "/data/search", search: "", state: {}, hash: "" },
};
