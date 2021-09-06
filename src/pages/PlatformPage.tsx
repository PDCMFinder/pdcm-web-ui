import React, { FunctionComponent } from "react";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export const PlatformPage: FunctionComponent<{ mdContent: string }> = ({
  mdContent,
}) => {
  return (
    <GeneralTemplate>
      <h1>Platform page</h1>
      <ReactMarkdown remarkPlugins={[gfm]} className="pdcm-mark-down">
        {mdContent}
      </ReactMarkdown>
    </GeneralTemplate>
  );
};
