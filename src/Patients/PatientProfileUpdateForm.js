import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

function PatientProfileUpdateForm({
  setopeningPatientProfileUpdateForm,
  currentUserName,
  gettingConsultations,
}) {
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [patientId, setpatientId] = useState("");
  const [knownAllegeries, setknownAllergies] = useState("");
  const [chronicCondition, setchronicCondition] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [errors, setErrors] = useState({});

  const patientProfileUpdateSchema = {
    gender: z.string().min(1, "Gender is compulsory."),
    dateOfBirth: z.string().min(1, "Date of Birth is compulsory."),
    state: z.string().min(1, "State is compulsory."),
    city: z.string().min(1, "City is compulsory."),
    country: z.string().min(1, "Country is compulsory."),
    patientId: z.string().min(1, "Patient ID is compulsory."),
    knownAllegeries: z.string().min(1, "Known Allergies are compulsory."),
    chronicCondition: z.string().min(1, "Chronic Condition is compulsory."),
    height: z.string().min(1, "Height is compulsory."),
    weight: z.string().min(1, "Weight is compulsory."),
  };

  async function updatingProfileDetails() {
    const patientProfileUpdateData = {
      gender: gender,
      dateOfBirth: dateOfBirth,
      country: country,
      state: state,
      city: city,
      patientId: patientId,
      knownAllegeries: knownAllegeries,
      chronicCondition: chronicCondition,
      height: height,
      weight: weight,
    };
    try {
      patientProfileUpdateSchema.parse(patientProfileUpdateData);
      const claimRef = doc(database, "user_database", currentUserName.id);
      await updateDoc(claimRef, patientProfileUpdateData);

      console.log("Profile Details updated successfully.");
      setopeningPatientProfileUpdateForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        console.error("Error while updating Patient Profile:", error.message);
      }
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen w-6/12 my-5 overflow-auto p-5 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Profile Details</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningPatientProfileUpdateForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div>
            <p className="text-[#212a31] text-lg font-semibold">
              Personal Information
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#196d8e]">Name</p>
                <input
                  type="text"
                  value={currentUserName?.name}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder=""
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Date of Birth</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setdateOfBirth(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder=""
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Gender</p>
                <select
                  onChange={(e) => {
                    setgender(e.target.value);
                  }}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>
            </div>
          </div>

          <div className="my-4">
            <p className="text-[#212a31] text-lg font-semibold">
              Contact Information
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#196d8e]">Email</p>
                <input
                  type="text"
                  value={currentUserName?.email}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="user"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Phone Number</p>
                <input
                  type="text"
                  value={currentUserName?.phone_no}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹2,00,000"
                />
                {errors.phone_no && (
                  <p className="text-red-500 text-sm">{errors.phone_no}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Emergency Contact Number
                </p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="+91 84371950"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Country</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setcountry(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="India"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">State</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setstate(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="Maharastra"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">City</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="Mumbai"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#212a31] text-lg font-semibold">
              Medical Information
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#196d8e]">Patient ID</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setpatientId(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="PT-324"
                />
                {errors.patientId && (
                  <p className="text-red-500 text-sm">{errors.patientId}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Known Allergies</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setknownAllergies(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="eg. Asthama"
                />
                {errors.knownAllegeries && (
                  <p className="text-red-500 text-sm">
                    {errors.knownAllegeries}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Chronic Condition
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setchronicCondition(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="eg. Diabetes and Hypertention"
                />
                {errors.chronicCondition && (
                  <p className="text-red-500 text-sm">
                    {errors.chronicCondition}
                  </p>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Height</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setheight(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="187 cm"
                />{" "}
                {errors.height && (
                  <p className="text-red-500 text-sm">{errors.height}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Weight</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setweight(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="40 kg"
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">{errors.weight}</p>
                )}
              </div>
            </div>
            <div className="my-4">
              <p className="font-semibold text-[#196d8e]">
                Current Medications
              </p>
              {gettingConsultations.map((consult) => (
                <p className="border p-1.5 rounded mb-2 text-sm border-gray-300">
                  {consult.medication_procedures}
                </p>
              ))}
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">
                Past Medical History
              </p>
              {gettingConsultations.map((consult) => (
                <p className="border p-1.5 rounded mb-2 text-sm border-gray-300">
                  {consult.pastMedicalHistory}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              updatingProfileDetails();
            }}
            className="bg-[#196d8e] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Update Profile Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientProfileUpdateForm;
