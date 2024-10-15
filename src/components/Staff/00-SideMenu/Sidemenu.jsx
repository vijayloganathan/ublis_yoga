import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideMenu({
  userdetails,
  toggleCustomerNavbar,
  pages,
  handlePage,
}) {
  const navigate = useNavigate();

  const [studentsdropdown, setStudentsdropdown] = useState(false);

  return (
    <div
      className="w-[100%] bg-[#F5F7F8] h-screen overflow-auto"
      align="center"
    >
      <div className="w-[88%] h-screen flex flex-col justify-around">
        <div className="flex h-[12vh] flex-col items-center justify-center pt-0 lg:pt-3">
          <button
            className="block lg:hidden mt-[10px] ml-[90%]"
            onClick={toggleCustomerNavbar}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="font-semibold text-[18px]">
            Hi, {userdetails.username}
          </div>
        </div>
        <div className="w-[100%] h-[77vh] overflow-auto flex flex-col justify-between">
          <div className="w-[100%] flex flex-col gap-y-3">
            <button
              className={`${
                pages === "dashboard"
                  ? "flex justify-center bg-[#f95005] hover:text-[#f95005] w-[100%] text-[#fff] text-[18px] font-semibold py-2 rounded border-2 border-[#f95005] hover:bg-[#f5f7f8] transition-all duration-300"
                  : "flex justify-center bg-[#f5f7f8] hover:text-[#fff] w-[100%] text-[#868686] text-[18px] font-semibold py-2 rounded border-2 border-[#868686] hover:bg-[#868686] transition-all duration-300"
              }`}
              onClick={() => {
                handlePage("dashboard");
                toggleCustomerNavbar();
                setStudentsdropdown(false);
              }}
            >
              <div className="w-[90%] flex  justify-between">
                <div>Dashboard</div>
                <div>
                  <i className="fa-solid fa-chart-line"></i>
                </div>
              </div>
            </button>

            <div>
              <button
                className={`${
                  pages === "registration" || pages === "manage"
                    ? "flex justify-center bg-[#f95005] hover:text-[#f95005] w-[100%] text-[#fff] text-[18px] font-semibold py-2 rounded border-2 border-[#f95005] hover:bg-[#f5f7f8] transition-all duration-300"
                    : "flex justify-center bg-[#f5f7f8] hover:text-[#fff] w-[100%] text-[#868686] text-[18px] font-semibold py-2 rounded border-2 border-[#868686] hover:bg-[#868686] transition-all duration-300"
                }`}
                onClick={() => {
                  if (studentsdropdown) setStudentsdropdown(false);
                  else setStudentsdropdown(true);
                }}
              >
                <div className="w-[90%] flex  justify-between">
                  <div>Students</div>
                  <div>
                    {studentsdropdown ? (
                      <i className="fa-solid fa-caret-up"></i>
                    ) : (
                      <i className="fa-solid fa-caret-down"></i>
                    )}
                  </div>
                </div>
              </button>
              <div
                className={`w-[100%] ${studentsdropdown ? "block" : "hidden"} `}
                align="right"
              >
                <div className="w-[95%] mt-2 rounded">
                  <div
                    className="w-[100%] flex flex-col justify-center items-center"
                    align="center"
                  >
                    <div
                      onClick={() => {
                        toggleCustomerNavbar();
                        handlePage("registration");
                      }}
                      className={`w-[100%] border-2 
                      ${
                        pages === "registration"
                          ? "  bg-[#f95005] hover:text-[#f95005] text-[#fff] border-[#f95005] hover:bg-[#f5f7f8]"
                          : "bg-[#f5f7f8] hover:text-[#fff] text-[#868686] hover:bg-[#868686] border-[#868686] "
                      }   text-[18px] font-semibold rounded  transition-all duration-300`}
                    >
                      <button className="w-[90%] flex justify-between py-1 ">
                        <div>Registration</div>
                        <div>
                          <i className="fa-solid fa-user"></i>
                        </div>
                      </button>
                    </div>
                    <div
                      className={`mt-2 w-[100%] border-2 
                      ${
                        pages === "manage"
                          ? "  bg-[#f95005] hover:text-[#f95005] text-[#fff] border-[#f95005] hover:bg-[#f5f7f8]"
                          : "bg-[#f5f7f8] hover:text-[#fff] text-[#868686] hover:bg-[#868686] border-[#868686] "
                      }   text-[18px] font-semibold rounded  transition-all duration-300`}
                    >
                      <button className="w-[90%] flex justify-between py-1 ">
                        <div>Manage</div>
                        <div>
                          <i className="fa-solid fa-gears"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[10vh] justify-center items-center">
          <button
            onClick={() => {
              localStorage.removeItem("JWTtoken");
              navigate("/signin");
            }}
            className="bg-[#f95005] hover:text-[#f95005] w-[100%] text-[#fff] text-[18px] font-semibold py-2 rounded border-2 border-[#f95005] hover:bg-[#f5f7f8] transition-all duration-300"
          >
            Logout&nbsp;&nbsp;&nbsp;
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
