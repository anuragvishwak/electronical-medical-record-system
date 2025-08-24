import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";

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

  async function handleAddInsuranceProvider() {
    try {
      addDoc(collection(database, "insurance_provider_database"), {
        providerName: providerName,
        companyCode: companyCode,
        address: address,
        contactPerson: contactPerson,
        phoneNumber: phoneNumber,
        email: email,
        policyTypeSupported: policyTypeSupported,
        coverageNotes: coverageNotes,
        limitations: limitations,
      });

      console.log("Lab Order added to Firestore.");
      setopeningAddInsuranceCompany(false);
      renderingInsuranceCompany();
    } catch (error) {
      console.error("Error during creating Consultation:", error.message);
      throw error;
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <div className="flex items-center mb-3 justify-between">
          <p className="text-[#212a31] text-xl font-bold">
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
            <p className="text-[#212a31] text-lg font-semibold">
              Basic Information
            </p>
            <div className="grid grid-cols-2 my-2 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Provider Name</p>
                <input
                  onChange={(e) => {
                    setproviderName(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Star Health Insurance"
                />
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">
                  Company Code / Short Name
                </p>
                <input
                  onChange={(e) => {
                    setcompanyCode(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="SHI"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Contact Person</p>
                <input
                  onChange={(e) => {
                    setcontactPerson(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="John D Souza"
                />
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Phone Number</p>
                <input
                  onChange={(e) => {
                    setphoneNumber(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="+91 9327855861"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Email</p>
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="starHealth@gmail.com"
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="font-semibold text-[#196d8e]">Address</p>
              <textarea
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
                className="w-full h-20 border border-gray-300 rounded-md p-2"
                placeholder="Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
              />
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
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <p className="font-semibold text-[#196d8e]">Coverage Notes</p>
                <textarea
                  onChange={(e) => {
                    setcoverageNotes(e.target.value);
                  }}
                  className="w-full h-20 border border-gray-300 rounded-md p-2"
                  placeholder="IPD only, OPD + Medicine, Maternity cover, etc."
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Limitations</p>
                <textarea
                  onChange={(e) => {
                    setlimitations(e.target.value);
                  }}
                  className="w-full h-20 border border-gray-300 rounded-md p-2"
                  placeholder="No cosmetic surgery coverage."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              handleAddInsuranceProvider();
            }}
            className="bg-[#196d8e] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Add Provider Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInsuranceCompanyForm;
