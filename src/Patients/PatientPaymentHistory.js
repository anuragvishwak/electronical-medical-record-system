import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { FaBars, FaIndianRupeeSign } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function PatientPaymentHistory() {
  const currentUser = localStorage.getItem("email");
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

    const filteredBills = multipleArray.filter(
      (bill) => bill.patient === currentUser
    );

    setgettingBills(filteredBills);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  const getTotalSurgeryFee = () =>
    gettingBills.reduce((acc, bill) => acc + Number(bill.surgeryFee || 0), 0);

  const getTotalConsultationFee = () =>
    gettingBills.reduce(
      (acc, bill) => acc + Number(bill.consultationCharges || 0),
      0
    );

  const getTotalLabFee = () =>
    gettingBills.reduce((acc, bill) => acc + Number(bill.labCharges || 0), 0);

  const getTotalFinalAmount = () =>
    gettingBills.reduce((acc, bill) => acc + Number(bill.finalAmount || 0), 0);

  console.log("finding final amount", getTotalFinalAmount);

  useEffect(() => {
    renderingBills();
    renderingUser();
  });

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <PatientNavbar />

      <div className="bg-white shadow rounded border border-gray-300 m-5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex item-start justify-between w-full">
            <div className="">
              <p className="text-xl sm:text-2xl font-bold text-[#003441]">
                Payment History
              </p>
              <p className="text-[#01B49C] text-sm">
                <span className="font-semibold text-[#003441]">
                  Payment History
                </span>{" "}
                of patients are displayed in healthcare system
              </p>
            </div>

            <div className="flex items-center space-x-10">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <FaIndianRupeeSign />
                  <p className="font-bold text-xl">{getTotalFinalAmount()}/-</p>
                </div>
                <p className="text-[#01B49C]">Total Bill</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <FaIndianRupeeSign />
                  <p className="font-bold text-xl">
                    {getTotalConsultationFee()}/-
                  </p>
                </div>
                <p className="text-[#01B49C]">Total Consultation Fees</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <FaIndianRupeeSign />
                  <p className="font-bold text-xl">{getTotalSurgeryFee()}/-</p>
                </div>
                <p className="text-[#01B49C]">Total Surgery Fees</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <FaIndianRupeeSign />
                  <p className="font-bold text-xl">{getTotalLabFee()}/-</p>
                </div>
                <p className="text-[#01B49C]">Total Lab Test Fees</p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                //   setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#003441] text-[#003441] p-1 rounded sm:hidden"
            >
              <FaBars size={15} />
            </button>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />
        <div className="flex items-center justify-end space-x-3">
          <input
            placeholder="Search Doctors, bills and more..."
            className="border border-gray-300 w-full sm:w-5/12 p-1 rounded"
          ></input>

          <select className="border border-gray-300 w-60 p-1.5 rounded">
            <option>Filter by Doctor</option>
            {gettingUser.filter(user => user.role === "doctor").map((user) => (
              <option>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="flex bg-white shadow m-5 border border-gray-300 rounded p-5 justify-center">
          <table className="w-full table-auto">
            <thead className="border border-gray-300 text-[#003441] bg-gray-50">
              <tr>
                <th className="py-1">Doctor</th>
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
                  <tr className="text-[#01B49C] border-b border-gray-300">
                    {gettingUser
                      .filter((user) => user.email === bill.doctor)
                      .map((user) => (
                        <td className="py-2">
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

export default PatientPaymentHistory;
