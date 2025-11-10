import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaIndianRupeeSign, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function AdminBillingPayment() {
  const hospitalName = localStorage.getItem('hospitalName');
  const [gettingBills, setgettingBills] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);

  async function renderingBills() {
    const taskDetails = await getDocs(
      collection(database, "billing_payment_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingBills(multipleArray);
  }

  const gettingSurgeryFee = gettingBills.reduce(
    (total, bill) => total + (Number(bill.surgeryFee) || 0),
    0
  );

  const gettingConsultationFee = gettingBills.reduce(
    (total, bill) => total + (Number(bill.consultationCharges) || 0),
    0
  );

  const gettingLabTestFee = gettingBills.reduce(
    (total, bill) => total + (Number(bill.labCharges) || 0),
    0
  );

  const gettingGrandTotal = gettingBills.reduce(
    (total, bill) => total + (Number(bill.finalAmount) || 0),
    0
  );

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingBills();
    renderingUser();
  });

  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />

      <div className="bg-white m-5 p-5 border border-gray-300 shadow rounded">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-2xl text-[#003441] font-bold">
              Billing & Payment
            </p>
            <p className="text-[#01B49C]">
              Admin can add and manage{" "}
             Billing and{" "}
             Payment{" "}
              history.
            </p>
          </div>

          <div className="flex items-center space-x-5">
            <div className="text-center text-sm">
              <p className="text-2xl flex items-center text-center font-bold">
                <FaIndianRupeeSign />
                {gettingSurgeryFee}/-
              </p>
              <p className="text-gray-500">Surgery Fees</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-2xl flex items-center text-center font-bold">
                <FaIndianRupeeSign />
                {gettingConsultationFee}/-
              </p>
              <p className="text-gray-500">Consultation Fees</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-2xl flex items-center text-center font-bold">
                <FaIndianRupeeSign />
                {gettingLabTestFee}/-
              </p>
              <p className="text-gray-500">Lab Charges</p>
            </div>

            <div className="text-center text-sm">
              <p className="text-2xl flex items-center text-center font-bold">
                <FaIndianRupeeSign />
                {gettingGrandTotal}/-
              </p>
              <p className="text-gray-500">Total</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-between space-x-2">
          <input
            placeholder="Search by appointment id and Bill Id..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>
         <div className="flex items-center space-x-3">
           <select className="border border-gray-300 w-60 p-1.5 rounded">
            <option>Filter by Patients</option>
            {gettingUser
              .filter((user) => user.role === "patient")
              .map((user) => (
                <option>{user.name}</option>
              ))}
          </select>
          <select className="border border-gray-300 w-60 p-1.5 rounded">
            <option>Filter by Doctors</option>
            {gettingUser
              .filter((user) => user.role === "doctor")
              .map((user) => (
                <option>{user.name}</option>
              ))}
          </select>
          <input
              type="date"
              className="border border-gray-300 w-60 p-1 rounded"
            ></input>
         </div>
        </div>
      </div>
      <div className="flex bg-white shadow m-3 border border-gray-300 rounded p-3 justify-center">
        <table className="w-full table-auto">
          <thead className="border border-gray-300 text-[#003441] bg-gray-50">
            <tr>
              <th className="py-1 text-start">Patient</th>
              <th className="text-start">Doctor</th>
              <th className="text-start">Appointment Id</th>
              <th className="text-start">BillDate</th>
              <th>SurgeryFee</th>
              <th>Consultation Fee</th>
              <th>Lab Tests Fee</th>
              <th>Sub Total</th>
              <th>Total (including GST + cess)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="">
            {gettingBills.filter(bill => bill.hospitalName === hospitalName).map((bill) => (
              <>
                <tr className="text-[#01B49C] border-b border-gray-300">
                  {gettingUser
                    .filter((user) => user.email === bill.patient)
                    .map((user) => (
                      <td className="py-1.5">
                        <div className="flex items-center justify-center">
                          <div>
                            <p>{user.name}</p>
                            <p className="text-sm text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                    ))}
                  {gettingUser
                    .filter((user) => user.email === bill.doctor)
                    .map((user) => (
                      <td>
                        <div className="flex items-center justify-center">
                          <div>
                            <p>{user.name}</p>
                            <p className="text-sm text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                    ))}
                  <td className="text-center">{bill.appointmentId}</td>
                  <td className="text-center">{bill.billDate}</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <FaIndianRupeeSign />
                      <p>{bill.surgeryFee}/-</p>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <FaIndianRupeeSign />
                      <p>{bill.consultationCharges}/-</p>
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <FaIndianRupeeSign />
                      <p>{bill.labCharges}/-</p>
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <FaIndianRupeeSign />
                      <p>{bill.subTotal}/-</p>
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <FaIndianRupeeSign />
                      <p>{bill.finalAmount}/-</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 justify-center">
                      <button className="text-green-500">
                        <FaEdit />
                      </button>

                      <button className="text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBillingPayment;
