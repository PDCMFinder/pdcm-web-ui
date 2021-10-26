import React, { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getModelDetails, getModelExtLinks } from "../apis/Details.api";
import { DetailsTemplate } from "../templates/DetailsTemplate";

export const DetailsPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Details";
  const { modelId, providerId } = useParams<{
    modelId: string;
    providerId: string;
  }>();

  const modelMetadataQuery = useQuery(
    ["model-metadata", { modelId, providerId }],
    () => getModelDetails(modelId, providerId)
  );
  const pdcmModelId = modelMetadataQuery.data?.pdcmModelId;
  const modelExtLinks = useQuery(
    ["model-ext-links", { pdcmModelId, modelId }],
    () => getModelExtLinks(pdcmModelId, modelId)
  );

  return (
    <DetailsTemplate
      modelId={modelId}
      providerId={providerId}
      histology={modelMetadataQuery.data?.histology}
      providerName={modelMetadataQuery.data?.providerName}
      cancerSystem={modelMetadataQuery.data?.cancerSystem}
      modelType={modelMetadataQuery.data?.modelType}
      patientSex={modelMetadataQuery.data?.patientSex}
      patientAge={modelMetadataQuery.data?.patientAge}
      patientEthnicity={modelMetadataQuery.data?.patientEthnicity}
      derivedModels={[]}
      tumourType={modelMetadataQuery.data?.tumourType}
      cancerGrade={modelMetadataQuery.data?.cancerGrade}
      cancerGradingSystem={modelMetadataQuery.data?.cancerGradingSystem}
      cancerStage={modelMetadataQuery.data?.cancerStage}
      cancerStagingSystem={modelMetadataQuery.data?.cancerStagingSystem}
      collectionSite={modelMetadataQuery.data?.collectionSite}
      contactLink={modelExtLinks.data?.contactLink}
      sourceDatabaseUrl={modelExtLinks.data?.sourceDatabaseUrl}
    ></DetailsTemplate>
  );
};
