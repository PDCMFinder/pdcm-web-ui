import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

export interface IMolecularDataTableProps {
  molecularCharacterizations: Array<any>;
}

export const MolecularDataTable: FunctionComponent<IMolecularDataTableProps> = ({
  molecularCharacterizations,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>SAMPLE ID</th>
          <th>SAMPLE TYPE</th>
          <th>ENGRAFTED TUMOR PASSAGE</th>
          <th>DATA TYPE</th>
          <th>DATA AVAILABLE</th>
          <th>PLATFORM USED</th>
          <th>RAW DATA</th>
        </tr>
      </thead>
      <tbody>
        <tr role="presentation">
          <td>TM01594F062P2</td>
          <td>Engrafted Tumor</td>
          <td>Passage 2</td>
          <td>Mutation</td>
          <td>VIEW DATA</td>
          <td>CTP</td>
          <td>Not Available</td>
        </tr>
        <tr role="presentation">
          <td>TM01594F062P2</td>
          <td>Engrafted Tumor</td>
          <td>Passage 2</td>
          <td>Expression</td>
          <td>VIEW DATA</td>
          <td>STRNA SEQ</td>
          <td>Not Available</td>
        </tr>
        <tr role="presentation">
          <td>TM01594F062P2</td>
          <td>Engrafted Tumor</td>
          <td>Passage 2</td>
          <td>Copy Number Alteration</td>
          <td>VIEW DATA</td>
          <td>SNPTN</td>
          <td>Not Available</td>
        </tr>
        <tr role="presentation">
          <td>TM01594F062P2</td>
          <td>Engrafted Tumor</td>
          <td>Passage 2</td>
          <td>Copy Number Alteration</td>
          <td>VIEW DATA</td>
          <td>SNP</td>
          <td>Not Available</td>
        </tr>
      </tbody>
    </Table>
  );
};
