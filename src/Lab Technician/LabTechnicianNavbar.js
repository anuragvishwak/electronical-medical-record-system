import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function LabTechnicianNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white shadow items-center border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button>Home</button>
        <button
          onClick={() => {
            navigate("/AssignedLabOrders");
          }}
          className={`${
            location.pathname === "/AssignedLabOrders" ? "text-[#1976D2]" : ""
          }`}
        >
          Assigned Lab Orders
        </button>
        <button
         onClick={() => {
            navigate("/UploadTestResults");
          }}
          className={`${
            location.pathname === "/UploadTestResults" ? "text-[#1976D2]" : ""
          }`}
        >Upload Test Results</button>
        <button>Profile / Setting</button>
      </div>
      <div className="flex items-center space-x-2">
        <button>Notify</button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <LuLogOut />
        </button>
      </div>
    </div>
  );
}

export default LabTechnicianNavbar;
