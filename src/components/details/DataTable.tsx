import {
  faArrowDown,
  faArrowUp,
  faFileDownload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, FormControl, InputGroup, Table } from "react-bootstrap";
import { ResultsPageSizeSelect } from "../search/ResultsPageSizeSelect";
import { ResultsPagination } from "../search/ResultsPagination";
import { CSVLink } from "react-csv";
import { useRef } from "@storybook/addons";
import { getMolecularDataDownload } from "../../apis/Details.api";

export interface IDataTableProps {
  columns: { key: string; name: string }[];
  data: any[];
  page: number;
  pageSize: number;
  total: number;
  filter: string;
  sortColumn: string;
  sortDirection: string;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onFilterChange: (filter: string) => void;
  onSortChange: (sortColumn: string, sortDirection: string) => void;
  onDownload: () => void;
}

export const DataTable: React.FC<IDataTableProps> = ({
  columns,
  data,
  page,
  total,
  pageSize,
  filter,
  sortColumn,
  sortDirection,
  onPageChange,
  onPageSizeChange,
  onFilterChange,
  onSortChange,
  onDownload,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-inline-flex" style={{ alignItems: "baseline" }}>
          <span className="mr-2">Rows per page:</span>
          <ResultsPageSizeSelect
            pageSize={pageSize}
            onChange={onPageSizeChange}
          />
        </div>
        <InputGroup style={{ width: "50%", maxWidth: "500px" }}>
          <InputGroup.Prepend>
            <Button variant="outline-primary mr-2" onClick={onDownload}>
              Download molecular data <FontAwesomeIcon icon={faFileDownload} />
            </Button>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Filter"
            aria-label="Filter table"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text className="text-center bg-primary text-white">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <Table responsive bordered>
        <thead>
          <tr>
            {columns.map(({ key, name }) => (
              <th key={key}>
                <Button
                  variant="link"
                  aria-label={`Sort by column ${name}`}
                  onClick={() =>
                    onSortChange(
                      key,
                      getSortDirection(key, sortColumn, sortDirection)
                    )
                  }
                >
                  {name}{" "}
                  {sortColumn === key && (
                    <FontAwesomeIcon
                      icon={sortDirection === "asc" ? faArrowUp : faArrowDown}
                    />
                  )}
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {Object.keys(row)
                .filter((k) => columns.map((i) => i.key).includes(k))
                .map((key, index) => (
                  <td key={index}>{row[key]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-start">
        <ResultsPagination
          activePage={page}
          onPageChange={onPageChange}
          totalPages={Math.floor(total / pageSize) + 1}
        />
      </div>
    </>
  );
};

function getSortDirection(
  newColumn: string,
  sortColumn: string,
  sortDirection: string = "asc"
) {
  if (newColumn === sortColumn && sortDirection === "asc") {
    return "desc";
  } else {
    return "asc";
  }
}
