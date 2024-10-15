import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import TextInput from "../Inputs/TextInput";
import SelectInput from "../Inputs/SelectInput";
import TextareaInput from "../Inputs/TextareaInput";
import CheckboxInput from "../Inputs/CheckboxInput";
import RadioButton from "../Inputs/RadiobuttonInput";
import RadiobuttonInput from "../Inputs/RadiobuttonInput";
import TextLabel from "../Labels/TextLabel";
import Axios from "axios";
import CryptoJS from "crypto-js";

const RegistrationStepper = () => {
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    userid: "",
    email: "",
    fname: "",
    lname: "",
    phoneno: "",
    whatsappno: "",
    dob: "",
    age: "",
    gender: "",
    caretakername: "",
    qualification: "",
    occupation: "",
    addressboth: false,
    tempaddess: "",
    tempstate: "",
    tempcity: "",
    tempincode: "",
    peraddress: "",
    perstate: "",
    percity: "",
    perpincode: "",
    height: "",
    weight: "",
    bloodgroup: "",
    bmi: "",
    bp: "",
    injuries: "",
    breaks: "",
    activities: "",
    anthingelse: "",
    preferabletiming: "",
    others: "",
    medicaldetails: "",
    doctorname: "",
    hospitalname: "",
    painscale: "",
    duration: "",
    past: "",
    family: "",
    therapyanything: "",
  });

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

  const handleNext = () => {
    setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const handleBack = () => {
    setStepperactive((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [addessschecked, setAddressChecked] = useState(false);
  const [agreementchecked, setAgreementchecked] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // Fetch states when component mounts (you can replace 'IN' with any country code)
  useEffect(() => {
    const countryStates = State.getStatesOfCountry("IN"); // 'IN' for India
    setStates(countryStates);
  }, []);

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    if (stateCode) {
      const stateCities = City.getCitiesOfState("IN", stateCode); // 'IN' for India
      setCities(stateCities);
    } else {
      setCities([]); // Reset cities if no state is selected
    }

    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const [selectedOption, setSelectedOption] = useState({
    accident: "",
    breaks: "",
    care: "",
    backpain: "",
  });

  const [preferableTiming, setPreferableTiming] = useState([]);

  const [personalHealthProblem, setPersonalHealthProblem] = useState([]);

  const timingOptions = Object.entries(preferableTiming).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  useEffect(() => {
    Axios.get(
      import.meta.env.VITE_API_URL + "profile/passRegisterData",
      {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json",
        },
      },
      {}
    )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.success) {
          localStorage.setItem("JWTtoken", "Bearer " + data.token + "");
          setPreferableTiming(data.data.PreferableTiming);
          setInputs({
            ...inputs,
            fname: data.data.ProfileData.fname,
            lname: data.data.ProfileData.lname,
            userid: data.data.ProfileData.username,
            dob: data.data.ProfileData.dob,
            age: data.data.ProfileData.age,
            email: data.data.ProfileData.email,
            phoneno: data.data.ProfileData.phone,
          });

          // Map personal health problem data into the required structure
          const healthConditions = Object.entries(
            data.data.presentHealthProblem
          ).map(([value, label]) => ({
            label,
            value: Number(value), // Ensure the value is a number
            checked: 0, // Set default checked value as 0
          }));

          // Set the mapped conditions
          setConditions(healthConditions);
        }
      })
      .catch((err) => {
        // Catching any 400 status or general errors
        console.error("Error: ", err);
      });
  }, []); // Ensure the effect runs only once on component mount

  const [conditions, setConditions] = useState([]); // Start with an empty array since conditions will be set after the API call

  // Function to handle checkbox changes
  const handleCheckboxChange = (index) => {
    console.log("index", index);

    // Update conditions with the checked status
    setConditions((prevConditions) =>
      prevConditions.map((condition, i) =>
        i === index
          ? { ...condition, checked: condition.checked === 1 ? 0 : 1 }
          : condition
      )
    );

    // Get the value of the selected condition
    const selectedCondition = conditions[index].value;

    // Update the personalHealthProblem array based on the checkbox state
    setPersonalHealthProblem((prevHealthProblems) => {
      // Check if the condition is already in the array (checked)
      if (conditions[index].checked === 1) {
        // If unchecked, remove the condition from the array
        return prevHealthProblems.filter((item) => item !== selectedCondition);
      } else {
        // If checked, add the condition to the array
        return [...prevHealthProblems, selectedCondition];
      }
    });
  };

  const handleInput = (e) => {
    console.log(e.target.name);

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    setLoading(false);

    Axios.post(
      import.meta.env.VITE_API_URL + "profile/RegisterData",
      {
        refStId: 15,
        address: {
          addresstype: inputs.addressboth,
          refAdAdd1: inputs.peraddress,
          refAdArea1: "",
          refAdCity1: inputs.percity,
          refAdState1: inputs.perstate,
          refAdPincode1: inputs.perpincode,
          refAdAdd2: inputs.tempaddess,
          refAdArea2: "",
          refAdCity2: inputs.tempcity,
          refAdState2: inputs.tempstate,
          refAdPincode2: inputs.tempincode,
        },
        personalData: {
          ref_su_gender: inputs.gender,
          ref_su_qulify: inputs.qualification,
          ref_su_occu: inputs.occupation,
          ref_su_guardian: inputs.caretakername,
          ref_su_timing: inputs.preferabletiming,
          ref_su_Whatsapp: inputs.whatsappno,
        },
        generalhealth: {
          refHeight: inputs.height,
          refWeight: inputs.weight,
          refBlood: inputs.bloodgroup,
          refBMI: inputs.bmi,
          refBP: inputs.bp,
          refRecentInjuries: selectedOption.accident === "yes" ? true : false,
          refRecentInjuriesReason: inputs.injuries,
          refRecentFractures: selectedOption.breaks === "yes" ? true : false,
          refRecentFracturesReason: inputs.breaks,
          refOthers: inputs.activities,
          refElse: inputs.anthingelse,
          refOtherActivities: inputs.others,
          refPresentHealth: personalHealthProblem, // Now this will contain the selected health issues
          refMedicalDetails: inputs.medicaldetails,
          refUnderPhysicalCare: selectedOption.care === "yes" ? true : false,
          refDoctor: inputs.doctorname,
          refHospital: inputs.hospitalname,
          refBackPain:
            selectedOption.backpain === "no" ? "No" : inputs.painscale,
          refProblem: inputs.duration,
          refPastHistory: inputs.past,
          refFamilyHistory: inputs.family,
          refAnythingelse: inputs.therapyanything,
        },
      },
      {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.success) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  return (
    <div className="w-[100%] lg:w-[100%] h-[100vh]  blur-[0.2px] bg-[#000000ad] flex justify-center items-center absolute z-50">
      <div
        className="w-[95%] lg:w-[70%] h-[90vh] bg-white rounded shadow-sm"
        align="center"
      >
        {stepperactive === 1 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                  Personal Details
                </h1>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-y-auto">
                <div className="w-[90%] mb-4 mt-3" align="start">
                  <TextInput
                    id="userid"
                    type="text"
                    name="userid"
                    placeholder="your name"
                    label="Username *"
                    required
                    readonly
                    value={inputs.userid}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%] mb-4" align="start">
                  <TextInput
                    id="emailid"
                    type="email"
                    name="email"
                    placeholder="your name"
                    label="Email ID *"
                    required
                    value={inputs.email}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div
                  className="w-[90%] mb-4 flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="fname"
                      type="text"
                      name="fname"
                      placeholder="your name"
                      label="First Name *"
                      required
                      value={inputs.fname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="lname"
                      type="text"
                      name="lname"
                      placeholder="your name"
                      label="Last Name *"
                      required
                      value={inputs.lname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-4 flex flex-wrap gap-y-5 justify-between"
                  align="start"
                >
                  <div className="w-[100%] lg:w-[40%]">
                    <TextInput
                      id="phonenumber"
                      type="tel"
                      name="phoneno"
                      placeholder="your name"
                      label="Phone Number *"
                      required
                      value={inputs.phoneno}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[75%] lg:w-[40%]">
                    <TextInput
                      id="whatsappno"
                      type="tel"
                      name="whatsappno"
                      placeholder="your name"
                      label="Whatsapp Number"
                      // required
                      value={inputs.whatsappno}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setInputs({
                        ...inputs,
                        whatsappno: inputs.phoneno,
                      });
                    }}
                    className="w-[20%] lg:w-[10%] border-2 border-[#ff621b] bg-[#ff621b] text-[#fff] hover:bg-[#fff] hover:text-[#ff621b] transition-all duration-300 cursor-pointer font-bold rounded text-center text-[11px] flex justify-center items-center"
                  >
                    Use Same Number
                  </div>
                </div>

                <div
                  className="w-[90%] mb-4 flex justify-between"
                  align="start"
                >
                  <div className="w-[68%]">
                    <TextInput
                      id="dob"
                      type="date"
                      name="dob"
                      placeholder="your name"
                      label="Date of Birth *"
                      required
                      value={inputs.dob}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[28%]">
                    <TextInput
                      id="age"
                      type="tel"
                      name="age"
                      placeholder="your name"
                      label="Age *"
                      value={inputs.age}
                      required
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>
                <div
                  className="w-[90%] mb-4 flex justify-between"
                  align="start"
                >
                  <SelectInput
                    id="gender"
                    name="gender"
                    label="Gender *"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    required
                    value={inputs.gender}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-4" align="start">
                  <TextInput
                    id="father"
                    type="text"
                    name="caretakername"
                    placeholder="your name"
                    label="Father / Husband Name *"
                    required
                    value={inputs.caretakername}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div
                  className="w-[90%] mb-4 flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="qualification"
                      type="text"
                      name="qualification"
                      placeholder="your name"
                      label="Qualification"
                      // required
                      value={inputs.qualification}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="occupation"
                      type="text"
                      name="occupation"
                      placeholder="your name"
                      label="Occupation"
                      // required
                      value={inputs.occupation}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>
                <div
                  className="w-[90%] mb-4 flex justify-between items-center"
                  align="start"
                >
                  <CheckboxInput
                    checked={addessschecked}
                    id="bothaddress"
                    label="Use Communication Address & Permanent Address as Same."
                    onChange={() => {
                      if (addessschecked) {
                        setAddressChecked(false);
                        setInputs({
                          ...inputs,
                          addressboth: false,
                        });
                      } else {
                        setAddressChecked(true);
                        setInputs({
                          ...inputs,
                          addressboth: true,
                        });
                      }
                    }}
                  />
                </div>

                <div
                  className="w-[90%] mb-2 flex flex-col justify-between"
                  align="start"
                >
                  <div className="w-full" align="center">
                    <label className="text-[#45474b] mb-4 text-[18px] font-semibold">
                      Permanent Address
                    </label>
                    <div className="mb-3">
                      <TextareaInput
                        id="tempaddress"
                        name="peraddress"
                        label="Residental Address *"
                        placeholder="Write your message"
                        rows={3}
                        required
                        value={inputs.peraddress}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <div
                      className="w-[100%] mb-4 flex justify-between"
                      align="start"
                    >
                      <div className="w-[48%]">
                        <div className="relative w-full">
                          <select
                            id="perstate"
                            name="perstate"
                            required
                            value={inputs.perstate}
                            onChange={handleStateChange}
                            className="relative w-full h-11 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled selected></option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="permanentstate"
                            className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-[14px] text-[#4c4c4e] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:-top-2 peer-valid:text-[14px] peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                          >
                            State *
                          </label>
                        </div>
                      </div>

                      <div className="w-[48%]">
                        <div className="relative w-full">
                          <select
                            id="permanentcity"
                            name="percity"
                            required
                            value={inputs.percity}
                            onChange={(e) => {
                              setInputs({
                                ...inputs,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            disabled={!selectedState}
                            className="relative w-full h-11 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          >
                            <option value="" disabled selected></option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="permanentcity"
                            className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-[14px] text-[#4c4c4e] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:-top-2 peer-valid:text-[14px] peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                          >
                            City *
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] mb-4" align="start">
                      <TextInput
                        id="perpincode"
                        type="tel"
                        name="perpincode"
                        placeholder="your name"
                        label="Pincode *"
                        required
                        value={inputs.perpincode}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                  </div>

                  {!addessschecked ? (
                    <div className="w-full" align="center">
                      <label className="text-[#45474b] mb-4 text-[18px] font-semibold">
                        Communication Address
                      </label>
                      <div className="w-[100%] mb-3">
                        <TextareaInput
                          id="tempaddress"
                          name="tempaddess"
                          label="Residental Address *"
                          placeholder="Write your message"
                          rows={3}
                          required
                          value={inputs.tempaddess}
                          onChange={(e) => handleInput(e)}
                        />
                      </div>
                      <div
                        className="w-[100%] mb-4 flex justify-between"
                        align="start"
                      >
                        <div className="w-[48%]">
                          <div className="relative w-full">
                            <select
                              id="tempstate"
                              name="tempstate"
                              required
                              onChange={handleStateChange}
                              value={inputs.tempstate}
                              className="relative w-full h-11 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                            >
                              <option value="" disabled selected></option>
                              {states.map((state) => (
                                <option
                                  key={state.isoCode}
                                  value={state.isoCode}
                                >
                                  {state.name}
                                </option>
                              ))}
                            </select>
                            <label
                              htmlFor="tempstate"
                              className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-[14px] text-[#4c4c4e] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:-top-2 peer-valid:text-[14px] peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                            >
                              State *
                            </label>
                          </div>
                        </div>

                        <div className="w-[48%]">
                          <div className="relative w-full">
                            <select
                              id="tempcity"
                              name="tempcity"
                              required
                              value={inputs.tempcity}
                              onChange={(e) => {
                                setInputs({
                                  ...inputs,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              disabled={!selectedState}
                              className="relative w-full h-11 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                            >
                              <option value="" disabled selected></option>
                              {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                            <label
                              htmlFor="tempcity"
                              className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-[14px] text-[#4c4c4e] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:-top-2 peer-valid:text-[14px] peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                            >
                              City *
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-[100%] mb-2" align="start">
                        <TextInput
                          id="pincode"
                          type="tel"
                          name="tempincode"
                          placeholder="your name"
                          label="Pincode *"
                          required
                          value={inputs.tempincode}
                          onChange={(e) => handleInput(e)}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-end items-center">
                <button
                  type="submit"
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </>
        )}

        {stepperactive === 2 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                  General Health Details
                </h1>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-auto">
                <div
                  className="w-[90%] mt-3 mb-4 flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <TextInput
                      id="height"
                      type="tel"
                      name="height"
                      placeholder="your name"
                      label="Height in CM *"
                      required
                      value={inputs.height}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="weight"
                      type="tel"
                      name="weight"
                      placeholder="your name"
                      label="Weight in KG *"
                      required
                      value={inputs.weight}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div
                  className="w-[90%] mb-4 flex justify-between"
                  align="start"
                >
                  <div className="w-[48%]">
                    <SelectInput
                      id="bloodgroup"
                      name="bloodgroup"
                      label="Blood Group *"
                      options={[
                        { value: "A+", label: "A+" },
                        { value: "A-", label: "A-" },
                        { value: "B+", label: "B+" },
                        { value: "B-", label: "B-" },
                        { value: "AB+", label: "AB+" },
                        { value: "AB-", label: "AB-" },
                        { value: "O+", label: "O+" },
                        { value: "O-", label: "O-" },
                      ]}
                      required
                      value={inputs.bloodgroup}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="w-[48%]">
                    <TextInput
                      id="bmi"
                      type="tel"
                      name="bmi"
                      placeholder="your name"
                      label="BMI"
                      value={inputs.bmi}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-4" align="start">
                  <TextInput
                    id="bp"
                    type="tel"
                    name="bp"
                    placeholder="your name"
                    label="BP"
                    value={inputs.bp}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel
                      label={"Recent injuries / Accidents / Operations *"}
                    />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-4">
                    <RadioButton
                      id="accidentyes"
                      value="yes"
                      name="accident"
                      selectedOption={selectedOption.accident || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          accident: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="accidentno"
                      value="no"
                      name="accident"
                      selectedOption={selectedOption.accident || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          accident: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <TextareaInput
                      id="accidentdetail"
                      name="injuries"
                      label="Details"
                      placeholder="Write your message"
                      rows={2}
                      disabled={
                        selectedOption.accident === "yes" ? false : true
                      }
                      value={inputs.injuries}
                      onChange={(e) => handleInput(e)}
                      required
                    />
                  </div>
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel
                      label={"Recent breaks / Fractures / Sprains *"}
                    />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-4">
                    <RadioButton
                      id="breaksyes"
                      value="yes"
                      name="breaks"
                      selectedOption={selectedOption.breaks || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          breaks: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="breaksno"
                      value="no"
                      name="breaks"
                      selectedOption={selectedOption.breaks || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          breaks: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <TextareaInput
                      id="breaksdetail"
                      name="breaks"
                      label="Details"
                      placeholder="Write your message"
                      rows={2}
                      disabled={selectedOption.breaks === "yes" ? false : true}
                      value={inputs.breaks}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-4">
                  <div className="w-full">
                    <TextareaInput
                      id="otheractivities"
                      name="activities"
                      label="Other Activities"
                      placeholder="Write your message"
                      rows={2}
                      value={inputs.activities}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-4">
                  <div className="w-full">
                    <TextareaInput
                      id="anythingelse"
                      name="anthingelse"
                      label="Anything else"
                      placeholder="Write your message"
                      rows={2}
                      value={inputs.anthingelse}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%] mb-4">
                  <SelectInput
                    id="preferabletiming"
                    name="preferabletiming"
                    label="Preferable Timing *"
                    options={timingOptions}
                    required
                    value={inputs.preferabletiming}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-between items-center">
                <button
                  className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  &nbsp;&nbsp;Back
                </button>
                <button
                  type="submit"
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  // onClick={handleNext}
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </>
        )}

        {stepperactive === 3 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                setStepperactive((prev) => (prev < 4 ? prev + 1 : prev));
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                  Past or Present Health Problems
                </h1>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-auto">
                <div className="w-[90%] flex flex-wrap my-5 items-center justify-start gap-x-1 lg:gap-x-5 gap-y-5">
                  {conditions.map((condition, index) => (
                    <div className="w-[145px]" key={index}>
                      <CheckboxInput
                        id={`condition-${index}`}
                        checked={condition.checked === 1}
                        label={condition.label}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>
                  ))}
                </div>

                <div className="w-[90%] mb-4">
                  <TextareaInput
                    id="others"
                    name="others"
                    label="Others"
                    placeholder="Write your message"
                    rows={2}
                    value={inputs.others}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%] mb-4">
                  <TextareaInput
                    id="medicationdetails"
                    name="medicaldetails"
                    label="Medication Details"
                    placeholder="Write your message"
                    rows={2}
                    value={inputs.medicaldetails}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel label={"Under Physicians Care *"} />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-4">
                    <RadioButton
                      id="careyes"
                      value="yes"
                      name="care"
                      selectedOption={selectedOption.care || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          care: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="careno"
                      value="no"
                      name="care"
                      selectedOption={selectedOption.care || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          care: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <TextInput
                      id="doctorname"
                      type="text"
                      name="doctorname"
                      label="Doctor Name"
                      placeholder="Write your message"
                      rows={2}
                      disabled={selectedOption.care === "yes" ? false : true}
                      required
                      value={inputs.doctorname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="mt-3 mb-4">
                    <TextInput
                      id="hospital"
                      type="text"
                      name="sdsdsd"
                      label="Hospital"
                      placeholder="Write your message"
                      rows={2}
                      disabled={selectedOption.care === "yes" ? false : true}
                      required
                      value={inputs.doctorname}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>

                <div className="w-[90%]" align="start">
                  <div>
                    <TextLabel label={"Back Pain *"} />
                  </div>
                  <div className="flex w-[90%] gap-x-10 mt-2 mb-4">
                    <RadioButton
                      id="backpainyes"
                      value="yes"
                      name="backpain"
                      selectedOption={
                        selectedOption.backpain === "yes" ? false : true
                      }
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          backpain: e.target.value,
                        });
                      }}
                      label="Yes"
                      required
                    />
                    <RadioButton
                      id="backpainno"
                      value="no"
                      name="backpain"
                      selectedOption={selectedOption.backpain || ""}
                      onChange={(e) => {
                        setSelectedOption({
                          ...selectedOption,
                          backpain: e.target.value,
                        });
                      }}
                      label="No"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <SelectInput
                      id="pain"
                      name="gender"
                      label="Pain Scale"
                      options={[
                        { value: "upper", label: "Upper" },
                        { value: "middle", label: "Middle" },
                        { value: "lower", label: "Lower" },
                      ]}
                      disabled={
                        selectedOption.backpain === "yes" ? false : true
                      }
                      required
                      value={inputs.painscale}
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-between items-center">
                <button
                  className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                  onClick={handleBack}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                  &nbsp;&nbsp;Back
                </button>
                <button
                  type="submit"
                  className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                >
                  Next&nbsp;&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </>
        )}

        {stepperactive === 4 && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                submitForm();
              }}
            >
              <div className="w-full h-[7vh] flex justify-center items-center">
                <h1 className="text-[20px] justify-center font-semibold text-[#ff5001]">
                  Therapy
                </h1>
              </div>
              <hr />
              <div className="w-full h-[73vh] overflow-auto">
                <div className="w-[90%] mt-3 mb-4">
                  <TextareaInput
                    id="durationproblem"
                    name="duration"
                    label="Duration of the Problem"
                    placeholder="Write your message"
                    rows={2}
                    value={inputs.duration}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-4">
                  <TextareaInput
                    id="relevantpasthistory"
                    name="past"
                    label="Relevant past History"
                    placeholder="Write your message"
                    rows={2}
                    value={inputs.past}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-4">
                  <TextareaInput
                    id="relevantfamilyhistory"
                    name="family"
                    label="Relevant Family History"
                    placeholder="Write your message"
                    rows={2}
                    value={inputs.family}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="w-[90%] mb-4">
                  <TextareaInput
                    id="anythingelsetherapy"
                    name="therapyanything"
                    label="Anything else"
                    placeholder="Write your message"
                    rows={2}
                    value={inputs.therapyanything}
                    onChange={(e) => handleInput(e)}
                  />
                </div>

                <div className="w-[90%] mb-4">
                  <div className="text-[#45474b] text-[16px] font-semibold text-justify">
                    Disclaimer (Please Read Carefully) I have given all
                    information relevant for yoga class. I Understand that the
                    information given is strictly confidential.lf at any time
                    during the session, you feel discomfort or strain, gently
                    come out of the posture.You may rest at any time during the
                    class.lt is Important in Yoga that you listen to your body
                    and respect its limits on any given day.All purchases of
                    services (classes, workshops, events, therapy) are
                    non-refundable. Fees cannot be transferred or carry forward
                    in any manner. I should consult 'My Doctor' prior to
                    beginning any program, including Yoga for my overall
                    wellbeing. I recognize that it is my responsibility to
                    notify my 'Instructor' of any serious illness or injury
                    before the Yoga Session. I will not perform any postures to
                    the extent of strain or pain I accept that neither the
                    'Instructor', nor the 'Hosting Facility' is Liable for any
                    Injury, or Damages, to person or property, resulting from
                    participating in these sessions.
                  </div>
                </div>

                <div className="w-[90%] mb-3">
                  <CheckboxInput
                    checked={agreementchecked}
                    id="agreementchecked"
                    label="Agree Terms & Conditions *"
                    required
                    onChange={() => {
                      agreementchecked
                        ? setAgreementchecked(false)
                        : setAgreementchecked(true);
                    }}
                  />
                </div>
              </div>
              <hr />
              <div className="w-[90%] lg:w-[95%] h-[10vh] flex justify-between items-center">
                {loading ? (
                  <div className="flex w-full justify-end items-end">
                    <svg className="loadersvg my-4" viewBox="25 25 50 50">
                      <circle
                        className="loadercircle"
                        r="20"
                        cy="50"
                        cx="50"
                      ></circle>
                    </svg>
                  </div>
                ) : (
                  <>
                    <button
                      className="bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded my-4 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                      onClick={handleBack}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                      &nbsp;&nbsp;Back
                    </button>
                    <button
                      type="submit"
                      className="disabled:bg-[#ff7a3c] disabled:font-[#fff] disabled:hover:cursor-not-allowed disabled:hover:text-[#fff] disabled:border-[#ff7a3c] bg-[#ff5001] border-2 border-[#ff5001] text-[#fff] font-semibold px-3 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-[#ff5001]"
                    >
                      Register&nbsp;&nbsp;
                      <i class="fa-solid fa-check"></i>
                    </button>
                  </>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationStepper;
