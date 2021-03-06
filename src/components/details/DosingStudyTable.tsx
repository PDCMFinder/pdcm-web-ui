import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";
import { Treatment } from "../../models/PDCModel.model";

export interface IDosingStudyTableProps {
  dosingStudies: Array<Treatment>;
}

export const DosingStudyTable: FunctionComponent<IDosingStudyTableProps> = ({
  dosingStudies,
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
        {dosingStudies.map((treatment: Treatment) => (
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
