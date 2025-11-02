import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import HRMS from "./HRMS/HRMS";
import { CgClose } from "react-icons/cg";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { GiCloudDownload } from "react-icons/gi";

function AdminNavbar({ openingAdminNavbar, setopeningAdminNavbar }) {
  const navigate = useNavigate();

  const location = useLocation();
  const [openingHRMS, setopeningHRMS] = useState(false);

  async function downloadAllData() {
    const collections = [
      "user_database",
      "appointment_database",
      "consultation_database",
      "prescription_database",
      "patient_vitals_database",
      "billing_payment_database",
      "insurance_database",
      "insurance_provider_database",
      "claim_status_database",
      "lab_order_database",
      "lab_order_results_database",
      "medicine_database",
    ];

    const workbook = XLSX.utils.book_new();

    for (const col of collections) {
      const snapshot = await getDocs(collection(database, col));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (data.length === 0) {
        console.log(`⚠️ No data found in ${col}`);
        continue;
      }

      console.log(`✅ ${data.length} records fetched from ${col}`);

      const worksheet = XLSX.utils.json_to_sheet(data);

      const cols = Object.keys(data[0] || {}).map((key) => ({
        wch: key.length + 10,
      }));
      worksheet["!cols"] = cols;

      XLSX.utils.book_append_sheet(workbook, worksheet, col);
    }

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `hospital_data_${new Date().toLocaleDateString()}.xlsx`);

    alert("Data downloaded! Each collection is in a separate Excel sheet.");
  }

  return (
    <div>
      <div className="hidden sm:flex font-semibold items-center sticky top-0 text-[#212a31] bg-white shadow border-b justify-between p-3">
        <div className="flex items-center space-x-5">
          <button
            onClick={() => {
              navigate("/AdminDashboard");
            }}
            className={`${
              location.pathname === "/AdminDashboard" ? "text-[#196d8e]" : ""
            }`}
          >
            Home
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
          >
            Staff Management
          </button>
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
            onClick={downloadAllData}
            className="bg-[#212a31] text-white py-1 px-2.5 rounded hover:bg-[#196d8e]"
          >
            <div className="flex items-center space-x-1">
              <GiCloudDownload />
              <p>Download Data</p>
            </div>
          </button>

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
