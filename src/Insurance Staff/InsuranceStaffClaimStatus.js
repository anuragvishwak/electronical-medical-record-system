import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddClaimForm from "./AddClaimForm";
import { FaCaretDown, FaCarSide, FaUser } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { GrNotes } from "react-icons/gr";
import { CgCreditCard } from "react-icons/cg";
import { FaIndianRupeeSign } from "react-icons/fa6";

function InsuranceStaffClaimStatus() {
  const hospitalName = localStorage.getItem('hospitalName');
  const [openingClaimStatus, setopeningClaimStatus] = useState(false);
  const [gettingClaimStatus, setgettingClaimStatus] = useState([]);

  async function renderingClaimStatus() {
    const taskDetails = await getDocs(
      collection(database, "claim_status_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingClaimStatus(multipleArray);
  }

  useEffect(() => {
    renderingClaimStatus();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <InsuranceStaffNavbar />

      <div className="m-5 bg-white p-5 border border-gray-300">
        <div>
          <p className="text-3xl font-bold text-[#003441]">Claim Status</p>
          <p className="text-[#01B49C]">
            Admin can manage Claim Status of patients.
          </p>
        </div>

        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search by claim id or policy number..."
            className="border border-gray-400 w-96 p-1 "
          ></input>
          <div className="flex items-center space-x-3">
            <select className="border  w-60 border-gray-300 p-2">
              <option>Claim Type</option>
              <option>Cashless</option>
              <option>Reimbursement</option>
            </select>
            <select className="border  border-gray-300 w-60 p-2">
              <option>Payment Mode</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Cheque</option>
            </select>
            <button
              onClick={() => {
                setopeningClaimStatus(true);
              }}
              className="bg-[#01B49C] py-1.5 px-3   text-white"
            >
              + Add Claim
            </button>
          </div>
        </div>
      </div>
      <div className="grid m-5 grid-cols-2 gap-5">
        {gettingClaimStatus.filter(claim => claim.hospitalName === hospitalName).map((claim) => (
          <div className="bg-white -lg ">
            <div>
              <div className="bg-[#01B49C] p-5 -t-lg">
                <div className="flex items-start w-full justify-between">
                  <div className="">
                    <p className="text-white text-xl font-semibold">
                      {claim.patient}
                    </p>
                  </div>
                  <p className="text-[#01B49C] bg-white px-3 py-0.5 -full text-sm font-semibold">
                    {claim.claimType}
                  </p>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    Policy {claim.policyNumber}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex text-[#003441] items-center space-x-1">
                  <GrNotes clas />
                  <p className="text-xl font-semibold">Treatment Details</p>
                </div>

                <div className="grid grid-cols-3">
                  <div>
                    <p className="text-[#01B49C]">Treatment & Diagnosis</p>
                    <p className="text-[#003441] font-semibold">
                      {claim.treatmentAndDiagnosis}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#01B49C]">Insurance Provider</p>
                    <p className="text-[#003441] font-semibold">
                      {claim.providerName}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-300 my-3" />

                <div className="flex text-[#003441] items-center space-x-1">
                  <FaIndianRupeeSign clas />
                  <p className="text-xl font-semibold">Financial Details</p>
                </div>

                <div className="grid grid-cols-3">
                  <div className="">
                    <p className="text-[#01B49C]">Claim Amount Filed</p>
                    <div className="flex items-center">
                      <FaIndianRupeeSign />
                      <p className="text-[#003441] font-semibold text-center">
                        {claim.claimAmountFiled}/-
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-[#01B49C]">Claim Amount Approved</p>
                    <div className="flex items-center">
                      <FaIndianRupeeSign />
                      <p className="text-[#003441] font-semibold text-center">
                        {claim.claimAmountApproved}/-
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-[#01B49C]">Settlement Amount</p>
                    <div className="flex items-center">
                      <FaIndianRupeeSign />
                      <p className="text-[#003441] font-semibold text-center">
                        {claim.settlementAmount}/-
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-300 my-3" />

                <div className="flex text-[#003441] items-center space-x-1">
                  <CgCreditCard clas />
                  <p className="text-xl font-semibold">Payment Details</p>
                </div>
                <div className="grid grid-cols-3">
                  <div>
                    <p className="text-[#01B49C]">Payment Mode</p>
                    <p className="text-[#003441] font-semibold">
                      {claim.paymentMode}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#01B49C]">Date of Payment</p>
                    <p className="text-[#003441] font-semibold">
                      {claim.dateOfPayment}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#01B49C]">Claim Submitted</p>
                    <p className="text-[#003441] font-semibold">
                      {claim.dateOfClaimSubmission}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openingClaimStatus && (
        <AddClaimForm setopeningClaimStatus={setopeningClaimStatus} />
      )}
    </div>
  );
}

export default InsuranceStaffClaimStatus;
