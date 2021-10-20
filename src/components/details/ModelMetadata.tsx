import {
  faAt,
  faDiagnoses,
  faEnvelope,
  faExternalLinkAlt,
  faMailBulk,
  faMapMarkerAlt,
  faMicroscope,
  faStethoscope,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

export interface IModelMetadataProps {
  pdcmFinderModelId: string;
  modelId: string;
  diagnosis: string;
  providerId: string;
  providerName: string;
  providerContactEmails: Array<string>;
  modelProviderUrl: string;
  cancerSystem: string;
  modelType: string;
}

export const ModelMetadata: FunctionComponent<IModelMetadataProps> = ({
  pdcmFinderModelId,
  modelId,
  diagnosis,
  providerName,
  providerContactEmails,
  cancerSystem,
  modelType,
  modelProviderUrl,
}) => (
  <ListGroup variant="flush" style={{ fontSize: "large" }}>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faAt} /> Name: {modelId}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faMapMarkerAlt} /> Provider: {providerName}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faStethoscope} /> Diagnosis: {diagnosis}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faDiagnoses} /> Cancer system: {cancerSystem}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faTag} /> Model type: {modelType}
    </ListGroup.Item>
  </ListGroup>
);
