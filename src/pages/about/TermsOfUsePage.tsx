import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../../templates/GeneralTemplate";
import { MarkdownPageTemplate } from "../../components/common/MarkdownPageTemplate";

export const TermsOfUsePage: FunctionComponent = () => {
  return (
    // file name in /static/content,  without `.md` file extension
    <GeneralTemplate>
      <Container>
        <MarkdownPageTemplate fileName="pdcm-terms-of-use" />
      </Container>
    </GeneralTemplate>
  );
};
