import React from "react";
import { Meta, Story } from "@storybook/react";
import { MemoryRouter, Route, Router } from "react-router-dom";
import { DetailsPage } from "../pages/DetailsPage";
import StoryRouter from "storybook-react-router";
import { DetailsTemplate, IDetailsTemplateProps } from "./DetailsTemplate";

export default {
  title: "Templates/Details",
  component: DetailsTemplate,
  decorators: [
    StoryRouter(undefined, {
      initialEntries: ["/data/CRL/CRL-2128"],
      initialIndex: 0,
    }),
  ],
} as Meta;

const Template: Story<IDetailsTemplateProps> = (args) => (
  <Route path="/data/:providerId/:modelId">
    <DetailsTemplate {...args} />
  </Route>
);

export const Default = Template.bind({});
Default.args = {
  modelId: "CRL-2128",
  histology: "Breast carcinoma",
  providerId: "CRL",
  providerName: "Cancer Research Laboratories",
  cancerSystem: "Breast",
  modelType: "cell line model",
  patientSex: "Male",
  derivedModels: [],
  patientAge: 25,
  patientEthnicity: "NA",
  tumourType: "Test",
  cancerGrade: "3",
  cancerGradingSystem: "Some grading system",
  cancerStage: "some Stage",
  cancerStagingSystem: "Some staging system",
  collectionSite: "Some collection site",
  molecularCharacterizations: [],
  engraftments: [],
  qualityChecks: [],
  dosingStudies: [],
  patientTreatments: [],
};
