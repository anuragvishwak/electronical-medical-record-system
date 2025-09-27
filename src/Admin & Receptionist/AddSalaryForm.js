import React from "react";

function AddSalaryForm({setopeningSalaryForm, currentStaffId}) {
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5 rounded">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Add Salary</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
            setopeningSalaryForm(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSalaryForm;
