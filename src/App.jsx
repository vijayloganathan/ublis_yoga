import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// COMPONENTS
import Header from "./components/00-Header/Header";
import Home from "./components/01-Home/Home";
import About from "./components/02-About/About";
import Class from "./components/03-Class/Class";
import Gallery from "./components/04-Gallery/Gallery";
import Contact from "./components/05-Contact/Contact";
import Footer from "./components/06-Footer/Footer";
import ScrollToTop from "./pages/ScrollTop/ScrollToTop";

// CSS
import "./App.css";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";
import { Signin } from "./components/07-Signin/Signin";
import Signup from "./components/08-Signup/Signup";
import StudentMain from "./components/09-Student/0-Main/Main";
import Main from "./components/11-ForgetPassword/01-Main";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      mirror: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <div className="relative z-0">
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/class" element={<Class />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student" element={<StudentMain />} />
            <Route path="/forgetpassword" element={<Main />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
