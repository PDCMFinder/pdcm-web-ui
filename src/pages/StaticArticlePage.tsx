import React, { FunctionComponent } from "react";
import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  parseArticleContent,
  parseArticleMetadata,
} from "../apis/StaticArticles.api";
import { StaticArticleTemplate } from "../templates/StaticArticleTemplate";

export const StaticArticlePage: FunctionComponent = () => {
  document.title = "PDCM Finder - News";
  const { fileName } = useParams<{ fileName: string }>();

  const newsArticles: any = require.context(
    "../../public/static/content/",
    true,
    /\.md$/
  );
  const articlePath = newsArticles(`./${fileName}.md`).default;
  console.log(`./${fileName}.md`);

  return fileName !== undefined ? (
    <StaticArticlePageWrapper articlePath={articlePath} />
  ) : (
    <Spinner animation="border" />
  );
};

const StaticArticlePageWrapper: FunctionComponent<{ articlePath: string }> = ({
  articlePath,
}) => {
  const articleQuery = useQuery(articlePath, () =>
    fetch(articlePath).then((res) => res.text())
  );
  if (articleQuery.isLoading) {
    return <Spinner animation={"border"} />;
  } else {
    const content = parseArticleContent(articleQuery.data);
    const metadata = parseArticleMetadata(articleQuery.data);
    return (
      <StaticArticleTemplate
        content={content}
        title={metadata.title}
        date={metadata.date}
      />
    );
  }
};
