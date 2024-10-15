import React, { useRef, useState } from "react";
import logo from "../../../assets/logo/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import CryptoJS from "crypto-js";

const Signin = () => {
  const navigate = useNavigate();

  const [submitloadingStatus, setSubmitloadingStatus] = useState(false);

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

  const [inputs, SetInputs] = useState({ username: "", password: "" });

  const [hiddenpasswordStatus, setHiddenpasswordStatus] = useState(false);

  const [errorstatus, setErrorStatus] = useState({
    status: false,
    message: "",
  });

  const handleinput = (event) => {
    event.target.value;

    SetInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });

    setErrorStatus({
      status: false,
      message: "",
    });
  };

  const handleSignin = () => {
    if (inputs.username.length === 0) {
      setErrorStatus({
        status: true,
        message: "Enter User ID",
      });
      return 0;
    }

    if (inputs.password.length === 0) {
      setErrorStatus({
        status: true,
        message: "Enter Password",
      });
      return 0;
    }

    setSubmitloadingStatus(true);

    Axios.post(import.meta.env.VITE_API_URL + "staff/signin", {
      userid: inputs.username,
      password: inputs.password,
    }).then((res) => {
      const data = decrypt(
        res.data.encryptedData,
        res.data.iv,
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.status === "success") {
        localStorage.setItem("JWTtoken", "Bearer " + data.token + "");
        navigate("/staff");
      } else if (data.status === "error") {
        setSubmitloadingStatus(false);
        setErrorStatus({
          status: true,
          message: data.message,
        });
      }
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f9f3eb]">
      <div
        className="w-[90%] lg:w-[40%] h-[auto] lg:h-[auto] py-5 bg-[#fff] rounded"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
        align="center"
      >
        <div className=" w-[80%] lg:w-[70%]">
          <div className=" mt-2 mb-3">
            <h1 className="text-[#000] bg-[#ffff89] py-2 rounded cursor-pointer text-[15px] font-semibold">
              <i className="fa-solid fa-circle-info"></i>&nbsp;&nbsp;Only
              Authorized Person can access the Login.
            </h1>
          </div>
          <img src={logo} className="mt-2 w-[120px]" alt="logo" />
          <div className="w-[100%] mt-2" align="start">
            <div className="formContainer">
              <input
                name="username"
                value={inputs.username}
                onInput={handleinput}
                id="firstname"
                type="text"
              />
              <label htmlFor="firstname">User ID</label>
            </div>
          </div>
          <div className="flex justify-between">
            <div className=" w-[82%] lg:w-[88%] mt-3" align="start">
              <div className="formContainer">
                <input
                  name="password"
                  value={inputs.password}
                  onInput={handleinput}
                  id="firstname"
                  type={hiddenpasswordStatus ? "text" : "password"}
                />
                <label htmlFor="firstname">Password</label>
              </div>
            </div>
            <div className="w-[15%] lg:w-[10%] mt-3" align="start">
              <div className="formContainer">
                {hiddenpasswordStatus ? (
                  <button
                    className="mt-4"
                    onClick={() => {
                      setHiddenpasswordStatus(false);
                    }}
                  >
                    <i className="fa-regular fa-eye-slash"></i>
                  </button>
                ) : (
                  <button
                    className="mt-4"
                    onClick={() => {
                      setHiddenpasswordStatus(true);
                    }}
                  >
                    <i className="fa-regular fa-eye"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div
            className="mt-3 cursor-pointer font-bold text-[17px] text-[#ff5001]"
            align="end"
            onClick={() => {
              navigate("/forgetpassword");
            }}
          >
            Forgot Password ?
          </div>

          {errorstatus.status ? (
            <div className="w-full h-[50px] flex justify-center items-center mt-3">
              <div className="w-full py-2 bg-[#ED5555] text-[#fff] rounded  transition-all duration-300">
                {errorstatus.message}
              </div>
            </div>
          ) : null}

          <div>
            <div className="w-[100%] mt-3">
              {submitloadingStatus ? (
                <>
                  <svg className="loadersvg w-[30px]" viewBox="25 25 50 50">
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
                    onClick={handleSignin}
                    className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold w-[100%] py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
