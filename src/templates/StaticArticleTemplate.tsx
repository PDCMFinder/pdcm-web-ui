import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { GeneralTemplate } from "./GeneralTemplate";
import gfm from "remark-gfm";
import { Badge, Container } from "react-bootstrap";

export interface StaticArticleTemplatePropsI {
  title: string;
  date: string;
  content: string;
}

export const StaticArticleTemplate: FunctionComponent<
  StaticArticleTemplatePropsI
> = ({ title, date, content }) => {
  return (
    <GeneralTemplate>
      <Container className="my-5">
        <h1>
          {title}{" "}
          <Badge pill variant="info">
            {date}
          </Badge>
        </h1>

        <hr className="text-info" style={{ borderColor: "currentcolor" }} />
        <ReactMarkdown remarkPlugins={[gfm]} className="pdcm-mark-down">
          {content}
        </ReactMarkdown>
      </Container>
    </GeneralTemplate>
  );
};
