import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

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
  const [errors, setErrors] = useState({});

  const profileUpdateSchema = z.object({
    gender: z.string().min(1, "Gender is compulsory."),
    dateOfBirth: z.string().min(1, "Date of Birth is compulsory."),
    state: z.string().min(1, "State is compulsory."),
    city: z.string().min(1, "City is compulsory."),
    country: z.string().min(1, "Country is compulsory."),
    designation: z.string().min(1, "Designation is compulsory."),
    department: z.string().min(1, "Department is compulsory."),
    yearsOfExperience: z.string().min(1, "Years of Experience is compulsory."),
    qualification: z.string().min(1, "Qualification is compulsory."),
    medicalLicenseNumber: z
      .string()
      .min(1, "Medical License Number is compulsory."),
    workingHours: z.string().min(1, "Working Hours is compulsory."),
    shiftTime: z.string().min(1, "Shift Time is compulsory."),
    leavesHoliday: z.string().min(1, "Leaves & Holiday is compulsory."),
    achievementsAwards: z
      .string()
      .min(1, "Achievement & Awards is compulsory."),
    doctorId: z.string().min(1, "Doctor ID is compulsory."),
  });

  async function updatingProfileDetails() {
    const profileUpdateData = {
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
    };
    try {
      profileUpdateSchema.parse(profileUpdateData);
      const claimRef = doc(database, "user_database", currentUser.id);
      await updateDoc(claimRef, profileUpdateData);

      console.log("Profile Details updated successfully.");
      setopeningDoctorProfileUpdateForm(false);
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
      <div className="bg-white h-screen w-6/12 my-5 overflow-auto p-5 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Profile Update</p>
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
                {errors.phone_no && (
                  <p className="text-red-500 text-sm">{errors.phone_no}</p>
                )}
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
                {errors.doctorId && (
                  <p className="text-red-500 text-sm">{errors.doctorId}</p>
                )}
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
                {errors.designation && (
                  <p className="text-red-500 text-sm">{errors.designation}</p>
                )}
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
                {errors.department && (
                  <p className="text-red-500 text-sm">{errors.department}</p>
                )}
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
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-sm">
                    {errors.yearsOfExperience}
                  </p>
                )}
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
                {errors.qualification && (
                  <p className="text-red-500 text-sm">{errors.qualification}</p>
                )}
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
                {errors.medicalLicenseNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.medicalLicenseNumber}
                  </p>
                )}
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
                {errors.workingHours && (
                  <p className="text-red-500 text-sm">{errors.workingHours}</p>
                )}
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
                {errors.shiftTime && (
                  <p className="text-red-500 text-sm">{errors.shiftTime}</p>
                )}
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
                {errors.leavesHoliday && (
                  <p className="text-red-500 text-sm">{errors.leavesHoliday}</p>
                )}
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
              {errors.achievementsAwards && (
                <p className="text-red-500 text-sm">
                  {errors.achievementsAwards}
                </p>
              )}
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
