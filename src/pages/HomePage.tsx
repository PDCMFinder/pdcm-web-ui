import "./HomePage.scss";
import { FunctionComponent } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  getCancerHierarchy,
  getFrequentlyMutatedGenes,
  getModelsByDatasetAvailability,
} from "../apis/Explore.api";
import { NewsFeed } from "../components/common/NewsFeed";
import { Stats } from "../components/common/Stats";
import { ExploreBarChart } from "../components/explore/ExploreBarChart";
import { ExploreCirclePacking } from "../components/explore/ExploreCirclePacking";
import { ExplorePieChart } from "../components/explore/ExplorePieChart";
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
      <section className="pb-5">
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
        <Container fluid className="px-0">
          <Row className="mx-0 w-100 d-flex justify-content-between">
            <Col xs={12} md={5} id="explore-pie-chart">
              {cancerHierarchy.data && (
                <ExploreCirclePacking data={cancerHierarchy.data} />
              )}
            </Col>
            <Col xs={12} md={7} className="text-end">
              <h2 className="display-4 mt-2" style={{ fontFamily: "Mate" }}>
                The open global research platform for Patient Derived Cancer
                Models
              </h2>
              <div className="py-5 stats-grid">
                <div className="d-none d-sm-block"></div>
                <Stats count={3000} title="Xenograft models" />
                <Stats count={2500} title="Cell-line models" />
                <Stats count={500} title="Organoid models" />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                tristique metus ac nisl pretium dignissim. Proin dui ligula,
                ultricies ac ornare quis, mollis ac libero. Duis diam dui,
                porttitor ac felis ut, accumsan scelerisque risus. Mauris
                pellentesque quis lectus et mattis. Fusce maximus maximus quam,
                id pharetra est porta ac. Cras lacinia tortor id lacus tincidunt
                euismod. Mauris iaculis sed elit ullamcorper pulvinar. Sed purus
                est, laoreet vel dignissim ac, posuere in sem.
              </p>
              <p>
                <Link to="/about">Read more</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pb-5">
        <Container fluid className="px-0">
          <Row>
            <h2 className="display-3">Our data in a nutshell</h2>
          </Row>
          <Row className="align-items-center">
            <Col xs={12} md={4}>
              <h3>Top mutated genes</h3>
              <div style={{ height: "400px" }}>
                {frequentlyMutatedGenes.data && (
                  <ExploreBarChart data={frequentlyMutatedGenes.data} />
                )}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <h3>Top used drug treatments</h3>
              <div style={{ height: "400px" }}>
                {frequentlyMutatedGenes.data && (
                  <ExploreBarChart data={frequentlyMutatedGenes.data} />
                )}
              </div>
            </Col>
            <Col xs={12} md={4}>
              <h3>Models by dataset availability</h3>
              <div style={{ height: "400px" }}>
                {modelsByDatasetAvailability.data && (
                  <ExplorePieChart data={modelsByDatasetAvailability.data} />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pb-5">
        <Container fluid className="px-0">
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <NewsFeed />
            </Col>
            <Col xs={12} md={4}>
              <NewsFeed />
            </Col>
            <Col xs={12} md={4}></Col>
          </Row>
        </Container>
      </section>

      <img
        src={process.env.PUBLIC_URL + "/img/bottom-bg.png"}
        className="w-100 bottom-bg"
      />
    </GeneralTemplate>
  );
};
