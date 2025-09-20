import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { database } from "../FirebaseConfiguration";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function PatientNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("email");
  const [gettingUsers, setgettingUsers] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUsers(multipleArray);
  }

  useEffect(() => {
    renderingUser();
  }, []);

  return (
    <div className="flex items-center bg-white shadow border-b justify-between p-3">
      <div className="flex items-center space-x-5">
        <button
          onClick={() => {
            navigate("/PatientDashboard");
          }}
          className={`${
            location.pathname === "/PatientDashboard" ? "text-[#1976D2]" : ""
          }`}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/PatientAppointment");
          }}
          className={`${
            location.pathname === "/PatientAppointment" ? "text-[#1976D2]" : ""
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => {
            navigate("/PatientPrescription");
          }}
          className={`${
            location.pathname === "/PatientPrescription" ? "text-[#1976D2]" : ""
          }`}
        >
          Prescription
        </button>
        <button
          onClick={() => {
            navigate("/PatientConsultation");
          }}
          className={`${
            location.pathname === "/PatientConsultation" ? "text-[#1976D2]" : ""
          }`}
        >
          Consultation
        </button>
        <button
          onClick={() => {
            navigate("/PatientLabReport");
          }}
          className={`${
            location.pathname === "/PatientLabReport" ? "text-[#1976D2]" : ""
          }`}
        >
          Lab Reports
        </button>
        <button>Medical History</button>
        <button>Payment History</button>
        <button
          onClick={() => {
            navigate("/PatientInsuranceDetails");
          }}
          className={`${
            location.pathname === "/PatientInsuranceDetails"
              ? "text-[#1976D2]"
              : ""
          }`}
        >
          Insurance Details
        </button>
        <button
          onClick={() => {
            navigate("/PatientProfileSetting");
          }}
          className={`${
            location.pathname === "/PatientProfileSetting"
              ? "text-[#1976D2]"
              : ""
          }`}
        >
          Profile / Setting
        </button>
      </div>

      <div className="flex items-center space-x-3 relative group">
        <button>
          <FaUser className="text-xl cursor-pointer" />
        </button>

        <div
          className="absolute top-8 right-0 bg-white shadow-md rounded-md p-2 border border-gray-300 hidden group-hover:block z-10
                  before:absolute before:content-[''] before:bottom-full before:right-6 before:border-[9px] before:border-transparent before:border-b-gray-300
                  after:absolute after:content-[''] after:bottom-[calc(100%-1px)] after:right-7 after:border-[8px] after:border-transparent after:border-b-white"
        >
          {gettingUsers
            .filter((user) => user.email === email)
            .map((user) => (
              <div key={user.id}>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            ))}
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
    </div>
  );
}

export default PatientNavbar;
