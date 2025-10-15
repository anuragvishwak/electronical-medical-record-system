import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function DoctorNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex bg-white text-[#212a31] font-semibold shadow items-center border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/DoctorDashboard");
          }}
          className={`${
            location.pathname === "/DoctorDashboard" ? "text-[#196d8e]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/DoctorAppointment");
          }}
          className={`${
            location.pathname === "/DoctorAppointment" ? "text-[#196d8e]" : ""
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => {
            navigate("/DoctorPatients");
          }}
          className={`${
            location.pathname === "/DoctorPatients" ? "text-[#196d8e]" : ""
          }`}
        >
          Patients
        </button>
        <button
          onClick={() => {
            navigate("/DoctorPrescription");
          }}
          className={`${
            location.pathname === "/DoctorPrescription" ? "text-[#196d8e]" : ""
          }`}
        >
          Prescriptions
        </button>

        <button
          onClick={() => {
            navigate("/DoctorConsultation");
          }}
          className={`${
            location.pathname === "/DoctorConsultation" ? "text-[#196d8e]" : ""
          }`}
        >
          Consultation
        </button>
        <button
          onClick={() => {
            navigate("/DoctorLabReports");
          }}
          className={`${
            location.pathname === "/DoctorLabReports" ? "text-[#196d8e]" : ""
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
              ? "text-[#196d8e]"
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

export default DoctorNavbar;
