import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function NurseNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white shadow  items-center border-b justify-between p-3">
      <div className="flex items-center text-[#003441] font-semibold space-x-5">
        <button
          onClick={() => {
            navigate("/NurseDashboard");
          }}
          className={`${
            location.pathname === "/NurseDashboard" ? "text-[#01B49C]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/NurseVitals");
          }}
          className={`${
            location.pathname === "/NurseVitals" ? "text-[#01B49C]" : ""
          }`}
        >
          Patient Vitals
        </button>
        <button
          onClick={() => {
            navigate("/CheckInCheckOut");
          }}
          className={`${
            location.pathname === "/CheckInCheckOut" ? "text-[#01B49C]" : ""
          }`}
        >
          Check In / Out
        </button>
        <button
          onClick={() => {
            navigate("/MedicationLogs");
          }}
          className={`${
            location.pathname === "/MedicationLogs" ? "text-[#01B49C]" : ""
          }`}
        >
          Medication Logs
        </button>
        <button
          onClick={() => {
            navigate("/NurseProfileUpdateSetting");
          }}
          className={`${
            location.pathname === "/NurseProfileUpdateSetting"
              ? "text-[#01B49C]"
              : ""
          }`}
        >
          Profile / Setting
        </button>
      </div>
      <button
        onClick={() => {
          navigate("/");
          localStorage.clear();
        }}
      >
        <LuLogOut />
      </button>
    </div>
  );
}

export default NurseNavbar;
