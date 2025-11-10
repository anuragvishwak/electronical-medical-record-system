import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

function AddClaimForm({ setopeningClaimStatus }) {
  const hospitalName = localStorage.getItem('hospitalName');
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
  const [errors, setErrors] = useState({});

  const claimStatusSchema = z.object({
    patient: z.string().min(1, "Patient is compulsory."),
    dateOfClaimSubmission: z
      .string()
      .min(1, "Date of Claim Submission is compulsory."),
    claimAmountFiled: z.string().min(1, "Claim Amount Filed is compulsory."),
    claimAmountApproved: z
      .string()
      .min(1, "Claim Amount Approved is compulsory."),
    settlementAmount: z
      .string()
      .min(1, "Settlement Amount Filed is compulsory."),
    claimType: z.string().min(1, "Claim Type Filed is compulsory."),
    treatmentAndDiagnosis: z
      .string()
      .min(1, "Treatment and Diagnosis is compulsory."),
    paymentMode: z.string().min(1, "Payment Mode is compulsory."),
    transactionReferenceNo: z
      .string()
      .min(1, "Transaction Reference No is compulsory."),
    dateOfPayment: z.string().min(1, "Date of Payment is compulsory."),
  });

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
    const claimStatusData = {
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
      hospitalName: hospitalName
    };
    try {
      claimStatusSchema.parse(claimStatusData);
      addDoc(collection(database, "claim_status_database"), claimStatusData);

      console.log("New Insurance added to Firestore.");
      setopeningClaimStatus(false);
      // renderingInsurances();
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        console.error("Error while creating prescription:", error.message);
      }
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
          <p className="text-[#003441] text-xl font-bold">Add Claim</p>
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
            <p className="text-[#003441] text-lg font-semibold">
              Basic Information
            </p>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Patient </p>
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
                {errors.patient && (
                  <p className="text-red-500 text-sm">{errors.patient}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Provider </p>

                {gettingInsurance
                  .filter((user) => user.patient === patient)
                  .map((user) => (
                    <p className="border rounded border-gray-300 w-full p-1.5">
                      {user.providerName}
                    </p>
                  ))}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Policy No </p>

                {gettingInsurance
                  .filter((user) => user.patient === patient)
                  .map((user) => (
                    <p className="border rounded border-gray-300 w-full p-1.5">
                      {user.policyNumber}
                    </p>
                  ))}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.dateOfClaimSubmission && (
                  <p className="text-red-500 text-sm">
                    {errors.dateOfClaimSubmission}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border p-3 my-3 rounded border-gray-300">
            <p className="text-[#003441] text-lg font-semibold">
              Claim Details
            </p>

            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.claimAmountFiled && (
                  <p className="text-red-500 text-sm">
                    {errors.claimAmountFiled}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.claimAmountApproved && (
                  <p className="text-red-500 text-sm">
                    {errors.claimAmountApproved}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Claim Type</p>
                <select
                  onChange={(e) => setclaimType(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Type</option>
                  <option>Cashless</option>
                  <option>Reimbursement</option>
                </select>
                {errors.claimType && (
                  <p className="text-red-500 text-sm">{errors.claimType}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.treatmentAndDiagnosis && (
                  <p className="text-red-500 text-sm">
                    {errors.treatmentAndDiagnosis}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 p-3 rounded">
            <p className="text-[#003441] text-lg font-semibold">
              Payment Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.settlementAmount && (
                  <p className="text-red-500 text-sm">
                    {errors.settlementAmount}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Date of Payment</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setdateOfPayment(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                />
                {errors.dateOfPayment && (
                  <p className="text-red-500 text-sm">{errors.dateOfPayment}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Payment Mode</p>
                <select
                  onChange={(e) => setpaymentMode(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Mode</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                  <option>Cash</option>
                </select>
                {errors.paymentMode && (
                  <p className="text-red-500 text-sm">{errors.paymentMode}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
                  Transaction No /Reference No
                </p>
                <input
                  onChange={(e) => {
                    settransactionReferenceNo(e.target.value);
                  }}
                  placeholder="#213515"
                  className="w-full border border-gray-300 rounded-md p-1.5"
                />
                {errors.transactionReferenceNo && (
                  <p className="text-red-500 text-sm">
                    {errors.transactionReferenceNo}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-1">
          <button
            onClick={() => {
              adddingClaimStatus();
            }}
            className="bg-[#01B49C] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Add Claim Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddClaimForm;
