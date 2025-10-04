import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

function InsuranceDeptProfileUpdateForm({
  setopeningInsuranceDeptProfileForm,
  storingCurrentUser,
}) {
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [errors, setErrors] = useState({});

  const insuranceDeptProfileUpdateSchema = z.object({
    gender: z.string().min(1, "Gender is compulsory."),
    dateOfBirth: z.string().min(1, "Date of Birth is compulsory."),
    state: z.string().min(1, "State is compulsory."),
    city: z.string().min(1, "City is compulsory."),
    country: z.string().min(1, "Country is compulsory."),
  });

  async function updatingProfileDetails() {
    const insuranceDeptProfileUpdateData = {
      gender: gender,
      dateOfBirth: dateOfBirth,
      country: country,
      state: state,
      city: city,
    };

    try {
      insuranceDeptProfileUpdateSchema.parse(insuranceDeptProfileUpdateData);
      const claimRef = doc(database, "user_database", storingCurrentUser.id);
      await updateDoc(claimRef, insuranceDeptProfileUpdateData);

      console.log("Profile Details updated successfully.");
      setopeningInsuranceDeptProfileForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        console.error("Error while updating Insurance Dept Profile:", error.message);
      }
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-6/12 overflow-auto p-5 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Profile Update</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningInsuranceDeptProfileForm(false);
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
                  value={storingCurrentUser.name}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder=""
                />
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
                  <p className="text-red-500 text-sm">{errors.gender}</p>
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
                  value={storingCurrentUser?.email}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="user"
                />
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Phone Number</p>
                <input
                  type="text"
                  value={storingCurrentUser?.phone_no}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹2,00,000"
                />
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
                  <p className="text-red-500 text-sm">{errors.country}</p>
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

export default InsuranceDeptProfileUpdateForm;
