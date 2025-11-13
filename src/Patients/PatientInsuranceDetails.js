import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { IoNotifications } from "react-icons/io5";
import { BsShield } from "react-icons/bs";
import { CgDollar } from "react-icons/cg";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbCheckupList } from "react-icons/tb";

function PatientInsuranceDetails() {
  const [gatheringInsuranceDetails, setgatheringInsuranceDetails] = useState(
    []
  );
  const [gettingUser, setgettingUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [gettingClaimStatus, setgettingClaimStatus] = useState([]);

  const loggedInEmail = localStorage.getItem("email");

  async function renderingInsurances() {
    const taskDetails = await getDocs(
      collection(database, "insurance_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgatheringInsuranceDetails(multipleArray);
  }

  async function renderingInsuranceProvider() {
    const taskDetails = await getDocs(
      collection(database, "insurance_provider_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgatheringInsuranceDetails(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgettingUser(multipleArray);

    const matchedUser = multipleArray.find((u) => u.email === loggedInEmail);
    if (matchedUser) {
      setCurrentUser(matchedUser);
    }
  }

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
    renderingInsurances();
    renderingUser();
    renderingClaimStatus();
  }, []);

  const filteredInsuranceDetails = currentUser
    ? gatheringInsuranceDetails.filter(
        (insurance) => insurance.patient === currentUser.name
      )
    : [];

  return (
    <div className="bg-gray-50 h-screen">
      <PatientNavbar />
      <div>
        <div className="m-5 space-y-3">
          {filteredInsuranceDetails.length > 0 ? (
            filteredInsuranceDetails.map((insurance) => (
              <div>
                <div
                  key={insurance.id}
                  className="bg-white border p-4 border-gray-300"
                >
                  <div>
                    <div className="flex items-center text-[#003441] space-x-1">
                      <BsShield size={20} />
                      <p className="font-bold text-xl">
                        Basic Policy Information
                      </p>
                    </div>
                    <p className=" text-[#01B49C]">
                      Core insurance policy details and coverage validity.
                    </p>
                  </div>

                  <div className="flex mt-5 items-center gap-10">
                    <div>
                      <p className=" text-[#01B49C]">Insurance Provider</p>
                      <p className="text-[#003441] font-bold capitalize">
                        {insurance.providerName}
                      </p>
                    </div>

                    <div>
                      <p className=" text-[#01B49C]">Policy Number</p>
                      <p className="text-[#003441] font-bold capitalize">
                        {insurance.policyNumber}
                      </p>
                    </div>

                    <div>
                      <p className=" text-[#01B49C]">Coverage Type</p>
                      <p className="text-[#003441] font-bold capitalize">
                        {insurance.coverageType}
                      </p>
                    </div>

                    <div>
                      <p className=" text-[#01B49C]">Coverage Amount</p>
                      <div className="text-[#003441] flex items-center">
                        <FaIndianRupeeSign />
                        <p className="font-bold capitalize">
                          {insurance.sumInsured}/-
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className=" text-[#01B49C]">Status</p>
                      <p
                        className={`font-bold py-0.5 px-3 text-sm ${
                          insurance.status === "pending"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {insurance.status}
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-300 my-4" />
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-[#01B49C]">Valid From</p>
                      <p className="text-[#003441] font-bold capitalize">
                        {insurance.validFrom}
                      </p>
                    </div>

                    <div>
                      <p className=" text-[#01B49C]">Valid To</p>
                      <p className="text-[#003441] font-bold capitalize">
                        {insurance.validTo}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 mt-5 border border-gray-300">
                  <div>
                    <div className="flex items-center text-[#003441] space-x-1">
                      <TbCheckupList size={20} />
                      <p className="font-bold text-xl">Claim Details</p>
                    </div>
                    <p className=" text-[#01B49C]">
                      Track submitted claims, approvals, and settlement details.
                    </p>
                  </div>

                  {gettingClaimStatus
                    .filter(
                      (claim) => claim.providerName === insurance.providerName
                    )
                    .map((claim) => (
                      <div>
                        <div className="flex items-center mt-5 gap-10">
                          <div>
                            <p className=" text-[#01B49C]">
                              Date of Claim Submittion
                            </p>
                            <p className="font-bold capitalize">
                              {claim.dateOfClaimSubmission}
                            </p>
                          </div>

                          <div>
                            <p className=" text-[#01B49C]">Claim Type</p>
                            <p className="font-bold capitalize">
                              {claim.claimType}
                            </p>
                          </div>

                          <div>
                            <p className=" text-[#01B49C]">
                              Treatment & Diagnosis
                            </p>
                            <p className="font-bold capitalize">
                              {claim.treatmentAndDiagnosis}
                            </p>
                          </div>
                        </div>
                        <hr className="border-gray-300 my-4" />

                        <div className="flex items-center mt-5 gap-10">
                          <div>
                            <p className=" text-[#01B49C]">
                              Claim Amount Filed
                            </p>
                            <div className="text-[#003441] flex items-center">
                              <FaIndianRupeeSign />
                              <p className="font-bold capitalize">
                                {claim.claimAmountFiled}/-
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className=" text-[#01B49C]">
                              Claim Amount Approved
                            </p>
                            <div className="text-[#003441] flex items-center">
                              <FaIndianRupeeSign />
                              <p className="font-bold capitalize">
                                {claim.claimAmountApproved}/-
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className=" text-[#01B49C]">Settlement Amount</p>
                            <div className="text-[#003441] flex items-center">
                              <FaIndianRupeeSign />
                              <p className="font-bold capitalize">
                                {claim.settlementAmount}/-
                              </p>
                            </div>
                          </div>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        <div className="flex items-center gap-10">
                          <div>
                            <p className=" text-[#01B49C]">Date of Payment</p>
                            <p className="text-[#003441] font-bold capitalize">
                              {claim.dateOfPayment}
                            </p>
                          </div>

                          <div>
                            <p className=" text-[#01B49C]">Payment Mode</p>
                            <p className="text-[#003441] font-bold capitalize">
                              {claim.paymentMode}
                            </p>
                          </div>

                          <div>
                            <p className=" text-[#01B49C]">
                              Transaction Reference Number
                            </p>
                            <p className="text-[#003441] font-bold capitalize">
                              #{claim.transactionReferenceNo}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No insurance details found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientInsuranceDetails;
