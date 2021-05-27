import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Footer } from "./Footer";

export default {
  title: "Components/Common/Footer",
  component: Footer,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <Footer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
