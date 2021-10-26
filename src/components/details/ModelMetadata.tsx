import {
  faAt,
  faDiagnoses,
  faMapMarkerAlt,
  faStethoscope,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { ListGroup } from "react-bootstrap";

export interface IModelMetadataProps {
  modelId: string;
  histology: string;
  providerId: string;
  providerName: string;
  cancerSystem: string;
  modelType: string;
}

export const ModelMetadata: FunctionComponent<IModelMetadataProps> = ({
  modelId,
  histology,
  providerName,
  cancerSystem,
  modelType,
}) => (
  <ListGroup variant="flush" style={{ fontSize: "large" }}>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faAt} /> Name: {modelId}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faMapMarkerAlt} /> Provider: {providerName}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faStethoscope} /> Diagnosis: {histology}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faDiagnoses} /> Cancer system: {cancerSystem}
    </ListGroup.Item>
    <ListGroup.Item>
      <FontAwesomeIcon icon={faTag} /> Model type: {modelType}
    </ListGroup.Item>
  </ListGroup>
);
