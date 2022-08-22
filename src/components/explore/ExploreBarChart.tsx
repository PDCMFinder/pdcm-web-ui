// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import { FunctionComponent } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const ExploreBarChart: FunctionComponent<{
  data: any;
  indexKey: string;
  chartTitle: string;
  onBarClick: (category: string | number) => void;
  leftMargin?: number;
}> = ({ data, indexKey, chartTitle, onBarClick, leftMargin }) => (
  <ResponsiveBar
    data={data}
    keys={["count"]}
    indexBy={indexKey}
    margin={{
      top: 0,
      right: 10,
      bottom: 30,
      left: leftMargin ? leftMargin : 60,
    }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={["#0032a0"]}
    layout="horizontal"
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    colorBy="id"
    labelTextColor={"#fff"}
    role="application"
    ariaLabel={chartTitle}
    onClick={(datum) => {
      onBarClick(datum.data[indexKey]);
    }}
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);
