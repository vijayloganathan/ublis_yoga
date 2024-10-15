import { useEffect, useState } from "react";
import Axios from "axios";
import CryptoJS from "crypto-js";

export default function Registration({ toggleCustomerNavbar }) {
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

  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    Axios.get(import.meta.env.VITE_API_URL + "staff/registration/userdata", {
      headers: {
        Authorization: localStorage.getItem("JWTtoken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const data = decrypt(
          res.data.encryptedData,
          res.data.iv,
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.status === "error") {
          if (data.message === "tokenformateinvalid") {
            navigate("/unauthorized");
          } else if (data.message === "timeexpired") {
            navigate("/timeexpired");
          }
        } else if (data.status === "success") {
          // setUseData([data.userdata[0]]);
          console.log("line 52", data.userdata[0]);
          setUserData(data.userdata[0]);
        }
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
      });
  }, []);

  const [useData, setUseData] = useState([]);

  const [searchData, useSearchData] = useState("");

  useEffect(() => {
    if (searchData.length <= 0) {
      setUseData(UserData);
    } else {
      const filteredData = UserData.filter((user) => {
        const searchTerm = searchData.toLowerCase();

        return (
          user.firstname.toLowerCase().includes(searchTerm) ||
          user.lastname.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.mobileno.toLowerCase().includes(searchTerm) ||
          user.signupTime.toLowerCase().includes(searchTerm) ||
          user.signupDate.toLowerCase().includes(searchTerm)
        );
      });

      setUseData(filteredData);
    }
  }, [searchData]);

  const [modalstatus, setModalStatus] = useState(false);

  const [modalData, setModalData] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      mobileno: "",
    },
  ]);

  return (
    <div className="w-[100%]">
      {modalstatus ? (
        <div className="w-[100%] lg:w-[77%] h-screen blur-[0.2px] bg-[#000000ad] flex justify-center items-center absolute z-10">
          <div className="w-[90%] h-[90vh] rounded bg-[white]">
            <div className="text-[red] pt-2 pb-1 text-[20px]" align="center">
              <div className="w-[95%] h-[8vh] pb-1 flex items-center justify-between">
                <div className="text-[20px] text-[#000] font-semibold">
                  Registration Form
                </div>
                <div>
                  <i
                    onClick={() => {
                      setModalStatus(false);
                    }}
                    className=" cursor-pointer pb-2 fa-solid fa-xmark"
                  ></i>
                </div>
              </div>
              <div className="w-[100%]">
                <hr className="text-[#000]" />
              </div>
              <div
                className="w-[100%] h-[70vh] flex flex-col items-center overflow-x-auto"
                align="center"
              >
                <div className="w-[95%] flex justify-between mt-3">
                  <div className="w-[48%]">
                    <div className="formContainer">
                      <input
                        value={modalData.firstname}
                        name="username"
                        id="firstname"
                        type="text"
                      />
                      <label htmlFor="firstname">First Name</label>
                    </div>
                  </div>
                  <div className="w-[48%]">
                    <div className="formContainer">
                      <input
                        value={modalData.lastname}
                        name="username"
                        id="firstname"
                        type="text"
                      />
                      <label htmlFor="firstname">Last Name</label>
                    </div>
                  </div>
                </div>
                <div className="w-[95%] mt-3">
                  <div className="formContainer">
                    <input
                      value={modalData.email}
                      name="username"
                      id="firstname"
                      type="text"
                    />
                    <label htmlFor="firstname">Email</label>
                  </div>
                </div>
                <div className="w-[95%] mt-3">
                  <div className="formContainer">
                    <input
                      value={modalData.mobileno}
                      name="username"
                      id="firstname"
                      type="text"
                    />
                    <label htmlFor="firstname">Mobile Number</label>
                  </div>
                </div>
                <div className="w-[95%] mt-3">
                  <div className="formContainer">
                    <input name="username" id="firstname" type="text" />
                    <label htmlFor="firstname">Branch</label>
                  </div>
                </div>
                <div className="w-[95%] mt-3">
                  <div className="formContainer">
                    <textarea />
                    <label htmlFor="firstname">Address</label>
                  </div>
                </div>
              </div>
              <div className="w-[100%] mt-2">
                <hr className="text-[#000]" />
              </div>
              <div className="h-[10vh] flex justify-center items-center w-[100%]">
                <div className=" cursor-pointer  bg-[#f95005] hover:text-[#f95005] w-[300px] text-[#fff] text-[18px] font-semibold py-2 rounded border-2 border-[#f95005] hover:bg-[#f5f7f8] transition-all duration-300">
                  Register
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-[95%]">
        <div className="h-[25vh] flex flex-col justify-between">
          <div className="w-[100%] mt-3 flex justify-between lg:justify-center items-center bg-[#f95005] rounded h-[60px]">
            <div className="text-[#fff] font-bold text-[20px] pl-3 lg:pl-0">
              <i className="fa-solid fa-user"></i>
              &nbsp;&nbsp;&nbsp;Registration
            </div>
            <div className="block lg:hidden pr-2 lg:pr-0">
              <button
                className="px-2 text-[28px] text-[#fff]"
                onClick={toggleCustomerNavbar}
              >
                <i className="fa-solid fa-circle-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="w-[100%] flex gap-x-5">
            <div
              className={` ${
                searchData.length > 0 ? "w-[90%] lg:w-[96%]" : "w-[100%]"
              }`}
              align="start"
            >
              <div className="formContainer">
                <input
                  id="firstname"
                  name="searchdata"
                  value={searchData}
                  onInput={(event) => {
                    useSearchData(event.target.value);
                  }}
                  type="text"
                />
                <label htmlFor="firstname">Seacrh User Data</label>
              </div>
            </div>
            <div
              className={`${
                searchData.length > 0 ? "w-[10%] lg:w-[4%] block" : "hidden"
              } mt-4`}
            >
              <button
                onClick={() => {
                  useSearchData("");
                }}
                className="text-[28px] text-[#b3b4b6]"
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[70vh] mt-3 flex flex-col gap-y-5 overflow-auto">
          {useData.length > 0 ? (
            <>
              {useData.map((element, index) => (
                <div
                  key={index}
                  className="w-[100%] flex justify-center h-[auto] lg:h-[150px] bg-[#f5f7f8] rounded shadow-sm"
                >
                  <div className="w-[95%] flex flex-col lg:flex-row">
                    <div className="w-[100%] lg:w-[80%] flex flex-col lg:flex-row">
                      <div
                        className="w-[100%] lg:w-[80%] mt-4 mb-4 lg:mb-0 lg:mt-0 py-1 lg:py-4"
                        align="start"
                      >
                        <h1 className="text-[16px] font-semibold">
                          <i className="fa-regular fa-user"></i>&nbsp;&nbsp;
                          {element.firstname} {element.lastname}
                        </h1>
                        <h1 className="text-[16px] mt-2 font-semibold">
                          <i className="fa-regular fa-envelope"></i>
                          &nbsp;&nbsp;{element.email}
                        </h1>
                        <h1 className="text-[16px] mt-2 font-semibold">
                          <i className="fa-solid fa-phone"></i>
                          &nbsp;&nbsp;{element.mobileno}
                        </h1>
                        <h1 className="text-[16px] mt-2 font-semibold">
                          Signup At: {element.signupDate}{" "}
                          <span className="text-[#f95005]">
                            ( {element.signupTime} )
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="w-[100%] lg:w-[20%] flex flex-col items-center justify-center">
                      <button
                        onClick={() => {
                          setModalStatus(true);
                          setModalData({
                            firstname: element.firstname,
                            lastname: element.lastname,
                            email: element.email,
                            mobileno: element.mobileno,
                          });
                        }}
                        className="w-[95%] bg-[#209E24] border-3 border-[#209E24] text-[#fff] text-[18px] font-semibold  hover:bg-[#f5f7f8] hover:text-[#209E24] rounded py-2 transition-all duration-300"
                      >
                        Register
                      </button>
                      <button className="w-[95%] bg-[#FF0000] border-3 mb-5 mt-2 lg:mb-0 border-[#FF0000] text-[#fff] text-[18px] font-semibold  hover:bg-[#f5f7f8] hover:text-[#FF0000] rounded py-2 transition-all duration-300">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h1 className="text-[18px] font-semibold">No Data Found</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
