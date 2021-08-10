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
  <div style={{ width: "20%", backgroundColor: "#fff" }} className="h-100">
    <Facets {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  facetSections: [
    {
      key: "model",
      name: "PDCM Model",
      facets: [{ key: "model", name: "", options: [], type: "check" }],
    },
    {
      key: "molecular_data",
      name: "Molecular Data",
      facets: [{ key: "molecular_data", name: "", options: [], type: "check" }],
    },
  ],
};
