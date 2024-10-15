import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.jpeg";
import "./Header.css";

export default function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    setIsExpanded(false);
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

  console.log(location.pathname);

  return (
    <>
      <div>
        {location.pathname === "/" ||
        location.pathname === "/about" ||
        location.pathname === "/class" ||
        location.pathname === "/gallery" ||
        location.pathname === "/contact" ? (
          <>
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Text>
                  <a
                    href="https://wa.me/+919940063000?text=I'm%20interested%20in%20yoga%20class"
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                    target="_blank"
                  >
                    WhatsApp: 9940063000
                  </a>
                </Navbar.Text>
                <Navbar.Text>
                  {" "}
                  <div className="socialLinks d-flex">
                    {socialMediaLinks.map((link, index) => (
                      <OverlayTrigger
                        key={index}
                        placement="bottom"
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
                </Navbar.Text>
              </Container>
            </Navbar>
            <Navbar expand="lg" fixed="top" expanded={isExpanded}>
              <Container>
                <Navbar.Brand onClick={() => handleNavClick("/")}>
                  <img
                    alt="Ublis Yoga Logo"
                    src={logo}
                    width="70"
                    height="70"
                    className="logo me-3 ms-3"
                  />
                </Navbar.Brand>

                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <i className="bi bi-x-lg"></i>
                  ) : (
                    <i className="bi bi-list"></i>
                  )}
                </Navbar.Toggle>
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  style={{ justifyContent: "end" }}
                >
                  <Nav className="">
                    <Nav.Link
                      className="me-5"
                      onClick={() => handleNavClick("/")}
                    >
                      Home{" "}
                    </Nav.Link>
                    <div className="nav-divider d-lg-none"></div>
                    <Nav.Link
                      className="me-5"
                      onClick={() => handleNavClick("/about")}
                    >
                      About Us{" "}
                    </Nav.Link>
                    <div className="nav-divider d-lg-none"></div>
                    <Nav.Link
                      className="me-5"
                      onClick={() => handleNavClick("/class")}
                    >
                      Classes{" "}
                    </Nav.Link>
                    <div className="nav-divider d-lg-none"></div>
                    <Nav.Link
                      className="me-5"
                      onClick={() => handleNavClick("/gallery")}
                    >
                      Gallery{" "}
                    </Nav.Link>
                    <div className="nav-divider d-lg-none"></div>

                    <Nav.Link
                      className="me-5"
                      onClick={() => handleNavClick("/contact")}
                    >
                      Contact Us
                    </Nav.Link>

                    <div className="nav-divider d-lg-none"></div>
                    <div
                      className="navbutton me-5"
                      onClick={() => handleNavClick("/signin")}
                    >
                      Sign In
                    </div>
                    <div className="nav-divider d-lg-none"></div>
                    <div
                      className="navbutton me-5 navbutton"
                      onClick={() => handleNavClick("/signup")}
                    >
                      Sign Up
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
