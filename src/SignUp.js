import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./FirebaseConfiguration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { BiHealth, BiInjection } from "react-icons/bi";
import { MdHealthAndSafety } from "react-icons/md";
import { GiHealthCapsule, GiTestTubes } from "react-icons/gi";
import { TbRibbonHealth } from "react-icons/tb";
import { FaAmbulance, FaHospital } from "react-icons/fa";
import img1 from "./Anumed’s logo.jpg";

function SignUp() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone_no, setphone_no] = useState("");
  const [role, setrole] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [Hospital_name, setHospital_name] = useState("");
  const [gettingHospitals, setgettingHospitals] = useState([]);

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Lab Technician", value: "lab_technician" },
    { label: "Insurance Dept", value: "insurance_dept" },
    { label: "Patient", value: "patient" },
  ];

  async function renderingHospitals() {
    const taskDetails = await getDocs(
      collection(database, "hospital_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgettingHospitals(multipleArray);
    console.log("finding hospitals", multipleArray);
  }

  useEffect(() => {
    renderingHospitals();
  }, []);

  const signUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        confirm_password
      );
      const user = userCredential.user;

      await addDoc(collection(database, "user_database"), {
        uid: user.uid,
        name: name,
        email: email,
        phone_no: phone_no,
        role: role,
        password: confirm_password,
        Hospital_name: Hospital_name,
      });

      console.log("User document added to Firestore.");
      navigate("/Login");
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex bg-[#003441] justify-center items-center w-full h-screen">
        <BiHealth
          size={130}
          className="text-gray-300 opacity-20 fixed top-14 left-10"
        />
        <MdHealthAndSafety
          size={300}
          className="text-gray-300 opacity-20 fixed top-40 left-40"
        />

        <GiHealthCapsule
          size={160}
          className="text-gray-300 opacity-20 fixed top-40 right-10"
        />

        <TbRibbonHealth
          size={300}
          className="text-gray-300 opacity-20 fixed top-10 right-60"
        />

        <FaHospital
          size={260}
          className="text-gray-300 opacity-20 fixed bottom-14 right-10"
        />
        <BiInjection
          size={160}
          className="text-gray-300 opacity-20 fixed bottom-12 left-12"
        />

        <GiTestTubes
          size={160}
          className="text-gray-300 opacity-20 fixed bottom-20 left-80"
        />

        <FaAmbulance
          size={160}
          className="text-gray-300 opacity-20 fixed bottom-48 right-80"
        />
        <div>
          <div className="border m-5 sm:m-0 sm:w-[550px] bg-white border-gray-300 shadow-lg p-6 rounded-lg">
            <img src={img1} className="h-14  mb-2" />

            <div className="text-center mb-4">
              <p className="text-2xl text-[#003441] font-bold">SignUp</p>
              <p className="text-[#01B49C]">
                Access your medical records securely
              </p>
            </div>

            <div className="mb-3">
              <p className="font-semibold text-[#01B49C]">Hospital</p>
              <select
                value={role}
                onChange={(e) => setHospital_name(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option value="" disabled selected>
                  Select Hospital
                </option>
                {gettingHospitals.map((role, index) => (
                  <option key={index} value={role.hospitalName}>
                    {role.hospitalName}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-3 flex items-center gap-5">
              <div>
                <p className="font-semibold text-[#01B49C]">Full Name</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  placeholder="Anurag Vishwakarma"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>
              <div className="">
                <p className="font-semibold text-[#01B49C]">Email</p>
                <input
                  type="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  placeholder="anurag@gmail.com"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>
            </div>

            <div className="sm:flex items-center my-3 sm:space-x-5">
              <div>
                <p className="font-semibold text-[#01B49C]">Phone Number</p>
                <input
                  type="number"
                  onChange={(e) => {
                    setphone_no(e.target.value);
                  }}
                  placeholder="+91 9327855861"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>
              <div className="">
                <p className="font-semibold text-[#01B49C]">Role</p>
                <select
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                  className="border rounded border-gray-300 w-60 p-2"
                >
                  <option value="" disabled selected>
                    Select Role
                  </option>
                  {roles.map((role, index) => (
                    <option key={index} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:flex items-center sm:space-x-5">
              <div className="">
                <p className="font-semibold text-[#01B49C]">Password</p>
                <input
                  type="password"
                  placeholder="*******"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>

              <div className="">
                <p className="font-semibold text-[#01B49C]">Confirm Password</p>
                <input
                  type="password"
                  onChange={(e) => {
                    setconfirm_password(e.target.value);
                  }}
                  placeholder="*******"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>
            </div>

            <div className="flex mt-10 justify-center">
              <button
                onClick={() => {
                  signUpWithEmail();
                }}
                className="bg-[#003441] hover:bg-[#154350] font-semibold py-1 w-full shadow rounded text-white"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <p className="text-gray-600">Don't have an account</p>
              <button
                onClick={() => {
                  navigate("/Login");
                }}
                className="text-[#01B49C] font-semibold"
              >
                Login
              </button>
            </div>

          <hr className="mt-4 mb-2.5 border-gray-300"/>

            <div className="flex text-[#01B49C] items-center justify-center">
              <button className="">Technical Support</button>
              <p className="text-gray-500 mx-3">|</p>
              <button>Privacy Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
