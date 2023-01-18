import { FunctionComponent } from "react";

import "./FloatingWidget.scss";

interface IFloatingWidgetProps {
  link: string;
  children: string;
}

const FloatingWidget: FunctionComponent<IFloatingWidgetProps> = (props) => {
  let link = props.link,
    externalLinkProps = null;

  if (link.includes("http")) {
    externalLinkProps = { target: "_blank", rel: "noopener noreferrer" };
  }

  return (
    <a
      href={link}
      {...externalLinkProps}
      className="rounded-2 position-fixed end-0 text-white FloatingWidget"
    >
      <button className="btn btn-warning">{props.children}</button>
    </a>
  );
};

export default FloatingWidget;
