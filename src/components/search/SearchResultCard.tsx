import {
  faWaveSquare,
  faTh,
  faMicroscope,
  faDna,
  faPills,
  faPrescription,
  faBullseye,
  faEyeDropper,
  faVenusMars,
  faUser,
  faVial,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchResult } from "../../models/Search.model";

const dataTypes = [
  {
    key: "copy number alteration",
    name: "CNA",
    icon: faWaveSquare,
  },
  {
    key: "expression",
    name: "Expression",
    icon: faTh,
  },
  {
    key: "cytogenetics",
    name: "Cytogenetics",
    icon: faMicroscope,
  },
  {
    key: "mutation",
    name: "Gene Mutation",
    icon: faDna,
  },
  {
    key: "dosing studies",
    name: "Dosing Studies",
    icon: faPills,
  },
  {
    key: "patient treatment",
    name: "Patient Treatment",
    icon: faPrescription,
  },
];

const modelInfoCategories = [
  {
    key: "primarySite",
    name: "Primary site",
    icon: faBullseye,
  },
  {
    key: "patientSex",
    name: "Patient sex",
    icon: faVenusMars,
  },
  {
    key: "collectionSite",
    name: "Collection site",
    icon: faVial,
  },
  {
    key: "patientAge",
    name: "Patient age",
    icon: faUser,
  },
];

export const SearchResultCard: React.FC<SearchResult> = ({
  pdcmId,
  sourceId,
  histology,
  modelType,
  tumourType,
  dataAvailable,
  primarySite,
  collectionSite,
  patientSex,
  patientAge,
}) => {
  const modelInfo: any = {
    patientSex,
    patientAge,
    primarySite,
    collectionSite,
  };
  return (
    <Card>
      <Card.Body className="m-2">
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Link to={`/data/${sourceId}/${pdcmId}`}>
              <h4 className="fw-light">
                {sourceId} / {pdcmId}
              </h4>
            </Link>
            <div className="fw-light" style={{ fontSize: "larger" }}>
              {histology}
            </div>
            <div style={{ textTransform: "capitalize" }}>{modelType} model</div>
            <div style={{ textTransform: "capitalize" }}>
              {tumourType} tumour
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div style={{ height: "2rem" }}></div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gridColumnGap: "0.0rem",
                gridRowGap: "0px",
              }}
            >
              {modelInfoCategories.map((category) => {
                return (
                  <div className="d-inline-flex align-items-center justify-content-start">
                    <FontAwesomeIcon icon={category.icon} className="h5" />
                    <div className="my-2 mx-2" style={{ lineHeight: "1.2rem" }}>
                      <div className="text-capitalize">
                        {modelInfo[category.key] || "Not Specified"}
                      </div>
                      <div className="small text-muted">{category.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={4}>
            <div className="text-center">Data available</div>
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gridColumnGap: "1.5rem",
                  gridRowGap: "0px",
                }}
              >
                {dataTypes.map((dt) => {
                  return (
                    <div
                      key={dt.key}
                      className="d-inline-flex justify-content-start align-items-center"
                    >
                      <FontAwesomeIcon
                        icon={dt.icon}
                        className={`text-${
                          dataAvailable?.includes(dt.key)
                            ? "secondary"
                            : "muted"
                        } h5`}
                      />
                      <span
                        className={`text-${
                          dataAvailable?.includes(dt.key)
                            ? "secondary"
                            : "muted"
                        } fw-light px-2 small`}
                      >
                        {dt.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

/* 

        <div key={result.pdcmId}>
          <td>
            <Link to={`/data/${result.sourceId}/${result.pdcmId}`}>
              {result.pdcmId}
            </Link>
            <br />
            <span className="text-muted font-weight-lighter">
              <Link to={`/about/provider/${result.sourceId}`}>
                {result.sourceId}
              </Link>
            </span>
          </td>
          <td style={{ wordWrap: "break-word", maxWidth: "150px" }}>
            {result.histology}
          </td>
          <td>{result.primary}</td>
          <td>{result.collection}</td>
          <td>{result.type}</td>
          <td>
            {dataTypes.map((dataType) => {
              const tooltipComponent = (props: any) => (
                <Tooltip id={`tooltip-${dataType.name}`} {...props}>
                  <strong className="text-capitalize">{dataType.name}</strong>{" "}
                  data{" "}
                  {result.dataAvailable?.includes(dataType.key)
                    ? "available"
                    : "not available"}
                  .
                </Tooltip>
              );
              return (
                <OverlayTrigger key={dataType.name} overlay={tooltipComponent}>
                  <div style={{ margin: "2px", display: "inline-block" }}>
                    <FontAwesomeIcon
                      icon={dataType.icon}
                      style={{ fontSize: "xx-large" }}
                      className={
                        "mr-3 " +
                        (result.dataAvailable?.includes(dataType.key)
                          ? "text-primary"
                          : "text-muted")
                      }
                    />
                  </div>
                </OverlayTrigger>
              );
            })}
          </td>
        </div>
*/
