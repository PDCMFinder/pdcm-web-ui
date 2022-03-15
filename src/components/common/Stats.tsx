import React, { FunctionComponent } from "react";

export interface IStatsProps {
  count: number;
  title: string;
  description?: string;
}

export const Stats: FunctionComponent<IStatsProps> = ({
  count,
  title,
  description,
}) => {
  return (
    <div
      className="text-center shadow-secondary py-3 px-5 d-flex flex-column justify-content-center"
      style={{
        lineHeight: "0.8",
        minWidth: "150px",
        width: "100%",
        maxWidth: "200px",
      }}
    >
      <p
        className="py-0 my-0 display-5 text-secondary-dark"
        style={{ fontWeight: "400" }}
      >
        {count}
      </p>
      <p className="py-0 mt-0 mb-1 text-secondary-dark">{title}</p>
      {description && <p>{description}</p>}
    </div>
  );
};
