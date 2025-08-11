import React from "react";
import DoctorNavbar from "./DoctorNavbar";
import { IoNotifications } from "react-icons/io5";
import CentralizedAppointment from "../CentralizedAppointment";
import { useNavigate } from "react-router-dom";

function DoctorAppointment() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 h-screen">
      <DoctorNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold">Appointments</p>
          <p className="text-gray-600">Doctor can view their patient's appointments here</p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Appointments..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>
      <div>
        <CentralizedAppointment email={email} />
      </div>
    </div>
  );
}

export default DoctorAppointment;
