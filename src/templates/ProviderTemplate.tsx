import React, { FunctionComponent } from "react";
import { Col, Container, Jumbotron, Row, Table } from "react-bootstrap";
import { ExplorePieChart } from "../components/explore/ExplorePieChart";
import { GeneralTemplate } from "./GeneralTemplate";

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
      <Jumbotron className="bg-primary text-white">
        <Container>
          <Row>
            <Col xs={12} md={9}>
              <h1>{providerName}</h1>
              <p>{providerDescription}</p>
            </Col>
            <Col xs={12} md={3}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  minHeight: "300px",
                  minWidth: "300px",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ maxWidth: "65%" }}
                  src="https://placedog.net/200/200"
                  alt="placeholder"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container className="my-5">
        <Row>
          <Col xs={12} md={6}>
            <h2 className="text-center">Models by Primary Site</h2>
            <div style={{ height: "500px" }}>
              <ExplorePieChart data={providerModelsBySystem} />
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
        <Row></Row>
      </Container>
    </GeneralTemplate>
  );
};
