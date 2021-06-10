import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Facets, IFacetsProps } from "./Facets";
import "./Facets.scss";

export default {
  title: "Components/Search/Facets",
  component: Facets,
  argTypes: { onSearchChange: { action: "change" } },
} as Meta;

const Template: Story<IFacetsProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff" }} className="h-100">
    <Facets {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  facetSections: [
    {
      name: "PDX Model",
      facets: [{ name: "", options: [], type: "" }],
    },
  ],
};
