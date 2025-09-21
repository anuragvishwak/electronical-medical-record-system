import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";

function DoctorProfileEditUpdateForm({
  setopeningDoctorProfileUpdateForm,
  currentUser,
}) {
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");
  const [yearsOfExperience, setyearsOfExperience] = useState("");
  const [qualification, setqualification] = useState("");
  const [medicalLicenseNumber, setmedicalLicenseNumber] = useState("");
  const [workingHours, setworkingHours] = useState("");
  const [shiftTime, setshiftTime] = useState("");
  const [leavesHoliday, setleavesHoliday] = useState("");
  const [achievementsAwards, setachievementsAwards] = useState("");
  const [doctorId, setdoctorId] = useState("");

  async function updatingProfileDetails() {
    try {
      const claimRef = doc(database, "user_database", currentUser.id);
      await updateDoc(claimRef, {
        gender: gender,
        dateOfBirth: dateOfBirth,
        country: country,
        state: state,
        city: city,
        doctorId: doctorId,
        qualification: qualification,
        designation: designation,
        department: department,
        yearsOfExperience: yearsOfExperience,
        medicalLicenseNumber: medicalLicenseNumber,
        workingHours: workingHours,
        shiftTime: shiftTime,
        leavesHoliday: leavesHoliday,
        achievementsAwards: achievementsAwards,
      });

      console.log("Profile Details updated successfully.");
      setopeningDoctorProfileUpdateForm(false);
    } catch (error) {
      console.error("Error during update profile details:", error.message);
      throw error;
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
              setopeningDoctorProfileUpdateForm(false);
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
                  value={currentUser.name}
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
                  value={currentUser?.email}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="user"
                />
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">Phone Number</p>
                <input
                  type="text"
                  value={currentUser?.phone_no}
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

          <div>
            <p className="text-[#212a31] text-lg font-semibold">
              Professional Information
            </p>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#196d8e]">Doctor Id</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setdoctorId(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="DOC-345"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Designation</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setdesignation(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="Consultant, Surgeon, etc."
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Department</p>
                <select
                  onChange={(e) => {
                    setdepartment(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                >
                  <option value="">Select Department</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="general">General Medicine</option>
                </select>
              </div>
              <div>
                <p className="font-semibold text-[#196d8e]">
                  Years of Experience
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setyearsOfExperience(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="10 Years"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Qualification</p>
                <select
                  onChange={(e) => {
                    setqualification(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                >
                  <option value="" disabled>
                    Select your degree
                  </option>
                  <option value="MBBS">MBBS</option>
                  <option value="MD">MD</option>
                  <option value="MS">MS</option>
                  <option value="DM">DM</option>
                  <option value="MCh">MCh</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Medical License Number
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setmedicalLicenseNumber(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="ME0000"
                />
              </div>
            </div>
          </div>

          <div className="my-4">
            <p className="text-[#212a31] text-lg font-semibold">
              Work Schedule / Availability
            </p>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <p className="font-semibold text-[#196d8e]">Working Days</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setworkingHours(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="5 days"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Shift Time</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setshiftTime(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="9:00 AM – 5:00 PM"
                />
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Leaves / Holidays
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setleavesHoliday(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="10 leaves (in a year)"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#212a31] text-lg font-semibold">
              Other Information
            </p>
            <div>
              <p className="font-semibold text-[#196d8e]">
                Achievements / Awards
              </p>
              <input
                type="text"
                onChange={(e) => {
                  setachievementsAwards(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-1.5"
                placeholder="Best Surgeon 2024"
              />
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
    </div>
  );
}

export default DoctorProfileEditUpdateForm;
