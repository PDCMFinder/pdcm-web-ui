import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const HowToCitePage: FunctionComponent = () => {
  document.title = "PDCM Finder - How to cite?";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1 className="mb-5">PDX Finder Publication</h1>
        <h2>How to cite the PDCM Finder?</h2>
        <p>
          <em>
            PDX Finder: A Portal for Patient-Derived tumor Xenograft Model
            Discovery
          </em>
          . Nathalie Conte, Jeremy Mason, Csaba Halmagyi, Steven B. Neuhauser,
          Abayomi Mosaku, Dale A. Begley, Debra M. Krupke, Helen Parkinson,
          Terrence F. Meehan, Carol J. Bult bioRxiv 291443; doi:
          <a
            href="https://doi.org/10.1101/291443"
            target="_blank"
            rel="noreferrer"
          >
            https://doi.org/10.1101/291443
          </a>
        </p>
        <h2>Abstract</h2>
        <p>
          Patient-derived tumor xenograft (PDX) mouse models are a versatile
          oncology research platform for studying tumor biology and for testing
          chemotherapeutic approaches tailored to genomic characteristics of
          individual patient’s tumors. PDX models are generated and distributed
          by a diverse group of academic labs, research organizations,
          multi-institution consortia, and contract research organizations. The
          distributed nature of PDX repositories and the use of different
          standards in the associated metadata presents a significant challenge
          to finding PDX models relevant to specific cancer research questions.
          The Jackson Laboratory and EMBL-EBI are addressing these challenges by
          co-developing PDX Finder, a comprehensive open global catalog of PDX
          models and their associated datasets. Within PDX Finder, model
          attributes are harmonized and integrated using a previously developed
          community minimal information standard to support consistent searching
          across the originating resources. Links to repositories are provided
          from the PDX Finder search results to facilitate model acquisition
          and/or collaboration. The PDX Finder resource currently contains
          information for more than 1900 PDX models of diverse cancers including
          those from large resources such as the Patient-Derived Models
          Repository, PDXNet and EurOPDX. Individuals or organizations that
          generate and distribute PDXs are invited to increase the “findability”
          of their models by participating in the PDX Finder initiative at
          www.pdxfinder.org.
        </p>
        <h2>Authors</h2>
        <p>
          Nathalie Conte, Jeremy Mason, Csaba Halmagyi, Steven Neuhauser,
          Abayomi Mosaku, Dale A Begley, Debra M Krupke, Helen Parkinson,
          Terrence Meehan, Carol J Bult
        </p>
      </Container>
    </GeneralTemplate>
  );
};
