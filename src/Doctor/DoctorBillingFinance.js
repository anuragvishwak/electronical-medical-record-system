import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";
import { FaBars, FaIndianRupeeSign, FaTrash } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { email, parse } from "zod";

function DoctorBillingFinance() {
  const [gettingBills, setgettingBills] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);

  const currentUserEmail = localStorage.getItem("email");

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

  const totalConsultationFee = gettingBills
    ?.filter((bill) => bill.doctor === currentUserEmail)
    ?.reduce((target, bill) => target + (bill.consultationCharges || 0), 0);

  const totalSurgeryFee = gettingBills
    ?.filter((bill) => bill.doctor === currentUserEmail)
    ?.reduce((target, bill) => target + (parseInt(bill.surgeryFee) || 0), 0);

  const finalCostofBill = totalConsultationFee + totalSurgeryFee;

  useEffect(() => {
    renderingBills();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DoctorNavbar />

      <div className="bg-white shadow rounded border border-gray-300 m-5 p-5">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-xl sm:text-2xl font-bold text-[#212a31]">
              Billing & Finance
            </p>
            <p className="text-[#196d8e] text-sm">
              Manage appointments across the healthcare system
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                //   setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
            >
              <FaBars size={15} />
            </button>

            <div className="grid grid-cols-3 gap-5">
              <div className="rounded border py-2 border-gray-400 px-3">
                <p className="text-xl flex items-center space-x-1 text-center font-bold">
                  <FaIndianRupeeSign />
                  {totalSurgeryFee}/-
                </p>
                <p className="text-[#196d8e]">Surgery Fee</p>
              </div>

              <div className="rounded border py-2 border-gray-400 px-3">
                <p className="text-xl flex items-center space-x-1 text-center font-bold">
                  <FaIndianRupeeSign />
                  {totalConsultationFee}/-
                </p>
                <p className="text-[#196d8e]">Consultation Fee</p>
              </div>
              <div className="rounded border py-2 border-gray-400 px-3">
                <p className="text-xl flex items-center space-x-1 text-center font-bold">
                  <FaIndianRupeeSign />
                  {finalCostofBill}/-
                </p>
                <p className="text-[#196d8e]">Total Amount</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search Bills..."
            className="border border-gray-400 w-full sm:w-5/12 p-1 rounded"
          ></input>
          <div className="sm:flex items-center sm:space-x-2">
            <button>
              <IoNotifications
                size={31}
                className="border border-gray-500 p-1 rounded text-gray-500"
              />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex bg-white shadow m-5 border border-gray-300 rounded p-5 justify-center">
          <table className="w-full table-auto">
            <thead className="border border-gray-300 text-[#212a31] bg-gray-50">
              <tr>
                <th className="py-1">Patient</th>
                <th>Appointment Id</th>
                <th>BillDate</th>
                <th>SurgeryFee</th>
                <th>Consultation Fee</th>
                <th>Lab Tests Fee</th>
                <th>Sub Total</th>
                <th>Total (including GST + cess)</th>
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
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DoctorBillingFinance;
