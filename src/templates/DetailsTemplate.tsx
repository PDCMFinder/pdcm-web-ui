import {
  faEnvelope,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { IModelExtLinks } from "../apis/Details.api";
import { AnchorLink } from "../components/details/AnchorLink";
import {
  DosingStudyTable,
  IDosingStudyTableProps,
} from "../components/details/DosingStudyTable";
import { MetadataItem } from "../components/details/MetadataItem";
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
import { TableOfContent } from "../components/details/TableOfContent";
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
  primarySite,
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
  document.title = `PDCM Finder - Cancer Model: ${providerName} - ${modelId} - ${histology} - Details`;
  // TODO - Fix modal close operation to be more seamless

  return (
    <GeneralTemplate>
      <Container fluid className="mt-5 w-100">
        <Row className="gx-5">
          <Col sm="2" className="d-sm-block d-none">
          <h6 className="text-muted my-4">Data available</h6>
      <ul className="list-unstyled">
        {modelType === "xenograft" ? (
          <AnchorLink label="PDX model engraftment" href="#engraftments"  disabled={!engraftments?.length}/>
        ) : null}
        <AnchorLink label="Quality control" href="#quality-control"  disabled={!qualityChecks?.length}/>
        <AnchorLink label="Molecular data" href="#molecular-data"  disabled={!molecularCharacterizations?.length}/>
        <AnchorLink label="Dosing studies" href="#dosing-studies"  disabled={!dosingStudies?.length}/>
        <AnchorLink label="Patient treatment" href="#patient-treatment"  disabled={!patientTreatments?.length}/>
        {/* <li className="py-3"><a href="#publications" className={qualityChecks.length > 0 ? "" : "disabled text-muted text-decoration-none"}>Publications</a></li> */}
        <li className="py-3">
          <Button
            variant="outline-primary"
            href={contactLink}
            target="_blank"
            className="w-100"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            &nbsp; Contact provider
          </Button>
        </li>

        {sourceDatabaseUrl && (
          <li className="py-3">
            <Button
              variant="outline-primary"
              href={sourceDatabaseUrl}
              target="_blank"
              className="w-100"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp; View data at {providerId}
            </Button>
          </li>
        )}
      </ul>
          </Col>
          <Col sm="10">
            <Row className="ml-2">
              <Col lg="8" className="lh-sm">
                <div>
                  <h2 className="text-muted fw-lighter mb-3">Model metadata</h2>
                  <p className="fs-2 fw-lighter lh-sm pb-0 mb-0">{histology}</p>
                  <p className="fs-5 text-muted">Diagnosis</p>
                </div>

                <dd>
                  <Row className="g-0 fs-5">
                    <Col lg="4">
                      <MetadataItem value={modelId} label="Model identifier" />
                    </Col>
                    <Col>
                      <MetadataItem value={providerName} label="Model provider" />
                    </Col>
                  </Row>
                  <Row className="g-0 fs-5">
                    <Col lg="4">
                      <MetadataItem value={modelType} label="Model type" />
                    </Col>
                    <Col>
                      <MetadataItem value={cancerSystem} label="Cancer system" />
                    </Col>
                  </Row>
                </dd>
              </Col>
            </Row>
            <Row className="ml-2 mb-5">
              <Col lg="8" className="lh-sm">
                <div>
                  <h2 className="text-muted fw-lighter mb-3">
                    Patient / Tumor metadata
                  </h2>
                </div>

                <dd>
                  <Row className="g-0 fs-5">
                    <Col lg="4">
                      <MetadataItem value={patientSex} label="Patient sex" />
                    </Col>
                    <Col lg="4">
                      <MetadataItem value={`${patientAge}`} label="Patient age" />
                    </Col>
                    <Col lg="4">
                      <MetadataItem value={patientEthnicity} label="Patient ethnicity" />
                    </Col>
                  </Row>
                  <Row className="g-0 fs-5">
                    <Col lg="4">
                      <MetadataItem value={tumourType} label="Tumor type" />
                    </Col>
                    <Col lg="4">
                      <MetadataItem value={cancerGrade} label="Cancer grade" />
                    </Col>
                    <Col lg="4">
                      <MetadataItem value={cancerStage} label="Cancer stage" />
                    </Col>
                  </Row>
                  <Row className="g-0 fs-5">
                    <Col lg="4">
                      <MetadataItem value={primarySite?.replace("/", " / ")} label="Primary site" />
                    </Col>
                    <Col lg="4">
                      <MetadataItem value={collectionSite} label="Collection site" />
                    </Col>
                  </Row>
                </dd>
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
                <h3 style={{ position: "relative" }}><span id="quality-control" style={{ position: "absolute", top: "-100px" }}></span>Model quality control</h3>{" "}
                <Row className="mt-3 mb-5">
                  <Col>
                    <ModelQualityControlTable qualityChecks={qualityChecks} />
                  </Col>
                </Row>
              </>
            )}
            {molecularCharacterizations?.length > 0 && (
              <>
                <h3 style={{ position: "relative" }}><span id="molecular-data" style={{ position: "absolute", top: "-100px" }}></span>Molecular data</h3>
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
              </>
            )}

            {dosingStudies.length > 0 && (
              <>
                <h3 style={{ position: "relative" }}><span id="dosing-studies" style={{ position: "absolute", top: "-100px" }}></span>Dosing studies</h3>
                <Row className="mb-5">
                  <Col>
                    <DosingStudyTable dosingStudies={dosingStudies} />
                  </Col>
                </Row>
              </>
            )}
            {patientTreatments.length > 0 && (
              <>
                <h3 style={{ position: "relative" }}><span id="patient-treatment" style={{ position: "absolute", top: "-100px" }}></span>Patient treatment</h3>
                <Row className="mb-5">
                  <Col>
                    <PatientTreatmentTable patientTreatments={patientTreatments} />
                  </Col>
                </Row>
              </>
            )}
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
          </Col>
        </Row>

      </Container>
    </GeneralTemplate>
  );
};

/*
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
              className="mb-3"
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
        {molecularCharacterizations?.length > 0 && (
          <>
            <h3>Molecular data</h3>
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
          </>
        )}

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
*/
