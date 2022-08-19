import React, { FunctionComponent } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { ExplorePieChart } from "../components/explore/ExplorePieChart";
import { GeneralTemplate } from "./GeneralTemplate";
import gfm from "remark-gfm";
import { Link } from "react-router-dom";

export interface IProviderTemplateProps {
  providerId: string;
  providerName: string;
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
  providerDescription,
  providerModelsBySystem,
  providerModelsByDataAvailability,
}) => {
  return (
    <GeneralTemplate>
      <Container>
        <Row className="my-5">
          <Col xs={12} md={9}>
            <h1>{providerName}</h1>
          </Col>
        </Row>
        <Row className="my-5">
          <Col xs={12} md={9}>
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
              <Col xs={12} md={6}>
                <h2 className="text-center">Models by Primary Site</h2>
                <div style={{ height: "500px" }}>
                  <ExplorePieChart
                    onSectionClick={(category) => {}}
                    data={providerModelsBySystem}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
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
