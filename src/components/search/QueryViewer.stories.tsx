import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IQueryViewerProps, QueryViewer } from "./QueryViewer";

export default {
  title: "Components/Search/Query viewer",
  component: QueryViewer,
} as Meta;

const Template: Story<IQueryViewerProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <QueryViewer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  searchTerms: [
    { key: "diagnosis_1", name: "Diagnosits 1" },
    { key: "diagnosis_2", name: "Diagnosits 2" },
  ],
  facetSelection: {},
};
