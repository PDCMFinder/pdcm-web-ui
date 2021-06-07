import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { MainNavBar } from "./MainNavBar";

export default {
  title: "Components/Common/Main navigation bar",
  component: MainNavBar,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <MainNavBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
