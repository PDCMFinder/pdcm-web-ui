// @ts-nocheck
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

export interface IExpressionHeatmapProps {
  chromosome: string;
  expression: Array<any>;
  sampleIds: Array<string>;
}

export interface IExpressionDatum {
  hgncSymbol: string;
  [string]: number;
  chromosome: string;
  location: number;
}

export const ExpressionHeatmap: FunctionComponent<IExpressionHeatmapProps> = ({
  chromosome,
  expression,
  sampleIds,
}) => {
  return (
    <ResponsiveHeatMapCanvas
      data={expression}
      indexBy="hgncSymbol"
      keys={sampleIds}
      margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
      pixelRatio={1}
      minValue="auto"
      maxValue="auto"
      forceSquare={false}
      sizeVariation={0}
      padding={0}
      colors="RdBu"
      axisTop={{
        orient: "top",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
      }}
      axisRight={{
        orient: "right",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `Chromosome ${chromosome}`,
        legendPosition: "middle",
        legendOffset: 80,
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 36,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `Chromosome ${chromosome}`,
        legendPosition: "middle",
        legendOffset: -80,
      }}
      enableGridX={false}
      enableGridY={true}
      cellShape="rect"
      cellOpacity={1}
      cellBorderWidth={0}
      cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
      enableLabels={false}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
      animate={true}
      motionStiffness={120}
      motionDamping={9}
      isInteractive={true}
      hoverTarget="rowColumn"
      cellHoverOpacity={1}
      cellHoverOthersOpacity={0.5}
    />
  );
};
