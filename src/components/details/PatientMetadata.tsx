import {
  faSignal,
  faTag,
  faTrafficLight,
  faUsers,
  faVenusMars,
  faVial,
  faVials,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { ListGroup } from "react-bootstrap";

export interface IPatientMetadataProps {
  patientSex: string;
  derivedModels: Array<string>;
  patientAge: number;
  patientEthnicity: string;
  tumourType: string;
  cancerGrade: string;
  cancerGradingSystem: string;
  cancerStage: string;
  cancerStagingSystem: string;
  collectionSite: string;
}

export const PatientMetadata: FunctionComponent<IPatientMetadataProps> = ({
  patientSex,
  patientAge,
  derivedModels,
  patientEthnicity,
  tumourType,
  cancerGrade,
  cancerGradingSystem,
  cancerStage,
  cancerStagingSystem,
  collectionSite,
}) => (
  <ListGroup variant="flush" style={{ fontSize: "large" }}>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faVenusMars} /> Sex: {patientSex}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faUsers} /> Ethnicity/Race: {patientEthnicity}
    </ListGroup.Item>
    {/* <ListGroup.Item>
      <FontAwesomeIcon icon={faStethoscope} /> Diagnosis: {diagnosis}
    </ListGroup.Item> */}
    <ListGroup.Item>
      <FontAwesomeIcon icon={faTag} /> Cancer type: {tumourType}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faSignal} /> Cancer grade: {cancerGrade}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faTrafficLight} /> Cancer stage: {cancerStage}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faVial} /> Sample collection site: {collectionSite}
    </ListGroup.Item>
    {derivedModels.length > 0 && (
      <ListGroup.Item>
        <FontAwesomeIcon icon={faVials} /> Other models from this patient:{" "}
        {derivedModels}
      </ListGroup.Item>
    )}
  </ListGroup>
);
