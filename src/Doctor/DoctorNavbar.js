import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function DoctorNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white text-[#003441] font-semibold items-center border-b border-gray-300 justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/DoctorDashboard");
          }}
          className={`${
            location.pathname === "/DoctorDashboard" ? "text-[#01B49C]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/DoctorAppointment");
          }}
          className={`${
            location.pathname === "/DoctorAppointment" ? "text-[#01B49C]" : ""
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => {
            navigate("/DoctorPatients");
          }}
          className={`${
            location.pathname === "/DoctorPatients" ? "text-[#01B49C]" : ""
          }`}
        >
          Patients
        </button>
        <button
          onClick={() => {
            navigate("/DoctorPrescription");
          }}
          className={`${
            location.pathname === "/DoctorPrescription" ? "text-[#01B49C]" : ""
          }`}
        >
          Prescriptions
        </button>

        <button
          onClick={() => {
            navigate("/DoctorConsultation");
          }}
          className={`${
            location.pathname === "/DoctorConsultation" ? "text-[#01B49C]" : ""
          }`}
        >
          Consultation
        </button>
        <button
          onClick={() => {
            navigate("/DoctorLabReports");
          }}
          className={`${
            location.pathname === "/DoctorLabReports" ? "text-[#01B49C]" : ""
          }`}
        >
          Lab Reports
        </button>
        <button
          onClick={() => {
            navigate("/DoctorBillingFinance");
          }}
          className={`${
            location.pathname === "/DoctorBillingFinance"
              ? "text-[#01B49C]"
              : ""
          }`}
        >
          Billing / Finance
        </button>
        <button
          onClick={() => {
            navigate("/DoctorProfileSetting");
          }}
          className={`${
            location.pathname === "/DoctorProfileSetting"
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

export default DoctorNavbar;
