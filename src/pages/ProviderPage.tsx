import React, { FunctionComponent } from "react";
import { ProviderTemplate } from "../templates/ProviderTemplate";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Spinner } from "react-bootstrap";
import {
  parseArticleContent,
  parseArticleMetadata,
} from "../apis/StaticArticles.api";

export const ProviderPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Details";
  const { providerId } = useParams<{
    providerId: string;
  }>();
  const providersPath: any = require.context(
    "../../public/static/providers/",
    true,
    /\.md$/
  );
  const providerPath = providersPath(
    `./${providerId.toLowerCase()}.md`
  ).default;
  return providerPath !== undefined ? (
    <ProviderPageWrapper providerPath={providerPath} />
  ) : (
    <Spinner animation="border" />
  );
};

const ProviderPageWrapper: FunctionComponent<{ providerPath: string }> = ({
  providerPath,
}) => {
  const articleQuery = useQuery(providerPath, () =>
    fetch(providerPath).then((res) => res.text())
  );
  if (articleQuery.isLoading) {
    return <Spinner animation={"border"} />;
  } else {
    const content = parseArticleContent(articleQuery.data);
    const metadata = parseArticleMetadata(articleQuery.data);
    return (
      <ProviderTemplate
        providerDescription={content}
        providerName={metadata.name}
        providerId={metadata.abbreviation}
        providerLogo={metadata.logo}
        providerModelsBySystem={[]}
        providerModelsByDataAvailability={[]}
      />
    );
  }
};
