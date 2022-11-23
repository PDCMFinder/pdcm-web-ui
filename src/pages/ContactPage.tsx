import React, { FunctionComponent } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ContactPage: FunctionComponent = () => {
  return (
    // file name in /static/content,  without `.md` file extension
    <GeneralTemplate>
      <Container className="my-5">
        <h1>Contact</h1>
        <h4>PDCM Finder Feedback</h4>
        <p>
          PDCM Finder is continuously developed in response to community&rsquo;s
          needs. We need your feedback to improve and refine the PDCM Finder.
        </p>
        <Col md={6} lg={4}>
          <Row>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your complete name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Your Feedback *</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Please write here your feedback"
                  required={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send feedback
              </Button>
            </Form>
          </Row>
        </Col>
      </Container>
    </GeneralTemplate>
  );
};
