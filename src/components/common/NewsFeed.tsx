import React from "react";
import { Badge, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { parseArticleMetadata } from "../../apis/StaticArticles.api";

export const NewsFeed: React.FC = () => {
  const newsArticles: any = require.context(
    "../../../public/static/content/",
    true,
    /\.md$/
  );
  return (
    <div>
      <h1 className="mb-4">News Feed</h1>
      {newsArticles.keys().map((k: string) => {
        return (
          <NewsFeedItem articlePath={newsArticles(k).default} fileName={k} />
        );
      })}
    </div>
  );
};

const NewsFeedItem: React.FC<{ articlePath: string; fileName: string }> = ({
  articlePath,
  fileName,
}) => {
  const articleQuery = useQuery(articlePath, () =>
    fetch(articlePath).then((res) => res.text())
  );
  if (articleQuery.isLoading) {
    return <Spinner animation={"border"} />;
  } else {
    const articleMetadata = parseArticleMetadata(articleQuery.data);
    return (
      <div>
        <h3 className="mb-0">
          {" "}
          <Link
            to={`/articles/${fileName.replace("./", "").replace(".md", "")}`}
          >
            {articleMetadata.title}
          </Link>
        </h3>
        <p className="text-muted my-0">{articleMetadata.date}</p>
        <hr className="text-info" style={{ borderColor: "currentcolor" }} />
      </div>
    );
  }
};
