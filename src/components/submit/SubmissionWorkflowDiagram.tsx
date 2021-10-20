import React, { FunctionComponent } from "react";
import ReactFlow, {
  ArrowHeadType,
  Position,
  isNode,
} from "react-flow-renderer";
import dagre from "dagre";
import "./SubmissionWorkflowDiagram.scss";

const nodeWidth = 172;
const nodeHeight = 50;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const userStepStyle = {
  background: "#02b2d5",
  color: "#fff",
  border: "1px solid #000",
  fontSize: "16px",
};

const pdcmStepStyle = {
  background: "#0032a0",
  color: "#fff",
  border: "1px solid #000",
  fontSize: "16px",
};

const edgeStyle = {
  stroke: "#6c757d",
  strokeWidth: 2,
};

const elements = [
  {
    id: "fill",
    data: { label: "Fill in the templates" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: userStepStyle,
  },
  {
    id: "send",
    data: { label: "Send the templates" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: userStepStyle,
  },
  {
    id: "load",
    data: { label: "Data load" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: pdcmStepStyle,
  },
  {
    id: "validate",
    data: { label: "Metadata validation" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: pdcmStepStyle,
  },
  {
    id: "feedback",
    data: { label: "Apply feedback" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: userStepStyle,
  },
  {
    id: "release",
    data: { label: "Release" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: pdcmStepStyle,
  },
  {
    id: "fill-send",
    source: "fill",
    target: "send",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
    style: edgeStyle,
  },
  {
    id: "send-load",
    source: "send",
    target: "load",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
    style: edgeStyle,
  },
  {
    id: "send-validate",
    source: "send",
    target: "validate",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
    style: edgeStyle,
  },
  {
    id: "load-feedback",
    source: "load",
    target: "feedback",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
    style: edgeStyle,
  },
  {
    id: "validate-feedback",
    source: "validate",
    target: "feedback",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
    style: edgeStyle,
  },
  {
    id: "feedback-release",
    source: "feedback",
    target: "release",
    arrowHeadType: ArrowHeadType.ArrowClosed,
    type: "smoothstep",
    style: edgeStyle,
  },
];

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

export const SubmissionWorkflowDiagram: FunctionComponent = () => {
  return (
    <div style={{ height: 200 }}>
      <ReactFlow
        elements={layoutedElements}
        paneMoveable={false}
        zoomOnScroll={false}
        nodesDraggable={false}
        elementsSelectable={false}
        nodesConnectable={false}
      />
    </div>
  );
};
