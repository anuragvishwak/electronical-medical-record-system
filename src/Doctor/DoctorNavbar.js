import React from "react";
import { LuLogOut } from "react-icons/lu";

function DoctorNavbar() {
  return (
    <div className="flex items-center border-b justify-between p-3">
      <div className="flex items-center space-x-3">
        <button>Home</button>
        <button>Appointments</button>
        <button>Patients</button>
        <button>Prescriptions</button>
        <button>Consultations</button>
        <button>Lab Reports</button>
        <button>Medical Records</button>
        <button>Billing / Finance</button>
        <button>Profile / Setting</button>
      </div>
      <button>
        <LuLogOut />
      </button>
    </div>
  );
}

export default DoctorNavbar;
