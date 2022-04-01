import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";
import { Treatment } from "../../models/PDCModel.model";

export interface IPatientTreatmentTableProps {
  patientTreatments: Array<Treatment>;
}

export const PatientTreatmentTable: FunctionComponent<
  IPatientTreatmentTableProps
> = ({ patientTreatments }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>TREATMENT</th>
          <th>DOSE</th>
          <th>RESPONSE</th>
        </tr>
      </thead>
      <tbody>
        {patientTreatments.map((treatment: Treatment) => (
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
