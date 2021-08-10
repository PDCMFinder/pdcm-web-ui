import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { PlatformPage } from "./PlatformPage";
import StoryRouter from "storybook-react-router";

export default {
  title: "Pages/Platform Page",
  component: PlatformPage,
  decorators: [StoryRouter(undefined, { initialEntries: ["/platform"] })],
} as Meta;

const Template: Story<{ mdContent: string }> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <PlatformPage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  mdContent: `
  
  ## Test

- Hi, I'm an incredible markdown editor
- Look at me I'm markdowing
- I'm also have links [test](google.com)
- And probably images as well

![img](https://i.kym-cdn.com/photos/images/original/001/541/251/ba6.jpg)
  `,
};
