import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const AboutPage: FunctionComponent = () => {
  document.title = "PDCM Finder - About";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1 className="mb-5">About</h1>
        <p>
          Patient-derived cancer models (PDCMs) are a powerful oncology research
          platform for studying tumour biology, mechanisms of drug response and
          resistance and for testing personalised medicine. Distributed nature
          of repositories for PDCMs (xenografts, organoids and cell lines) and
          the use of different metadata standards for describing model's
          characteristics make it difficult for researchers to identify suitable
          PDCM models relevant to specific cancer research questions. PDCM
          Finder aims to solve this problem by providing harmonized and
          integrated model attributes to support consistent searching across the
          originating resources.
        </p>
        <p>
          PDCM Finder (www.cancermodels.org) builds on the success of the PDX
          Finder resource (
          <a href="https://www.pdxfinder.org" target="_blank" rel="noreferrer">
            www.pdxfinder.org
          </a>
          ,{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/30535239/"
            target="_blank"
            rel="noreferrer"
          >
            PMID:30535239
          </a>
          ). Critical PDCM attributes, such as diagnosis, drug names and genes,
          are harmonized and integrated into a cohesive ontological model based
          on the PDX Minimal information standard (
          <a
            href="https://www.pdxfinder.org/pdx-standard/"
            target="_blank"
            rel="noreferrer"
          >
            PDX-MI
          </a>{" "}
          ,{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/29092942/"
            target="_blank"
            rel="noreferrer"
          >
            PMID: 29092942
          </a>{" "}
          ). PDX MI has become established in the community for data exchange,
          adopted by the PDX providers, consortia and informatic tools
          integrating PDX data. We are driving the development of and promoting
          the use of descriptive standards to facilitate data interoperability
          and promote global sharing of models. We are working with the
          community on the PDCM Minimal Information standard in an effort to
          make all PDCM datasets adhere to the FAIR data principles.We provide
          expertise and software components to support several worldwide
          consortia including PDXNet, PDMR and EurOPDX. PDCM Finder code is
          freely available under an Apache 2.0 license (
          <a
            href="https://github.com/PDCMFinder"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/PDCMFinder
          </a>
          ). This work is supported by NCI U24 CA204781 01, U24 CA253539, and
          R01 CA089713.
        </p>
        <p>
          We welcome feedback on the resource and are looking for participants
          for usability studies -{" "}
          <a href="mailto:helpdesk@cancermodels.org">please get in touch</a>.
        </p>
      </Container>
    </GeneralTemplate>
  );
};
