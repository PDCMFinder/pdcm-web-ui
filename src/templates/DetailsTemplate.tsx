import {
  faEnvelope,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { IModelExtLinks } from "../apis/Details.api";
import {
  DosingStudyTable,
  IDosingStudyTableProps,
} from "../components/details/DosingStudyTable";
import {
  IModelEngraftmentTableProps,
  ModelEngraftmentTable,
} from "../components/details/ModelEngraftmentTable";
import {
  IModelMetadataProps,
  ModelMetadata,
} from "../components/details/ModelMetadata";
import {
  IModelQualityControlTableProps,
  ModelQualityControlTable,
} from "../components/details/ModelQualityControlTable";
import { MolecularDataDetailTable } from "../components/details/MolecularDataDetailTable";
import {
  IMolecularCharacterization,
  IMolecularDataTableProps,
  MolecularDataTable,
} from "../components/details/MolecularDataTable";
import {
  IPatientMetadataProps,
  PatientMetadata,
} from "../components/details/PatientMetadata";
import {
  IPatientTreatmentTableProps,
  PatientTreatmentTable,
} from "../components/details/PatientTreatmentTable";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export interface IDetailsTemplateProps
  extends IModelMetadataProps,
    IPatientMetadataProps,
    IModelExtLinks,
    IMolecularDataTableProps,
    IModelEngraftmentTableProps,
    IModelQualityControlTableProps,
    IDosingStudyTableProps,
    IPatientTreatmentTableProps {
  selectedMolecularCharacterization?: IMolecularCharacterization;
  molecularDetailLoading?: boolean;
  molecularDetailData?: Array<any>;
}

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
  molecularCharacterizations,
  engraftments,
  qualityChecks,
  dosingStudies,
  patientTreatments,
  onSelectMolecularCharacterization,
  selectedMolecularCharacterization,
}) => {
  document.title = `PDCM Finder - Cancer Model: ${modelId} - Details`;
  // TODO - Fix modal close operation to be more seamless

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
          <Col xs={12} md={4} className="mt-2 mt-md-0">
            <Button
              variant="primary"
              size="lg"
              href={contactLink}
              target="_blank"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp; Contact provider
            </Button>
            {sourceDatabaseUrl && (
              <Button
                variant="primary"
                size="lg"
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
        {engraftments.length > 0 && (
          <>
            <h3>PDX model engraftment</h3>{" "}
            <Row className="mt-3 mb-5">
              <Col>
                <ModelEngraftmentTable engraftments={engraftments} />
              </Col>
            </Row>
          </>
        )}
        {qualityChecks.length > 0 && (
          <>
            <h3>Model quality control</h3>{" "}
            <Row className="mt-3 mb-5">
              <Col>
                <ModelQualityControlTable qualityChecks={qualityChecks} />
              </Col>
            </Row>
          </>
        )}
        <h3>Molecular data</h3>
        {/* <Row>
          <Col>
            <MolecularDataTracksChart />
          </Col>
        </Row> */}
        <Row className="mt-3 mb-5">
          <Col>
            <MolecularDataTable
              molecularCharacterizations={molecularCharacterizations}
              onSelectMolecularCharacterization={
                onSelectMolecularCharacterization
              }
            />
          </Col>
        </Row>
        {dosingStudies.length > 0 && (
          <>
            <h3>Dosing studies</h3>
            <Row className="mb-5">
              <Col>
                <DosingStudyTable dosingStudies={dosingStudies} />
              </Col>
            </Row>
          </>
        )}
        {patientTreatments.length > 0 && (
          <>
            <h3>Patient treatment</h3>
            <Row className="mb-5">
              <Col>
                <PatientTreatmentTable patientTreatments={patientTreatments} />
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Modal
        show={selectedMolecularCharacterization !== undefined}
        dialogClassName="modal-90w"
        onHide={() => onSelectMolecularCharacterization(undefined)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMolecularCharacterization?.platformName}{" "}
            {selectedMolecularCharacterization ? "data" : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMolecularCharacterization && (
            <MolecularDataDetailTable
              molecularCharacterization={selectedMolecularCharacterization}
            ></MolecularDataDetailTable>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onSelectMolecularCharacterization(undefined)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </GeneralTemplate>
  );
};
