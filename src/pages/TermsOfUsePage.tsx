import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const TermsOfUsePage: FunctionComponent = () => {
  document.title = "PDCM Finder - Terms of Use";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1 className="mb-5">Terms of Use</h1>
        <p>
          PDX Finder is a joint effort by the EMBL-EBI and the Jackson
          Laboratory. Please, check their terms of use and legal notice in order
          to follow them in the usage of the PDX Finder website.
        </p>
        <p>
          <a href="https://www.ebi.ac.uk/about/terms-of-use">
            EMBL-EBI terms of use
          </a>
        </p>
        <p>
          <a href="https://www.jax.org/terms-of-use">
            The Jackson Laboratory terms of use
          </a>
        </p>
      </Container>
    </GeneralTemplate>
  );
};
