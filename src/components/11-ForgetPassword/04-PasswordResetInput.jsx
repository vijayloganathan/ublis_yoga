import React from "react";
import TextInput from "../../pages/Inputs/TextInput";
import NormalButton from "../../pages/Buttons/NormalButton";
import logo from "../../assets/logo/logo.jpeg";
import { useNavigate } from "react-router-dom";

const PasswordResetInput = ({ input, handleInput, handlePage }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] lg:w-[40%] h-auto bg-white rounded flex flex-col justify-center items-center">
      <div className="w-[80%]">
        <div className="w-[100%] flex justify-center">
          <img src={logo} alt="logo" className="my-3 w-[120px]" />
        </div>
        <div className="w-[100%] flex">
          <div className="w-[100%] h-[auto]">
            <h1 className="text-[#ff5001] text-[20px] lg:text-[23px] font-semibold">
              {input.email}
            </h1>
          </div>
        </div>
        <div className="w-[100%] mt-4 mb-1">
          <TextInput
            id="password"
            name="password"
            label="Password"
            placeholder="Write your message"
            required
            //   value={inputs.username}
            //   onChange={(e) => {
            //     handleinput(e);
            //   }}
          />
        </div>
        <div className="w-[100%] mt-4 mb-1">
          <TextInput
            id="repassword"
            name="repassword"
            label="Confirm Password"
            placeholder="Write your message"
            required
            //   value={inputs.username}
            //   onChange={(e) => {
            //     handleinput(e);
            //   }}
          />
        </div>
        <div className="w-[100%] mt-4 mb-4">
          <NormalButton
            onClick={() => {
              handlePage(3);
            }}
            label="Change Password"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetInput;
