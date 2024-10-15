import React, { useState } from "react";
import logo from "../../assets/logo/logo.jpeg";
import { useNavigate } from "react-router-dom";
import TextInput from "../../pages/Inputs/TextInput";
import PasswordInput from "../../pages/Inputs/PasswordInput";
import NormalButton from "../../pages/Buttons/NormalButton";
import ErrorMessage from "../../pages/Messages/ErrorMessage";
import Axios from "axios";
import CryptoJS from "crypto-js";

export const Signin = () => {
  const navigate = useNavigate();

  const decrypt = (encryptedData, iv, key) => {
    const decrypted = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Hex.parse(encryptedData),
      },
      CryptoJS.enc.Hex.parse(key),
      {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Convert decrypted data to UTF-8 string and then parse it as JSON
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    // Parse the string into a JSON object
    return JSON.parse(decryptedString);
  };

  const [inputs, SetInputs] = useState({
    username: "",
    password: "",
  });

  const [errorstatus, setErrorStatus] = useState({
    errorstatus: false,
    errormessage: "",
  });

  const handleinput = (event) => {
    setErrorStatus({
      errorstatus: false,
      errormessage: "",
    });

    SetInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handlesubmit = () => {
    if (inputs.username.length <= 0) {
      setErrorStatus({
        errorstatus: true,
        errormessage: "Enter Username",
      });
      return;
    }

    if (inputs.password.length <= 0) {
      setErrorStatus({
        errorstatus: true,
        errormessage: "Enter Password",
      });
      return;
    }

    Axios.post(import.meta.env.VITE_API_URL + "users/login", {
      username: inputs.username,
      password: inputs.password,
    })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log(data);

        if (data.success) {
          localStorage.setItem("JWTtoken", "Bearer " + data.token + "");
          navigate("/");
        } else {
          setErrorStatus({
            errorstatus: true,
            errormessage: data.message || "Something Went Wrong Try Again.",
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorStatus({
            errorstatus: true,
            errormessage: "Username or Password is Incorrect",
          });
        } else {
          setErrorStatus({
            errorstatus: true,
            errormessage:
              err.response?.data?.message ||
              "Something went wrong. Please try again.",
          });
        }
        console.error("Error: ", err);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f9f3eb]">
      <div
        className="w-[90%] lg:w-[40%] h-[auto] lg:h-[auto] bg-[#fff] rounded"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
        align="center"
      >
        <div className="w-[80%] lg:w-[70%]">
          <img src={logo} className="mt-2 w-[120px]" alt="logo" />
          <div className="w-[100%] mt-4" align="start">
            <TextInput
              id="userid"
              name="username"
              label="Username"
              placeholder="Enter your username"
              value={inputs.username}
              onChange={(e) => {
                handleinput(e);
              }}
            />
          </div>
          <div className="w-[100%] my-4" align="start">
            <PasswordInput
              id="passwordField"
              name="password"
              label="Password"
              value={inputs.password}
              onChange={(e) => {
                handleinput(e);
              }}
              helperText="Password should be at least 8 characters."
              maxLength={30}
            />
          </div>
          <div
            className="-mt-3 cursor-pointer font-bold text-[17px] text-[#ff5001]"
            align="end"
            onClick={() => {
              navigate("/forgetpassword");
            }}
          >
            Forgot Password?
          </div>
          <div className="mt-2">
            {errorstatus.errorstatus ? (
              <ErrorMessage message={errorstatus.errormessage} />
            ) : null}
          </div>
          <div className="w-[100%] mt-3">
            <NormalButton
              onClick={() => {
                handlesubmit();
              }}
              label="Sign In"
            />
          </div>
          <div className="mt-4">
            <h1
              className="text-[#000] cursor-pointer text-[18px] font-semibold"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Don't have an Account? Sign Up
            </h1>
            <h1
              className="text-[#ff5001] cursor-pointer mt-3 mb-3 text-[20px] font-semibold"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Site{" "}
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
