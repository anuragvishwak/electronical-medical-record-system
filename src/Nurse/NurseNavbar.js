import React from "react";
import { LuLogOut } from "react-icons/lu";

function NurseNavbar() {
  return (
    <div className="flex items-center border-b justify-between p-3">
      <div className="flex items-center space-x-3">
        <button>Home</button>
        <button>Patient Vitals</button>
        <button>Check In / Out</button>
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
