import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function InsuranceStaffNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="flex items-center font-semibold text-[#003441] border-gray-300 bg-white  border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/InsuranceDeptDashboard");
          }}
          className={`${
            location.pathname === "/InsuranceDeptDashboard" ? "text-[#01B49C]" : ""
          }`}
        >Home</button>
        <button
        onClick={() => {
            navigate("/InsuranceProvider");
          }}
          className={`${
            location.pathname === "/InsuranceProvider" ? "text-[#01B49C]" : ""
          }`}
        >
          Insurance Provider
        </button>
        <button
         onClick={() => {
            navigate("/ViewInsuranceInfo");
          }}
          className={`${
            location.pathname === "/ViewInsuranceInfo" ? "text-[#01B49C]" : ""
          }`}
        >View Insurance Info</button>
        <button
         onClick={() => {
            navigate("/InsuranceStaffClaimStatus");
          }}
          className={`${
            location.pathname === "/InsuranceStaffClaimStatus" ? "text-[#01B49C]" : ""
          }`}
        >Claim Status</button>
        <button 
         onClick={() => {
            navigate("/InsuranceDeptProfile");
          }}
          className={`${
            location.pathname === "/InsuranceDeptProfile" ? "text-[#01B49C]" : ""
          }`}
        >Profile / Setting</button>
      </div>
      <button
      onClick={()=>{
        navigate("/Login");
        localStorage.clear();
      }}
      >
        <LuLogOut /> 
      </button>
    </div>
  );
}

export default InsuranceStaffNavbar;
