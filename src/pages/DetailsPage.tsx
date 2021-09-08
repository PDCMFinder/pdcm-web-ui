import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { DetailsTemplate } from "../templates/DetailsTemplate";

export const DetailsPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Details";
  const { modelId, providerId } = useParams<{
    modelId: string;
    providerId: string;
  }>();
  return (
    <DetailsTemplate
      modelId={modelId}
      providerId={providerId}
    ></DetailsTemplate>
  );
};
