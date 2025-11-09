import React from "react";
import { BiSupport } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import img1 from "./Anumed’s logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function MainNavbar() {
  const navigation = useNavigate();
  const currentLocation = useLocation();

  return (
    <div className="flex items-center px-2 sm:px-4 py-2 bg-white rounded justify-between">
      <img src={img1} className="h-5 sm:h-10" />

      <div className="sm:flex items-center hidden space-x-4 font-semibold">
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
            navigation("/Login");
          }}
          className="bg-[#01B49C] text-white py-1 px-2 sm:px-3 rounded"
        >
          See Demo
        </button>
        <button className="py-1 px-2 sm:px-3 rounded border hover:bg-[#003441] hover:text-white border-[#003441]">
          <div className="flex items-center space-x-1">
            <BiSupport />
            <p className="font-semibold">Support</p>
          </div>
        </button>
        <button className="text-border-[#003441] sm:hidden p-1 rounded border border-[#003441]">
          <FaBars size={18} />
        </button>
      </div>
    </div>
  );
}

export default MainNavbar;
