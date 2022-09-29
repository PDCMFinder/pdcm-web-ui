import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  parseArticleContent as parsePageContent,
  parseArticleMetadata as parsePageMetadata,
} from "../../apis/StaticArticles.api";

export const MarkdownPageTemplate: FunctionComponent<{
  fileName: string;
}> = ({ fileName }) => {
  const pagesPath: any = require.context(
    "../../../public/static/content",
    true,
    /\.md$/
  );

  const pagePath = pagesPath(`./${fileName}.md`).default;

  return pagePath !== undefined ? (
    <MarkdownPageTemplateWrapper pagePath={pagePath} />
  ) : (
    <Spinner animation="border" />
  );
};

const MarkdownPageTemplateWrapper: FunctionComponent<{
  pagePath: string;
}> = ({ pagePath }) => {
  const pageQuery = useQuery(pagePath, () =>
    fetch(pagePath).then((res) => res.text())
  );
  if (pageQuery.isLoading) {
    return <Spinner animation={"border"} />;
  } else {
    const content = parsePageContent(pageQuery.data);
    const metadata = parsePageMetadata(pageQuery.data);
    document.title = metadata.title;

    return (
      <ReactMarkdown remarkPlugins={[gfm]} className="pdcm-mark-down">
        {content}
      </ReactMarkdown>
    );
  }
};
