import React from "react";
import DoctorNavbar from "./DoctorNavbar";
import { FaSearch } from "react-icons/fa";

function DoctorConsultation() {
  return (
    <div>
      <DoctorNavbar />

      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Consultation</p>
          <p className="text-gray-600">
            Manage patient's Consultations across the healthcare system
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Users..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>

          <button>
            <FaSearch
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>

      <div>Doctor Consultation</div>
    </div>
  );
}

export default DoctorConsultation;
