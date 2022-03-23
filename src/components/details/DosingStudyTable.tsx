import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

export interface IDosingStudyTableProps {
  treatments: Array<Treatment>;
}

export interface Treatment {
  treatmentName: string;
  treatmentDose: string;
  treatmentResponse: string;
}

export const DosingStudyTable: FunctionComponent<IDosingStudyTableProps> = ({
  treatments,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>DRUG</th>
          <th>DOSE</th>
          <th>RESPONSE</th>
        </tr>
      </thead>
      <tbody>
        {treatments.map((treatment: Treatment) => (
          <tr>
            <td>{treatment.treatmentName}</td>
            <td>{treatment.treatmentDose}</td>
            <td>{treatment.treatmentResponse}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
