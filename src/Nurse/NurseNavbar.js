import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function NurseNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white shadow  items-center border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/NurseDashboard");
          }}
          className={`${
            location.pathname === "/NurseDashboard" ? "text-[#1976D2]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/NurseVitals");
          }}
          className={`${
            location.pathname === "/NurseVitals" ? "text-[#1976D2]" : ""
          }`}
        >
          Patient Vitals
        </button>
        <button
          onClick={() => {
            navigate("/CheckInCheckOut");
          }}
          className={`${
            location.pathname === "/CheckInCheckOut" ? "text-[#1976D2]" : ""
          }`}
        >
          Check In / Out
        </button>
        <button>Medication Logs</button>
        <button>Profile / Setting</button>
      </div>
      <button>
        <LuLogOut />
      </button>
    </div>
  );
}

export default NurseNavbar;
