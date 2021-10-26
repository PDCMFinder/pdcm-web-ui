import {
  faEnvelope,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IModelExtLinks } from "../apis/Details.api";
import { DosingStudyTable } from "../components/details/DosingStudyTable";
import {
  IModelMetadataProps,
  ModelMetadata,
} from "../components/details/ModelMetadata";
import { MolecularDataTable } from "../components/details/MolecularDataTable";
import {
  IPatientMetadataProps,
  PatientMetadata,
} from "../components/details/PatientMetadata";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export interface IDetailsTemplateProps
  extends IModelMetadataProps,
    IPatientMetadataProps,
    IModelExtLinks {}

export const DetailsTemplate: FunctionComponent<IDetailsTemplateProps> = ({
  modelId,
  providerId,
  providerName,
  histology,
  cancerSystem,
  modelType,
  patientSex,
  patientAge,
  patientEthnicity,
  tumourType,
  cancerGrade,
  cancerGradingSystem,
  cancerStage,
  cancerStagingSystem,
  collectionSite,
  contactLink,
  sourceDatabaseUrl,
}) => {
  document.title = `PDCM Finder - Cancer Model: ${modelId} - Details`;
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>{modelId}</h2>
            <h3>{histology}</h3>
            <h5 className="text-muted">
              {" "}
              {providerName} - {providerId}
            </h5>
          </Col>
          <Col xs={4}>
            <Button variant="primary" block href={contactLink} target="_blank">
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp; Contact provider
            </Button>
            {sourceDatabaseUrl && (
              <Button
                variant="primary"
                block
                href={sourceDatabaseUrl}
                target="_blank"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                &nbsp; View data at {providerId}
              </Button>
            )}
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col>
            <h4>Model Metadata</h4>
            <ModelMetadata
              modelId={modelId}
              providerId={providerId}
              providerName={providerName || ""}
              histology={histology || ""}
              cancerSystem={cancerSystem || ""}
              modelType={modelType || ""}
            />
          </Col>
          <Col>
            <h4>Patient Metadata</h4>
            <PatientMetadata
              patientSex={patientSex || ""}
              derivedModels={[]}
              patientAge={patientAge}
              tumourType={tumourType || ""}
              patientEthnicity={patientEthnicity || ""}
              cancerGrade={cancerGrade || ""}
              cancerGradingSystem={cancerGradingSystem || ""}
              cancerStagingSystem={cancerStagingSystem || ""}
              cancerStage={cancerStage || ""}
              collectionSite={collectionSite || ""}
            />
          </Col>
        </Row>
        <h3>Dosing studies</h3>
        <Row className="mb-5">
          <Col>
            <DosingStudyTable treatments={[]} />
          </Col>
        </Row>
        <h3>Molecular data</h3>
        {/* <Row>
          <Col>
            <MolecularDataTracksChart />
          </Col>
        </Row> */}
        <Row>
          <Col>
            <MolecularDataTable molecularCharacterizations={[]} />
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
