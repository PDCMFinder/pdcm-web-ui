import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { Container, Spinner } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  parseArticleContent as parsePageContent,
  parseArticleMetadata as parsePageMetadata,
} from "../../apis/StaticArticles.api";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const MarkdownPageTemplate: FunctionComponent<{
  fileName: string;
  containerClassName?: string;
}> = ({ fileName, containerClassName }) => {
  const pagesPath: any = require.context(
    "../../../public/static/content",
    true,
    /\.md$/
  );

  const pagePath = pagesPath(`./${fileName}.md`).default;

  return pagePath !== undefined ? (
    <MarkdownPageTemplateWrapper
      pagePath={pagePath}
      containerClassName={containerClassName ? containerClassName : undefined}
    />
  ) : (
    <Spinner animation="border" />
  );
};

const MarkdownPageTemplateWrapper: FunctionComponent<{
  pagePath: string;
  containerClassName?: string;
}> = ({ pagePath, containerClassName }) => {
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
      <GeneralTemplate>
        <Container className={containerClassName}>
          <ReactMarkdown remarkPlugins={[gfm]} className="pdcm-mark-down">
            {content}
          </ReactMarkdown>
        </Container>
      </GeneralTemplate>
    );
  }
};
