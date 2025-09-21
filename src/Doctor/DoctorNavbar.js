import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function DoctorNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white shadow items-center border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/DoctorDashboard");
          }}
          className={`${
            location.pathname === "/DoctorDashboard" ? "text-[#1976D2]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/DoctorAppointment");
          }}
          className={`${
            location.pathname === "/DoctorAppointment" ? "text-[#1976D2]" : ""
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => {
            navigate("/DoctorPatients");
          }}
          className={`${
            location.pathname === "/DoctorPatients" ? "text-[#1976D2]" : ""
          }`}
        >
          Patients
        </button>
        <button
          onClick={() => {
            navigate("/DoctorPrescription");
          }}
          className={`${
            location.pathname === "/DoctorPrescription" ? "text-[#1976D2]" : ""
          }`}
        >
          Prescriptions
        </button>

        <button
          onClick={() => {
            navigate("/DoctorConsultation");
          }}
          className={`${
            location.pathname === "/DoctorConsultation" ? "text-[#1976D2]" : ""
          }`}
        >
          Consultation
        </button>
        <button
          onClick={() => {
            navigate("/DoctorLabReports");
          }}
          className={`${
            location.pathname === "/DoctorLabReports" ? "text-[#1976D2]" : ""
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
              ? "text-[#1976D2]"
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
              ? "text-[#1976D2]"
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
