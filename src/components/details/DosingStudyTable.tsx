import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

export interface IDosingStudyTableProps {
  treatments: Array<{ drug: string; dose: string; response: string }>;
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
        <tr>
          <td>Dextrose Monohydrate</td>
          <td>5.0ml/kg</td>
          <td>Progressive Disease</td>
        </tr>
        <tr>
          <td>Temozolomide</td>
          <td>50.0mg/kg</td>
          <td>Stable Disease</td>
        </tr>
        <tr>
          <td>Bevacizumab</td>
          <td>5.0mg/kg</td>
          <td>Stable Disease</td>
        </tr>
        <tr>
          <td>Valproic Acid</td>
          <td>400.0mg/kg</td>
          <td>Progressive Disease</td>
        </tr>
        <tr>
          <td>Sirolimus</td>
          <td>5.0mg/kg</td>
          <td>Progressive Disease</td>
        </tr>
        <tr>
          <td>Bevacizumab And Sirolimus</td>
          <td>5.0mg/kg / 5.0mg/kg</td>
          <td>Partial Response</td>
        </tr>
      </tbody>
    </Table>
  );
};
