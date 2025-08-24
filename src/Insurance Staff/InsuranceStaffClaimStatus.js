import React, { useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddClaimForm from "./AddClaimForm";

function InsuranceStaffClaimStatus() {

const [openingClaimStatus, setopeningClaimStatus] = useState(false);

  return (
    <div className="bg-gray-100 h-screen">
      <InsuranceStaffNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold text-[#212a31]">Claim Status</p>
          <p className="text-[#196d8e]">
            Admin can manage{" "}
            <span className="text-[#212a31] font-semibold">Claim Status</span>{" "}
            of patients.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Users..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button 
          onClick={()=>{
            setopeningClaimStatus(true);
          }}
          className="bg-[#196d8e] py-1 px-3 rounded shadow text-white">
            + Add Claim
          </button>
          <button>
            <IoNotifications
              size={31}
              className="border border-[#196d8e] p-1 rounded text-[#196d8e]"
            />
          </button>
        </div>
      </div>
      <div>
        
      </div>



      {openingClaimStatus && <AddClaimForm setopeningClaimStatus ={setopeningClaimStatus}/>}
    </div>
  );
}

export default InsuranceStaffClaimStatus;
