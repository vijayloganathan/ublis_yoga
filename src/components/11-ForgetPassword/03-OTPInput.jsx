import React from "react";
import TextInput from "../../pages/Inputs/TextInput";
import NormalButton from "../../pages/Buttons/NormalButton";
import logo from "../../assets/logo/logo.jpeg";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ input, handleInput, handlePage }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] lg:w-[40%] h-auto bg-white rounded flex flex-col justify-center items-center">
      <div className="w-[80%]">
        <div className="w-[100%] flex justify-center">
          <img src={logo} alt="logo" className="my-3 w-[120px]" />
        </div>

        <div className="w-[100%] flex">
          <div
            onClick={() => {
              handlePage(1);
            }}
            className="w-[10%] cursor-pointer lg:w-[7%] h-[auto] flex justify-start text-[20px] font-semibold items-center"
          >
            <i class="mt-1 fa-regular fa-pen-to-square"></i>
          </div>
          <div className="w-[90%] h-[auto]">
            <h1 className="text-[#ff5001] text-[20px] lg:text-[23px] font-semibold">
              {input.email}
            </h1>
          </div>
        </div>
        <div className="w-[100%] mt-4 mb-1">
          <TextInput
            id="otp"
            name="otp"
            label="Enter OTP"
            placeholder="Write your message"
            required
            //   value={inputs.username}
            //   onChange={(e) => {
            //     handleinput(e);
            //   }}
          />
        </div>
        <div className="w-[100%] flex justify-end">
          <div className="text-[16px] font-semibold cursor-pointer">
            Resend OTP
          </div>
        </div>
        <div className="w-[100%] mt-4 mb-3">
          <NormalButton
            onClick={() => {
              handlePage(3);
            }}
            label="Submit"
          />
        </div>
        <div className="w-[100%] mb-3 flex justify-center">
          <h1
            className="text-[#ff5001] cursor-pointer mt-3 mb-3 text-[20px] font-semibold"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Back to Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
