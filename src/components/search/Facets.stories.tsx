import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Facets } from "./Facets";

export default {
  title: "Components/Search/Facets",
  component: Facets,
  argTypes: { onSearchChange: { action: "change" } },
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff" }} className="h-100">
    <Facets {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
