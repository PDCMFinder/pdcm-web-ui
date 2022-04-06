import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const ContactPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Contact us";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1>Contact</h1>
        <h4>PDCM Finder Feedback</h4>
        <p>
          PDCM Finder is continuously developed in response to community&rsquo;s
          needs. We need your feedback to improve and refine the PDCM Finder.
        </p>
        <p>
          Please email us&nbsp;to ask questions, report issues or request
          features:&nbsp;
          <a href="mailto:info@cancermodels.org?subject=PDCM%20Finder%20general%20inquiry">
            info@cancermodels.org&nbsp;
          </a>
        </p>
      </Container>
    </GeneralTemplate>
  );
};
