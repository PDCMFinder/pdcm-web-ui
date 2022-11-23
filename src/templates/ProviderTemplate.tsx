import React, { FunctionComponent } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { ExplorePieChart } from "../components/explore/ExplorePieChart";
import { GeneralTemplate } from "./GeneralTemplate";
import gfm from "remark-gfm";
import { Link } from "react-router-dom";
import "./ProviderTemplate.scss";

export interface IProviderTemplateProps {
  providerId: string;
  providerName: string;
  providerLogo: string;
  providerDescription: string;
  providerModelsBySystem: any;
  providerModelsByDataAvailability: Array<{
    dataType: string;
    platformName: string;
    modelCount: number;
  }>;
}

export const ProviderTemplate: FunctionComponent<IProviderTemplateProps> = ({
  providerId,
  providerName,
  providerLogo,
  providerDescription,
  providerModelsBySystem,
  providerModelsByDataAvailability,
}) => {
  return (
    <GeneralTemplate>
      <Container className="mb-5">
        <Row className="my-5 align-items-center">
          <Col md={9} lg={8}>
            <h1 className="text-center text-md-start">{providerName}</h1>
          </Col>
          {providerLogo && (
            <Col md={3} lg={4} className="ProviderTemplate__logo">
              <img src={`/${providerLogo}`} alt={providerName} />
            </Col>
          )}
        </Row>
        <Row className="my-5">
          <Col md={9}>
            <ReactMarkdown remarkPlugins={[gfm]} className="pdcm-mark-down">
              {providerDescription}
            </ReactMarkdown>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Link
              role="button"
              className="btn btn-primary btn-lg btn-block"
              to={`/data?facets=model.data_source:${providerId}`}
            >
              See all {providerId} models
            </Link>
          </Col>
        </Row>
      </Container>
      {providerModelsByDataAvailability.length > 0 &&
        providerModelsBySystem.length > 0 && (
          <Container className="my-5">
            <Row>
              <Col md={6}>
                <h2 className="text-center">Models by Primary Site</h2>
                <div style={{ height: "500px" }}>
                  <ExplorePieChart
                    onSectionClick={(category) => {}}
                    data={providerModelsBySystem}
                  />
                </div>
              </Col>
              <Col md={6}>
                <h2 className="text-center">Models by Data Available</h2>
                <div>
                  <Table>
                    <thead>
                      <tr>
                        <th>Data type</th>
                        <th>Platform</th>
                        <th>Models</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providerModelsByDataAvailability.map(
                        ({ dataType, platformName, modelCount }) => (
                          <tr>
                            <td>{dataType}</td>
                            <td>{platformName}</td>
                            <td>{modelCount}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Container>
        )}
    </GeneralTemplate>
  );
};
