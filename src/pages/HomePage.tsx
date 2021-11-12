import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url } from "inspector";
import React, { FunctionComponent } from "react";
import { Jumbotron, Button, Container, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import {
  getCancerHierarchy,
  getFrequentlyMutatedGenes,
  getModelsByDatasetAvailability,
} from "../apis/Explore.api";
import { ExploreBarChart } from "../components/explore/ExploreBarChart";
import { ExploreCirclePacking } from "../components/explore/ExploreCirclePacking";
import { ExplorePieChart } from "../components/explore/ExplorePieChart";
import { ExploreTreeMap } from "../components/explore/ExploreTreeMap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const HomePage: FunctionComponent = () => {
  let cancerHierarchy = useQuery("cancerHierarchy", () => {
    return getCancerHierarchy();
  });

  let frequentlyMutatedGenes = useQuery("frequentlyMutatedGenes", () => {
    return getFrequentlyMutatedGenes();
  });

  let modelsByDatasetAvailability = useQuery(
    "modelsByDatasetAvailability",
    () => {
      return getModelsByDatasetAvailability();
    }
  );

  return (
    <GeneralTemplate>
      <Jumbotron
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/cancer_cells.jpg)`,
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
      </Jumbotron>
      <Container>
        <Row className="mb-3">
          <Col>
            <h1 className="display-4">
              Explore <FontAwesomeIcon icon={faCompass} />
            </h1>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={4}>
            <h2 className="text-right">Models by cancer type</h2>
          </Col>
          <Col xs={8}>
            <div style={{ height: "600px" }}>
              {cancerHierarchy.data && (
                <ExploreCirclePacking data={cancerHierarchy.data} />
              )}
            </div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={8}>
            <div style={{ height: "600px" }}>
              {frequentlyMutatedGenes.data && (
                <ExploreBarChart data={frequentlyMutatedGenes.data} />
              )}
            </div>
          </Col>
          <Col xs={4}>
            <h2>Most frequently mutated genes</h2>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={4}>
            <h2>Models by dataset availability</h2>
          </Col>
          <Col xs={8}>
            <div style={{ height: "600px" }}>
              {modelsByDatasetAvailability.data && (
                <ExplorePieChart data={modelsByDatasetAvailability.data} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
