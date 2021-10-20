import React, { FunctionComponent } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

import { SubmissionWorkflowDiagram } from "../components/submit/SubmissionWorkflowDiagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faExternalLinkAlt,
  faFileExcel,
  faSquareFull,
} from "@fortawesome/free-solid-svg-icons";

interface TemplateFile {
  name: string;
  link: string;
}

interface TemplateFileGroup {
  name: string;
  subgroups?: TemplateFileGroup[];
  files?: TemplateFile[];
}

const templateFiles: Array<TemplateFileGroup> = [
  {
    name: "Metadata templates",
    files: [
      {
        name: "Clinical/Model metadata",
        link:
          process.env.PUBLIC_URL + "/static/templates/metadata_template.xlsx",
      },
      {
        name: "Sample metadata for OMIC data",
        link:
          process.env.PUBLIC_URL +
          "/static/templates/sampleplatform_template.xlsx",
      },
    ],
  },

  {
    name: "Data templates",
    subgroups: [
      {
        name: "Treatment (patient and model)",
        files: [
          {
            name: "Patient treatment template",
            link:
              process.env.PUBLIC_URL +
              "/static/templates/patienttreatment_template.xlsx",
          },
          {
            name: "Drug dosing template",
            link:
              process.env.PUBLIC_URL +
              "/static/templates/drug_dosing_template.xlsx",
          },
        ],
      },
      {
        name: "Molecular data",
        files: [
          {
            name: "Mutation data template",
            link:
              process.env.PUBLIC_URL +
              "/static/templates/mutation_template_external.xlsx",
          },
          {
            name: "Cytogenetics data template",
            link:
              process.env.PUBLIC_URL +
              "/static/templates/cytogenetics_template.xlsx",
          },
          {
            name: "CNA data template",
            link:
              process.env.PUBLIC_URL + "/static/templates/cna_template.xlsx",
          },
          {
            name: "Expression data template",
            link:
              process.env.PUBLIC_URL +
              "/static/templates/expression_template.xlsx",
          },
        ],
      },
    ],
  },
];

export const SubmitPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Submit your data";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1>Submit</h1>
        <h4>
          Submit your PDX data to the PDX Finder to increase their visibility
        </h4>
        <p>
          To start the process please contact PDX Finder team:&nbsp;
          <a href="mailto:submissions@pdxfinder.org?subject=PDX%20producer:%20Data%20Submission%20request">
            submissions&nbsp; <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </p>

        <Row className="mt-5 mb-3">
          <Col xs={12}>
            <h3>Download submission templates</h3>
          </Col>
        </Row>
        <Row className="mb-5">
          {templateFiles.map((templateGroup) => {
            return (
              <Col md={templateGroup.files ? 4 : 8} xs={12}>
                <h4
                  className={`mt-3 ${templateGroup.files ? "" : "mb-1"}`}
                  style={templateGroup.files ? { marginBottom: "2.5rem" } : {}}
                >
                  {templateGroup.name}
                </h4>
                <ListGroup>
                  {templateGroup.files ? (
                    templateGroup.files.map((file) => (
                      <ListGroup.Item
                        key={file.name}
                        action
                        href={file.link}
                        target="blank"
                      >
                        {file.name}
                        &nbsp;&nbsp;
                        <FontAwesomeIcon
                          icon={faFileExcel}
                          style={{ fontSize: "larger" }}
                        />
                      </ListGroup.Item>
                    ))
                  ) : (
                    <Row>
                      {templateGroup.subgroups?.map((subgroup) => (
                        <Col xs={12} md={6}>
                          <h5 key={subgroup.name} className="mt-3 mb-1">
                            {subgroup.name}
                          </h5>
                          {subgroup?.files?.map((file) => (
                            <ListGroup.Item
                              key={file.name}
                              action
                              href={file.link}
                            >
                              {file.name}
                              &nbsp;&nbsp;
                              <FontAwesomeIcon
                                icon={faFileExcel}
                                style={{ fontSize: "larger" }}
                              />
                            </ListGroup.Item>
                          ))}
                        </Col>
                      ))}
                    </Row>
                  )}
                </ListGroup>
              </Col>
            );
          })}
        </Row>
        <Row className="mt-5 mb-3">
          <Col xs={12}>
            <h3 className="mb-3">Why submit your data to PDCM Finder</h3>
            <p>
              The PDCM Finder is the first free global PDCM models catalogue to
              facilitate PDCM models discovery. We aggregate and display PDCM
              models metadata and data from academia, large consortia and CROs.
            </p>
            <p>
              <b>
                We can collect and display your data making you more
                discoverable and visible for end-users.
              </b>{" "}
              All submitted models adhere to the PDX-MI standard making it easy
              for researchers to search and compare models of interest. We
              aggregate PDCM data to be{" "}
              <a
                href="https://www.nature.com/articles/sdata201618"
                target="_blank"
                rel="noreferrer"
              >
                FAIR <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>{" "}
              with the goal of helping users to freely navigate to the
              originating source for models and/or molecular data. We supply a
              description page for each provider and models have clear links to
              the production centres so the users can inquire about obtaining
              models for their studies.
            </p>
            <p>
              PDX Finder is built with the help of and for the benefit of the
              community, our service is{" "}
              <b>completely free to providers and users</b>.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <h3>Submission process</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <SubmissionWorkflowDiagram />
          </Col>
        </Row>
        <Row className="justify-content-start mb-5">
          <Col xs={12} md={4}>
            <div className="d-flex justify-content-between">
              <span className="mr-3">
                <FontAwesomeIcon
                  icon={faSquareFull}
                  style={{ color: "#02b2d5" }}
                />{" "}
                Model provider
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faSquareFull}
                  style={{ color: "#0032a0" }}
                />
                &nbsp; PDCM Finder team
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              When you are ready to submit your PDX models, you will be
              supported through the process by a member of the PDX Finder team.
              We currently use spreadsheets for the metadata. In addition to
              metadata, we encourage producers to upload associated data making
              models more valuable and discoverable for the users. Currently, we
              support the following data types: gene expression, gene mutation,
              copy number alterations, cytogenetics, drug dosing studies, and
              patient treatment.
            </p>
            <p>
              Data can be directly uploaded from other file collections,
              databases and repositories by a member of the PDX Finder team.
              Where raw data is available PDX Finder team can deposit
              corresponding fastq files to the{" "}
              <a
                href="https://www.ebi.ac.uk/ena/browser/home"
                target="_blank"
                rel="noreferrer"
              >
                European Nucleotide Archive{" "}
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>{" "}
              and link to the submitted models.
            </p>
            <p>
              To start the process please contact PDX Finder team:{" "}
              <a href="mailto:submissions@pdxfinder.org?subject=PDX%20producer:%20Data%20Submission%20request">
                submissions&nbsp; <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
