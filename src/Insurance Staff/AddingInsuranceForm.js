import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { z, ZodError } from "zod";
import { motion } from "framer-motion";


function AddingInsuranceForm({
  setopeningAddInsuranceForm,
  renderingInsurances,
}) {
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
  const hospitalName = localStorage.getItem("hospitalName");
  const [gettingUsers, setgettingUsers] = useState([]);
  const [providerName, setproviderName] = useState("");
  const [patient, setpatient] = useState("");
  const [policyNumber, setpolicyNumber] = useState("");
  const [coverageType, setcoverageType] = useState("");
  const [sumInsured, setsuminsured] = useState("");
  const [validFrom, setvalidFrom] = useState("");
  const [validTo, setvalidTo] = useState("");
  const [status, setstatus] = useState("");
  const [errors, setErrors] = useState({});

  const viewInsuranceInfoSchema = z.object({
    providerName: z.string().min(1, "Insurance Provider is compulsory."),
    patient: z.string().min(1, "Patient is compulsory."),
    policyNumber: z.string().min(1, "Policy Number is compulsory."),
    coverageType: z.string().min(1, "Coverage Type is compulsory."),
    sumInsured: z.string().min(1, "Sum Insured is compulsory."),
    validFrom: z.string().min(1, "Valid From is compulsory."),
    validTo: z.string().min(1, "Valid To is compulsory."),
    status: z.string().min(1, "Status is compulsory."),
  });

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
    setErrors({});

    const viewInsuranceInfoData = {
      providerName: providerName,
      patient: patient,
      policyNumber: policyNumber,
      coverageType: coverageType,
      sumInsured: sumInsured,
      validFrom: validFrom,
      validTo: validTo,
      status: status,
      hospitalName: hospitalName,
    };

    try {
      viewInsuranceInfoSchema.parse(viewInsuranceInfoData);

      await addDoc(
        collection(database, "insurance_database"),
        viewInsuranceInfoData
      );

      console.log("New Insurance added to Firestore.");
      setopeningAddInsuranceForm(false);
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

  useEffect(() => {
    renderingInsuranceCompany();
    renderingUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-3 rounded"
      >
        <div className="flex items-center mb-3 justify-between">
          <p className="text-[#003441] text-xl font-bold">Add Insurance</p>
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
            <p className="text-[#003441] text-lg font-semibold">
              Identification
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Patient Name</p>
                <select
                  value={patient}
                  onChange={(e) => setpatient(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option value="">Select Patient</option>
                  {gettingUsers
                    .filter((user) => user.role === "patient")
                    .map((user) => (
                      <option key={user.id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                </select>

                {errors.patient && (
                  <p className="text-red-500 text-sm">{errors.patient}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Provider Name</p>
                <select
                  value={providerName}
                  onChange={(e) => setproviderName(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option value="">Select Provider</option>
                  {gettingInsuranceCompanies.map((company) => (
                    <option key={company.id} value={company.providerName}>
                      {company.providerName}
                    </option>
                  ))}
                </select>

                {errors.providerName && (
                  <p className="text-red-500 text-sm">{errors.providerName}</p>
                )}
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
                <input
                  onChange={(e) => {
                    setpolicyNumber(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="A1B2C3D4E5"
                />
                {errors.policyNumber && (
                  <p className="text-red-500 text-sm">{errors.policyNumber}</p>
                )}
              </div>

              <div className="">
                <p className="font-semibold text-[#01B49C]">Coverage Type</p>
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
                {errors.coverageType && (
                  <p className="text-red-500 text-sm">{errors.coverageType}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Sum Insured</p>
                <input
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
                <input
                  type="date"
                  onChange={(e) => {
                    setvalidFrom(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₹5,00,000"
                />
                {errors.validFrom && (
                  <p className="text-red-500 text-sm">{errors.validFrom}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Valid To</p>
                <input
                  type="date"
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
                creatingInasurance();
              }}
              className="bg-[#003441] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
            >
              Add Insurance
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AddingInsuranceForm;
