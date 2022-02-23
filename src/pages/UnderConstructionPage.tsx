import React from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const UnderConstructionPage = () => {
  return (
    <GeneralTemplate>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/cancer_cells.jpg)`,
        }}
      >
        <Container>
          <h1
            className="text-center text-dark"
            style={{ backgroundColor: "rgb(247 251 255 / 50%)" }}
          >
            PDCM Finder is your open global cancer research platform for Patient
            Derived Cancer Models
          </h1>
        </Container>
        <small
          className="text-dark"
          style={{
            backgroundColor: "rgb(247 251 255 / 50%)",
            float: "right",
            marginTop: "30px",
          }}
        >
          <a href="https://commons.wikimedia.org/wiki/File:Small_cell_lung_carcinoma_vs._benign_mesothelial_cells_(4703634468).jpg">
            Ed Uthman from Houston, TX, USA
          </a>
          , <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>,
          via Wikimedia Commons
        </small>
      </div>
      <Container className="text-center">
        <h1 className="mb-5">Under Construction</h1>
        <h4 className="mb-5">
          In the meantime please visit{" "}
          <a href="https://www.pdxfinder.org/">pdxfinder.org</a> to search,
          compare and source patient-derived xenograft models.{" "}
        </h4>
        <h4>
          <a href="mailto:info@pdxfinder.org">Contact us</a>
        </h4>
      </Container>
    </GeneralTemplate>
  );
};
