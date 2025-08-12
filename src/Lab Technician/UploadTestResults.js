import React, { useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { FaSearch } from "react-icons/fa";
import CreateLabResultForm from "./CreateLabResultForm";

function UploadTestResults() {
  return (
    <div className="bg-gray-50 h-screen">
      <LabTechnicianNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Upload Test Results</p>
          <p className="text-gray-600">
            Upload and manage test lab results across the healthcare system
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search lab results..."
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
      <div>lab technician upload</div>

     
    </div>
  );
}

export default UploadTestResults;
