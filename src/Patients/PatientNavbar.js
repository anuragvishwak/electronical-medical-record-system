import React from "react";
import { LuLogOut } from "react-icons/lu";

function PatientNavbar() {

  return (
    <div className="flex items-center border-b justify-between p-3">
      <div className="flex items-center space-x-3">
        <button>Home</button>
        <button>Appointments</button>
        <button>Prescriptions</button>
        <button>Lab Reports</button>
        <button>Medical History</button>
        <button>Payment History</button>
        <button>Insurance Details</button>
        <button>Profile</button>
      </div>

      <button>
        <LuLogOut />
      </button>
    </div>
  );
}

export default PatientNavbar;
