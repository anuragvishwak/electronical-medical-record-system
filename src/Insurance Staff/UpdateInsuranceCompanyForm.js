import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { z } from "zod";
import { database } from "../FirebaseConfiguration";

function UpdateInsuranceCompanyForm({
  setopeningUpdateInsuranceCompanyForm,
  capturingDataObject,
  renderingInsuranceCompany,
}) {
  const [address, setaddress] = useState(capturingDataObject.address || "");
  const [contactPerson, setcontactPerson] = useState(
    capturingDataObject.contactPerson || ""
  );
  const [phoneNumber, setphoneNumber] = useState(
    capturingDataObject.phoneNumber || ""
  );
  const [email, setemail] = useState(capturingDataObject.email || "");
  const [policyTypeSupported, setpolicyTypeSupported] = useState(
    capturingDataObject.policyTypeSupported || ""
  );
  const [coverageNotes, setcoverageNotes] = useState(
    capturingDataObject.coverageNotes || ""
  );
  const [limitations, setlimitations] = useState(
    capturingDataObject.limitations || ""
  );
  const [errors, setErrors] = useState({});

  const insuranceProviderSchema = z.object({
    address: z.string().min(1, "Address is compulsory."),
    contactPerson: z.string().min(1, "Contact Person is compulsory."),
    phoneNumber: z.string().min(1, "Phone Number is compulsory."),
    email: z.string().min(1, "Email is compulsory."),
    policyTypeSupported: z
      .string()
      .min(1, "Policy Type Supported is compulsory."),
    coverageNotes: z.string().min(1, "Coverage Notes is compulsory."),
    limitations: z.string().min(1, "Limitations is compulsory."),
  });

  async function updateInsuranceProvider() {
    const insuranceProviderData = {
      address: address,
      contactPerson: contactPerson,
      phoneNumber: phoneNumber,
      email: email,
      policyTypeSupported: policyTypeSupported,
      coverageNotes: coverageNotes,
      limitations: limitations,
    };
    try {
      insuranceProviderSchema.parse(insuranceProviderData);
      const appointmentRef = doc(
        database,
        "insurance_provider_database",
        capturingDataObject.id
      );
      await updateDoc(appointmentRef, insuranceProviderData);

      console.log("Lab Order added to Firestore.");
      setopeningUpdateInsuranceCompanyForm(false);
      renderingInsuranceCompany();
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

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <div className="flex items-center mb-3 justify-between">
          <p className="text-[#212a31] text-xl font-bold">
            Update Insurance Provider
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningUpdateInsuranceCompanyForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="p-3 rounded border border-gray-300">
            <p className="text-[#212a31] text-lg font-semibold">
              Basic Information
            </p>
            <div className="grid grid-cols-2 my-2 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Provider Name</p>
                <p className="w-full border border-gray-300 rounded-md p-2">
                  {capturingDataObject.providerName}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">
                  Company Code / Short Name
                </p>
                <p className="w-full border border-gray-300 rounded-md p-2">
                  {capturingDataObject.companyCode}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Contact Person</p>
                <input
                  value={contactPerson}
                  onChange={(e) => {
                    setcontactPerson(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="John D Souza"
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm">{errors.contactPerson}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Phone Number</p>
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    setphoneNumber(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="+91 9327855861"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Email</p>
                <input
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="starHealth@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <p className="font-semibold text-[#196d8e]">Address</p>
              <textarea
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
                className="w-full h-20 border border-gray-300 rounded-md p-2"
                placeholder="Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
          </div>

          <div className="p-3 rounded border mt-3 border-gray-300">
            <p className="text-[#212a31] text-lg font-semibold">
              Policy & Coverage Information
            </p>
            <div className="my-2">
              <p className="font-semibold text-[#196d8e]">
                Policy Type Supported
              </p>
              <select
                value={policyTypeSupported}
                onChange={(e) => {
                  setpolicyTypeSupported(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option>Select Poicy Supported</option>
                <option value={"health"}>Health</option>
                <option value={"accident"}>Accident</option>
                <option value={"corporate"}>Corporate (Employer-based)</option>
                <option value={"travel_spacial"}>
                  Travel / Special Medical Cover
                </option>
              </select>
              {errors.policyTypeSupported && (
                <p className="text-red-500 text-sm">
                  {errors.policyTypeSupported}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <p className="font-semibold text-[#196d8e]">Coverage Notes</p>
                <textarea
                  value={coverageNotes}
                  onChange={(e) => {
                    setcoverageNotes(e.target.value);
                  }}
                  className="w-full h-20 border border-gray-300 rounded-md p-2"
                  placeholder="IPD only, OPD + Medicine, Maternity cover, etc."
                />
                {errors.coverageNotes && (
                  <p className="text-red-500 text-sm">{errors.coverageNotes}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Limitations</p>
                <textarea
                  value={limitations}
                  onChange={(e) => {
                    setlimitations(e.target.value);
                  }}
                  className="w-full h-20 border border-gray-300 rounded-md p-2"
                  placeholder="No cosmetic surgery coverage."
                />
                {errors.limitations && (
                  <p className="text-red-500 text-sm">{errors.limitations}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              updateInsuranceProvider();
            }}
            className="bg-[#196d8e] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Update Provider Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateInsuranceCompanyForm;
