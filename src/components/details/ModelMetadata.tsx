import {
  faAt,
  faDiagnoses,
  faEnvelope,
  faExternalLinkAlt,
  faMailBulk,
  faMapMarkerAlt,
  faMicroscope,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, Row } from "react-bootstrap";

export interface IModelMetadataProps {
  pdcmFinderModelId: string;
  modelId: string;
  diagnosis: string;
  providerId: string;
  providerName: string;
  providerContactEmails: Array<string>;
  modelProviderUrl: string;
  cancerSystem: string;
}

export const ModelMetadata: FunctionComponent<IModelMetadataProps> = ({
  pdcmFinderModelId,
  modelId,
  diagnosis,
  providerName,
  providerContactEmails,
  cancerSystem,
}) => (
  <>
    <Row>
      <Col xs={12}>
        <h2>Model overview</h2>
        <h5>
          <FontAwesomeIcon icon={faAt} /> Name: {modelId}
        </h5>
        <h5>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Provider: {providerName}
        </h5>
        <h5>
          <FontAwesomeIcon icon={faStethoscope} /> Diagnosis: {diagnosis}
        </h5>
        <h5>
          <FontAwesomeIcon icon={faDiagnoses} /> Cancer system: {cancerSystem}
        </h5>
      </Col>
    </Row>
  </>
);
