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
  leftMargin?: number;
}> = ({ data, indexKey, leftMargin }) => (
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
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      // legend: "Model count",
      // legendPosition: "middle",
      // legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      // legend: "Mutated gene",
      // legendPosition: "middle",
      // legendOffset: -80,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    colorBy="id"
    labelTextColor={"#fff"}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);
