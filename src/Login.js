import React from "react";
import { FaBriefcaseMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#ddeeff] justify-center items-center w-full h-screen">
      <div>
        <div className="border w-[430px] bg-white border-gray-300 shadow-lg p-6 rounded-lg">
          <div className="text-center mb-10">
            <p className="text-2xl font-bold">Login</p>
            <p className="text-gray-600">
              Access your medical records securely
            </p>
          </div>

          <p className="text-[#1976D2] mb-3 bg-blue-50 rounded-lg p-2 border border-[#1976D2]">
            This is a secure medical system. All access is logged and monitored.
          </p>
          <div>
            <p className="text-xl text-[#1976D2]">Email</p>
            <input
              type="email"
              placeholder="anurag@gmail.com"
              className="border rounded border-gray-300 w-full p-2"
            ></input>
          </div>

          <div className="mt-5">
            <p className="text-xl text-[#1976D2]">Password</p>
            <input
              type="password"
              placeholder="*******"
              className="border rounded border-gray-300 w-full p-2"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <input className="mt-1" type="checkbox"></input>
              <p className="text-gray-600">remember me</p>
            </div>
            <button className="text-blue-700 font-semibold">
              Forgot Password?
            </button>
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
                navigate("/SignUp");
              }}
              className="text-[#1976D2] font-semibold"
            >
              SignUp
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
  );
}

export default Login;
