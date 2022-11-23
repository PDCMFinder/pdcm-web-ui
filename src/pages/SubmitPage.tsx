import { FunctionComponent } from "react";
import "./SubmitPage.scss";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import { MarkdownPageTemplate } from "../components/common/MarkdownPageTemplate";

export const SubmitPage: FunctionComponent = () => {
  return (
    // file name in /static/content,  without `.md` file extension
    <GeneralTemplate>
      <Container className="submitModels__page">
        <MarkdownPageTemplate fileName="pdcm-submit-models" />
      </Container>
    </GeneralTemplate>
  );
};
