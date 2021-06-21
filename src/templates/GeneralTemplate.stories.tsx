import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { GeneralTemplate } from "./GeneralTemplate";
import StoryRouter from "storybook-react-router";

export default {
  title: "Templates/General",
  component: GeneralTemplate,
  //@ts-ignore
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = (args) => (
  <div
    style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}
    className="h-100"
  >
    <GeneralTemplate {...args}>test</GeneralTemplate>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
