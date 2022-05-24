import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IResultsTableProps, ResultsTable } from "./ResultsTable";

export default {
  title: "Components/Search/Results table",
  component: ResultsTable,
} as Meta;

const Template: Story<IResultsTableProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <ResultsTable {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  displayColumns: [
    { displayName: "Model", key: "model" },
    { displayName: "Histology", key: "datasource" },
    { displayName: "Primary", key: "sourceId" },
    { displayName: "Collection", key: "patient.age" },
    { displayName: "Type", key: "patient.gender" },
    { displayName: "Data available", key: "patient.ethnicity" },
  ],
  results: [
    {
      pdcmId: "145191",
      datasource: "DFCI-CPDM",
      sourceId: "DFAM-14043-Q2",
      histology: "Renal Cell Carcinoma",
      primarySite: "Kidney",
      collectionSite: "Lung",
      modelType: "Cell line",
      tumourType: "Metastatic",
      dataAvailable: [
        "Copy Number Alteration",
        "Expression",
        "Gene Mutation",
        "Dosing Studies",
        "Patient Treatment",
      ],
    },
    {
      pdcmId: "145192",
      datasource: "DFCI-CPDM",
      sourceId: "NIBRX-2428",
      histology: "Pancreatic Carcinoma",
      primarySite: "Not Specified",
      collectionSite: "Not Specified",
      modelType: "Cell line",
      tumourType: "Not Specified",
      dataAvailable: [],
    },
    {
      pdcmId: "145193",
      datasource: "TM01144",
      sourceId: "TM01144",
      histology: "Skin Squamous Cell Carcinoma",
      primarySite: "Skin",
      collectionSite: "Skin",
      modelType: "Cell line",
      tumourType: "Primary",
      dataAvailable: ["Copy Number Alteration", "Expression", "Gene Mutation"],
    },
  ],
};

export const NoResults = Template.bind({});
NoResults.args = {
  displayColumns: [
    { displayName: "Model", key: "model" },
    { displayName: "Histology", key: "datasource" },
    { displayName: "Primary", key: "sourceId" },
    { displayName: "Collection", key: "patient.age" },
    { displayName: "Type", key: "patient.gender" },
    { displayName: "Data available", key: "patient.ethnicity" },
  ],
  results: [],
};
