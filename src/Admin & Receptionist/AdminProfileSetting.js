import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaRegEdit } from "react-icons/fa";
import AdminEditProfileForm from "./AdminEditProfileForm";
import {
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsShield } from "react-icons/bs";

function AdminProfileSetting() {
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAdminProfileForm, setopeningAdminProfileForm] = useState(false);
  const [currentUser, setcurrentUser] = useState("");

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
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />

      <div className="p-5">
        <div className="flex justify-center">
          {gettingUser.map((user) => (
            <div className="w-full bg-white p-5 border border-gray-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-5">
                  <p className="bg-[#003441] py-10 px-12 text-5xl font-bold rounded-full text-white">
                    {getInitials(user.name)}
                  </p>
                  <div>
                    <div>
                      <p className="text-3xl text-[#003441] font-bold">
                        {user.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-[#01B49C] flex items-center gap-1">
                          <MdEmail />
                          {user.email}
                        </p>
                        <span className="font-semibold">|</span>
                        <p className="text-[#01B49C] flex items-center gap-1">
                          <FaPhone />
                          +91 {user.phone_no}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[#003441] font-semibold flex items-center gap-1">
                        <BsShield />
                        {user.designation}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#003441] font-semibold flex items-center gap-1">
                        <FaLocationDot />
                        {user.city}, {user.state}, {user.country}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setopeningAdminProfileForm(true);
                    setcurrentUser(user);
                  }}
                  className="bg-[#003441] text-white font-semibold px-4 py-1.5"
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
        <div className="flex justify-center my-5 w-full">
          {gettingUser.map((user) => (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-5  border border-gray-300">
                  <p className="text-xl font-semibold mb-2">
                    Personal Information
                  </p>
                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-[#003441] font-semibold">
                        {user.adminId}
                      </p>
                      <p className="text-[#01B49C]">Admin Id</p>
                    </div>

                    <div>
                      <p className="text-[#003441] font-semibold">
                        {user.designation}
                      </p>
                      <p className="text-[#01B49C]">Designation</p>
                    </div>

                    <div>
                      <p className="text-[#003441] font-semibold">
                        {user.accessLevel}
                      </p>
                      <p className="text-[#01B49C]">Access Level</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-[#003441] font-semibold">
                      {user.city}, {user.state}, {user.country}
                    </p>
                    <p className="text-[#01B49C]">Address</p>
                  </div>
                </div>

                <div className="bg-white p-5 border border-gray-300">
                  <p className="text-xl font-semibold mb-2">System Details</p>
                  <div className="flex items-center mb-2 gap-5">
                    <div>
                      <p className="text-[#003441] font-semibold">
                        {user.lastLoginDateAndTime}
                      </p>
                      <p className="text-[#01B49C]">Last Login Date & Time</p>
                    </div>

                    <div>
                      <p
                        className={`font-semibold ${
                          user.status === "Active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {user.status}
                      </p>
                      <p className="text-[#01B49C]">Status</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#003441]  font-semibold">
                      {user.moduleAssigned}
                    </p>
                    <p className="text-[#01B49C]">Module Assigned</p>
                  </div>
                </div>
              </div>

              <div className="bg-white mt-5 border border-gray-300 p-5">
                <p className="text-xl font-semibold mb-2">
                  Work / Employment Details
                </p>
                <div className="flex items-center gap-5">
                  <div>
                    <p className="text-[#003441] font-semibold">
                      {user.employeeId}
                    </p>
                    <p className="text-[#01B49C]">Employee ID</p>
                  </div>

                  <div>
                    <p className="text-[#003441] font-semibold">
                      {user.dateOfJoining}
                    </p>
                    <p className="text-[#01B49C]">Date of Joining</p>
                  </div>

                  <div>
                    <p className="text-[#003441] font-semibold">
                      {user.shiftHours} Hours
                    </p>
                    <p className="text-[#01B49C]">Shift / Work Hours</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openingAdminProfileForm && (
        <AdminEditProfileForm
          setopeningAdminProfileForm={setopeningAdminProfileForm}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default AdminProfileSetting;
