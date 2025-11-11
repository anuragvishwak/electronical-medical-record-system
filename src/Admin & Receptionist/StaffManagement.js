import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { FaBars } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import CreateStaff from "./CreateStaff";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import AddSalaryForm from "./AddSalaryForm";
import { FaIndianRupeeSign, FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import UpdateStaffForm from "./UpdateStaffForm";

function StaffManagement() {
  const hospitalName = localStorage.getItem("hospitalName");
  const [openingAddStaffForm, setopeningAddStaffForm] = useState(false);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingSalaryForm, setopeningSalaryForm] = useState(false);
  const [openingUpdateStaffForm, setopeningStaffUpdateForm] = useState(false);
  const [capturingStaffData, setcapturingStaffData] = useState({});

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
      <div className="bg-white border border-gray-300 m-5 p-5">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-xl sm:text-2xl font-bold text-[#003441]">
              Staff Management
            </p>
            <p className="text-[#01B49C] text-sm">
              Manage{" "}
              <span className="text-[#003441] font-semibold">
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
              className="border-2 border-[#003441] text-[#003441] p-1 sm:hidden"
            >
              <FaBars size={15} />
            </button>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />
        <div className="sm:flex items-center justify-between">
          <input
            placeholder="Search Staff..."
            className="border border-gray-400 w-full sm:w-96 p-1"
          ></input>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 w-60 p-1.5">
              <option>Filter by Roles</option>

              <option>Select Role</option>
              <option value={"patient"}>Patient</option>
              <option value={"doctor"}>Doctor</option>
              <option value={"nurse"}>Nurse</option>
              <option value={"lab_technician"}>Lab Technician</option>
              <option value={"insurance_dept"}>Insurance Dept</option>
            </select>
            <button
              onClick={() => {
                setopeningAddStaffForm(true);
              }}
              className="bg-[#01B49C] py-1 sm:px-5 w-full sm:w-auto text-sm sm:text-base text-white"
            >
              + Create Staff
            </button>
          </div>
        </div>
      </div>
      <div className="grid m-5 grid-cols-3 gap-5">
        {filteredUser.filter(user => user.Hospital_name === hospitalName).map((user) => (
          <div className="bg-white p-5 border border-gray-300">
            <div className="flex items-start justify-between">
              <p className="text-[#003441] text-lg font-bold">{user.name}</p>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setopeningSalaryForm(true);
                    setcapturingStaffData(user);
                  }}
                  className="bg-[#01B49C] text-white py-1 text-sm px-3 mr-2"
                >
                  Add Salary
                </button>
                <button
                  onClick={() => {
                    setopeningStaffUpdateForm(true);
                    setcapturingStaffData(user);
                  }}
                  className="text-[#003441]"
                >
                  <FaPencil />
                </button>
                <button className="text-[#01B49C]">
                  <MdDelete size={19} />
                </button>
              </div>
            </div>
            <p className="text-sm text-[#01B49C]">{user.email}</p>

            <hr className="border-gray-300 my-3" />

            <div className="flex items-center text-sm justify-between">
              <div>
                <p className="text-[#01B49C]">Role:</p>
                <p className="text-[#003441] font-semibold">{user.role}</p>
              </div>

              <div className="text-sm">
                <p className="text-[#01B49C]">Phone No:</p>
                <p className="text-[#003441] font-semibold">
                  +91 {user.phone_no}
                </p>
              </div>
            </div>

            <hr className="border-gray-300 my-3" />

            <div>
              <p className="font-semibold text-[#01B49C] text-lg">
                Salary Breakdown
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-1.5 border border-gray-300">
                  <p className="text-[#01B49C] text-sm bg-gray-100  px-2 py-0.5 border border-gray-300">
                    Basic Pay:
                  </p>
                  <p className="text-[#003441] flex mt-2 items-center font-semibold">
                    <FaIndianRupeeSign />
                    {user.basicPay}/-
                  </p>
                </div>

                <div className="p-1.5 border border-gray-300">
                  <p className="text-[#01B49C] text-sm border bg-gray-100  border-gray-300 py-0.5 px-2 ">
                    HRA (House Rent Allowance):
                  </p>
                  <p className="text-[#003441] flex mt-2 items-center font-semibold">
                    <FaIndianRupeeSign />
                    {user.hra}/-
                  </p>
                </div>

                <div className="p-1.5 border border-gray-300">
                  <p className="text-[#01B49C] text-sm border border-gray-300 py-0.5 px-2 bg-gray-100 ">
                    General Allowance:
                  </p>
                  <p className="text-[#003441] flex mt-2 items-center font-semibold">
                    <FaIndianRupeeSign />
                    {user.allowance}/-
                  </p>
                </div>

                <div className="p-1.5 border border-gray-300">
                  <p className="text-[#01B49C] text-sm bg-gray-100  border border-gray-300 py-0.5 px-2">
                    Deduction:
                  </p>
                  <p className="text-red-500 flex mt-2 items-center font-semibold">
                    <span>-</span> <FaIndianRupeeSign />
                    {user.deduction}/-
                  </p>
                </div>

                <div className="p-1.5 border border-gray-300">
                  <p className="text-[#01B49C] text-sm py-0.5 px-2 bg-gray-100  border border-gray-300">
                    Final Net Salary:
                  </p>
                  <p className="text-[#003441] flex mt-2 items-center font-bold text-lg">
                    <FaIndianRupeeSign />
                    {user.netSalary}/-
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
      {openingUpdateStaffForm && (
        <UpdateStaffForm
          renderingUser={renderingUser}
          capturingStaffData={capturingStaffData}
          setopeningStaffUpdateForm={setopeningStaffUpdateForm}
        />
      )}

      {openingSalaryForm && (
        <AddSalaryForm
          capturingStaffData={capturingStaffData}
          setopeningSalaryForm={setopeningSalaryForm}
          renderingUser={renderingUser}
        />
      )}
    </div>
  );
}

export default StaffManagement;
