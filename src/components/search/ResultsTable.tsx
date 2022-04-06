import {
  faDna,
  faMicroscope,
  faPills,
  faPrescription,
  faTh,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import {
  Table,
  OverlayTrigger,
  Tooltip,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchResult, ResultCol } from "../../models/Search.model";

export interface IResultsTableProps {
  results?: Array<SearchResult>;
  displayColumns?: Array<ResultCol>;
  loading?: boolean;
}

const dataTypes = [
  {
    key: "copy number alteration",
    name: "Copy Number Alteration",
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

export const ResultsTable: FunctionComponent<IResultsTableProps> = ({
  results = [],
  displayColumns = [],
  loading = false,
}) => {
  return (
    <Table responsive className="border">
      <thead>
        <tr className="text-uppercase">
          {displayColumns.map((column) => (
            <th key={column.key}>{column.displayName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.length === 0 && !loading ? (
          <tr>
            <td colSpan={displayColumns.length}>
              <Alert variant="warning" className="mt-0 text-center">
                Your query/filter did not return any results!
              </Alert>
            </td>
          </tr>
        ) : null}
        {results.length === 0 && loading ? (
          <tr>
            <td colSpan={displayColumns.length}>
              <Alert variant="info" className="mt-0 text-center">
                Loading search results...{" "}
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Alert>
            </td>
          </tr>
        ) : null}
        {results.map((result) => (
          <tr key={result.pdcmId}>
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
                  <OverlayTrigger
                    key={dataType.name}
                    overlay={tooltipComponent}
                  >
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
