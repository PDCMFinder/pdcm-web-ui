import { FunctionComponent } from "react";

export interface MetadataItemProps {
  value: string;
  label: string;
}

export const MetadataItem: FunctionComponent<MetadataItemProps> = ({
  value,
  label,
}) => {
  return (
    <>
      <dt style={{ fontWeight: "400" }} className="text-capitalize">
        {value || "N/A"}
      </dt>
      <dl className="text-muted fw-lighter">{label}</dl>
    </>
  );
};
