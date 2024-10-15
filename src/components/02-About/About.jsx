import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

import img1 from "../../assets/home/homeImgOne.jpg";
import img2 from "../../assets/home/homeImgTwo.jpg";
import img3 from "../../assets/home/homeImgThree.png";
import instructor from "../../assets/about/deepika.png";
import meditation from "../../assets/about/meditation.png";

import "./About.css";

export default function About() {
  return (
    <div className="aboutUsPageContents">
      <Row
        className="justify-content-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Col md={8} className="text-center aboutContents">
          <h2>Ublis Yoga</h2>
          <p className="introText mt-3">Our Journey </p>
        </Col>
      </Row>

      <Row className="carouselItems" data-aos="fade-up" data-aos-delay="250">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={img1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row className="aboutUsCont" data-aos="fade-up" data-aos-delay="200">
        <Col md={12} className="col-lg-8">
          <p>
            <span>
              “Started in 2012, for the wellness of women and kids and moved the
              focus to the Therapy”
            </span>
          </p>
          <p>
            Our journey began with the idea of combining the ancient wisdom of
            yoga with the needs of modern life, offering a complete approach to
            wellness for both body and soul. We are guided by a deep respect for
            yoga's teachings, striving to honor its timeless wisdom while
            embracing new ideas and growth.
          </p>
        </Col>
      </Row>

      <section
        id="aboutUsMission"
        className="section aboutUsMission mt-5 mb-5"
        data-builder="section"
      >
        <div className="container-fluid">
          <div className="row gy-4 aboutUsMission">
            <div
              className="ourMission col-lg-5 d-flex flex-column order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h4>Our Mission</h4>
              <span>“Enhance the body, mind and soul”</span>
              <p>
                Our mission is to enhance the body, mind and soul through the
                practice of yoga, helping everyone who joins us achieve overall
                well-being and inner peace.
              </p>
            </div>

            <div className="col-lg-4 order-1 order-lg-2 aboutUsImageMed">
              <img
                src={meditation}
                className="img-fluid"
                alt=""
                data-aos="zoom-in"
                data-aos-delay="100"
              />
            </div>
          </div>
        </div>
      </section>

      <Row className="aboutUsTeam text-center">
        <Col md={12}>
          <h4>Our Team</h4>
          <p>
            <span>“The Master of Mindful Movement!“</span>
          </p>
        </Col>

        <section
          id="aboutUsMission"
          className="section  light-background"
          data-builder="section"
        >
          <div className="container-fluid mb-5 p-3">
            <div
              className="row gy-4"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div className="order-1 order-lg-1 aboutUsImag">
                <img
                  src={instructor}
                  className="mt-5 mb-2 object-cover"
                  alt=""
                  data-aos="zoom-in"
                  data-aos-delay="100"
                />
                <br />
                <h5 className="m-1">Mrs. Deepika</h5>
                <p className="">Lead Instructor</p>
              </div>
              <div className="d-flex flex-column col-lg-6 justify-content-center order-2 order-lg-2">
                <div className="aboutInstructor text-justify">
                  <div className="text-[18px]">
                    Meet <b>Mrs. Deepika</b>, a shining source of knowledge and
                    wisdom in the yoga. Deepika started practicing yoga at the
                    <b>age of 8</b>, sparking her passion to master the
                    practice. To address various health issues, she specialized
                    in <b>Yoga therapy</b>.
                  </div>
                  <br />
                  <div className="text-[18px]">
                    With a <b>Master of Science in Yoga and Yoga Therapy</b>,
                    Deepika brings deep knowledge and expertise to every
                    className. She specializes in{" "}
                    <b>Pre & Postnatal Yoga Teacher Training</b>, guiding
                    mothers-to-be and new mothers on their journey to wellness,
                    caring for both body and mind. Her expertise extends further
                    with certifications in <b>Yoga Therapy</b>, a{" "}
                    <b>
                      Post Graduate Diploma in Yoga Philosophy and Psychology
                    </b>
                    , and another in <b>Fitness and Nutrition</b>. This allows
                    her to offer a holistic approach to wellness that nurtures
                    the body, mind, and spirit.
                  </div>
                  <br />
                  <div className="text-[18px]">
                    With Deepika as your guide, you can trust you're in capable
                    hands. Join her on the mat and embark on a journey of
                    self-discovery, healing and transformation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Row>
    </div>
  );
}
