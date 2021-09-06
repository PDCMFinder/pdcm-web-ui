import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { PlatformPage } from "./PlatformPage";
import StoryRouter from "storybook-react-router";
import { Route } from "react-router";

export default {
  title: "Pages/Platform Page",
  component: PlatformPage,
  decorators: [
    StoryRouter(undefined, { initialEntries: ["/data/platform/TEST"] }),
  ],
} as Meta;

const Template: Story<{ mdContent: string }> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <Route path="/data/:platform">
      <PlatformPage {...args} />
    </Route>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  mdContent: `
## Markdown Test

- Hi, I'm an incredible markdown editor
- Look at me I'm markdowing
- I'm also have links [test](google.com)
- And probably tables as well

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ remark-gfm   |
  `,
};
