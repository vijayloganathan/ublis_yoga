import React, { useEffect, useState } from "react";
import SideMenu from "../00-SideMenu/Sidemenu";
import { Dashboard } from "../01-Dashboard/Dashboard";
import Registration from "../02-StudentManage/Registration";
import Axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export default function Main() {
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

  const navigate = useNavigate();
  const [navbarStatus, setNavbarstatus] = useState("closed");

  const toggleCustomerNavbar = () => {
    setNavbarstatus((prevState) =>
      prevState === "closed" ? "opened" : "closed"
    );
  };

  const [pages, setPages] = useState("dashboard");
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

  const [userdetails, setUserdetails] = useState({
    username: "",
    userid: "",
  });

  useEffect(() => {
    console.log(pages);

    Axios.post(
      import.meta.env.VITE_API_URL + "staff/verify",
      {},
      {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
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
        setUserdetails({
          username: data.username,
          userid: data.userid,
        });
      }
    });
  }, [pages]);

  const handlePage = (page) => {
    setPages(page);
  };

  return (
    <>
      <div className="w-full h-screen flex">
        {screenWidth <= 1023 ? (
          <div
            className={`fixed flex top-0 left-0 h-full z-20 transition-all duration-300 ease-in-out ${
              navbarStatus === "opened" ? "w-[100%]" : "w-0 ml-[-80%]"
            }`}
            style={{ overflow: "hidden" }}
          >
            <div className="w-[80%]">
              <SideMenu
                userdetails={userdetails}
                toggleCustomerNavbar={toggleCustomerNavbar}
                pages={pages}
                handlePage={handlePage}
              />
            </div>
            <div
              className="w-[20%]"
              style={{ background: "rgba(0, 0, 0, 0.39)" }}
              onClick={toggleCustomerNavbar} // Close sidebar when clicking outside
            ></div>
          </div>
        ) : (
          <div className="w-[23%] h-screen">
            <SideMenu
              userdetails={userdetails}
              toggleCustomerNavbar={toggleCustomerNavbar}
              pages={pages}
              handlePage={handlePage}
            />
          </div>
        )}

        <div
          className="w-[77%] flex-grow h-full bg-[#f9f3eb] z-10"
          align="center"
        >
          <div className="w-[100%]">
            {pages === "dashboard" ? (
              <Dashboard toggleCustomerNavbar={toggleCustomerNavbar} />
            ) : pages === "registration" ? (
              <Registration toggleCustomerNavbar={toggleCustomerNavbar} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
