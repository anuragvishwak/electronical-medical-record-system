import React from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {

const navigate = useNavigate();

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Lab Technician", value: "lab_technician" },
    { label: "Finance", value: "finance" },
    { label: "Insurance Agent", value: "insurance_agent" },
    { label: "Patient", value: "patient" },
  ];

  return (
    <div>
      <div className="flex bg-[#ddeeff] justify-center items-center w-full h-screen">
        <div>
          <div className="border w-[430px] bg-white border-gray-300 shadow-lg p-6 rounded-lg">
            <div className="text-center mb-10">
              <p className="text-2xl font-bold">SignUp</p>
              <p className="text-gray-600">
                Access your medical records securely
              </p>
            </div>

            <div>
              <p className="text-xl text-[#1976D2]">Full Name</p>
              <input
                type="text"
                placeholder="Anurag Vishwakarma"
                className="border rounded border-gray-300 w-full p-2"
              ></input>
            </div>
            <div className="my-3">
              <p className="text-xl text-[#1976D2]">Email</p>
              <input
                type="email"
                placeholder="anurag@gmail.com"
                className="border rounded border-gray-300 w-full p-2"
              ></input>
            </div>

            <div>
              <p className="text-xl text-[#1976D2]">Phone Number</p>
              <input
                type="number"
                placeholder="+91 9327855861"
                className="border rounded border-gray-300 w-full p-2"
              ></input>
            </div>

            <div className="flex items-center my-3 space-x-2">
              <div className="">
                <p className="text-xl text-[#1976D2]">Password</p>
                <input
                  type="password"
                  placeholder="*******"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>

              <div className="">
                <p className="text-xl text-[#1976D2]">Confirm Password</p>
                <input
                  type="password"
                  placeholder="*******"
                  className="border rounded border-gray-300 w-full p-2"
                ></input>
              </div>
            </div>

            <div className="">
              <p className="text-xl text-[#1976D2]">Role</p>
              <select className="border rounded border-gray-300 w-full p-2">
                {roles.map((role) => (
                  <option value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            <div className="flex mt-10 justify-center">
              <button className="bg-[#1976D2] hover:bg-blue-800 font-semibold py-1 w-full shadow rounded text-white">
                Sign In
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
