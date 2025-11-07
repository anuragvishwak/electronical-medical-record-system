import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

function AddInsuranceCompanyForm({
  setopeningAddInsuranceCompany,
  renderingInsuranceCompany,
}) {
  const [providerName, setproviderName] = useState("");
  const [companyCode, setcompanyCode] = useState("");
  const [address, setaddress] = useState("");
  const [contactPerson, setcontactPerson] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [policyTypeSupported, setpolicyTypeSupported] = useState("");
  const [coverageNotes, setcoverageNotes] = useState("");
  const [limitations, setlimitations] = useState("");
  const [errors, setErrors] = useState({});

  const insuranceProviderSchema = z.object({
    providerName: z.string().min(1, "Insurance Provider is compulsory."),
    companyCode: z.string().min(1, "Company Code is compulsory."),
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

  async function handleAddInsuranceProvider() {
    const insuranceProviderData = {
      providerName: providerName,
      companyCode: companyCode,
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
      addDoc(
        collection(database, "insurance_provider_database"),
        insuranceProviderData
      );

      console.log("Lab Order added to Firestore.");
      setopeningAddInsuranceCompany(false);
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
          <p className="text-[#003441] text-xl font-bold">
            Add Insurance Provider
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAddInsuranceCompany(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="p-3 rounded border border-gray-300">
            <p className="text-[#003441] text-lg font-semibold">
              Basic Information
            </p>
            <div className="grid grid-cols-2 my-2 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Provider Name</p>
                <input
                  onChange={(e) => {
                    setproviderName(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Star Health Insurance"
                />
                {errors.providerName && (
                  <p className="text-red-500 text-sm">{errors.providerName}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#01B49C]">
                  Company Code / Short Name
                </p>
                <input
                  onChange={(e) => {
                    setcompanyCode(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="SHI"
                />
                {errors.companyCode && (
                  <p className="text-red-500 text-sm">{errors.companyCode}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Contact Person</p>
                <input
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
                <p className="font-semibold text-[#01B49C]">Phone Number</p>
                <input
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
                <p className="font-semibold text-[#01B49C]">Email</p>
                <input
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
              <p className="font-semibold text-[#01B49C]">Address</p>
              <textarea
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
            <p className="text-[#003441] text-lg font-semibold">
              Policy & Coverage Information
            </p>
            <div className="my-2">
              <p className="font-semibold text-[#01B49C]">
                Policy Type Supported
              </p>
              <select
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
                <p className="font-semibold text-[#01B49C]">Coverage Notes</p>
                <textarea
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
                <p className="font-semibold text-[#01B49C]">Limitations</p>
                <textarea
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
              handleAddInsuranceProvider();
            }}
            className="bg-[#01B49C] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Add Provider Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInsuranceCompanyForm;
