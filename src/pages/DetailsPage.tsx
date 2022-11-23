import React, { FunctionComponent, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getModelDetailsMetadata,
  getModelDrugDosing,
  getModelEngraftments,
  getModelExtLinks,
  getModelMolecularData,
  getModelPubmedIds,
  getModelQualityData,
  getMolecularDataRestrictions,
  getPatientTreatment,
  getPublicationData,
} from "../apis/Details.api";
import { IMolecularCharacterization } from "../components/details/MolecularDataTable";
import { Publication } from "../models/PDCModel.model";
import { DetailsTemplate } from "../templates/DetailsTemplate";

export const DetailsPage: FunctionComponent = () => {
  const { modelId, providerId } = useParams<{
    modelId: string;
    providerId: string;
  }>();

  const modelMetadataQuery = useQuery(
    ["model-metadata", { modelId, providerId }],
    () => getModelDetailsMetadata(modelId, providerId)
  );
  const pdcmModelId = modelMetadataQuery.data?.pdcmModelId;
  const modelExtLinksQuery = useQuery(
    ["model-ext-links", { pdcmModelId, modelId }],
    () => getModelExtLinks(pdcmModelId, modelId)
  );

  const molecularDataQuery = useQuery(
    ["model-molecular-data-summary", { providerId, pdcmModelId }],
    () => getModelMolecularData(providerId, pdcmModelId)
  );

  const dataRestrictionsQuery = useQuery(
    ["model-molecular-data-restrictions", { providerId }],
    () => getMolecularDataRestrictions(providerId)
  );

  const [selectedMolecularCharacterization, selectMolecularCharacterization] =
    useState<IMolecularCharacterization>();

  const modelType = modelMetadataQuery.data?.modelType;
  const engraftmentQuery = useQuery(
    ["model-engraftment-data", { pdcmModelId, modelType }],
    () => getModelEngraftments(pdcmModelId, modelType)
  );

  const dosingStudiesQuery = useQuery(
    ["model-drug-dosing-data", { pdcmModelId, modelType }],
    () => getModelDrugDosing(pdcmModelId, modelType)
  );

  const patientTreatmentQuery = useQuery(
    ["model-patient-treatment-data", { pdcmModelId, modelType }],
    () => getPatientTreatment(pdcmModelId, modelType)
  );

  const qualityQuery = useQuery(["model-quality-data", { pdcmModelId }], () =>
    getModelQualityData(pdcmModelId)
  );

  const pubmedIdsQuery = useQuery(["pubmed-ids-data", { pdcmModelId }], () =>
    getModelPubmedIds(pdcmModelId)
  );

  const pubmedIds = pubmedIdsQuery.data || [];

  const publicationsQuery = useQueries<Array<Publication>>(
    pubmedIds.map((p: string) => {
      return {
        queryKey: ["publication-data", p],
        queryFn: () => getPublicationData(p),
      };
    })
  );

  const publications: Array<Publication> = publicationsQuery
    .map((q) => q.data as Publication)
    .filter((d) => d !== undefined);

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
      primarySite={modelMetadataQuery.data?.primarySite}
      collectionSite={modelMetadataQuery.data?.collectionSite}
      contactLink={modelExtLinksQuery.data?.contactLink}
      sourceDatabaseUrl={modelExtLinksQuery.data?.sourceDatabaseUrl}
      molecularCharacterizations={molecularDataQuery.data}
      dataRestrictions={dataRestrictionsQuery.data}
      engraftments={engraftmentQuery.data || []}
      qualityChecks={qualityQuery.data || []}
      onSelectMolecularCharacterization={selectMolecularCharacterization}
      selectedMolecularCharacterization={selectedMolecularCharacterization}
      dosingStudies={dosingStudiesQuery.data || []}
      patientTreatments={patientTreatmentQuery.data || []}
      publications={publications}
    ></DetailsTemplate>
  );
};
