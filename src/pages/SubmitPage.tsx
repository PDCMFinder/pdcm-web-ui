import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import ReactFlow, {
  ArrowHeadType,
  Position,
  isNode,
} from "react-flow-renderer";
import dagre from "dagre";

const elements = [
  {
    id: "fill",
    data: { label: "Fill in the templates" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
    },
  },
  {
    id: "send",
    data: { label: "Send the templates" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "load",
    data: { label: "Data load" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "validate",
    data: { label: "Metadata validation" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "feedback",
    data: { label: "Feedback" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "release",
    data: { label: "Release" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "fill-send",
    source: "fill",
    target: "send",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
  },
  {
    id: "send-load",
    source: "send",
    target: "load",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
  },
  {
    id: "send-validate",
    source: "send",
    target: "validate",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
  },
  {
    id: "load-feedback",
    source: "load",
    target: "feedback",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
  },
  {
    id: "validate-feedback",
    source: "validate",
    target: "feedback",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
  },
  {
    id: "feedback-release",
    source: "feedback",
    target: "release",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
  },
  //   {
  //     id: "feedback-fill",
  //     source: "feedback",
  //     target: "fill",
  //     arrowHeadType: ArrowHeadType.ArrowClosed,
  //     type: "smoothstep",
  //   },
];

const nodeWidth = 172;
const nodeHeight = 50;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (elements: Array<any>, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el: any) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const layoutedElements = getLayoutedElements(elements);

export const SubmitPage: FunctionComponent = ({}) => {
  document.title = "PDCM Finder - Submit your data";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1>Submit</h1>
        <h4>
          Submit your PDX data to the PDX Finder to increase their visibility
        </h4>
        <p>
          To start the process please contact PDX Finder team:&nbsp;
          <a href="mailto:submissions@pdxfinder.org?subject=PDX%20producer:%20Data%20Submission%20request">
            submissions&nbsp;
          </a>
        </p>
        <div style={{ height: 600 }}>
          <ReactFlow elements={layoutedElements} paneMoveable={false} />
        </div>
      </Container>
    </GeneralTemplate>
  );
};
