import React from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const UnderConstructionPage = () => {
  return (
    <GeneralTemplate>
      <div
        className="home-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/banners/home-banner.png)`,
        }}
      >
        <Container fluid className="home-banner-text">
          <h1 className="text-white display-1 hero-title">PDCM Finder</h1>
        </Container>
      </div>
      <Container className="text-center">
        <h1 className="my-5">Under Construction</h1>
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
