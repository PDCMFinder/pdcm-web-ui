import React, { FunctionComponent } from "react";
import { Button, Table } from "react-bootstrap";

export interface IMolecularDataTableProps {
  molecularCharacterizations: Array<IMolecularCharacterization>;
  onSelectMolecularCharacterization: (
    molecularCharacterization?: IMolecularCharacterization
  ) => void;
}

export interface IMolecularCharacterization {
  id: number;
  patientSampleId: string;
  patientModelId: string;
  xenograftSampleId: string;
  xenograftModelId: string;
  xenograftPassage: string;
  patientRawDataUrl: string;
  xenograftRawDataUrl: string;
  dataType: string;
  platformId: string;
  platformName: string;
}

export const MolecularDataTable: FunctionComponent<IMolecularDataTableProps> = ({
  molecularCharacterizations,
  onSelectMolecularCharacterization,
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>SAMPLE ID</th>
          <th>SAMPLE TYPE</th>
          <th>ENGRAFTED TUMOUR PASSAGE</th>
          <th>DATA TYPE</th>
          <th>DATA AVAILABLE</th>
          <th>PLATFORM USED</th>
          <th>RAW DATA</th>
        </tr>
      </thead>
      <tbody>
        {molecularCharacterizations &&
          molecularCharacterizations.map((molecularCharacterization) => {
            const sampleId =
              molecularCharacterization.xenograftSampleId ||
              molecularCharacterization.patientSampleId;
            const sampleType = molecularCharacterization.xenograftSampleId
              ? "Engrafted Tumour"
              : "Patient Tumour";
            const rawDataUrl =
              molecularCharacterization.xenograftRawDataUrl ||
              molecularCharacterization.patientRawDataUrl;
            return (
              <tr key={molecularCharacterization.id}>
                <td>{sampleId}</td>
                <td>{sampleType}</td>
                <td>{molecularCharacterization.xenograftPassage || "NA"}</td>
                <td>{molecularCharacterization.dataType}</td>
                <td>
                  <Button
                    onClick={() =>
                      onSelectMolecularCharacterization(
                        molecularCharacterization
                      )
                    }
                    variant="link"
                  >
                    VIEW DATA
                  </Button>
                </td>
                <td>{molecularCharacterization.platformName}</td>
                <td>
                  {rawDataUrl ? (
                    <a href={rawDataUrl}>{rawDataUrl.split("/").pop()}</a>
                  ) : (
                    "Not available"
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
