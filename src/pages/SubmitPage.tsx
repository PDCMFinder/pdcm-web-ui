import React, { FunctionComponent } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

import { SubmissionWorkflowDiagram } from "../components/submit/SubmissionWorkflowDiagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileExcel } from "@fortawesome/free-solid-svg-icons";

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
        link: "/data/templates/metadata_template.xlsx",
      },
      {
        name: "Sample metadata for OMIC data",
        link: "/data/templates/sample_treatment_template.xlsx",
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
            link: "/data/templates/patient_treatment_template.xlsx",
          },
          {
            name: "Drug dosing template",
            link: "/data/templates/drug_dosing_template.xlsx",
          },
        ],
      },
      {
        name: "Molecular data",
        files: [
          {
            name: "Mutation data template",
            link: "/data/templates/mutation_template.xlsx",
          },
          {
            name: "Cytogenetics data template",
            link: "/data/templates/cytogenetics_template.xlsx",
          },
          {
            name: "CNA data template",
            link: "/data/templates/cna_template.xlsx",
          },
          {
            name: "Expression data template",
            link: "/data/templates/expression_template.xlsx",
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
        <SubmissionWorkflowDiagram />
        <Row className="mt-5">
          <Col xs={12}>
            <h4>Download submission templates:</h4>
          </Col>
        </Row>

        {/* {templateFiles.map((templateGroup) => {
          return (
            <Row className="mt-5 mb-5">
              <Col xs={4}>
                <h5>{templateGroup.name}</h5>
                <ListGroup>
                  {templateGroup.links.map((file) => (
                    <ListGroup.Item key={file.name} action href={file.link}>
                      {file.name}
                      &nbsp;&nbsp;
                      <FontAwesomeIcon
                        icon={faFileExcel}
                        style={{ fontSize: "larger" }}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          );
        })} */}
      </Container>
    </GeneralTemplate>
  );
};
