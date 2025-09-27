import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import HRMS from "./HRMS/HRMS";
import { FaBars } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

function AdminNavbar({ openingAdminNavbar, setopeningAdminNavbar }) {
  const navigate = useNavigate();

  const location = useLocation();
  const [openingHRMS, setopeningHRMS] = useState(false);

  return (
    <div>
      <div className="hidden sm:flex font-semibold items-center sticky top-0 text-[#212a31] bg-white shadow border-b justify-between p-3">
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
              location.pathname === "/AdminPatient" ? "text-[#196d8e]" : ""
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => {
              navigate("/AdminAppointment");
            }}
            className={`${
              location.pathname === "/AdminAppointment" ? "text-[#196d8e]" : ""
            }`}
          >
            Appointment
          </button>
          <button
            onClick={() => {
              navigate("/UserManagement");
            }}
            className={`${
              location.pathname === "/UserManagement" ? "text-[#196d8e]" : ""
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => {
              navigate("/AdminBillingPayment");
            }}
            className={`${
              location.pathname === "/AdminBillingPayment"
                ? "text-[#196d8e]"
                : ""
            }`}
          >
            Billing & Payment
          </button>
          <button
            onClick={() => {
              navigate("/AdminInsuranceCoordination");
            }}
            className={`${
              location.pathname === "/AdminInsuranceCoordination"
                ? "text-[#196d8e]"
                : ""
            }`}
          >
            Insurance Coordination
          </button>
          <button
            onClick={() => {
              navigate("/MedicinesTreatment");
            }}
            className={`${
              location.pathname === "/MedicinesTreatment"
                ? "text-[#196d8e]"
                : ""
            }`}
          >
            Medicines
          </button>
          <button
           onClick={() => {
              navigate("/StaffManagement");
            }}
            className={`${
              location.pathname === "/StaffManagement" ? "text-[#196d8e]" : ""
            }`}
          >Staff Management</button>
          <button
            onClick={() => {
              navigate("/AdminProfileSetting");
            }}
            className={`${
              location.pathname === "/AdminProfileSetting"
                ? "text-[#196d8e]"
                : ""
            }`}
          >
            Profile / Setting
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setopeningHRMS(true);
            }}
            className="bg-[#196d8e] hover:border-blue-800 hover:bg-blue-800 border border-[#196d8e] text-white py-0.5 px-2.5 rounded"
          >
            HRMS
          </button>
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

      {openingAdminNavbar && (
        <div className="flex flex-col justify-start items-start h-screen fixed sm:hidden text-[#212a31] w-full bg-white shadow border-b p-3">
          <div className="flex">
            <button
              onClick={() => {
                setopeningAdminNavbar(false);
              }}
            >
              <CgClose />
            </button>
          </div>
          <div className="flex flex-col">
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
                location.pathname === "/AdminPatient" ? "text-[#196d8e]" : ""
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => {
                navigate("/AdminAppointment");
              }}
              className={`${
                location.pathname === "/AdminAppointment"
                  ? "text-[#196d8e]"
                  : ""
              }`}
            >
              Appointment
            </button>
            <button
              onClick={() => {
                navigate("/UserManagement");
              }}
              className={`${
                location.pathname === "/UserManagement" ? "text-[#196d8e]" : ""
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => {
                navigate("/AdminBillingPayment ");
              }}
              className={`${
                location.pathname === "/AdminBillingPayment "
                  ? "text-[#196d8e]"
                  : ""
              }`}
            >
              Billing & Payment
            </button>
            <button>Insurance Coordination</button>
            <button
              onClick={() => {
                navigate("/MedicinesTreatment");
              }}
              className={`${
                location.pathname === "/MedicinesTreatment"
                  ? "text-[#196d8e]"
                  : ""
              }`}
            >
              Medicines
            </button>
            <button>Staff Management</button>
            <button>Profile / Setting</button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setopeningHRMS(true);
              }}
              className="bg-[#196d8e] hover:border-blue-800 hover:bg-blue-800 border border-[#196d8e] text-white py-0.5 px-2.5 rounded"
            >
              HRMS
            </button>
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
      )}
      {openingHRMS && <HRMS setopeningHRMS={setopeningHRMS} />}
    </div>
  );
}

export default AdminNavbar;
