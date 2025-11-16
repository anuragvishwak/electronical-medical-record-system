import React from "react";
import { BiSupport } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import img1 from "./Anumed’s footer logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function MainNavbar() {
  const navigation = useNavigate();
  const currentLocation = useLocation();

  return (
  <div className="flex  sm:fixed justify-center w-full">
      <div className="flex items-center bg-[#003441] rounded-full p-3 z-50 m-5 w-full sm:w-9/12 shadow-xl text-lg justify-between">
      <img src={img1} className="h-5 sm:h-8" />

      <div className="sm:flex items-center hidden space-x-6 text-white font-semibold">
        <button
          onClick={() => {
            navigation("/");
          }}
          className={`${
            currentLocation.pathname === "/" ? "text-[#01B49C]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigation("/");
          }}
        >
          Features
        </button>
        <button>Dashboards</button>
        <button
          onClick={() => {
            navigation("/Resource");
          }}
          className={`${
            currentLocation.pathname === "/Resource" ? "text-[#01B49C]" : ""
          }`}
        >
          Resource
        </button>
      </div>

      <div className="flex items-center text-sm sm:text-base space-x-2 sm:space-x-3">
        <button
          onClick={() => {
            navigation("/AnimatorPage");
          }}
          className="bg-white text-[#01B49C] py-1 px-2 sm:px-3 rounded-full"
        >
          See Demo
        </button>
        <button className="py-1 px-2 sm:px-3 rounded-full border hover:text-[#003441] text-white hover:bg-white border-white">
          <div className="flex items-center space-x-1">
            <BiSupport />
            <p className="font-semibold">Support</p>
          </div>
        </button>
        <button className="text-white sm:hidden p-1 rounded border border-white">
          <FaBars size={18} />
        </button>
      </div>
    </div>
  </div>
  );
}

export default MainNavbar;
