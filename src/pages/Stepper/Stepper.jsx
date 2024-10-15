import React, { useState } from "react";
import "./Stepper.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import CryptoJS from "crypto-js";
import TextInput from "../Inputs/TextInput";
import PasswordInput from "../Inputs/PasswordInput";
import ErrorMessage from "../Messages/ErrorMessage";

export const Stepper = () => {
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

  const [stepperactive, setStepperactive] = useState(1);

  // const handleNext = () => {
  //   setStepperactive((prev) => (prev < 2 ? prev + 1 : prev));
  // };

  const handleBack = () => {
    setStepperactive((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [input, setInput] = useState({
    fname: "",
    lname: "",
    dob: "",
    age: "",
    phoneno: "",
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const handleinput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setFormerror1({
      errorstatus: false,
      errormessage: "",
    });

    setFormerror2({
      errorstatus: false,
      errormessage: "",
    });
  };

  const handleinputdob = (event) => {
    const dobValue = event.target.value;

    const calculateAge = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    const age = calculateAge(dobValue);

    setInput({
      ...input,
      [event.target.name]: dobValue,
      age: age >= 0 ? age : "",
    });
  };

  const [hiddenpasswordStatus, setHiddenpasswordStatus] = useState(false);

  const [submitloadingStatus, setSubmitloadingStatus] = useState(false);

  const [successState, setSuccessState] = useState(false);

  const [formerror1, setFormerror1] = useState({
    errorstatus: false,
    errormessage: "",
  });

  const submitform1 = () => {
    if (input.fname.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter First Name",
      });

      return 0;
    }

    if (input.lname.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Last Name",
      });

      return 0;
    }

    if (input.dob.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Date of Birth",
      });

      return 0;
    }

    if (input.phoneno.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Mobile Number",
      });

      return 0;
    }

    if (input.phoneno.length != 10) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Valid Mobile Number",
      });

      return 0;
    }

    if (input.email.length <= 0) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Email",
      });

      return 0;
    }

    if (!verifyEmail(input.email)) {
      setFormerror1({
        errorstatus: true,
        errormessage: "Enter Valid Email",
      });

      return 0;
    }

    setStepperactive((prev) => (prev < 2 ? prev + 1 : prev));
  };

  function verifyEmail(email) {
    // Regular expression for validating an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the pattern
    return emailPattern.test(email);
  }

  const [formerror2, setFormerror2] = useState({
    errorstatus: false,
    errormessage: "",
  });

  const submitform2 = () => {
    if (input.username.length < 6) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Username Must be Above 6 Characters",
      });

      return 0;
    }

    if (input.password.length <= 0) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Enter Password",
      });

      return 0;
    }

    if (input.password.length < 8) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Password Should be in Minimum 8 characters",
      });

      return 0;
    }

    if (input.repassword.length <= 0) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Enter Confirm Password",
      });

      return 0;
    }

    if (input.repassword != input.password) {
      setFormerror2({
        errorstatus: true,
        errormessage: "Confirm Password Dosen't Match",
      });

      return 0;
    }

    setSubmitloadingStatus(true);

    Axios.post(import.meta.env.VITE_API_URL + "users/signup", {
      temp_su_fname: input.fname,
      temp_su_lname: input.lname,
      temp_su_dob: input.dob,
      temp_su_age: input.age,
      temp_su_phone: input.phoneno,
      temp_su_email: input.email,
      temp_su_username: input.username,
      temp_su_password: input.password,
    })
      .then((res) => {

        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.success) {
          console.log("True part");
          setSuccessState(true);
          setTimeout(() => {
            navigate("/signin");
          }, 1500);
        } else {
          // If status is false in the response or an error status, handle it
          console.log("False part");
          setSubmitloadingStatus(false); // Turn off the loading spinner
          setFormerror2({
            errorstatus: true,
            errormessage:
              data.message || "An error occurred during signup.",
          });
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.error("Error: ", err);
        setSubmitloadingStatus(false); // Turn off the loading spinner
        setFormerror2({
          errorstatus: true,
          errormessage:
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="w-[100%]">
      <div
        className="w-[100%] rounded bg-[#fff]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
      >
        {stepperactive === 1 && (
          <>
            <h1 className="pt-4 text-[#ff5001] text-[25px] font-bold">
              Your Personal Deatils
            </h1>
            <div className="w-[100%] h-[45vh] flex flex-col justify-center">
              <div className="w-[100%]" align="center">
                <div className="w-[90%] mb-4 lg:w-[80%] flex justify-between">
                  <div className="w-[49%]" align="start">
                    <TextInput
                      id="firstname"
                      name="fname"
                      type="text"
                      label="First Name"
                      placeholder="Write your message"
                      required
                      value={input.fname}
                      onChange={handleinput}
                    />
                  </div>
                  <div className="w-[49%] relative">
                    <TextInput
                      id="lastname"
                      name="lname"
                      type="text"
                      label="Last Name"
                      placeholder="Write your message"
                      required
                      value={input.lname}
                      onChange={handleinput}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%]" align="center">
                <div className="w-[90%] mb-3 lg:w-[80%] flex justify-between">
                  <div className="w-[49%]" align="start">
                    <TextInput
                      id="phoneno"
                      name="phoneno"
                      type="tel"
                      label="Phone Number"
                      placeholder="Write your message"
                      required
                      value={input.phoneno}
                      onChange={handleinput}
                    />
                  </div>
                  <div className="w-[49%] relative">
                    <TextInput
                      id="dob"
                      name="dob"
                      type="date"
                      label="Date of Birth"
                      placeholder="Write your message"
                      required
                      value={input.dob}
                      onChange={handleinputdob}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%]" align="start">
                    <TextInput
                      id="email"
                      name="email"
                      label="Email ID"
                      placeholder="Write your message"
                      required
                      value={input.email}
                      onChange={handleinput}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full -mt-10 font-semibold">
              <div className="w-[90%] lg:w-[80%] transition-all duration-300">
                {formerror1.errorstatus ? (
                  <ErrorMessage message={formerror1.errormessage} />
                ) : null}
              </div>
            </div>
            <div className="w-[100%]" align="center">
              <div className="w-[80%]" align="end">
                <button
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  onClick={submitform1}
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
        {stepperactive === 2 && (
          <>
            <h1 className="pt-4 text-[#ff5001] text-[25px] font-bold">
              Your Login Details
            </h1>
            <div className="w-[100%] h-[45vh] flex flex-col justify-center">
              <div className="w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%]" align="start">
                    <TextInput
                      id="username"
                      name="username"
                      label="Username"
                      placeholder="Write your message"
                      required
                      value={input.username}
                      onChange={handleinput}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%] mt-4" align="start">
                    <PasswordInput
                      id="password"
                      name="password"
                      label="Password"
                      value={input.password}
                      onChange={handleinput}
                      helperText="Password should be at least 8 characters."
                      maxLength={30}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[100%]" align="center">
                <div className="w-[90%] lg:w-[80%] flex justify-between">
                  <div className="w-[100%] mt-4" align="start">
                    <PasswordInput
                      id="repassword"
                      name="repassword"
                      label="Confirm Password"
                      value={input.repassword}
                      onChange={handleinput}
                      helperText="Password should be at least 8 characters."
                      maxLength={30}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full -mt-10 font-semibold">
              <div className="w-[90%] lg:w-[80%] transition-all duration-300">
                {formerror2.errorstatus ? (
                  <ErrorMessage message={formerror2.errormessage} />
                ) : null}
              </div>
            </div>
            <div className="w-[100%]" align="center">
              {successState ? (
                <div className="w-[80%] flex justify-center " align="center">
                  <div className="w-[100%] bg-green-400 text-[#ffffff] text-[16x] font-bold my-3 rounded py-2">
                    Your Account Successfully Registered
                  </div>
                </div>
              ) : (
                <div className="w-[80%] flex justify-end">
                  {submitloadingStatus ? (
                    <>
                      <svg className="loadersvg my-4" viewBox="25 25 50 50">
                        <circle
                          className="loadercircle"
                          r="20"
                          cy="50"
                          cx="50"
                        ></circle>
                      </svg>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                        onClick={handleBack}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                        &nbsp;&nbsp;Back
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                        onClick={submitform2}
                      >
                        Sign Up&nbsp;&nbsp;
                        <i className="fa-solid fa-thumbs-up"></i>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
