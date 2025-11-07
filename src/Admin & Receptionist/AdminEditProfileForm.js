import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";

function AdminEditProfileForm({ setopeningAdminProfileForm, currentUser }) {
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [adminId, setadminId] = useState("");
  const [designation, setdesignation] = useState("");
  const [accessLevel, setaccessLevel] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [dateOfJoining, setdateOfJoining] = useState("");
  const [shiftHours, setshiftHours] = useState("");
  const [lastLoginDateAndTime, setlastLoginDateAndTime] = useState("");
  const [status, setstatus] = useState("");
  const [moduleAssigned, setmoduleAssigned] = useState("");

  async function updatingProfileDetails() {
    try {
      const claimRef = doc(database, "user_database", currentUser.id);

      await updateDoc(claimRef, {
        gender: gender,
        dateOfBirth: dateOfBirth,
        country: country,
        state: state,
        city: city,
        adminId: adminId,
        designation: designation,
        accessLevel: accessLevel,
        employeeId: employeeId,
        dateOfJoining: dateOfJoining,
        shiftHours: shiftHours,
        lastLoginDateAndTime: lastLoginDateAndTime,
        status: status,
        moduleAssigned: moduleAssigned
      });

      console.log("Profile Details updated successfully.");
      setopeningAdminProfileForm(false);
    } catch (error) {
      console.error("Error during update profile details:", error.message);
      throw error;
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen my-5 overflow-auto p-5 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#003441] text-xl font-bold">Profile Details</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAdminProfileForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div>
            <p className="text-[#003441] text-lg font-semibold">
              Personal Information
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#01B49C]">Name</p>
                <input
                  type="text"
                  value={currentUser.name}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder=""
                />
              </div>
              <div>
                <p className="font-semibold text-[#01B49C]">Date of Birth</p>
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
                <p className="font-semibold text-[#01B49C]">Gender</p>
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
            <p className="text-[#003441] text-lg font-semibold">
              Contact Information
            </p>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#01B49C]">Email</p>
                <input
                  type="text"
                  value={currentUser.email}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹2,00,000"
                />
              </div>
              <div>
                <p className="font-semibold text-[#01B49C]">Phone Number</p>
                <input
                  type="text"
                  value={currentUser.phone_no}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="₹2,00,000"
                />
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Country</p>
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
                <p className="font-semibold text-[#01B49C]">State</p>
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
                <p className="font-semibold text-[#01B49C]">City</p>
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

          <div className="">
            <p className="text-[#003441] text-lg font-semibold">
              Role-Based Information
            </p>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#01B49C]">Admin ID</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setadminId(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="ADM-203"
                />
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Designation</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setdesignation(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="Super Admin"
                />
              </div>
              <div>
                <p className="font-semibold text-[#01B49C]">Access Level</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setaccessLevel(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="full / Limited"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <p className="text-[#003441] text-lg font-semibold">
              Work / Employment Details
            </p>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#01B49C]">Employee ID</p>
                <input
                  type="text"
                  onChange={(e) => {
                     setemployeeId(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="EMP-324"
                />
              </div>
              <div>
                <p className="font-semibold text-[#01B49C]">Date of Joining</p>
                <input
                  type="date"
                  onChange={(e) => {
                     setdateOfJoining(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                />
              </div>

              <div className="">
                <p className="font-semibold text-[#01B49C]">
                  Shift / Work Hours
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                     setshiftHours(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="40 Hr"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#003441] text-lg font-semibold">
              System Details
            </p>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="font-semibold text-[#01B49C]">
                  Last Login Date & Time
                </p>
                <input
                  type="datetime-local"
                  onChange={(e) => {
                     setlastLoginDateAndTime(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="full / Limited"
                />
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Status</p>
                <select
                  onChange={(e) => {
                    setstatus(e.target.value);
                  }}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>In Active</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-[#01B49C]">Module Assigned</p>
              <input
                type="text"
                onChange={(e) => {
                   setmoduleAssigned(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-1.5"
                placeholder="Appointments, User Management, Patient, Billing & Payment and Insurance Coordination."
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              updatingProfileDetails();
            }}
            className="bg-[#01B49C] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Update Profile Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProfileForm;
