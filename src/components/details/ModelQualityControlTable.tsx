import { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

export interface IModelQualityControlTableProps {
  qualityChecks: Array<IQualityCheck>;
}

export interface IQualityCheck {
  description: string;
  passagesTested: string;
  validationTechnique: string;
  validationHostStrainNomenclature: string;
}

export const ModelQualityControlTable: FunctionComponent<IModelQualityControlTableProps> = ({
  qualityChecks,
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>TECHNIQUE</th>
          <th>DESCRIPTION</th>
          <th>PASSAGE</th>
        </tr>
      </thead>
      <tbody>
        {qualityChecks.map((qualityCheck, index) => (
          <tr key={index}>
            <td>{qualityCheck.validationTechnique}</td>
            <td>{qualityCheck.description}</td>
            <td>{qualityCheck.passagesTested}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
