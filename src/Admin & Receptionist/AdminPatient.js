import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { IoNotifications } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";

function AdminPatient() {
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAdminNavbar, setopeningAdminNavbar] = useState(false);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const FilteredArray = multipleArray.filter(
      (user) => user.role === "patient"
    );

    setgettingUser(FilteredArray);
  }

  useEffect(() => {
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar
        setopeningAdminNavbar={setopeningAdminNavbar}
        openingAdminNavbar={openingAdminNavbar}
      />
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-lg sm:text-2xl font-bold ">Patient Details</p>
            <button
              onClick={() => {
                setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
            >
              <FaBars />
            </button>
          </div>
          <p className="text-[#196d8e] sm:text-base">
            Patient details across the healthcare system
          </p>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search Patients..."
            className="border border-gray-300 w-96 p-1 rounded"
          ></input>

          <select className="border border-gray-300 w-60 p-1.5 rounded">
              <option>Filter by Patient</option>
              {gettingUser
                .filter((user) => user.role === "patient")
                .map((user) => (
                  <option>{user.name}</option>
                ))}
            </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 p-3">
        {gettingUser.map((user) => (
          <div className="bg-white border border-gray-300 shadow p-3 rounded">
            <p className="text-lg text-[#1976D2] font-bold">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <hr className="my-2" />
            <p>Phone no: +91 {user.phone_no}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPatient;
