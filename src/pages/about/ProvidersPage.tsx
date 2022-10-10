import { FunctionComponent } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { parseArticleMetadata } from "../../apis/StaticArticles.api";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const ProvidersPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Data Providers";

  const providers: any = require.context(
    "../../../public/static/providers/",
    true,
    /\.md$/
  );

  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1>Our Data Providers</h1>
        <ul className="list-unstyled">
          {providers.keys().map((k: string) => {
            return (
              <Provider
                key={k}
                providerPath={providers(k).default}
                fileName={k}
              />
            );
          })}
        </ul>
      </Container>
    </GeneralTemplate>
  );
};

const Provider: FunctionComponent<{
  providerPath: string;
  fileName: string;
}> = ({ providerPath, fileName }) => {
  const providerQuery = useQuery(providerPath, () =>
    fetch(providerPath).then((res) => res.text())
  );
  if (providerQuery.isLoading) {
    return <Spinner animation={"border"} />;
  } else {
    const providerMetadata = parseArticleMetadata(providerQuery.data);
    return (
      <li className="mb-5">
        <Link
          to={`/about/provider/${fileName
            .replace("./", "")
            .replace(".md", "")}`}
          className="text-decoration-none d-inline"
        >
          <span className="h3 text-decoration-underline mb-0 d-inline">
            {providerMetadata.abbreviation}
          </span>
          <br />
          <span className="text-muted">{providerMetadata.name}</span>
        </Link>
      </li>
    );
  }
};
