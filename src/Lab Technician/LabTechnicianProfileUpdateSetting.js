import React, { useEffect, useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaRegEdit } from "react-icons/fa";
import { BsShield } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import LabTechnicianProfileUpdateForm from "./LabTechnicianProfileUpdateForm";
import { LiaAwardSolid } from "react-icons/lia";

function LabTechnicianProfileUpdateSetting() {
  const [gettingUser, setgettingUser] = useState([]);
  const [
    openingLabTechnicianProfileUpdateForm,
    setopeningLabTechnicianProfileUpdateForm,
  ] = useState(false);
  const [currentUser, setcurrentUser] = useState({});

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredUser = multipleArray.filter(
      (user) => user.email === localStorage.getItem("email")
    );

    setgettingUser(filteredUser);
  }

  useEffect(() => {
    renderingUser();
  });

  function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <LabTechnicianNavbar />

      <div className="p-5">
        <div>
          {gettingUser.map((user) => (
            <div className="grid grid-cols-5 gap-5">
              <div className="border border-gray-300 p-5 rounded-lg bg-white shadow">
                <p className="text-[#212a31] text-2xl capitalize font-bold">
                  {user.yearsOfExperience}
                </p>
                <p className="text-[#196d8e]">Years of Experience</p>
              </div>

              <div className="border  border-gray-300 p-5 rounded-lg bg-white shadow">
                <p className="text-[#212a31] text-2xl capitalize font-bold">
                  {user.workingHours}
                </p>
                <p className="text-[#196d8e]">Working Hours</p>
              </div>

              <div className="border  border-gray-300 p-5 rounded-lg bg-white shadow">
                <p className="text-[#212a31] text-2xl capitalize font-bold">
                  {user.leavesHoliday}
                </p>
                <p className="text-[#196d8e]">Leaves / Holidays</p>
              </div>

              <div className="border border-gray-300  p-5 rounded-lg bg-white shadow">
                <p className="text-[#212a31] text-2xl capitalize font-bold">
                  {user.shiftTime}
                </p>
                <p className="text-[#196d8e]">Shift Time</p>
              </div>

              <div className="border border-gray-300  p-5 rounded-lg bg-white shadow">
                <p className="text-[#212a31] text-2xl capitalize font-bold">
                  {user.department}
                </p>
                <p className="text-[#196d8e]">Department</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-5 justify-center">
          {gettingUser.map((user) => (
            <div className="w-full bg-white p-5 rounded border border-gray-300 shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-5">
                  <p className="bg-[#212a31] py-10 px-12 text-5xl font-bold rounded-full text-white">
                    {getInitials(user.name)}
                  </p>
                  <div>
                    <div>
                      <p className="text-3xl text-[#212a31] font-bold">
                        {user.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-[#196d8e] flex items-center gap-1">
                          <MdEmail />
                          {user.email}
                        </p>
                        <span className="font-semibold">|</span>
                        <p className="text-[#196d8e] flex items-center gap-1">
                          <FaPhone />
                          +91 {user.phone_no}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[#212a31] font-semibold flex items-center gap-1">
                        <BsShield />
                        {user.designation}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#212a31] font-semibold flex items-center gap-1">
                        <FaLocationDot />
                        {user.city}, {user.state}, {user.country}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setopeningLabTechnicianProfileUpdateForm(true);
                    setcurrentUser(user);
                  }}
                  className="bg-[#212a31] text-white font-semibold px-4 rounded py-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <FaRegEdit size={18} />
                    <p>Edit Profile</p>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white p-5 my-5 rounded border border-gray-300 shadow">
            <p className="text-xl font-semibold mb-2">Professional Details</p>
            {gettingUser.map((user) => (
              <div>
                <div className="grid grid-cols-5 gap-5">
                  <div>
                    <p className="text-[#212a31] font-semibold">
                      {user.labTechnicianId}
                    </p>
                    <p className="text-[#196d8e]">Lab Technicina ID</p>
                  </div>

                  <div>
                    <p className="text-[#212a31] font-semibold">
                      {user.qualification}
                    </p>
                    <p className="text-[#196d8e]">Qualification</p>
                  </div>

                  <div>
                    <p className="text-[#212a31] font-semibold">
                      {user.medicalLicenseNumber}
                    </p>
                    <p className="text-[#196d8e]">Medical License Number</p>
                  </div>
                </div>

<hr className="border-gray-300 my-3"/>

                <div className="flex space-x-7">
                  <div>
                    <p className="text-[#196d8e]">Equipment Handled</p>
                    <div className="text-[#212a31] grid grid-cols-3 gap-1 font-semibold">
                      {user.equipmentHandled.map((equip) => (
                        <p>{equip}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[#196d8e]">Tests Authorized to Perform</p>
                    <div className="text-[#212a31] grid grid-cols-3 gap-2 font-semibold">
                      {user.testsAuthorized.map((equip) => (
                        <p>{equip}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            {gettingUser.map((user) => (
              <div className="bg-white p-5 rounded border border-gray-300 shadow">
                <div className="w-full text-center">
                  <p className="text-[#196d8e]">Acheievements / Awards</p>
                  <p className="text-[#212a31] mt-2 flex items-center justify-center space-x-2 text-xl font-semibold">
                    <LiaAwardSolid size={30} />
                    {user.achievementsAwards}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {openingLabTechnicianProfileUpdateForm && (
        <LabTechnicianProfileUpdateForm
          currentUser={currentUser}
          setopeningLabTechnicianProfileUpdateForm={
            setopeningLabTechnicianProfileUpdateForm
          }
        />
      )}
    </div>
  );
}

export default LabTechnicianProfileUpdateSetting;
