import React, { FunctionComponent } from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { GeneralTemplate } from "./GeneralTemplate";

export interface IProviderTemplateProps {
  providerId: string;
  providerName: string;
  providerDescription: string;
}

export const ProviderTemplate: FunctionComponent<IProviderTemplateProps> = ({
  providerId,
  providerName,
  providerDescription,
}) => {
  return (
    <GeneralTemplate>
      <Jumbotron className="bg-primary text-white">
        <Container>
          <Row>
            <Col xs={9}>
              <h1>{providerName}</h1>
              <p>{providerDescription}</p>
            </Col>
            <Col xs={3}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "65%" }}
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
          <Col>Provider Models by Cancer System</Col>
          <Col>Provider Models by Data Available</Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
