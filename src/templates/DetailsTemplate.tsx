import {
  faEnvelope,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DosingStudyTable } from "../components/details/DosingStudyTable";
import { ModelMetadata } from "../components/details/ModelMetadata";
import { MolecularDataTable } from "../components/details/MolecularDataTable";
import { MolecularDataTracksChart } from "../components/details/MolecularDataTracksChart";
import { PatientMetadata } from "../components/details/PatientMetadata";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export interface IDetailsTemplateProps {
  modelId: string;
  providerId: string;
}

export const DetailsTemplate: FunctionComponent<IDetailsTemplateProps> = ({
  modelId,
  providerId,
}) => {
  document.title = `PDCM Finder - Cancer Model: ${modelId} - Details`;
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>{modelId}</h2>
            <h4>Lip and Oral Cavity Squamous Cell Carcinoma</h4>
            <h5 className="text-muted">{providerId}</h5>
          </Col>
          <Col xs={4}>
            <Button variant="primary" block>
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp; Contact provider
            </Button>
            <Button variant="primary" block>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp; View data at {providerId}
            </Button>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col>
            <h4>Model Metadata</h4>
            <ModelMetadata
              pdcmFinderModelId="54544"
              modelId={modelId}
              providerId={providerId}
              providerName="St Jude Children's Research Hospital"
              diagnosis="Childhood Intraocular Retinoblastoma"
              cancerSystem="Eye"
              providerContactEmails={["andrea.bertotti@ircc.it"]}
              modelProviderUrl="https://www.candiolo.it"
              modelType="Patient derived xenograf"
            />
          </Col>
          <Col>
            <h4>Patient Metadata</h4>
            <PatientMetadata
              sex="Male"
              derivedModels={["CRM-574"]}
              age={3}
              diagnosis="Childhood Intraocular Retinoblastoma"
              cancerType="Recurrent"
              ethnicity="Caucasian"
              cancerGrade="grade 3; Elston"
              cancerStage="T3N2M1"
              sampleCollectionSite="Eye"
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
