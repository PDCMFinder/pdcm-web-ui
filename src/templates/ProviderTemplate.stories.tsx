import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IProviderTemplateProps, ProviderTemplate } from "./ProviderTemplate";
import StoryRouter from "storybook-react-router";
import { Route } from "react-router";

export default {
  title: "Templates/Provider Template",
  component: ProviderTemplate,
  decorators: [
    StoryRouter(undefined, { initialEntries: ["/about/provider/TEST"] }),
  ],
} as Meta;

const Template: Story<IProviderTemplateProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}>
    <Route path="/about/provider/:provider">
      <ProviderTemplate {...args} />
    </Route>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  providerName: "Princess Margaret Living Biobank",
  providerDescription:
    "Researchers at the Princess Margaret (PM) Cancer Centre (Toronto, Canada) have clinically annotated and molecularly characterized tumor models (>1000) including ovarian, head and neck, lung, mesothelioma, breast, pancreas and colon cancers. These patient-derived xenograft (PDX) models are grown in immune-deficient mice to study the genotypic and phenotypic heterogeneity of these tumors, and to better understand the functional significance of their molecular changes.",
  providerModelsBySystem: [
    {
      id: "Ovarian Cancer",
      label: "Ovarian Cancer",
      value: 10,
    },
    {
      id: "Lung Cancer",
      label: "Lung Cancer",
      value: 15,
    },
    {
      id: "Breast Cancer",
      label: "Breast Cancer",
      value: 36,
    },
  ],
  providerModelsByDataAvailability: [
    { dataType: "mutation", platformName: "Illumina WES", modelCount: 10 },
    { dataType: "expression", platformName: "Illumina", modelCount: 10 },
    {
      dataType: "cytogenetics",
      platformName: "Immunohistochemistry",
      modelCount: 10,
    },
    {
      dataType: "copy number alteration",
      platformName: "Affymetrix SNP6.0",
      modelCount: 10,
    },
    { dataType: "mutation", platformName: "RNA sequencing", modelCount: 10 },
  ],
};
