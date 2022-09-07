import React, { FunctionComponent, useState, useRef } from "react";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";
import {
  getExpressionHeatmap,
  getModelMolecularDataColumns,
  getModelMolecularDataDetails,
  getMolecularDataDownload,
} from "../../apis/Details.api";
import { DataTable } from "./DataTable";
import { ExpressionHeatmap } from "./ExpressionHeatmap";
import { IMolecularCharacterization } from "./MolecularDataTable";

export interface IMolecularDataDetailTableProps {
  molecularCharacterization: IMolecularCharacterization;
}

export const MolecularDataDetailTable: FunctionComponent<
  IMolecularDataDetailTableProps
> = ({ molecularCharacterization }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const { data: columns, isLoading: isLoadingColumns } = useQuery(
    ["get-molecular-data-detail-cols", molecularCharacterization.id],
    () =>
      getModelMolecularDataColumns(
        molecularCharacterization.id,
        molecularCharacterization.dataType
      )
  );

  const { data, isLoading } = useQuery(
    [
      "get-molecular-data-detail",
      molecularCharacterization.id,
      molecularCharacterization.dataType,
      columns,
      filter,
      page,
      pageSize,
      sortColumn,
      sortDirection,
    ],
    () =>
      getModelMolecularDataDetails(
        molecularCharacterization.id,
        molecularCharacterization.dataType,
        columns,
        filter,
        page,
        pageSize,
        sortColumn,
        sortDirection
      )
  );

  const { data: expressionData, isLoading: isLoadingHeatmap } = useQuery(
    [
      "get-expression-data-heatmap",
      molecularCharacterization.id,
      molecularCharacterization.dataType,
    ],
    () =>
      getExpressionHeatmap(
        molecularCharacterization.id,
        molecularCharacterization.dataType
      )
  );

  const [total, molecularData] = data || [0, []];
  const [dataDownload, setDataDownload] = useState<any[]>([]);
  const csvLink = useRef(null);

  const getDataDownload = () => {
    getMolecularDataDownload(
      molecularCharacterization,
      molecularCharacterization.dataType
    )
      .then((data) => {
        setDataDownload(data);
        if (csvLink.current) {
          // @ts-ignore
          csvLink.current.link.click();
        }
      })
      .catch((error) => {});
  };

  let columnsToDisplay: any = [];
  if (columns) {
    switch (molecularCharacterization.dataType) {
      case "mutation":
        columnsToDisplay = [
          { key: "hgnc_symbol", name: "HGNC Symbol" },
          { key: "amino_acid_change", name: "Amino Acid Change" },
          { key: "consequence", name: "Consequence" },
          { key: "read_depth", name: "Read Depth" },
          { key: "allele_frequency", name: "Allele Frequency" },
          { key: "seq_start_position", name: "Seq. Start Position" },
          { key: "ref_allele", name: "Ref. Allele" },
          { key: "alt_allele", name: "Alt. Allele" },
        ].filter((column) => columns.includes(column.key));
        break;
      case "expression":
        columnsToDisplay = [
          { key: "hgnc_symbol", name: "HGNC Symbol" },
          { key: "rnaseq_coverage", name: "RNA Seq. Coverage" },
          { key: "rnaseq_fpkm", name: "RNA Seq. FPKM" },
          { key: "rnaseq_tpm", name: "RNA Seq. TPM" },
          { key: "rnaseq_count", name: "RNA Seq. Count" },
          { key: "affy_hgea_probe_id", name: "Affy HGEA Probe" },
          { key: "affy_hgea_expression_value", name: "Affy HGEA Exp. Value" },
          { key: "illumina_hgea_probe_id", name: "Illumina HGEA Probe" },
          {
            key: "illumina_hgea_expression_value",
            name: "Illumina HGEA Exp. Value",
          },
          { key: "z_score", name: "Z Score" },
        ].filter(
          (column) =>
            columns.includes(column.key) || column.key === "hgnc_symbol"
        );
        const sampleIds = [
          "CRC0018LMX0B02201TUMR01R01",
          "CRC0018LMX0B02204TUMR01R01",
        ];
        // return (
        //   <div style={{ height: "10000px" }}>
        //     <ExpressionHeatmap
        //       chromosome="1"
        //       sampleIds={sampleIds}
        //       expression={
        //         expressionData
        //           ?.sort((e1: any, e2: any) => {
        //             let exp1Value = 0;
        //             let exp2Value = 0;
        //             sampleIds.forEach((sampleId) => {
        //               exp1Value += Math.abs(e1[sampleId]) || 0;
        //               exp2Value += Math.abs(e2[sampleId]) || 0;
        //             });
        //             return exp2Value - exp1Value;
        //           })
        //           .slice(0, 1000) || []
        //       }
        //     />
        //   </div>
        // );
        break;
      case "copy number alteration":
        columnsToDisplay = [
          { key: "hgnc_symbol", name: "HGNC Symbol" },
          { key: "log10r_cna", name: "log10  CNA" },
          { key: "log2r_cna", name: "log2  CNA" },

          { key: "copy_number_status", name: "Copy Number Status" },
          { key: "gistic_value", name: "GISTIC Value" },
          { key: "picnic_value", name: "PICNIC Value" },
          { key: "amino_acid_change", name: "Amino Acid Change" },
          { key: "consequence", name: "Consequence" },
          { key: "read_depth", name: "Read Depth" },
          { key: "allele_frequency", name: "Allele Frequency" },
          { key: "seq_start_position", name: "Seq. Start Position" },
          { key: "ref_allele", name: "Ref. Allele" },
          { key: "alt_allele", name: "Alt. Allele" },
        ].filter((column) => columns.includes(column.key));
        break;
      case "cytogenetics":
        columnsToDisplay = [
          { key: "hgnc_symbol", name: "HGNC Symbol" },
          { key: "result", name: "Result" },
        ];
        break;
    }
  }
  return (
    <>
      <DataTable
        data={molecularData || []}
        columns={columnsToDisplay}
        page={page}
        filter={filter}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onPageChange={setPage}
        onFilterChange={(filter: string): void => {
          setFilter(filter);
        }}
        onSortChange={(sort: string, direction: string): void => {
          setSortSortColumn(sort);
          setSortDirection(direction);
        }}
        pageSize={pageSize}
        total={total}
        loadingResults={isLoading}
        onPageSizeChange={setPageSize}
        onDownload={getDataDownload}
      />
      <CSVLink
        data={dataDownload}
        filename={`PDCM_${molecularCharacterization.dataType}_${
          molecularCharacterization.patientSampleId ||
          molecularCharacterization.xenograftModelId
        }_${molecularCharacterization.platformName}.csv`}
        className="hidden"
        // @ts-ignore
        ref={csvLink}
        target="_blank"
      />
    </>
  );
};
