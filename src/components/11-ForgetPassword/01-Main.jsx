import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "./02-EmailInput";
import OTPInput from "./03-OTPInput";
import PasswordResetInput from "./04-PasswordResetInput";

const Main = () => {
  const navigate = useNavigate();
  const [pagestate, setPageState] = useState(1);
  const handlePage = (state) => {
    setPageState(state);
  };

  const [input, setInput] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="w-full h-screen bg-[#f9f3eb] flex justify-center items-center">
      {pagestate === 1 ? (
        <EmailInput
          input={input}
          handleInput={handleInput}
          handlePage={handlePage}
        />
      ) : null}
      {pagestate === 2 ? (
        <OTPInput
          input={input}
          handleInput={handleInput}
          handlePage={handlePage}
        />
      ) : null}
      {pagestate === 3 ? (
        <PasswordResetInput
          input={input}
          handleInput={handleInput}
          handlePage={handlePage}
        />
      ) : null}
    </div>
  );
};

export default Main;
