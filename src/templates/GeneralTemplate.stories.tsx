import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { GeneralTemplate } from "./GeneralTemplate";
import StoryRouter from "storybook-react-router";

export default {
  title: "Templates/General",
  component: GeneralTemplate,
  decorators: [StoryRouter(undefined, { initialEntries: ["/"] })],
} as Meta;

const Template: Story = (args) => (
  <GeneralTemplate {...args}>Your content goes here</GeneralTemplate>
);

export const Default = Template.bind({});
Default.args = {};
