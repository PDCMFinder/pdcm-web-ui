// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/treemap
import { ResponsiveTreeMap } from "@nivo/treemap";
import { FunctionComponent } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const ExploreTreeMap: FunctionComponent<{ data: any }> = ({ data }) => (
  <ResponsiveTreeMap
    data={data}
    identity="name"
    value="count"
    valueFormat=" >-.2s"
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    labelSkipSize={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
    parentLabelSize={16}
    parentLabelPadding={0}
    parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
  />
);
