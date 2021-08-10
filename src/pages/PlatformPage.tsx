import React, { FunctionComponent } from "react";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import ReactMarkdown from "react-markdown";

export const PlatformPage: FunctionComponent<{ mdContent: string }> = ({
  mdContent,
}) => {
  return (
    <GeneralTemplate>
      <h1>Platform page</h1>
      <ReactMarkdown>{mdContent}</ReactMarkdown>
    </GeneralTemplate>
  );
};
