import { FunctionComponent } from "react";
import { MarkdownPageTemplate } from "../../components/common/MarkdownPageTemplate";

export const PrivacyPolicyPage: FunctionComponent = () => {
  return (
    // file name in /static/content,  without `.md` file extension
    <MarkdownPageTemplate fileName="pdcm-privacy-policy" />
  );
};
