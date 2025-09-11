import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaIndianRupeeSign, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function AdminBillingPayment() {
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
         <div className="p-5">
          <p className="text-2xl text-[#212a31] font-bold">Billing & Payment</p>
          <p className="text-[#196d8e]">
            Admin can add and manage{" "}
            <span className="text-[#212a31] font-semibold">Billing</span> and{" "}
            <span className="text-[#212a31] font-semibold">Payment</span>{" "}
            history.
          </p>
        </div>
      <div className="mx-5 flex items-end justify-end bg-white p-3 border border-gray-300 shadow rounded">

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Billing & Payment..."
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
      <div className="flex bg-white shadow m-3 border border-gray-300 rounded p-3 justify-center">
        <table className="w-full table-auto">
          <thead className="border border-gray-300 text-[#212a31] bg-gray-50">
            <tr>
              <th className="py-1">Patient</th>
              <th>Doctor</th>
              <th>Appointment Id</th>
              <th>BillDate</th>
              <th>SurgeryFee</th>
              <th>Consultation Fee</th>
              <th>Lab Tests Fee</th>
              <th>Sub Total</th>
              <th>Total (including GST + cess)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="">
            {gettingBills.map((bill) => (
              <>
                <tr className="text-[#196d8e] border-b border-gray-300">
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
