import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";

function AddClaimForm({ setopeningClaimStatus }) {
  const [gettingUsers, setgettingUsers] = useState([]);
  const [gettingInsurance, setgettingInsurance] = useState([]);
  const [patient, setpatient] = useState("");
  const [dateOfClaimSubmission, setdateOfClaimSubmission] = useState("");
  const [claimAmountFiled, setclaimAmountFiled] = useState("");
  const [claimAmountApproved, setclaimAmountApproved] = useState("");
  const [claimType, setclaimType] = useState("");
  const [treatmentAndDiagnosis, settreatmentAndDiagnosis] = useState("");
  const [settlementAmount, setsettlementAmount] = useState("");
  const [dateOfPayment, setdateOfPayment] = useState("");
  const [paymentMode, setpaymentMode] = useState("");
  const [transactionReferenceNo, settransactionReferenceNo] = useState("");
  const [providerName, setproviderName] = useState("");
  const [policyNumber, setpolicyNumber] = useState("");

  async function renderingUsers() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUsers(multipleArray);
  }

  const selectedInsurance = gettingInsurance.find(
    (ins) => ins.patient === patient
  );

  async function renderingInsurances() {
    const taskDetails = await getDocs(
      collection(database, "insurance_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingInsurance(multipleArray);
  }

  async function adddingClaimStatus() {
    try {
      addDoc(collection(database, "claim_status_database"), {
        providerName: providerName,
        patient: patient,
        policyNumber: policyNumber,
        dateOfClaimSubmission: dateOfClaimSubmission,
        claimAmountApproved: claimAmountApproved,
        claimAmountFiled: claimAmountFiled,
        claimType: claimType,
        treatmentAndDiagnosis: treatmentAndDiagnosis,
        settlementAmount: settlementAmount,
        dateOfPayment: dateOfPayment,
        paymentMode: paymentMode,
        transactionReferenceNo: transactionReferenceNo,
      });

      console.log("New Insurance added to Firestore.");
      setopeningClaimStatus(false);
      // renderingInsurances();
    } catch (error) {
      console.error("Error during creating Consultation:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    renderingUsers();
    renderingInsurances();
  }, []);

  useEffect(() => {
    if (selectedInsurance) {
      setproviderName(selectedInsurance.providerName);
      setpolicyNumber(selectedInsurance.policyNumber);
    }
  }, [selectedInsurance]);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-4 rounded">
        <div className="flex items-center mb-2 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Add Claim</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningClaimStatus(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="border border-gray-300 p-3 rounded">
            <p className="text-[#212a31] text-lg font-semibold">
              Basic Information
            </p>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Patient </p>
                <select
                  onChange={(e) => setpatient(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Patient</option>
                  {gettingUsers
                    .filter((user) => user.role === "patient")
                    .map((user) => (
                      <option value={user.name}>{user.name}</option>
                    ))}
                </select>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Provider </p>

                {gettingInsurance
                  .filter((user) => user.patient === patient)
                  .map((user) => (
                    <p className="border rounded border-gray-300 w-full p-1.5">
                      {user.providerName}
                    </p>
                  ))}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Policy No </p>

                {gettingInsurance
                  .filter((user) => user.patient === patient)
                  .map((user) => (
                    <p className="border rounded border-gray-300 w-full p-1.5">
                      {user.policyNumber}
                    </p>
                  ))}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Date of Claim Submission
                </p>
                <input
                  type="date"
                  onChange={(e) => {
                    setdateOfClaimSubmission(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹5,00,000"
                />
              </div>
            </div>
          </div>

          <div className="border p-3 my-3 rounded border-gray-300">
            <p className="text-[#212a31] text-lg font-semibold">
              Claim Details
            </p>

            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">
                  Claim Amount Filed
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setclaimAmountFiled(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹5,00,000"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Claim Amount Approved
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setclaimAmountApproved(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹2,00,000"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Claim Type</p>
                <select
                  onChange={(e) => setclaimType(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Type</option>
                  <option>Cashless</option>
                  <option>Reimbursement</option>
                </select>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Treatment / Diagnosis
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    settreatmentAndDiagnosis(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="Cancer, Liver Transplant "
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-300 p-3 rounded">
            <p className="text-[#212a31] text-lg font-semibold">
              Payment Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">
                  Settlement Amount
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setsettlementAmount(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹5,00,000"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Date of Payment</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setdateOfPayment(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Payment Mode</p>
                <select
                  onChange={(e) => setpaymentMode(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Mode</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                  <option>Cash</option>
                </select>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Transaction No /Reference No
                </p>
                <input
                  onChange={(e) => {
                    settransactionReferenceNo(e.target.value);
                  }}
                  placeholder="#213515"
                  className="w-full border border-gray-300 rounded-md p-1.5"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-1">
          <button 
            onClick={() => {
              adddingClaimStatus();
            }}
            className="bg-[#196d8e] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Add Claim Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddClaimForm;
