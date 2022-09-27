import { FunctionComponent } from "react";
import "./SubmitPage.scss";
import { MarkdownPageTemplate } from "../components/common/MarkdownPageTemplate";

export const SubmitPage: FunctionComponent = () => {
  return (
    // file name in /static/content,  without `.md` file extension
    <MarkdownPageTemplate
      fileName="pdcm-submit-models"
      containerClassName="submitModels__page"
    />
  );
};
