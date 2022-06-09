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
import { SearchResultCard } from "./SearchResultCard";

export interface IResultsTableProps {
  results?: Array<SearchResult>;
  displayColumns?: Array<ResultCol>;
  loading?: boolean;
}

export const ResultsTable: FunctionComponent<IResultsTableProps> = ({
  results = [],
  displayColumns = [],
  loading = false,
}) => {
  return (
    <>
      {results.length === 0 && !loading ? (
        <div>
          <Alert variant="warning" className="mt-0 text-center">
            Your query/filter did not return any results!
          </Alert>
        </div>
      ) : null}
      {results.length === 0 && loading ? (
        <div>
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
        </div>
      ) : null}
      {results.map((result) => (
        <div key={`${result.pdcmId}-${result.datasource}`} className="my-3">
          <SearchResultCard {...result} />
        </div>
      ))}
    </>
  );
};
