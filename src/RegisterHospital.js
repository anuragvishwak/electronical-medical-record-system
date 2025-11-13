import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, database } from "./FirebaseConfiguration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import img1 from "./Anumed’s logo.jpg";

function RegisterHospital({ setopeningRegisterHospital }) {
  const [step, setstep] = useState(1);
  const [hospitalName, sethospitalName] = useState("");
  const [hospitalCode, sethospitalCode] = useState("");
  const [hospitalType, sethospitalType] = useState("");
  const [yearOfEstablishment, setyearOfEstablishment] = useState("");
  const [hospitalEmail, sethospitalEmail] = useState("");
  const [hospitalPhone, sethospitalPhone] = useState("");
  const [alternativePhone, setalternativePhone] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [adminName, setadminName] = useState("");
  const [designation, setdesignation] = useState("");
  const [adminEmail, setadminEmail] = useState("");
  const [password, setpassword] = useState("");
  const [planType, setplanType] = useState("");
  const [startDate, setstartDate] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [paymentMode, setpaymentMode] = useState("");

  function RegisterHospitalData() {
    const hospitalId = uuidv4();

    const hospitalData = {
      Hospital_name: hospitalName,
      hospitalName,
      hospitalCode,
      hospitalType,
      yearOfEstablishment,
      hospitalEmail,
      hospitalPhone,
      alternativePhone,
      address,
      city,
      state,
      country,
      adminName,
      designation,
      adminEmail,
      planType,
      startDate,
      expiryDate,
      paymentMode,
      createdAt: new Date().toISOString(),
      status: "approved",
    };

    try {
      createUserWithEmailAndPassword(auth, adminEmail, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          await addDoc(collection(database, "hospital_database"), hospitalData);

          const userData = {
            uid: user.uid,
            hospitalId: hospitalId,
            name: adminName,
            email: adminEmail,
            role: "admin",
            designation: designation,
            planType: planType,
            createdAt: new Date().toISOString(),
          };

          await addDoc(collection(database, "user_database"), userData);

          console.log("✅ Hospital and admin registered successfully");
          alert("Hospital Registered Successfully!");
          setopeningRegisterHospital(false);
        })
        .catch((error) => {
          console.error("Error creating admin auth: ", error.message);
          alert(error.message);
        });
    } catch (error) {
      console.error("Error registering hospital: ", error);
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-4 rounded">
        <div className="flex justify-center">
          <img src={img1} className="h-14  mb-2" />
        </div>
        <div className="flex items-center mb-3 justify-between">
          <p className="text-[#003441] text-2xl font-bold">Register Hospital</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningRegisterHospital(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          {step === 1 && (
            <div>
              <div>
                <p className="text-[#003441] text-lg  font-bold">
                  Basic Information
                </p>

                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Hospital Name
                    </p>
                    <input
                      type="text"
                      onChange={(e) => {
                        sethospitalName(e.target.value);
                      }}
                      placeholder="John Hopkins Hospital"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Hospital Code / ID
                    </p>
                    <input
                      type="text"
                      onChange={(e) => {
                        sethospitalCode(e.target.value);
                      }}
                      placeholder="HSP-001"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Hospital Type
                    </p>
                    <select
                      onChange={(e) => {
                        sethospitalType(e.target.value);
                      }}
                      className="border rounded border-gray-300 w-full p-1.5"
                    >
                      <option>Select Type</option>
                      <option>Private</option>
                      <option>Government</option>
                      <option>Clinic</option>
                      <option>Multi-Speciality</option>
                    </select>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Year of Establishment
                    </p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setyearOfEstablishment(e.target.value);
                      }}
                      placeholder="2007"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>
                </div>
              </div>

              <div className="my-5">
                <p className="text-[#003441] text-lg  font-bold">
                  Contact Details
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Hospital Email
                    </p>
                    <input
                      type="email"
                      onChange={(e) => {
                        sethospitalEmail(e.target.value);
                      }}
                      placeholder="contact-@citycare.com"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Hospital Phone
                    </p>
                    <input
                      type="text"
                      onChange={(e) => {
                        sethospitalPhone(e.target.value);
                      }}
                      placeholder="+91 91234 56789"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">
                      Alternative Phone
                    </p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setalternativePhone(e.target.value);
                      }}
                      placeholder="+91 91234 56789"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[#003441] text-lg  font-bold">
                  Address Details
                </p>

                <div>
                  <p className="font-semibold text-[#01B49C]">Address</p>
                  <textarea
                    type="text"
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                    placeholder="Oshiwara, Mumbai, Maharashtra, India - 400102"
                    className="border rounded border-gray-300 w-full p-1.5"
                  ></textarea>
                  {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="font-semibold text-[#01B49C]">City</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                      placeholder="Mumbai"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">State</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setstate(e.target.value);
                      }}
                      placeholder="Maharashtra"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">Country</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setcountry(e.target.value);
                      }}
                      placeholder="India"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )} */}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setstep(2);
                  }}
                  className="mt-5 text-white py-1 px-3 rounded font-semibold bg-[#003441]"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div>
                <p className="text-[#003441] text-lg  font-bold">
                  Primary Admin (Hospital Owner / Head)
                </p>

                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="font-semibold text-[#01B49C]">Admin Name</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setadminName(e.target.value);
                      }}
                      placeholder="Anurag Vishwakarma"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
                 )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">Designation</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setdesignation(e.target.value);
                      }}
                      placeholder="Medical Director"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                   <p className="text-red-500 text-sm">{errors.name}</p>
                    )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">Admin Email</p>
                    <input
                      type="text"
                      onChange={(e) => {
                        setadminEmail(e.target.value);
                      }}
                      placeholder="admin@citycare.com"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                     )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">Password</p>
                    <input
                      type="password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      placeholder="********"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
                )} */}
                  </div>
                </div>
              </div>

              <div className="my-5">
                <p className="text-[#003441] text-lg  font-bold">
                  Subscription / Plan Details
                </p>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="font-semibold text-[#01B49C]">Plan Type</p>
                    <select
                      onChange={(e) => {
                        setplanType(e.target.value);
                      }}
                      className="border rounded border-gray-300 w-full p-1.5"
                    >
                      <option>Select Plan</option>
                      <option value={"basic-plan"}>Basic Plan</option>
                      <option value={"standard-plan"}>Standard Plan</option>
                      <option value={"premium-plan"}>Premium Plan</option>
                    </select>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
                )} */}
                  </div>
                  <div>
                    <p className="font-semibold text-[#01B49C]">Start Date</p>
                    <input
                      type="date"
                      onChange={(e) => {
                        setstartDate(e.target.value);
                      }}
                      placeholder="********"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
                )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">Expiry Date</p>
                    <input
                      type="date"
                      onChange={(e) => {
                        setexpiryDate(e.target.value);
                      }}
                      placeholder="********"
                      className="border rounded border-gray-300 w-full p-1.5"
                    ></input>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
                )} */}
                  </div>

                  <div>
                    <p className="font-semibold text-[#01B49C]">Payment Mode</p>
                    <select
                      onChange={(e) => {
                        setpaymentMode(e.target.value);
                      }}
                      className="border rounded border-gray-300 w-full p-1.5"
                    >
                      <option>Select Mode</option>
                      <option value={"upi"}>UPI</option>
                      <option value={"bank-transfer"}>Bank Transfer</option>
                    </select>
                    {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
                )} */}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-5 justify-end">
                <button
                  onChange={() => {
                    setstep(1);
                  }}
                  className="bg-[#01B49C] text-white font-semibold rounded py-1 px-3"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    RegisterHospitalData();
                  }}
                  className="bg-[#003441] text-white font-semibold rounded py-1 px-3"
                >
                  Register Hospital
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterHospital;
