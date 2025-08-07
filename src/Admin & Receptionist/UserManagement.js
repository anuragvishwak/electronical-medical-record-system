import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { IoNotifications } from "react-icons/io5";

function UserManagement() {
  const [gettingUser, setgettingUser] = useState([]);

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

  return (
    <div className="bg-gray-50 h-screen">
      <AdminNavbar />

      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">User Management</p>
          <p className="text-gray-600">
            Manage user accounts and permissions across the healthcare system
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Users..."
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
            <div className="flex items-center justify-between">
              <p className="text-lg text-[#1976D2] font-bold">{user.name}</p>
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
            <p className="text-gray-600 text-sm">{user.email}</p>
            <hr className="my-2" />
            <p>Phone no: +91 {user.phone_no}</p>
            <p className="capitalize">
              Role:{" "}
              {user.role === "lab_technician" ? "Lab Technician" : user.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;
