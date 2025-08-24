import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { addDoc, collection, getDocs } from "firebase/firestore";

function AddingInsuranceForm({
  setopeningAddInsuranceForm,
  renderingInsurances,
}) {
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
  const [gettingUsers, setgettingUsers] = useState([]);
  const [providerName, setproviderName] = useState("");
  const [patient, setpatient] = useState("");
  const [policyNumber, setpolicyNumber] = useState("");
  const [coverageType, setcoverageType] = useState("");
  const [sumInsured, setsuminsured] = useState("");
  const [validFrom, setvalidFrom] = useState("");
  const [validTo, setvalidTo] = useState("");
  const [status, setstatus] = useState("");

  async function renderingUsers() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUsers(multipleArray);
  }

  async function renderingInsuranceCompany() {
    const taskDetails = await getDocs(
      collection(database, "insurance_provider_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingInsuranceCompanies(multipleArray);
  }

  async function creatingInasurance() {
    try {
      addDoc(collection(database, "insurance_database"), {
        providerName: providerName,
        patient: patient,
        policyNumber: policyNumber,
        coverageType: coverageType,
        sumInsured: sumInsured,
        validFrom: validFrom,
        validTo: validTo,
        status: status,
      });

      console.log("New Insurance added to Firestore.");
      setopeningAddInsuranceForm(false);
      renderingInsurances();
    } catch (error) {
      console.error("Error during creating Consultation:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    renderingInsuranceCompany();
    renderingUsers();
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <div className="flex items-center mb-3 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Add Insurance</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAddInsuranceForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="border border-gray-300 p-3 rounded">
            <p className="text-[#212a31] text-lg font-semibold">Identification</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Patient Name</p>
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
                <p className="font-semibold text-[#196d8e]">Provider Name</p>
                <select
                  onChange={(e) => setproviderName(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select provider</option>
                  {gettingInsuranceCompanies.map((user) => (
                    <option value={user.providerName}>{user.providerName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded  p-3 my-3">
            <p className="text-[#212a31] text-lg font-semibold">Policy Details</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Policy Number</p>
                <input
                  onChange={(e) => {
                    setpolicyNumber(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="A1B2C3D4E5"
                />
              </div>

              <div className="">
                <p className="font-semibold text-[#196d8e]">Coverage Type</p>
                <select
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
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Sum Insured</p>
                <input
                  onChange={(e) => {
                    setsuminsured(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₹5,00,000"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Valid From</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setvalidFrom(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₹5,00,000"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Valid To</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setvalidTo(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₹5,00,000"
                />
              </div>

              <div className="">
                <p className="font-semibold text-[#196d8e]">Status</p>
                <select
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
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                creatingInasurance();
              }}
              className="bg-[#196d8e] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
            >
              Add Insurance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddingInsuranceForm;
