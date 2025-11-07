import React from "react";

function InsuranceCoodinationNavbar({ setcurrentTab, currentTab }) {
  return (
    <div className="border h-[540px] rounded mt-5 ml-5 bg-[#01B49C] text-white py-12 w-80 p-4">
      <button 
      onClick={() => {
          setcurrentTab("insurance-provider-overview");
        }}
        className={`block my-4 font-bold py-1.5 px-3 w-full text-start ${currentTab === "insurance-provider-overview"? "bg-white shadow rounded text-[#003441]" : ""}`}
      >Insurance Provider Overview</button>
      <button 
       onClick={() => {
          setcurrentTab("insurance-to-patient");
        }}
        className={`block my-4 font-bold py-1.5 px-3 w-full text-start ${currentTab === "insurance-to-patient"? "bg-white shadow rounded text-[#003441]" : ""}`}>Assigned Insurances to Patients</button>
      <button
        onClick={() => {
          setcurrentTab("claim-monitoring");
        }}
        className={`block font-bold py-1.5 px-3 w-full text-start ${currentTab === "claim-monitoring"? "bg-white shadow rounded text-[#003441]" : ""}`}
      >
        Claim Monitoring
      </button>
    </div>
  );
}

export default InsuranceCoodinationNavbar;
