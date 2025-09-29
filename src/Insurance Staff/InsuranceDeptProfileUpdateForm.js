import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";

function InsuranceDeptProfileUpdateForm({
  setopeningInsuranceDeptProfileForm,
  storingCurrentUser,
}) {
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");

  async function updatingProfileDetails() {
    try {
      const claimRef = doc(database, "user_database", storingCurrentUser.id);
      await updateDoc(claimRef, {
        gender: gender,
        dateOfBirth: dateOfBirth,
        country: country,
        state: state,
        city: city,
      });

      console.log("Profile Details updated successfully.");
      setopeningInsuranceDeptProfileForm(false);
    } catch (error) {
      console.error("Error during update profile details:", error.message);
      throw error;
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
