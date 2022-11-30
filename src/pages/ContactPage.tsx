import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Col, Row, Container, Spinner, Modal } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { createTicket } from "../apis/Contact.api";

export const ContactPage: FunctionComponent = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(false);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("feedback");
    if (valid && submitted) {
      setLoading(true);
      const response = await createTicket(userName, userEmail, feedback, token);
      if (!response.error) {
        setSubmitted(false);
        setValid(false);
        setValidated(false);
        setName("");
        setEmail("");
        setFeedback("");
        setLoading(false);
        handleShow();
      }
    }
  }, [executeRecaptcha, userName, userEmail, feedback, valid, submitted]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValid(true);
      setSubmitted(true);
    }

    setValidated(true);
  };

  return (
    // file name in /static/content,  without `.md` file extension
    <GeneralTemplate showRecaptcha={true}>
      <Container className="my-5">
        <h1>Contact</h1>
        <h4>PDCM Finder Feedback</h4>
        <p>
          PDCM Finder is continuously developed in response to community&rsquo;s
          needs. We need your feedback to improve and refine the PDCM Finder.
        </p>
        <Col md={6} lg={4}>
          <Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={userName}
                  onChange={(e) =>
                    setName((e.target as HTMLInputElement).value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={userEmail}
                  onChange={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                />
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
                  value={feedback}
                  onChange={(e) =>
                    setFeedback((e.target as HTMLInputElement).value)
                  }
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="file" />
              </Form.Group> */}

              <Button variant="primary" type="submit">
                Send feedback{" "}
                {loading ? (
                  <Spinner animation="grow" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : null}
              </Button>
            </Form>
          </Row>
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thanks for your feedback!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            A member of our team will been in touch with you to process your
            request.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </GeneralTemplate>
  );
};
