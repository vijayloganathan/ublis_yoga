import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./Contact.css";

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const firstName = form["name"].value;
    const lastName = form["text"].value;
    const email = form["email"].value;
    const mobile = form["mobile"].value;
    const message = form["message"].value;

    const subject = encodeURIComponent("Yoga Enquiry - Reg");
    const body = encodeURIComponent(`
          Hi ${firstName},

          ${message}

          Regards,
          ${firstName} ${lastName}
          Mobile: ${mobile}
          Email: ${email}
    `);
    const mailtoLink = `mailto:Ublisyoga@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
      <section id="contact" className="contact section">
        <div className="contactFormContainer col-lg-7 mt-5">
          <h4>Get in touch</h4>
          <Row className="contactIntro p-4">
            <Col lg={5}>
              <h5>Visit Us</h5>
              <p className="pt-3">
                Gate 2, No: 28, Second Floor
                <br /> Madambakkam Main Road, Gandhi Nagar, <br />
                Rajakilpakkam, Opposite to Jains Sudharsana Apartments, <br />
                Chennai, Tamil Nadu 600073
              </p>
            </Col>
            <Col lg={4}>
              <h5 className="mb-3">Email Us</h5>
              <a href="mailto:ublisyoga@gmail.com" className="mt-3">
                Ublisyoga@gmail.com
              </a>
            </Col>
            <Col lg={3}>
              <h5>Call Us</h5>
              <p className="pt-3">9940063000</p>
            </Col>
          </Row>

          <Row className="contactForms p-3">
            <h5>Drop A Message</h5>
            <Form
              id="contact-form"
              className="emailForm"
              onSubmit={handleSubmit}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Row className="gy-4 mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="pb-2 formLabels">
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name-field"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="pb-2 formLabels">
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="text"
                      id="last-name-field"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="pb-2 formLabels">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      id="email-field"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="pb-2 formLabels">Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      id="mobile-field"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="pb-2 formLabels">
                      Leave a Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={10}
                      id="message-field"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="text-center">
                  <button className="getStartedBtn col-lg-5" type="submit">
                    Send Message
                  </button>
                </Col>
              </Row>
            </Form>
          </Row>
        </div>
      </section>
    </div>
  );
}
