import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function NurseNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white shadow  items-center border-b justify-between p-3">
      <div className="flex items-center text-[#212a31] font-semibold space-x-5">
        <button
          onClick={() => {
            navigate("/NurseDashboard");
          }}
          className={`${
            location.pathname === "/NurseDashboard" ? "text-[#196d8e]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/NurseVitals");
          }}
          className={`${
            location.pathname === "/NurseVitals" ? "text-[#196d8e]" : ""
          }`}
        >
          Patient Vitals
        </button>
        <button
          onClick={() => {
            navigate("/CheckInCheckOut");
          }}
          className={`${
            location.pathname === "/CheckInCheckOut" ? "text-[#196d8e]" : ""
          }`}
        >
          Check In / Out
        </button>
        <button
          onClick={() => {
            navigate("/MedicationLogs");
          }}
          className={`${
            location.pathname === "/MedicationLogs" ? "text-[#196d8e]" : ""
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
              ? "text-[#196d8e]"
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
