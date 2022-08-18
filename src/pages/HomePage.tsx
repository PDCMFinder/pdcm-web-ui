import "./HomePage.scss";
import { FunctionComponent } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import {
  getCancerHierarchy,
  getFrequentlyMutatedGenes,
  getModelsByDatasetAvailability,
  getModelsByTreatment,
  getModelsByType,
} from "../apis/Explore.api";
import { NewsFeed } from "../components/common/NewsFeed";
import { Stats } from "../components/common/Stats";
import { ExploreBarChart } from "../components/explore/ExploreBarChart";
import { ExploreCirclePacking } from "../components/explore/ExploreCirclePacking";
import { ExplorePieChart } from "../components/explore/ExplorePieChart";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import { SearchBar } from "../components/search/SearchBar";

import { Timeline } from "react-twitter-widgets";
import { getSearchOptions } from "../apis/Search.api";
import { IOptionProps } from "../models/Facet.model";

export const HomePage: FunctionComponent = () => {
  const searchOptionsQuery = useQuery("search-options", getSearchOptions);

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

  let modelsByTreatment = useQuery("modelsByTreatment", () => {
    return getModelsByTreatment();
  });

  let modelsByType = useQuery("modelsByType", () => {
    return getModelsByType();
  });

  let history = useHistory();

  return (
    <GeneralTemplate>
      <section className="mb-5">
        <div
          className="home-banner"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/banners/home-banner.png)`,
          }}
        >
          <Container fluid className="home-banner-text py-4">
            <Row>
              <Col md={5} xs={0}></Col>
              <Col md={7} xs={12}>
                <h1 className="text-white display-1 hero-title text-right">
                  PDCM Finder
                </h1>
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={4} xs={0}></Col>
              <Col md={8} xs={0}>
                <SearchBar
                  onSearchChange={(searchValues: Array<string>) => {
                    const search =
                      "?q=" +
                      searchValues.map((o) => encodeURIComponent(o)).join(",");
                    history.push({
                      pathname: "/data/search",
                      search: search,
                    });
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="pr-1">
          <Row className="mx-0 w-100 d-flex justify-content-between g-0">
            <Col xs={12} md={5} id="explore-pie-chart">
              {cancerHierarchy.data && (
                <ExploreCirclePacking
                  data={cancerHierarchy.data}
                  onCircleClick={(circleId, circleDepth) => {
                    const searchPrefix = circleDepth === 1 ? `?facets=patient_tumour.cancer_system:`: `?q=`;
                    const termSuffix =  circleDepth === 1 ? "Cancer" : "";
                    const search = `${searchPrefix}${encodeURIComponent(circleId + termSuffix)}`;
                      
                    history.push({
                      pathname: "/data/search",
                      search: search,
                    });
                  }}
                />
              )}
            </Col>
            <Col xs={12} md={7} className="text-end">
              <h2 className="display-4 mt-2" style={{ fontFamily: "Mate" }}>
                The open global research platform for Patient Derived Cancer
                Models
              </h2>
              <div className="py-5 stats-grid">
                <div className="d-none d-sm-block"></div>
                {modelsByType.data ? (
                  <>
                    {" "}
                    {modelsByType.data
                      .filter(({ modelType }: any) => modelType !== "other")
                      .map(
                        ({
                          modelType,
                          count,
                        }: {
                          modelType: string;
                          count: number;
                        }) => (
                          <Stats
                            key={modelType}
                            count={count}
                            title={`${modelType} models`}
                          />
                        )
                      )}
                  </>
                ) : null}
              </div>
              <p className="lead">
                PDCM Finder is the largest open catalog of harmonised
                patient-derived cancer models and associated data from academic
                and commercial providers.
              </p>
              <p>
                Find the perfect model for your next project. Explore and
                analyse the data. Connect with model providers.
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
            <h2 className="display-3">Data overview</h2>
          </Row>
          {/* <Row>
            <img
              src={`${process.env.PUBLIC_URL}/img/banners/data-provider-map-banner.png`}
              className="img-fluid"
              height={200}
              alt=""
            />
          </Row> */}
          <Row className="align-items-center gx-5">
            <Col xs={12} md={4} className="overview-card">
              <h3>Top mutated genes</h3>
              <div style={{ height: "400px" }}>
                {frequentlyMutatedGenes.data && (
                  <ExploreBarChart
                    data={frequentlyMutatedGenes.data}
                    indexKey="mutatedGene"
                  />
                )}
              </div>
            </Col>

            <Col xs={12} md={4} className="overview-card">
              <h3>Models by dataset availability</h3>
              <div style={{ height: "400px" }}>
                {modelsByDatasetAvailability.data && (
                  <ExplorePieChart data={modelsByDatasetAvailability.data} />
                )}
              </div>
            </Col>
            <Col xs={12} md={4} className="overview-card">
              <h3>Top used drug treatments</h3>

              <div style={{ height: "400px" }}>
                {modelsByTreatment.data && (
                  <ExploreBarChart
                    data={modelsByTreatment.data}
                    indexKey="treatment"
                    leftMargin={150}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="pb-5">
        <Container fluid className="px-0">
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <NewsFeed />
            </Col>
            <Col xs={12} md={4}>
              <NewsFeed />
            </Col>
            <Col xs={12} md={4}>
              <Timeline
                dataSource={{
                  sourceType: "profile",
                  screenName: "PDXFinder",
                }}
                options={{
                  height: "600",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <img
        src={process.env.PUBLIC_URL + "/img/bottom-bg.png"}
        className="w-100 bottom-bg"
      /> */}
    </GeneralTemplate>
  );
};
