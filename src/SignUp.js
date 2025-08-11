import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./FirebaseConfiguration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

function SignUp() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone_no, setphone_no] = useState("");
  const [role, setrole] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Lab Technician", value: "lab_technician" },
    { label: "Insurance Dept", value: "insurance_dept" },
    { label: "Patient", value: "patient" },
  ];

  const signUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
      auth,
        email,
        confirm_password
      );
      const user = userCredential.user;
      console.log("User created:", user.uid);

      await addDoc(collection(database, "user_database"), {
        uid: user.uid,
        name: name,
        email: email,
        phone_no: phone_no,
        role: role,
        password: confirm_password,
      });

      console.log("User document added to Firestore.");
      navigate("/");
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex bg-[#ddeeff] justify-center items-center w-full h-screen">
        <div>
          <div className="border m-5 sm:m-0 sm:w-[430px] bg-white border-gray-300 shadow-lg p-6 rounded-lg">
            <div className="text-center mb-10">
              <p className="text-2xl font-bold">SignUp</p>
              <p className="text-gray-600">
                Access your medical records securely
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">Full Name</p>
              <input
                type="text"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                placeholder="Anurag Vishwakarma"
                className="border rounded border-gray-300 w-full p-2"
              ></input>
            </div>
            <div className="my-3">
              <p className="font-semibold text-[#1976D2]">Email</p>
              <input
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                placeholder="anurag@gmail.com"
                className="border rounded border-gray-300 w-full p-2"
              ></input>
            </div>

            <div className="sm:flex items-center my-3 sm:space-x-2">
              <div>
                <p className="font-semibold text-[#1976D2]">Phone Number</p>
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
                <p className="font-semibold text-[#1976D2]">Role</p>
                <select
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
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

            <div className="sm:flex items-center sm:space-x-2">
              <div className="">
                <p className="font-semibold text-[#1976D2]">Password</p>
                <input
                  type="password"
                  placeholder="*******"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>

              <div className="">
                <p className="font-semibold text-[#1976D2]">Confirm Password</p>
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
                className="bg-[#1976D2] hover:bg-blue-800 font-semibold py-1 w-full shadow rounded text-white"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <p className="text-gray-600">Don't have an account</p>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="text-[#1976D2] font-semibold"
              >
                Login
              </button>
            </div>

            <div className="flex text-[#1976D2] items-center mt-5 justify-center">
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
