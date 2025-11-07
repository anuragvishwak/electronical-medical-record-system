import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { database } from "../FirebaseConfiguration";

function UpdateInsuranceForm({
  setopeningInsuranceUpdateForm,
  capturingDataObject,
  renderingInsurances,
}) {
  const [coverageType, setcoverageType] = useState(
    capturingDataObject.coverageType || ""
  );
  const [sumInsured, setsuminsured] = useState(
    capturingDataObject.sumInsured || ""
  );
  const [validTo, setvalidTo] = useState(capturingDataObject.validTo || "");
  const [status, setstatus] = useState(capturingDataObject.status || "");
  const [errors, setErrors] = useState({});

  const viewInsuranceInfoSchema = z.object({
    coverageType: z.string().min(1, "Coverage Type is compulsory."),
    sumInsured: z.string().min(1, "Sum Insured is compulsory."),
    validTo: z.string().min(1, "Valid To is compulsory."),
    status: z.string().min(1, "Status is compulsory."),
  });

  async function updatingInsurances() {
    setErrors({});

    const viewInsuranceInfoData = {
      coverageType: coverageType,
      sumInsured: sumInsured,
      validTo: validTo,
      status: status,
    };

    try {
      viewInsuranceInfoSchema.parse(viewInsuranceInfoData);

      const appointmentRef = doc(
        database,
        "insurance_database",
        capturingDataObject.id
      );
      await updateDoc(appointmentRef, viewInsuranceInfoData);
      console.log("Insurance updated to Firestore.");
      setopeningInsuranceUpdateForm(false);
      renderingInsurances();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        const newErrors = {};
        for (const key in fieldErrors) {
          newErrors[key] = fieldErrors[key][0];
        }

        setErrors(newErrors);
        console.error("Validation failed:", newErrors);
      } else {
        console.error("Error during creating Insurance:", error);
      }
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <div className="flex items-center mb-3 justify-between">
          <p className="text-[#003441] text-xl font-bold">Add Insurance</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningInsuranceUpdateForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="border border-gray-300 p-3 rounded">
            <p className="text-[#003441] text-lg font-semibold">
              Identification
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Patient Name</p>
                <p className="w-full border border-gray-300 rounded-md p-2">
                  {capturingDataObject.patient}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Provider Name</p>
                <p className="w-full border border-gray-300 rounded-md p-2">
                  {capturingDataObject.providerName}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded  p-3 my-3">
            <p className="text-[#003441] text-lg font-semibold">
              Policy Details
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Policy Number</p>
                <p className="w-full border border-gray-300 rounded-md p-2">
                  {capturingDataObject.policyNumber}
                </p>
              </div>

              <div className="">
                <p className="font-semibold text-[#01B49C]">Coverage Type</p>
                <select
                  value={coverageType}
                  onChange={(e) => {
                    setcoverageType(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>Select Coverage Type</option>
                  <option value={"inpatient"}>Inpatient</option>
                  <option value={"outpatient"}>Outpatient</option>
                  <option value={"surgery"}>Surgery</option>
                  <option value={"corporate"}>Corporate</option>
                  <option value={"general"}>General</option>
                </select>
                {errors.coverageType && (
                  <p className="text-red-500 text-sm">{errors.coverageType}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Sum Insured</p>
                <input
                  value={sumInsured}
                  onChange={(e) => {
                    setsuminsured(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₹5,00,000"
                />
                {errors.sumInsured && (
                  <p className="text-red-500 text-sm">{errors.sumInsured}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Valid From</p>
                <p className="w-full border border-gray-300 rounded-md p-2">
                  {capturingDataObject.validFrom}
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Valid To</p>
                <input
                  type="date"
                  value={validTo}
                  onChange={(e) => {
                    setvalidTo(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₹5,00,000"
                />
                {errors.validTo && (
                  <p className="text-red-500 text-sm">{errors.validTo}</p>
                )}
              </div>

              <div className="">
                <p className="font-semibold text-[#01B49C]">Status</p>
                <select
                  value={status}
                  onChange={(e) => {
                    setstatus(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option>Select Status</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"verified"}>Verified</option>
                  <option value={"expired"}>Expired</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                updatingInsurances();
              }}
              className="bg-[#01B49C] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
            >
              Update Insurance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInsuranceForm;
