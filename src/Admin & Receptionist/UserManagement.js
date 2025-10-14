import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { IoNotifications } from "react-icons/io5";
import { FaBars, FaPhone, FaUser } from "react-icons/fa6";

function UserManagement() {
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAdminNavbar, setopeningAdminNavbar] = useState(false);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingUser();
  }, []);

  const handleApprove = async (userId) => {
    const userRef = doc(database, "user_database", userId);
    await updateDoc(userRef, {
      status: "approved",
    });
    renderingUser();
    alert("Approved");
  };

  const handleReject = async (userId) => {
    const userRef = doc(database, "user_database", userId);
    await updateDoc(userRef, {
      status: "rejected",
    });
    renderingUser();
    alert("Rejected");
  };

  function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  return (
    <div className="bg-gray-50 h-screen">
      <AdminNavbar
        setopeningAdminNavbar={setopeningAdminNavbar}
        openingAdminNavbar={openingAdminNavbar}
      />
      <div className="p-5 bg-white m-5 border border-gray-300 shadow">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg sm:text-2xl font-bold text-[#212a31]">
                User Management
              </p>
              <button
                onClick={() => {
                  setopeningAdminNavbar(true);
                }}
                className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
              >
                <FaBars />
              </button>
            </div>
            <p className="text-[#196d8e] sm:text-base text-sm">
              Manage user accounts and permissions across the healthcare system
            </p>
          </div>

          <div className="grid grid-cols-6 gap-3">
            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {gettingUser.length}
              </p>
              <p className="text-gray-500">Users</p>
            </div>
            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {gettingUser.filter((user) => user.role === "patient").length}
              </p>
              <p className="text-gray-500">Patients</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {gettingUser.filter((user) => user.role === "doctor").length}
              </p>
              <p className="text-gray-500">Doctors</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {gettingUser.filter((user) => user.role === "nurse").length}
              </p>
              <p className="text-gray-500">Nurse</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {
                  gettingUser.filter((user) => user.role === "lab_technician")
                    .length
                }
              </p>
              <p className="text-gray-500">Lab Technician</p>
            </div>
            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {
                  gettingUser.filter((user) => user.role === "insurance_dept")
                    .length
                }
              </p>
              <p className="text-gray-500">Insurance Dept</p>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 my-3" />
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Users..."
            className="border border-gray-400 w-full sm:w-5/12 p-1 rounded"
          ></input>

          <button>
            <IoNotifications
              size={31}
              className="border border-[#196d8e] p-1 rounded text-[#196d8e]"
            />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-auto h-[460px] scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 gap-5 m-5">
        {gettingUser.map((user) => (
          <div className="bg-white border border-gray-300 shadow p-3 rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#212a31] text-white font-bold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p className="sm:text-lg text-[#196d8e] font-bold">
                    {user.name}
                  </p>
                  <p className="text-[#748d92] text-sm">{user.email}</p>
                </div>
              </div>
              {user.status === "approved" ? (
                <p className="text-green-500 font-semibold p-0.5 px-2 rounded-full bg-green-100  text-sm">
                  Approved
                </p>
              ) : user.status === "rejected" ? (
                <p className="text-red-500 font-semibold p-0.5 px-2 rounded-full bg-red-100 text-sm">
                  Rejected
                </p>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      handleApprove(user.id);
                    }}
                    className="bg-[#1976D2] text-sm text-white py-0.5 px-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(user.id);
                    }}
                    className="bg-red-500 text-sm text-white py-0.5 px-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            <hr className="my-2" />
            <p className="text-[#212a31] flex items-center">
              <span className="text-[#748d92] p-1.5 rounded-full bg-gray-200 mr-1.5">
                <FaPhone size={14} />
              </span>{" "}
              {user.phone_no}
            </p>

            <p className="text-[#212a31] mt-3 flex items-center">
              <span className="text-[#748d92] p-1.5 rounded-full bg-gray-200 mr-1.5">
                <FaUser size={14} />
              </span>{" "}
              {user.role === "lab_technician" ? "Lab Technician" : user.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;
