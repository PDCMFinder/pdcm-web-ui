import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ModelMetadata } from "../components/details/ModelMetadata";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const DetailsPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Details";
  const { modelId, providerId } = useParams<{
    modelId: string;
    providerId: string;
  }>();
  return (
    <GeneralTemplate>
      <Container>
        <h1>{modelId}</h1>
        <h2>{providerId}</h2>
      </Container>
    </GeneralTemplate>
  );
};
