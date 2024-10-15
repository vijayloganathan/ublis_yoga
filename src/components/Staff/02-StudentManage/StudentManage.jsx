import React, { useEffect, useState } from "react";
import { SideMenu } from "../00-SideMenu/Sidemenu";

export default function Dashboard({ customerNavbar, toggleCustomerNavbar }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-screen flex">
      {screenWidth <= 1023 ? (
        <div
          className={`fixed flex top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out ${
            customerNavbar === "opened" ? "w-[100%]" : "w-0 ml-[-80%]"
          }`}
          style={{ overflow: "hidden" }}
        >
          <div className="w-[80%]">
            <SideMenu
              customerNavbar={customerNavbar}
              toggleCustomerNavbar={toggleCustomerNavbar}
            />
          </div>
          <div
            className="w-[20%]"
            style={{ background: "rgb(0 0 0 / 39%)" }}
          ></div>
        </div>
      ) : (
        <div className="w-[23%] h-screen">
          <SideMenu
            customerNavbar={customerNavbar}
            toggleCustomerNavbar={toggleCustomerNavbar}
          />
        </div>
      )}

      <div
        className="w-[77%] flex-grow h-full bg-[#f9f3eb] z-10"
        align="center"
      >
        <div className="w-[95%]">
          <div>
            <div className="w-[100%] mt-3 flex justify-between lg:justify-center items-center bg-[#f95005] rounded h-[60px]">
              <div className="text-[#fff] font-bold text-[20px] pl-3 lg:pl-0">
                <i className="fa-solid fa-chart-line"></i>
                &nbsp;&nbsp;&nbsp;Dashboard
              </div>
              <div className="block lg:hidden pr-2 lg:pr-0">
                <button
                  className="px-2 text-[28px] text-[#fff]"
                  onClick={toggleCustomerNavbar}
                >
                  <i class="fa-solid fa-circle-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="w-[100%] py-6 flex flex-wrap gap-x-5">
              <div
                className="w-[300px] h-[200px] bg-[#f5f7f8] flex justify-center items-center shadow-sm rounded"
                align="center"
              >
                <div className="w-[90%] h-[180px] flex flex-col items-start justify-start">
                  <div className="text-[#000] text-[20px] font-bold">
                    Pending Registeration
                  </div>
                  <div className="w-[100%] py-4" align="start">
                    <div className="text-[#f95005] text-[20px] font-semibold">
                      Class Timing
                    </div>
                    <div className="text-[#000] text-[18px] font-semibold">
                      10.00 AM - 11.00 AM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
