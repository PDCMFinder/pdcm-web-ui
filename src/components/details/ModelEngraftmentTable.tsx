import React, { FunctionComponent } from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";

export interface IModelEngraftmentTableProps {
  engraftments: Array<IEngraftment>;
}

export interface IEngraftment {
  hostStrain: string;
  hostStrainNomenclature: string;
  engraftmentSite: string;
  engraftmentType: string;
  engraftmentSampleType: string;
  engraftmentSampleState: string;
  passageNumber: string;
}

export const ModelEngraftmentTable: FunctionComponent<
  IModelEngraftmentTableProps
> = ({ engraftments }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>HOST STRAIN NAME</th>
          <th>SITE</th>
          <th>TYPE</th>
          <th>MATERIAL</th>
          <th>MATERIAL STATUS</th>
          <th>PASSAGE</th>
        </tr>
      </thead>
      <tbody>
        {engraftments.map((engraftment, index) => (
          <tr key={index}>
            <td>
              <OverlayTrigger
                key={`strain-tooltip-ov-${index}`}
                placement="right"
                overlay={
                  <Tooltip id={`strain-tooltip-${index}`}>
                    {engraftment.hostStrainNomenclature.toUpperCase()}
                  </Tooltip>
                }
              >
                <span
                  style={{
                    borderBottom: "1px dotted #000",
                  }}
                >
                  {engraftment.hostStrain.toUpperCase()}
                </span>
              </OverlayTrigger>
            </td>
            <td>{engraftment.engraftmentSite}</td>
            <td>{engraftment.engraftmentType}</td>
            <td>{engraftment.engraftmentSampleType}</td>
            <td>{engraftment.engraftmentSampleState}</td>
            <td>{engraftment.passageNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
