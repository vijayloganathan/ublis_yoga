import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const socialMediaLinks = [
    {
      name: "Facebook",
      iconClass: "bi bi-facebook",
      url: "https://www.facebook.com/ublis yoga",
    },
    // { name: "Twitter", iconClass: "bi bi-twitter-x", url: "#" },
    {
      name: "Instagram",
      iconClass: "bi bi-instagram",
      url: "https://www.instagram.com/ublis_yoga/",
    },
  ];

  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ||
      location.pathname === "/about" ||
      location.pathname === "/class" ||
      location.pathname === "/gallery" ||
      location.pathname === "/contact" ? (
        <footer
          id="footer"
          className="footer position-relative light-background"
        >
          <Container
            className="footer-top"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Row
              className="gy-4 col-lg-10"
              style={{ justifyContent: "space-between" }}
            >
              <Col lg={3} md={12} className="footer-about">
                <span className="sitename">Ublis Yoga Studio</span>
                <p>
                  Gate 2, No: 28, Second Floor <br />
                  Madambakkam Main Road, <br />
                  Gandhi Nagar, Rajakilpakkam, <br />
                  Opposite to Jains Sudharsana Apartments, <br />
                  Chennai, Tamil Nadu - 600073
                </p>{" "}
                <h4>Contact Us</h4>
                <p className="mt-2">
                  <strong>
                    <i
                      className="bi bi-envelope-arrow-up-fill"
                      style={{ fontSize: "1.3rem" }}
                    ></i>{" "}
                    :{" "}
                  </strong>{" "}
                  <a href="tel:+919962271225">
                    +91 9962271225 / +91 9600369179
                  </a>
                </p>
                <p>
                  <strong>
                    <i
                      className="bi bi-telephone-fill"
                      style={{ fontSize: "1.3rem" }}
                    ></i>{" "}
                    :{" "}
                  </strong>{" "}
                  <a href="mailto:ublisyoga@gmail.com?subject=Inquiry from website">
                    Ublisyoga@gmail.com{" "}
                  </a>
                </p>
              </Col>

              <Col
                lg={3}
                md={12}
                className="footer-contact text-center text-md-start"
              >
                <div className="mapContents">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8970657345726!2d80.15195777515602!3d12.914336887395832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6de2acd781%3A0x1e56c9f3ddf024dc!2sUBLIS%20YOGA!5e0!3m2!1sen!2sin!4v1726210044671!5m2!1sen!2sin"
                    width="100%"
                    height="300px"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Col>

              <Col lg={2} xs={6} className="footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <span onClick={() => handleNavigate("/")}>Home</span>
                  </li>
                  <li>
                    <span onClick={() => handleNavigate("/about")}>
                      About Us
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleNavigate("/class")}>
                      Classes{" "}
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleNavigate("/gallery")}>
                      Gallery{" "}
                    </span>
                  </li>
                  <li>
                    <span onClick={() => handleNavigate("/contact")}>
                      Contact Us{" "}
                    </span>
                  </li>
                </ul>
              </Col>

              <Col lg={2} xs={6} className="footer-links">
                <h4>Follow Us</h4>
                <div className="social-links d-flex mt-4">
                  {socialMediaLinks.map((link, index) => (
                    <OverlayTrigger
                      key={index}
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${index}`}>{link.name}</Tooltip>
                      }
                    >
                      <a href={link.url} target="_blank">
                        <i className={link.iconClass}></i>
                      </a>
                    </OverlayTrigger>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="copyright text-center mt-2">
            <p>
              <strong>© 2024 Ublis Yoga. All rights reserved.</strong>{" "}
            </p>
          </Container>
        </footer>
      ) : (
        <></>
      )}
    </>
  );
}
