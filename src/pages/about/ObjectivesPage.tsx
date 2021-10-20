import React, { FunctionComponent, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const ObjectivesPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Objectives";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1 className="mb-5">Background and Objectives</h1>
        <ul>
          <li>
            <span onClick={handleShow} role="button" className="text-primary">
              Patients-derived xenograft (PDX) mouse models
            </span>{" "}
            &nbsp;are an important oncology research platform to study tumor
            evolution, drug response and personalised medicine approaches.
          </li>
          <li>
            Because of the distributed and heterogeneous nature of PDX
            repositories, finding relevant models of interest to investigators
            is a challenge.
          </li>
          <li>
            The global success of PDX models will depend on their collective
            distribution and usage worldwide by academic and private sectors.
          </li>
          <li>
            To facilitate PDX models discovery,&nbsp;
            <a
              href="https://www.ebi.ac.uk/about/people/helen-parkinson"
              target="_blank"
              rel="noreferrer"
            >
              EMBL-EBI&nbsp;
            </a>
            and&nbsp;
            <a
              href="https://www.jax.org/research-and-faculty/research-labs/the-bult-lab"
              target="_blank"
              rel="noreferrer"
            >
              The Jackson Laboratory&nbsp;
            </a>
            are co-developing PDX Finder &ndash; a comprehensive open global
            catalogue of PDX models and their associated data across resources.
            In support of this initiative, we coordinated the community
            initiative to develop the&nbsp;
            <Link to="/about/mis-standard/">
              PDX models Minimal Information standard (PDX-MI)
            </Link>
            &nbsp;that defines the minimal information necessary for describing
            key elements of a PDX model including the clinical attributes of a
            patient&rsquo;s tumor, methods of implantation, host strain, and
            quality assurance methods used for model validation.
          </li>
          <li>
            PDX-MI serves as the basis for PDX Finder&rsquo;s comprehensive
            search and attribute filtering options (e.g., tumor histology,
            molecular variant, drug response).
          </li>
          <li>
            Within PDX Finder, model attributes are harmonized and integrated
            into a cohesive ontological data model that supports consistent
            searching across the originating resources.
          </li>
          <li>
            Integrated views will be provided for histopathological image data,
            molecular classification of tumors, host mouse strain metadata,
            tumor genomic data, and metrics on tumor response to
            chemotherapeutics.
          </li>
          <li>
            From PDX Finder, direct links to these resources are provided to
            allow users to contact the relevant institution for model
            acquisition and further collaboration.
          </li>
          <li>
            More details about the PDX data submission, integration and
            distribution can be found in&nbsp;
            <Link to="/about/data-flow">data flow</Link>.
          </li>
        </ul>
      </Container>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>PDX mouse model creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={process.env.PUBLIC_URL + "/pdx_mi_figure.png"}
            alt="Schematic of the process for PDX model creation, expansion, and drug
            dosing studies"
            className="img-fluid"
          />
          <p>
            Schematic of the process for PDX model creation, expansion, and drug
            dosing studies. A PDX model consists of an immunocompromised mouse
            into which human tumor material has been implanted. Once the
            implanted tumor reaches a target volume at the initial passage (P0),
            the tumor is excised, fractionated, and transplanted into the next
            cohort of mice to establish the next passage. P0 and P1 tumors are
            subjected to various quality control assays to ensure that the
            passaged tumors faithfully reflect the critical biological and
            genomic properties of the patient tumor. Cohorts of tumor-bearing
            mice are used in experimental studies. Dosing studies are typically
            performed on low passage tumors (P1-P4).
          </p>
        </Modal.Body>
      </Modal>
    </GeneralTemplate>
  );
};
