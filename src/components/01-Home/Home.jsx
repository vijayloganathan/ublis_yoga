import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Typewriter } from "react-simple-typewriter";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import Slider from "../../pages/Slider/Slider";
import ReviewSlider from "../../pages/ReviewSlider/Slider";

import yogalogo from "../../assets/home/yogalogo.png";
import therapy from "../../assets/home/therapy.svg";

import img1 from "../../assets/home/homeImgOne.jpg";
import img2 from "../../assets/home/homeImgTwo.jpg";
import img3 from "../../assets/home/homeImgThree.png";

import experience from "../../assets/home/verified.png";
import graduate from "../../assets/home/graduated.png";
import life from "../../assets/home/life.png";

import whyChooseUs from "../../assets/home/whyChooseUs.webp";

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/contact");
  };

  return (
    <div className="homePageContents">
      <Row
        className="justify-content-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Col md={8} className="text-center homeContents">
          <h2>Ublis Yoga</h2>
          <p className="introText">
            Where Serenity Meets{" "}
            <span style={{ fontWeight: "bold" }}>
              <Typewriter
                words={["Health !", "Happiness"]}
                loop={0}
                typeSpeed={120}
                deleteSpeed={80}
              />
            </span>
          </p>
        </Col>
      </Row>

      <Slider />

      <section id="hero" className="hero pt-5 section dark-background">
        <svg
          className="hero-waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              fill="#ffffff"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            ></path>
          </defs>
          <g className="wave1">
            <use href="#wave-path" x="50" y="3"></use>
          </g>
          <g className="wave2">
            <use href="#wave-path" x="50" y="0"></use>
          </g>
          <g className="wave3">
            <use href="#wave-path" x="50" y="9"></use>
          </g>
        </svg>
      </section>

      <section className="welcomePage">
        <h3 data-aos="fade-up" data-aos-delay="200">
          Welcome to Ublis Yoga !
        </h3>
        <div
          className="welcomeContents col-lg-7 mt-5"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p>
            Welcome to Ublis Yoga, where serenity meets strength. Explore our
            classes and services, meet our experienced instructors and start
            your journey to better mind and body wellness.
          </p>
          <br />
          <p>
            At Ublis Yoga, we believe yoga is a journey of transformation. It’s
            a chance to dive deep into yourself and discover your true
            potential. Our studio is more than just a place for yoga - it's a
            peaceful space for self-discovery, healing and growth.
          </p>
          <br />
          <p>
            Located in Rajakilpakkam, our studio offers a variety of classes
            tailored to suit everyone, no matter where they are in their yoga
            journey. Whether you want to build strength, increase flexibility or
            find peace in a busy life, our experienced instructors are here to
            guide you.
          </p>
          <br />

          <p>
            Come to our studio, leave your worries at the door and enjoy a
            practice that nurtures your body and soul. Whether you’re
            experienced or new to yoga, you’ll find a welcoming community and a
            supportive space to help you on your path to wellness.
          </p>
          <br />

          <p className="welcomeQuote">
            <span>
              “Come, breathe, flow and discover the magic that awaits within! ”
            </span>
          </p>
        </div>
      </section>

      <div className="w-[100%] pt-10">
        <div className="flex flex-col lg:flex-row justify-center items-center mt-10">
          <div
            className="w-[100%] lg:w-[30%] h-[250px] lg:h-[300px] "
            align="center"
            data-aos="flip-left"
            data-aos-delay="200"
          >
            <h1 align="center" className="text-[40px] font-bold text-[#f95005]">
              What is Yoga?
            </h1>
            <img
              className="w-[40%] duration-300 hover:w-[35%] mt-10"
              src={yogalogo}
              alt="logo"
            />
          </div>
          <div
            className=" w-[90%] lg:w-[40%] h-[340px] lg:h-[400px] flex justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <p className="text-[18px] text-justify font-semibold">
              Yoga is about bringing together the body, mind and soul as one.
              It’s more than just physical exercise—it helps you stay physically
              fit, mentally clear and emotionally balanced. Through yoga, you
              can find a sense of inner peace and overall well-being by
              connecting all parts of yourself.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div
            className="w-[100%] lg:w-[30%] h-[250px] lg:h-[300px] "
            align="center"
            data-aos="flip-left"
            data-aos-delay="200"
          >
            <h1 align="center" className="text-[40px] font-bold text-[#f95005]">
              What is Therapy?
            </h1>
            <img
              className="w-[40%] duration-300 hover:w-[35%] mt-10"
              src={therapy}
              alt="logo"
            />
          </div>
          <div className=" w-[90%] lg:w-[40%] h-[340px] lg:h-[400px] flex justify-center items-center">
            <p
              className="text-[18px] text-justify font-semibold"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Yoga Therapy is a customized approach to yoga that adapts poses,
              breathing techniques and meditation to meet your individual needs.
              It helps restore balance in the body, mind and soul, bringing you
              back to a state of health and well-being. When everything is in
              harmony—your body, mind and soul—you experience true health and
              happiness.
            </p>
          </div>
        </div>
      </div>
      <div className="whoAreWe">
        <section id="whoWeAre" className="whoWeAre section col-lg-8">
          <div className="container section-title" data-aos="fade-up">
            <h3
              className="mb-3 text-[30px] lg:text-[50px] text-[#f95005] font-[700] py-3"
              align="center"
            >
              Who We Are ?
            </h3>
          </div>

          <div className="container">
            <div className="row gy-4 align-items-center whoWeAreItems">
              <div
                className="col-lg-5 order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="200"
                align="center"
              >
                <p className="whoWeArePara">
                  At Ublis Yoga, we are a passionate and dedicated to creating a
                  sanctuary for holistic wellness. Our studio is a place where
                  ancient wisdom meets modern practice, offering a diverse range
                  of yoga classes tailored to meet the needs of every
                  individual.
                </p>
                <button
                  className="getStartedBtn mt-5 col-lg-5"
                  type="submit"
                  onClick={handleButtonClick}
                >
                  Send Message
                </button>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="imageStack">
                  <img
                    src={img1}
                    alt=""
                    className="stackFront"
                    style={{ border: "10px solid white" }}
                  />
                  <img
                    src={img2}
                    alt=""
                    className="stackBack"
                    style={{ border: "10px solid white" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-[100%] flex justify-center flex-col items-center py-10 bg-[#fff]">
        <div className="container section-title" data-aos="fade-up">
          <h3
            className="text-[30px] lg:text-[50px] text-[#f95005] font-[700] pb-1"
            align="center"
          >
            Why Choose Us ?
          </h3>
        </div>
        <img
          className="w-[80%] lg:w-[65%]"
          src={whyChooseUs}
          data-aos="fade-up"
          data-aos-delay="100"
          alt="whyChooseUs"
        />
      </section>

      <section className="stats">
        <Row>
          <Col lg={3} className="statis">
            <div className="image mt-3">
              <img src={experience} />
            </div>
            <p>12+ Years of Experience</p>
          </Col>
          <Col lg={3} className="statis">
            <div className="image mt-3">
              <img src={graduate} />
            </div>
            <p>5000+ Students Trained</p>
          </Col>
          <Col lg={3} className="statis">
            <div className="image mt-3">
              <img src={life} />
            </div>
            <p>800+ Transformed Lives</p>
          </Col>
        </Row>
      </section>

      <section className="w-[100%] bg-[#f9f3eb] flex justify-center py-10 lg:py-10">
        <ReviewSlider />
      </section>
    </div>
  );
}
