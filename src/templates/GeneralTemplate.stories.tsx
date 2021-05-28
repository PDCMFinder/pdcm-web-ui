import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { GeneralTemplate } from "./GeneralTemplate";

export default {
  title: "Templates/General",
  component: GeneralTemplate,
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
