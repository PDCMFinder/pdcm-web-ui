import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface IMolecularDataTableProps {
  molecularCharacterizations: Array<IMolecularCharacterization>;
  dataRestrictions: Array<{ dataSource: string; molecularDataTable: string }>;
  onSelectMolecularCharacterization: (
    molecularCharacterization?: IMolecularCharacterization
  ) => void;
  contactLink?: string;
}

export interface IMolecularCharacterization {
  id: number;
  patientSampleId: string;
  patientModelId: string;
  xenograftSampleId: string;
  xenograftModelId: string;
  xenograftPassage: string;
  rawDataUrl: string;
  dataType: string;
  platformId: string;
  platformName: string;
  dataAvailability: boolean;
  dataSource: string;
}

export const MolecularDataTable: FunctionComponent<
  IMolecularDataTableProps
> = ({
  molecularCharacterizations,
  dataRestrictions,
  onSelectMolecularCharacterization,
  contactLink,
}) => {
  const typesMap: any = {
    expression_molecular_data: "expression",
    cna_molecular_data: "copy number alteration",
    mutation_measurement_data: "mutation",
    cytogenetics_molecular_data: "cytogenetics",
  };
  const restrictedTypes = dataRestrictions.map(
    (d) => typesMap[d.molecularDataTable]
  );
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
            return (
              <tr key={molecularCharacterization.id}>
                <td>{sampleId}</td>
                <td>{sampleType}</td>
                <td>{molecularCharacterization.xenograftPassage || "NA"}</td>
                <td>{molecularCharacterization.dataType}</td>
                <td>
                  {!restrictedTypes.includes(
                    molecularCharacterization.dataType
                  ) ? (
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
                  ) : (
                    <a href={contactLink || ""} target="_blank">
                      REQUEST DATA
                    </a>
                  )}
                </td>
                <td>{molecularCharacterization.platformName}</td>
                <td>
                  {molecularCharacterization.rawDataUrl ? (
                    <a
                      href={molecularCharacterization.rawDataUrl.split(",")[1]}
                      target="_blank"
                    >
                      {molecularCharacterization.rawDataUrl.split(",")[0]}
                    </a>
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
