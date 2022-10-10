import {
  faEnvelope,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IModelExtLinks } from "../apis/Details.api";
import { capitalizeFirstLetter } from "../apis/Utils.api";
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
import { IModelMetadataProps } from "../components/details/ModelMetadata";
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
import { IPatientMetadataProps } from "../components/details/PatientMetadata";
import {
  IPatientTreatmentTableProps,
  PatientTreatmentTable,
} from "../components/details/PatientTreatmentTable";
import {
  IPublicationsTableProps,
  PublicationTable,
} from "../components/details/PublicationTable";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export interface IDetailsTemplateProps
  extends IModelMetadataProps,
    IPatientMetadataProps,
    IModelExtLinks,
    IMolecularDataTableProps,
    IModelEngraftmentTableProps,
    IModelQualityControlTableProps,
    IDosingStudyTableProps,
    IPatientTreatmentTableProps,
    IPublicationsTableProps {
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
  publications,
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
            <h5 className="text-muted my-4">Data available</h5>
            <ul className="list-unstyled">
              {modelType === "xenograft" ? (
                <AnchorLink
                  label="PDX model engraftment"
                  href="#engraftments"
                  disabled={!engraftments?.length}
                />
              ) : null}
              <AnchorLink
                label="Quality control"
                href="#quality-control"
                disabled={!qualityChecks?.length}
              />
              <AnchorLink
                label="Molecular data"
                href="#molecular-data"
                disabled={!molecularCharacterizations?.length}
              />
              <AnchorLink
                label="Dosing studies"
                href="#dosing-studies"
                disabled={!dosingStudies?.length}
              />
              <AnchorLink
                label="Patient treatment"
                href="#patient-treatment"
                disabled={!patientTreatments?.length}
              />
              <li className="py-3">
                <a
                  href="#publications"
                  className={
                    publications.length > 0
                      ? ""
                      : "disabled text-muted text-decoration-none"
                  }
                >
                  Publications
                </a>
              </li>
              {/* <li className="py-3">
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
              )} */}
            </ul>
          </Col>
          <Col sm="10">
            <Row className="ml-2 mb-5">
              <Col lg="8" className="lh-sm mb-3">
                <div>
                  <h1>{modelId}</h1>
                  <h2 className="text-muted mb-3">
                    {histology}- {capitalizeFirstLetter(modelType || "")} model
                  </h2>
                  <p className="fs-2 fw-lighter pb-0 mb-0">
                    <Link
                      to={`/about/provider/${providerId}`}
                      className="text-decoration-none"
                    >
                      {providerName} ({providerId})
                    </Link>
                  </p>
                </div>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  href={contactLink}
                  target="_blank"
                  className="w-50 d-block mb-2"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  &nbsp; Contact provider
                </Button>
                {sourceDatabaseUrl && (
                  <Button
                    variant="primary"
                    href={sourceDatabaseUrl}
                    target="_blank"
                    className="w-50 d-block"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    &nbsp; View data at {providerId}
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="ml-2 mb-5">
              <Col lg="8" className="lh-sm">
                <div>
                  <h3 className="mb-3">Patient / Tumor metadata</h3>
                </div>

                <dd>
                  <Row className="g-0 fs-5">
                    <Col lg="4">
                      <MetadataItem value={patientSex} label="Patient sex" />
                    </Col>
                    <Col lg="4">
                      <MetadataItem
                        value={`${patientAge}`}
                        label="Patient age"
                      />
                    </Col>
                    <Col lg="4">
                      <MetadataItem
                        value={patientEthnicity}
                        label="Patient ethnicity"
                      />
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
                      <MetadataItem
                        value={primarySite?.replace("/", " / ")}
                        label="Primary site"
                      />
                    </Col>
                    <Col lg="4">
                      <MetadataItem
                        value={collectionSite}
                        label="Collection site"
                      />
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
                <h3 style={{ position: "relative" }}>
                  <span
                    id="quality-control"
                    style={{ position: "absolute", top: "-100px" }}
                  ></span>
                  Model quality control
                </h3>{" "}
                <Row className="mt-3 mb-5">
                  <Col>
                    <ModelQualityControlTable qualityChecks={qualityChecks} />
                  </Col>
                </Row>
              </>
            )}
            {molecularCharacterizations?.length > 0 && (
              <>
                <h3 style={{ position: "relative" }}>
                  <span
                    id="molecular-data"
                    style={{ position: "absolute", top: "-100px" }}
                  ></span>
                  Molecular data
                </h3>
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
                <h3 style={{ position: "relative" }}>
                  <span
                    id="dosing-studies"
                    style={{ position: "absolute", top: "-100px" }}
                  ></span>
                  Dosing studies
                </h3>
                <Row className="mb-5">
                  <Col>
                    <DosingStudyTable dosingStudies={dosingStudies} />
                  </Col>
                </Row>
              </>
            )}
            {patientTreatments.length > 0 && (
              <>
                <h3 style={{ position: "relative" }}>
                  <span
                    id="patient-treatment"
                    style={{ position: "absolute", top: "-100px" }}
                  ></span>
                  Patient treatment
                </h3>
                <Row className="mb-5">
                  <Col>
                    <PatientTreatmentTable
                      patientTreatments={patientTreatments}
                    />
                  </Col>
                </Row>
              </>
            )}

            {publications.length > 0 && (
              <>
                <h3 style={{ position: "relative" }}>
                  <span
                    id="publications"
                    style={{ position: "absolute", top: "-100px" }}
                  ></span>
                  Publications
                </h3>
                <Row className="mb-5">
                  <Col>
                    <PublicationTable publications={publications} />
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
                {selectedMolecularCharacterization &&
                  (!["Curie-BC", "Curie-LC", "Curie-OC", "CRL"].includes(
                    providerId
                  ) ? (
                    <MolecularDataDetailTable
                      molecularCharacterization={
                        selectedMolecularCharacterization
                      }
                    ></MolecularDataDetailTable>
                  ) : (
                    <span>
                      This data is only accessible through the provider website
                      - please click on 'CONTACT PROVIDER' button above to
                      request access.
                    </span>
                  ))}
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
