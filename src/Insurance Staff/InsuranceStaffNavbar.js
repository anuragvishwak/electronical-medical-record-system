import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function InsuranceStaffNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex items-center border-gray-300 bg-white shadow border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button>Home</button>
        <button
        onClick={() => {
            navigate("/InsuranceProvider");
          }}
          className={`${
            location.pathname === "/InsuranceProvider" ? "text-[#1976D2]" : ""
          }`}
        >
          Insurance Provider
        </button>
        <button
         onClick={() => {
            navigate("/ViewInsuranceInfo");
          }}
          className={`${
            location.pathname === "/ViewInsuranceInfo" ? "text-[#1976D2]" : ""
          }`}
        >View Insurance Info</button>
        <button>Claim Status</button>
        <button>Profile / Setting</button>
      </div>
      <button
      onClick={()=>{
        navigate("/");
        localStorage.clear();
      }}
      >
        <LuLogOut />
      </button>
    </div>
  );
}

export default InsuranceStaffNavbar;
