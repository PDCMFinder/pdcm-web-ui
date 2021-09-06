import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IModelMetadataProps, ModelMetadata } from "./ModelMetadata";

export default {
  title: "Components/Details/Model metadata",
  component: ModelMetadata,
} as Meta;

const Template: Story<IModelMetadataProps> = (args) => (
  <div style={{ width: "%", backgroundColor: "#fff", marginTop: "20px" }}>
    <ModelMetadata {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  modelId: "CRC0163LM",
  diagnosis: "Colorectal Carcinoma",
  providerName: "Candiolo Cancer Institute - Colorectal",
  providerId: "IRCC-CRC",
  providerContactEmails: ["andrea.bertotti@ircc.it"],
  modelProviderUrl: "https://example.com",
  cancerSystem: "Digestive system",
};
