import React from "react";
import logo from "../../assets/logo/logo.jpeg";
import TextInput from "../../pages/Inputs/TextInput";
import NormalButton from "../../pages/Buttons/NormalButton";

const EmailInput = ({ input, handleInput, handlePage }) => {
  return (
    <div className="w-[90%] lg:w-[40%] h-auto bg-white rounded flex flex-col justify-center items-center">
      <div className="w-[80%]">
        <div className="w-[100%] flex justify-center">
          <img src={logo} alt="logo" className="my-3 w-[120px]" />
        </div>
        <div className="w-[100%]">
          <h1 className="text-[#ff5001] text-[23px] font-semibold">
            Forget Password ?
          </h1>
        </div>
        <div className="w-[100%] mt-4">
          <TextInput
            id="email"
            name="email"
            label="Email ID"
            placeholder="Write your message"
            required
            value={input.email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="w-[100%] mt-4 mb-3">
          <NormalButton
            onClick={() => {
              handlePage(2);
            }}
            label="Get OTP"
          />
        </div>
        <div className="w-[100%] mb-3 flex justify-center">
          <h1
            className="text-[#ff5001] cursor-pointer mt-3 mb-3 text-[20px] font-semibold"
            onClick={() => {
              handlePage("/signin");
            }}
          >
            Back to Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
