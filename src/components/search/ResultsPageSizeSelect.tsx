import React from "react";
import { Form } from "react-bootstrap";

interface ResultsPageSizeSelectProps {
  pageSize: number;
  onChange: (pageSize: number) => void;
}

export const ResultsPageSizeSelect: React.FC<ResultsPageSizeSelectProps> = ({
  pageSize,
  onChange,
}) => {
  return (
    <div>
      <Form.Select
        aria-label="Select page size"
        value={pageSize}
        onChange={(e) => onChange(+e.target.value)}
      >
        <option>10</option>
        <option>50</option>
        <option>100</option>
        <option>200</option>
      </Form.Select>
    </div>
  );
};
