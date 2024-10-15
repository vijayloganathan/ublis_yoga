import React, { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import "./Gallery.css";

import app1 from "../../assets/gallery/kidsOne.jpeg";
import app2 from "../../assets/gallery/kidsTwo.jpg";
import app3 from "../../assets/gallery/kidsThree.jpg";

import book1 from "../../assets/gallery/adultOne.jpg";
import book2 from "../../assets/gallery/adultTwo.jpg";
import book3 from "../../assets/gallery/adultThree.jpg";

import branding1 from "../../assets/gallery/seniorOne.jpg";
import branding2 from "../../assets/gallery/seniorTwo.jpg";
import branding3 from "../../assets/gallery/seniorThree.jpg";

import jawadhuHillsOne from "../../assets/eventOne/img1.jpeg";
import jawadhuHillsTwo from "../../assets/eventOne/img2.jpeg";
import jawadhuHillsThree from "../../assets/eventOne/img3.jpeg";
import jawadhuHillsFour from "../../assets/eventOne/img4.jpeg";
import jawadhuHillsFive from "../../assets/eventOne/img5.jpeg";
import jawadhuHillsSix from "../../assets/eventOne/img6.jpeg";
import jawadhuHillsSeven from "../../assets/eventOne/img7.jpeg";
import jawadhuHillsEight from "../../assets/eventOne/img8.jpeg";
import jawadhuHillsNine from "../../assets/eventOne/img9.jpeg";
import jawadhuHillsTen from "../../assets/eventOne/img10.jpeg";
import jawadhuHillsEleven from "../../assets/eventOne/img11.jpeg";
import jawadhuHillsTwelve from "../../assets/eventOne/img12.jpeg";

// import product1 from "../../assets/gallery/product-1.jpg";
// import product2 from "../../assets/gallery/product-2.jpg";
// import product3 from "../../assets/gallery/product-3.jpg";
import { Button, Modal } from "react-bootstrap";

export default function Gallery() {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ src: "", title: "" });

  const handleClose = () => setShow(false);
  const handleShow = (src, title) => {
    setModalContent({ src, title });
    setShow(true);
  };

  useEffect(() => {
    const isotopeItems = document.querySelectorAll(".isotope-layout");

    isotopeItems.forEach((isotopeItem) => {
      const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
      const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
      const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

      let initIsotope;
      imagesLoaded(
        isotopeItem.querySelector(".isotope-container"),
        function () {
          initIsotope = new Isotope(
            isotopeItem.querySelector(".isotope-container"),
            {
              itemSelector: ".isotope-item",
              layoutMode: layout,
              filter: filter,
              sortBy: sort,
            }
          );
        }
      );

      const filters = isotopeItem.querySelectorAll(
        ".gallerySection-filters li"
      );
      filters.forEach((filterItem) => {
        filterItem.addEventListener("click", function () {
          filters.forEach((el) => el.classList.remove("filter-active"));
          this.classList.add("filter-active");

          const filterValue = this.getAttribute("data-filter");
          initIsotope.arrange({ filter: filterValue });
        });
      });
    });
  }, []);

  return (
    <div>
      <section id="gallerySection" className="gallerySection section">
        <div className="container" data-aos="fade-up">
          <h2>Our Space</h2>
          <p>
            Welcome to our serene and beautiful space. Our gallery showcases the
            tranquil environment and the positive energy that surrounds our yoga
            studio. Feel free to take a virtual tour and explore the calming
            ambiance that awaits you at My Site
          </p>
        </div>

        <div className="container galleryIsotopeContainer">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <ul
              className="gallerySection-filters isotope-filters"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li data-filter="*" className="filter-active">
                All
              </li>
              <li data-filter=".filter-app">Class</li>
              {/* <li data-filter=".filter-product">Adult</li> */}
              <li data-filter=".filter-branding">Programs</li>
              <li data-filter=".filter-books">Jawadhu Hills</li>
            </ul>

            <div
              className="row gy-4 isotope-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {[
                {
                  src: jawadhuHillsSeven,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: app1,
                  title: "Kids Yoga",
                  filter: "filter-app",
                  subHeading: "Lorem text",
                },
                // {
                //   src: product1,
                //   title: "Adult 1",
                //   filter: "filter-product",
                //   subHeading: "Lorem text",
                // },
                {
                  src: jawadhuHillsTwo,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsEight,
                  title: "Jawadhu Hills - Exercise",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: branding1,
                  title: "Programs",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsOne,
                  title: "Jawadhu Hills - Trekking",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: app2,
                  title: "Kids Yoga",
                  filter: "filter-app",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsNine,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsThree,
                  title: "Jawadhu Hills - Group Photo",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                // {
                //   src: product2,
                //   title: "Adult 2",
                //   filter: "filter-product",
                //   subHeading: "Lorem text",
                // },
                {
                  src: branding2,
                  title: "Programs",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsTen,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsEleven,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsFour,
                  title: "Jawadhu Hills - Explore Nature",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: app3,
                  title: "Kids Yoga",
                  filter: "filter-app",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsFive,
                  title: "Jawadhu Hills - Trekking",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsTwelve,
                  title: "Jawadhu Hills - Yoga",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
                // {
                //   src: product3,
                //   title: "Adult 3",
                //   filter: "filter-product",
                //   subHeading: "Lorem text",
                // },
                {
                  src: branding3,
                  title: "Programs",
                  filter: "filter-branding",
                  subHeading: "Lorem text",
                },
                {
                  src: jawadhuHillsSix,
                  title: "Jawadhu Hills - Meditation",
                  filter: "filter-books",
                  subHeading: "Lorem text",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`col-lg-4 col-md-6 gallerySection-item isotope-item ${item.filter}`}
                >
                  <img src={item.src} className="img-fluid" alt={item.title} />
                  <div className="gallerySection-info">
                    <h4>{item.title}</h4>
                    {/* <p>{item.subHeading}</p> */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleShow(item.src, item.title);
                      }}
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={modalContent.src}
            alt={modalContent.title}
            className="img-fluid"
          />
        </Modal.Body>
        {/* <Modal.Footer>{modalContent.subHeading}</Modal.Footer> */}
      </Modal>
    </div>
  );
}
