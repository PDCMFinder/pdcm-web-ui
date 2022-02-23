// @ts-nocheck
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/circle-packing
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { FunctionComponent, useState } from "react";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const ExploreCirclePacking: FunctionComponent<{ data: any }> = ({
  data,
}) => {
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  return (
    <ResponsiveCirclePacking
      data={data}
      // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      value="count"
      colors={["#263953", "#517FB0", "#6097D1", "#FF8042"]}
      childColor={{ from: "color", modifiers: [["brighter", 0.4]] }}
      padding={6}
      enableLabels={true}
      labelsFilter={function (e) {
        return (
          1 === e.node.depth ||
          (zoomedId !== null && zoomedId !== "PDCM Models")
        );
      }}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      zoomedId={zoomedId}
      theme={{
        labels: {
          text: {
            fontSize: "16px",
            fontWeight: "bold",
            letterSpacing: "1px",
          },
        },
      }}
      labelsSkipRadius={10}
      labelTextColor={{ from: "color", modifiers: [["brighter", 100]] }}
      motionConfig="slow"
      onClick={(node) => {
        setZoomedId(zoomedId === node.id ? null : node.id);
      }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
    />
  );
};
