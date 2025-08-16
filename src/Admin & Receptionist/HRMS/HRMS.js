import React from "react";

function HRMS({ setopeningHRMS }) {
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-4 rounded">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Hospital Resource Management System (HRMS)</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningHRMS(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default HRMS;
