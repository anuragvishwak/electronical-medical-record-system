import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { IoNotifications } from "react-icons/io5";

function AdminPatient() {
  const [gettingUser, setgettingUser] = useState([]);

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
      <AdminNavbar />
      <div className="mx-3 bg-white p-3 border border-gray-300 shadow rounded  flex items-end justify-between mt-3">
        <div>
          <p className="text-2xl font-bold ">Patient Details</p>
          <p className="text-gray-600">
            Patient details across the healthcare system
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Patients..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 p-3">
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
