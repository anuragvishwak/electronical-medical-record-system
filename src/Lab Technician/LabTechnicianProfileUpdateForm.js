import React, { useState } from "react";
import { z } from "zod";
import { database } from "../FirebaseConfiguration";
import { doc, updateDoc } from "firebase/firestore";

function LabTechnicianProfileUpdateForm({
  setopeningLabTechnicianProfileUpdateForm,
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
  const [labTechnicianId, setlabTechnicianId] = useState("");
  const [equipmentHandled, setEquipmentHandled] = useState([]);
  const [testsAuthorized, setTestsAuthorized] = useState([]);

  const [errors, setErrors] = useState({});

  const equipmentOptions = [
    "Hematology Analyzer",
    "Biochemistry Analyzer",
    "Urine Analyzer",
    "Centrifuge",
    "Microscope",
    "PCR Machine",
    "ELISA Reader",
    "Blood Cell Counter",
    "Electrolyte Analyzer",
    "Autoclave",
    "Incubator",
    "Microtome",
    "Spectrophotometer",
    "Blood Gas Analyzer",
    "Coagulation Analyzer",
    "Culture Media Equipment",
    "Slide Stainer",
    "Cryostat",
    "Refrigerated Centrifuge",
    "Other (Specify)",
  ];

  const testAuthorizedOptions = [
    "Complete Blood Count (CBC)",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Blood Sugar / Glucose Test",
    "Lipid Profile",
    "Urine Routine / Microscopy",
    "Thyroid Function Test (TFT)",
    "Electrolyte Test (Na, K, Cl)",
    "Blood Grouping & Cross Matching",
    "Pregnancy Test (hCG)",
    "Widal Test",
    "Malaria / Dengue / Typhoid Tests",
    "HIV / HBsAg / HCV Screening",
    "COVID-19 RT-PCR Test",
    "Biopsy / Histopathology Support",
    "Microbiology Culture & Sensitivity",
    "Stool / Sputum Examination",
    "Coagulation Profile (PT, INR, aPTT)",
    "ESR Test",
    "Other (Specify)",
  ];

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
    labTechnicianId: z.string().min(1, "Lab Technician ID is compulsory."),
    equipmentHandled: z
      .array(z.string())
      .min(1, "Please select at least one equipment handled."),

    testsAuthorized: z
      .array(z.string())
      .min(1, "Please select at least one test authorized to perform."),
  });

  async function updatingProfileDetails() {
    const profileUpdateData = {
      gender: gender,
      dateOfBirth: dateOfBirth,
      country: country,
      state: state,
      city: city,
      labTechnicianId: labTechnicianId,
      qualification: qualification,
      designation: designation,
      department: department,
      yearsOfExperience: yearsOfExperience,
      medicalLicenseNumber: medicalLicenseNumber,
      workingHours: workingHours,
      shiftTime: shiftTime,
      leavesHoliday: leavesHoliday,
      achievementsAwards: achievementsAwards,
      equipmentHandled: equipmentHandled,
      testsAuthorized: testsAuthorized,
    };
    try {
      profileUpdateSchema.parse(profileUpdateData);
      const claimRef = doc(database, "user_database", currentUser.id);
      await updateDoc(claimRef, profileUpdateData);

      console.log("Profile Details updated successfully.");
      setopeningLabTechnicianProfileUpdateForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        console.error("Error while updating Doctor Profile:", error.message);
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
              setopeningLabTechnicianProfileUpdateForm(false);
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
                <p className="font-semibold text-[#196d8e]">
                  Lab Technician Id
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setlabTechnicianId(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-md p-1.5"
                  placeholder="LAB-345"
                />
                {errors.labTechnicianId && (
                  <p className="text-red-500 text-sm">
                    {errors.labTechnicianId}
                  </p>
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
                  <option value="lab-services">Lab Services</option>
                  <option value="pathology">Pathology</option>
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
                  <option>DMLT</option>
                  <option>BMLT</option>
                  <option>M.Sc Lab Tech</option>
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

          <div className="my-4">
            <p className="text-[#212a31] text-lg font-semibold">
              Profession Specific Information
            </p>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="font-semibold text-[#196d8e] mb-2">
                  Equipment Handled
                </p>

                <div className="flex flex-col border border-gray-300 rounded-md p-2 max-h-48 overflow-y-auto">
                  {equipmentOptions.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 mb-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={equipmentHandled.includes(item)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEquipmentHandled([...equipmentHandled, item]);
                          } else {
                            setEquipmentHandled(
                              equipmentHandled.filter((eq) => eq !== item)
                            );
                          }
                        }}
                        className="accent-[#196d8e]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                {errors.equipmentHandled && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.equipmentHandled}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#196d8e] mb-2">
                  Tests Authorized to Perform
                </p>

                <div className="flex flex-col border border-gray-300 rounded-md p-2 max-h-48 overflow-y-auto">
                  {testAuthorizedOptions.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 mb-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        checked={testsAuthorized.includes(item)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTestsAuthorized([...testsAuthorized, item]);
                          } else {
                            setTestsAuthorized(
                              testsAuthorized.filter((t) => t !== item)
                            );
                          }
                        }}
                        className="accent-[#196d8e]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                {errors.testsAuthorized && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.testsAuthorized}
                  </p>
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

export default LabTechnicianProfileUpdateForm;
