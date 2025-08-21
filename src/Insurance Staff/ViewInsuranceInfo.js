import React, { useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddInsuranceCompanyForm from "./AddInsuranceCompanyForm";

function ViewInsuranceInfo() {


  return (
    <div className="bg-gray-100 h-screen">
      <InsuranceStaffNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold">View Insurance Information</p>
          <p className="text-gray-600">
            All the <span className="text-[#1976D2]">Insurance</span>{" "}
            information will be displayed here.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Insurance companies..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button 
          onClick={()=>{
          }}
          className="bg-[#1976D2] py-1 px-3 rounded shadow text-white">+ Add Insurance Company</button>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>

      <div></div>


     
    </div>
  );
}

export default ViewInsuranceInfo;
