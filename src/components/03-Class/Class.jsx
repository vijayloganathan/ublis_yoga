import React from "react";
import childrenimg from "../../assets/classes/Children Meditating.png";
import yogaclass from "../../assets/classes/Yoga Class.png";
import yoga from "../../assets/classes/Yoga.png";
import senioryoga from "../../assets/classes/Senior Yoga Class.png";
import pregnent from "../../assets/classes/Prenatal Yoga Lesson.png";
import Meditating from "../../assets/classes/Meditating.png";
import Kundalini from "../../assets/classes/Kundalini Yoga Breathing.png";

import timing from "../../assets/classes/duration.jpeg";
import fee from "../../assets/classes/fee.jpeg";

import "./Class.css";
import { Col, Row } from "react-bootstrap";

export default function Class() {
  const headcardstyle = "w-[220px] h-[280px]";

  const cardstyle = "w-[180px] h-[180px] justify-center items-center";

  const imgstyle =
    "w-[180px] h-[180px] rounded-full bg-[#fff] transition-all duration-600 ease-in-out hover:w-[170px] hover:h-[170px]";

  const titlestyle = "mt-4 text-[18px]  font-bold text-[#f95005]";

  const textstyle =
    "w-[95%] lg:w-[30%] text-[20px] text-start lg:text-center text-[#1E201E] font-normal flex ";

  const programtextstyle =
    "py-2 text-[20px] text-start text-[#1E201E] font-bold flex align-items-center";

  return (
    <div className="classes-body" align="center">
      <div className="w-[80%] lg:w-[75%]">
        <h1 className="text-[50px] font-bold mt-6 text-[#f95005]">
          Our Classes
        </h1>
        <h1 className="text-[35px] font-bold mt-2 text-[#3C3D37]">
          Classes Offered
        </h1>

        <div
          className="w-[100%] flex flex-wrap justify-center items-center py-12 gap-4"
          align="center"
        >
          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={childrenimg} alt="logo" />
            </div>
            <h1 className={titlestyle}>Kids Yoga</h1>
          </div>

          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={yogaclass} alt="logo" />
            </div>
            <h1 className={titlestyle}>Ladies Yoga</h1>
          </div>

          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={yoga} alt="logo" />
            </div>
            <h1 className={titlestyle}>Unisex Yoga</h1>
          </div>

          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={senioryoga} alt="logo" />
            </div>
            <h1 className={titlestyle}>Senior Citizen Yoga</h1>
          </div>

          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={pregnent} alt="logo" />
            </div>
            <h1 className={titlestyle}>
              Pregnancy Yoga (Conception, Pre & Post natal)
            </h1>
          </div>

          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={Meditating} alt="logo" />
            </div>
            <h1 className={titlestyle}>Meditation Sessions</h1>
          </div>

          <div className={headcardstyle}>
            <div className={cardstyle}>
              <img className={imgstyle} src={Kundalini} alt="logo" />
            </div>
            <h1 className={titlestyle}>Pranayama (Breathing Techniques)</h1>
          </div>
        </div>
      </div>

      <div className="w-[100%] bg-[#fff]" align="center">
        <div className="w-[90%] lg:w-[75%] pt-3">
          <h1 className="text-[45px] font-bold mt-6 text-[#f95005] text-center lg:text-start">
            Workshops
          </h1>
        </div>
        <div
          className="w-[60%] flex flex-wrap justify-start items-center py-12 gap-4"
          align="center"
        >
          <div className={textstyle} data-aos="fade-right" data-aos-delay="100">
            <div>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            &nbsp;&nbsp;<div>Meditation</div>
          </div>
          <div className={textstyle} data-aos="fade-right" data-aos-delay="200">
            <div>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            &nbsp;&nbsp;<div>Face Yoga</div>
          </div>
          <div className={textstyle} data-aos="fade-right" data-aos-delay="300">
            <div>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            &nbsp;&nbsp;<div>Yoga for Specific Ailments</div>
          </div>
        </div>
      </div>

      <div className="w-[100%] bg-[#fff] pb-8" align="center">
        <div className="w-[90%] lg:w-[75%] pt-10">
          <h1 className="text-[45px] font-bold mt-6 text-[#f95005] text-center lg:text-start">
            Special Programs
          </h1>
        </div>
        <div
          className="w-[60%] flex flex-wrap justify-start items-center py-12 gap-4"
          align="center"
        >
          <div className={textstyle} data-aos="fade-right" data-aos-delay="100">
            <div>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            &nbsp;&nbsp;<div>Beachside Yoga</div>
          </div>
          <div className={textstyle} data-aos="fade-right" data-aos-delay="200">
            <div>
              <i className="fa-solid fa-angle-right"></i>
            </div>
            &nbsp;&nbsp;<div>Aqua Yoga</div>
          </div>
        </div>
      </div>

      <div className="w-[100%] bg-[#f95005]" align="center">
        <div className="w-[90%] lg:w-[75%] pt-10">
          <h1 className="text-[45px] font-bold mt-6 text-[#fff] text-center lg:text-start">
            What We Cover In Our Sessions
          </h1>
        </div>
        <div className="pt-5 pb-14 w-[60%] lg:w-[55%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Preparatory Movements – Warmups</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Surya Namaskar</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Chandra Namaskar</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Modification of Surya Namaskar</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Cardio Surya Namaskar</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Vinyasa Flow</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Power Yoga</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Kriyas</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Bandham</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Pranayama</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Meditation</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Relaxation</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>Yoga Nidra</div>
            </div>
            <div className={programtextstyle} data-aos="fade-up">
              <i className="fa-solid fa-check"></i>&nbsp;&nbsp;
              <div>
                Asanas – Sitting/ Standing/ Prone/ Supine/ Twisting/ Balancing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-[100%] py-10">
        <button className="w-[150px] h-[50px] bg-[#f95005] text-[#fff] hover:bg-[#fff] hover:text-[#f95005] border-2 border-[#f95005] transition-all duration-300 font-normal">
          Contact Us
        </button>
      </div> */}

      {/* <div className="w-[100%] bg-[#545256]">
        <div className="py-10">
          <h1 className="text-[40px] font-bold mt-6 text-[#fff]" align="center">
            Class Schedules & Fee Structure
          </h1>
          <h1
            className="w-[90%] lg:w-[50%] text-[25px] font-normal mt-2 text-[#fff]"
            align="center"
          >
            Check out our class timings and fees structure to find the perfect
            fit for your schedule and budget.
          </h1>
          <h1
            className=" w-[90%] lg:w-[50%] text-[25px] font-semibold mt-2 text-[#fff] pt-10"
            align="center"
          >
            Class Schedules
          </h1>
          <div className="w-[100%] overflow-auto pl-[12px] pr-[12px] lg:pr-[0px] lg:pl-[0px]">
            <table>
              <thead>
                <tr>
                  <th>Monday - Friday</th>
                  <th>Saturday - Sunday</th>
                  <th>Sunday (Special Class)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="heading">
                      Combined Group Sessions for Adults & Kids (Offline &
                      Online)
                    </span>
                    <span className="timingdata">
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;6:00 am - 7:00 am
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;6:00 pm - 7:00 pm
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;7:10 pm - 8:10 pm
                    </span>
                  </td>
                  <td rowSpan="3">
                    <span className="heading">
                      Combined Group Sessions for Adults & Kids (Offline &
                      Online)
                    </span>
                    <span className="timingdata">
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;8:00 am - 9:00 am
                    </span>
                  </td>
                  <td rowSpan="3">
                    <span className="heading">
                      Prenatal Yoga (30 days / month)
                    </span>
                    <span className="timingdata">
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;9:15 am - 10:15 am
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="heading">
                      Group Sessions for adults (Offline & Online)
                    </span>
                    <span className="timingdata">
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;8:20 am - 9:20am
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;9:00 am - 10:30 am
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;10:45 am - 11:5 am (Ladies Only)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="heading">
                      Group Sessions for Kids (Offline)
                    </span>
                    <span className="timingdata">
                      <br />
                      <i class="fa-solid fa-hand-point-right"></i>
                      &nbsp;&nbsp;4:50 pm - 5:50 pm
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h1
            className=" w-[50%] text-[25px] font-semibold mt-2 text-[#fff] pt-10"
            align="center"
          >
            Fee Structure
          </h1>
          <div className="w-[100%] overflow-auto">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Fee ₹</th>
                  <th>GST (18%)</th>
                  <th>Total ₹</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feeheading">
                    <span>
                      Weekend Session
                      <br /> (Sat & Sun)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>800</span>
                  </td>
                  <td className="feeheading">
                    <span>144</span>
                  </td>
                  <td className="feeheading">
                    <span>944</span>
                  </td>
                </tr>
                <tr>
                  <td className="feeheading">
                    <span>
                      Kids
                      <br /> (Mon & Fri)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>1500</span>
                  </td>
                  <td className="feeheading">
                    <span>270</span>
                  </td>
                  <td className="feeheading">
                    <span>1770</span>
                  </td>
                </tr>
                <tr>
                  <td className="feeheading">
                    <span>
                      Adults
                      <br /> (Mon & Fri)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>1700</span>
                  </td>
                  <td className="feeheading">
                    <span>306</span>
                  </td>
                  <td className="feeheading">
                    <span>2006</span>
                  </td>
                </tr>
                <tr>
                  <td className="feeheading">
                    <span>
                      Kids
                      <br /> (30 Days)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>2300</span>
                  </td>
                  <td className="feeheading">
                    <span>414</span>
                  </td>
                  <td className="feeheading">
                    <span>2714</span>
                  </td>
                </tr>
                <tr>
                  <td className="feeheading">
                    <span>
                      Adults
                      <br /> (30 Days)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>2500</span>
                  </td>
                  <td className="feeheading">
                    <span>450</span>
                  </td>
                  <td className="feeheading">
                    <span>2950</span>
                  </td>
                </tr>
                <tr>
                  <td className="feeheading">
                    <span>
                      Prenatal
                      <br /> (30 Days)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>3000</span>
                  </td>
                  <td className="feeheading">
                    <span>540</span>
                  </td>
                  <td className="feeheading">
                    <span>3540</span>
                  </td>
                </tr>
                <tr>
                  <td className="feeheading">
                    <span>
                      Therapy
                      <br /> (Per session - 1 hr)
                    </span>
                  </td>
                  <td className="feeheading">
                    <span>800</span>
                  </td>
                  <td className="feeheading">
                    <span>144</span>
                  </td>
                  <td className="feeheading">
                    <span>944</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

      <div className="feeStructure">
        <h3>Class Schedules & Fee Structure</h3>
        <h5 className="col-lg-8">
          Check out our class timings and fees structure to find the perfect fit
          for your schedule and budget.
        </h5>

        <Row>
          <Col lg={5} className="contentss">
            <h4>Class Schedules</h4>
            <div className="image">
              <img src={timing} alt="schedule" width="500px" />
            </div>
          </Col>
          <Col lg={5} className="contentss">
            <h4>Fee Structure</h4>
            <div className="image">
              <img src={fee} alt="fee" width="500px" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
