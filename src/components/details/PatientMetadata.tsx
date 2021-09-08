import {
  faAt,
  faDiagnoses,
  faEnvelope,
  faExternalLinkAlt,
  faMailBulk,
  faMapMarkerAlt,
  faMicroscope,
  faSignal,
  faStethoscope,
  faTag,
  faTrafficLight,
  faUsers,
  faVenusMars,
  faVial,
  faVials,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

export interface IPatientMetadataProps {
  sex: string;
  derivedModels: Array<string>;
  age: number;
  diagnosis: string;
  ethnicity: string;
  cancerType: string;
  cancerGrade: string;
  cancerStage: string;
  sampleCollectionSite: string;
}

export const PatientMetadata: FunctionComponent<IPatientMetadataProps> = ({
  sex,
  derivedModels,
  diagnosis,
  ethnicity,
  cancerType,
  cancerGrade,
  cancerStage,
  sampleCollectionSite,
}) => (
  <ListGroup variant="flush" style={{ fontSize: "large" }}>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faVenusMars} /> Sex: {sex}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faUsers} /> Ethnicity/Race: {ethnicity}
    </ListGroup.Item>
    {/* <ListGroup.Item>
      <FontAwesomeIcon icon={faStethoscope} /> Diagnosis: {diagnosis}
    </ListGroup.Item> */}
    <ListGroup.Item>
      <FontAwesomeIcon icon={faTag} /> Cancer type: {cancerType}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faSignal} /> Cancer grade: {cancerGrade}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faTrafficLight} /> Cancer stage: {cancerStage}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faVial} /> Sample collection site:{" "}
      {sampleCollectionSite}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faVials} /> Other models from this patient:{" "}
      {derivedModels}
    </ListGroup.Item>
  </ListGroup>
);
