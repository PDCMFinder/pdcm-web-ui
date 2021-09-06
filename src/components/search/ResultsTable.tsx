import {
  faDna,
  faMicroscope,
  faPills,
  faPrescription,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Table, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { SearchResult, ResultCol } from "../../models/SearchResult.model";

export interface IResultsTableProps {
  results?: Array<SearchResult>;
  displayColumns?: Array<ResultCol>;
  loading?: boolean;
}

const dataTypes = [
  {
    name: "Copy Number Alteration",
    icon: faWaveSquare,
  },
  {
    name: "Expression",
    icon: faMicroscope,
  },
  {
    name: "Gene Mutation",
    icon: faDna,
  },
  {
    name: "Dosing Studies",
    icon: faPills,
  },
  {
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
        {results.length === 0 ? (
          <tr>
            <td colSpan={displayColumns.length}>
              <Alert variant="warning" className="mt-0 text-center">
                Your query/filter did not return any results!
              </Alert>
            </td>
          </tr>
        ) : null}
        {results.map((result) => (
          <tr key={result.pdcmId}>
            <td>
              <a href="/">{result.sourceId}</a>
              <br />
              <span className="text-muted font-weight-lighter">
                {result.datasource}
              </span>
            </td>
            <td>{result.histology}</td>
            <td>{result.primary}</td>
            <td>{result.collection}</td>
            <td>{result.type}</td>
            <td>
              {dataTypes.map((dataType) => (
                <OverlayTrigger
                  key={dataType.name}
                  overlay={
                    <Tooltip id={`tooltip-${dataType.name}`}>
                      <strong className="text-capitalize">
                        {dataType.name}
                      </strong>{" "}
                      data{" "}
                      {result.dataAvailable.includes(dataType.name)
                        ? "available"
                        : "not available"}
                      .
                    </Tooltip>
                  }
                >
                  <FontAwesomeIcon
                    icon={dataType.icon}
                    style={{ fontSize: "xx-large" }}
                    className={
                      "mr-3 " +
                      (result.dataAvailable.includes(dataType.name)
                        ? "text-primary"
                        : "text-muted")
                    }
                  />
                </OverlayTrigger>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
