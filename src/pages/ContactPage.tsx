import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import { MarkdownPageTemplate } from "../components/common/MarkdownPageTemplate";

export const ContactPage: FunctionComponent = () => {
  return (
    // file name in /static/content,  without `.md` file extension
    <GeneralTemplate>
      <Container>
        <MarkdownPageTemplate fileName="pdcm-contact" />
      </Container>
    </GeneralTemplate>
  );
};
