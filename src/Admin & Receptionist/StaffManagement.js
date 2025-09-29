import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { FaBars } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import CreateStaff from "./CreateStaff";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import AddSalaryForm from "./AddSalaryForm";
import { FaIndianRupeeSign } from "react-icons/fa6";

function StaffManagement() {
  const [openingAddStaffForm, setopeningAddStaffForm] = useState(false);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingSalaryForm, setopeningSalaryForm] = useState(false);
  const [currentStaffId, setcurrentStaffId] = useState("");

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  const filteredUser = gettingUser.filter((user) => user.role !== "patient");

  useEffect(() => {
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <AdminNavbar />
      <div className="bg-white shadow rounded border border-gray-300 m-5 p-5">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-xl sm:text-2xl font-bold text-[#212a31]">
              Staff Management
            </p>
            <p className="text-[#196d8e] text-sm">
              Manage{" "}
              <span className="text-[#212a31] font-semibold">
                Staff and employees
              </span>{" "}
              across the healthcare system
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                // setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
            >
              <FaBars size={15} />
            </button>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search Appointments..."
            className="border border-gray-400 w-full sm:w-5/12 p-1 rounded"
          ></input>
          <div className="sm:flex items-center sm:space-x-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setopeningAddStaffForm(true);
                }}
                className="bg-[#196d8e] py-1 sm:px-5 w-full sm:w-auto text-sm sm:text-base rounded shadow text-white"
              >
                + Create Staff
              </button>

              <button>
                <IoNotifications
                  size={31}
                  className="border border-gray-500 p-1 rounded text-gray-500"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid m-5 grid-cols-3 gap-5">
        {filteredUser.map((user) => (
          <div className="bg-white p-5 rounded border border-gray-300 shadow">
            <div className="flex items-start justify-between">
              <p className="text-[#212a31] text-lg font-bold">{user.name}</p>

              <button
                onClick={() => {
                  setcurrentStaffId(user.id);
                  setopeningSalaryForm(true);
                }}
                className="bg-[#196d8e] text-white py-1 text-sm px-3 rounded"
              >
                Add Salary
              </button>
            </div>
            <p className="text-sm text-[#196d8e]">{user.email}</p>

            <hr className="border-gray-300 my-3" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#196d8e]">Role:</p>
                <p className="text-[#212a31] font-semibold">{user.role}</p>
              </div>

              <div>
                <p className="text-[#196d8e]">Phone No:</p>
                <p className="text-[#212a31] font-semibold">
                  +91 {user.phone_no}
                </p>
              </div>
            </div>

            <hr className="border-gray-300 my-3" />

            <div>
              <p className="font-semibold text-[#196d8e] text-lg">
                Salary Breakdown
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-1.5 rounded border border-gray-300">
                  <p className="text-[#196d8e] bg-gray-100  px-2 py-0.5 border border-gray-300">
                    Basic Pay:
                  </p>
                  <p className="text-[#212a31] flex mt-2 items-center font-semibold">
                    <FaIndianRupeeSign />
                    {user.basicPay}/-
                  </p>
                </div>

                <div className="p-1.5 rounded border border-gray-300">
                  <p className="text-[#196d8e] border bg-gray-100  border-gray-300 py-0.5 px-2 ">
                    HRA (House Rent Allowance):
                  </p>
                  <p className="text-[#212a31] flex mt-2 items-center font-semibold">
                    <FaIndianRupeeSign />
                    {user.hra}/-
                  </p>
                </div>

                <div className="p-1.5 rounded border border-gray-300">
                  <p className="text-[#196d8e] border border-gray-300 py-0.5 px-2 bg-gray-100 ">
                    General Allowance:
                  </p>
                  <p className="text-[#212a31] flex mt-2 items-center font-semibold">
                    <FaIndianRupeeSign />
                    {user.allowance}/-
                  </p>
                </div>

                <div className="p-1.5 rounded border border-gray-300">
                  <p className="text-[#196d8e] bg-gray-100  border border-gray-300 py-0.5 px-2">
                    Deduction:
                  </p>
                  <p className="text-red-500 flex mt-2 items-center font-semibold">
                    <span>-</span> <FaIndianRupeeSign />
                    {user.deduction}/-
                  </p>
                </div>

                <div className="p-1.5 rounded border border-gray-300">
                  <p className="text-[#196d8e] py-0.5 px-2 bg-gray-100  border border-gray-300">
                    Final Net Salary:
                  </p>
                  <p className="text-[#212a31] flex mt-2 items-center font-bold text-lg">
                    <FaIndianRupeeSign />
                    {user.allowance}/-
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openingAddStaffForm && (
        <CreateStaff setopeningAddStaffForm={setopeningAddStaffForm} />
      )}

      {openingSalaryForm && (
        <AddSalaryForm
          currentStaffId={currentStaffId}
          setopeningSalaryForm={setopeningSalaryForm}
          renderingUser = {renderingUser}
        />
      )}
    </div>
  );
}

export default StaffManagement;
