// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { FunctionComponent } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const ExplorePieChart: FunctionComponent<{ data: any }> = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, right: 80, bottom: 20, left: 60 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: "blues" }}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 5]] }}
    arcLinkLabelsStraightLength={5}
    arcLinkLabelsDiagonalLength={10}
    arcLinkLabelsSkipAngle={10}
  />
);
