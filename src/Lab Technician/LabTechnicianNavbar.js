import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import CentralizedChat from "../CentralizedChat";

function LabTechnicianNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex text-white bg-[#003441] items-center border-b justify-between p-3">
      <div className="flex items-center font-semibold space-x-5">
        <button
          onClick={() => {
            navigate("/LabTechnicianDashboard");
          }}
          className={`${
            location.pathname === "/LabTechnicianDashboard"
              ? "text-[#01B49C]"
              : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/AssignedLabOrders");
          }}
          className={`${
            location.pathname === "/AssignedLabOrders" ? "text-[#01B49C]" : ""
          }`}
        >
          Assigned Lab Orders
        </button>
        <button
          onClick={() => {
            navigate("/UploadTestResults");
          }}
          className={`${
            location.pathname === "/UploadTestResults" ? "text-[#01B49C]" : ""
          }`}
        >
          Upload Test Results
        </button>
        <button
          onClick={() => {
            navigate("/LabTechnicianProfileUpdateSetting");
          }}
          className={`${
            location.pathname === "/LabTechnicianProfileUpdateSetting"
              ? "text-[#01B49C]"
              : ""
          }`}
        >
          Profile / Setting
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <CentralizedChat />
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/Login");
          }}
        >
          <LuLogOut size={23} />
        </button>
      </div>
    </div>
  );
}

export default LabTechnicianNavbar;
