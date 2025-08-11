import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center bg-white shadow border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/AdminDashboard");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/AdminPatient");
          }}
          className={`${
            location.pathname === "/AdminPatient" ? "text-[#1976D2]" : ""
          }`}
        >
          Patient
        </button>
        <button
          onClick={() => {
            navigate("/AdminAppointment");
          }}
          className={`${
            location.pathname === "/AdminAppointment" ? "text-[#1976D2]" : ""
          }`}
        >
          Appointment
        </button>
        <button
          onClick={() => {
            navigate("/UserManagement");
          }}
          className={`${
            location.pathname === "/UserManagement" ? "text-[#1976D2]" : ""
          }`}
        >
          User Management
        </button>
        <button>Billing & Payment</button>
        <button>Insurance Coordination</button>
        <button
          onClick={() => {
            navigate("/MedicinesTreatment");
          }}
          className={`${
            location.pathname === "/MedicinesTreatment" ? "text-[#1976D2]" : ""
          }`}
        >
          Medicines
        </button>
        <button>Staff Management</button>
        <button>Profile / Setting</button>
      </div>
      <div className="flex items-center space-x-2">
        <button>Notify</button>
        <button
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
        >
          <LuLogOut />
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
