import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";
import { FaCalendarAlt, FaDotCircle, FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { MdOutlineInsertChartOutlined, MdTimer } from "react-icons/md";
import { FaIndianRupeeSign, FaRubleSign } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigation = useNavigate();
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingBills, setgettingBills] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingAppointments() {
    const taskDetails = await getDocs(
      collection(database, "appointment_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingAppointments(multipleArray);
  }

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

  useEffect(() => {
    renderingAppointments();
    renderingUser();
    renderingBills();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminNavbar />
      <div>
        <div className="grid grid-cols-4 gap-5 p-5">
          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaCalendarAlt
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">
                  Total Appointments
                </p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {gettingAppointments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaUser
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">Total Patients</p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {gettingUser.filter((user) => user.role === "patient").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaUser
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">Total Revenue</p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  ₹
                  {gettingBills.reduce(
                    (total, bill) => total + (bill.finalAmount || 0),
                    0
                  )}
                  /-
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaUser
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">Total Staff</p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {gettingUser.filter((user) => user.role !== "patient").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-5 flex items-start gap-5">
          <div className="bg-white p-5 w-[800px] overflow-auto scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 h-[500px] rounded border border-gray-300">
            <div className="flex mb-2 text-[#196d8e] items-center space-x-2">
              <FaCalendarAlt />
              <p className="text-xl font-bold">Recent Appointments</p>
            </div>
            {gettingAppointments.map((appointment) => (
              <div className="flex p-3 rounded border border-gray-300 mb-3 justify-between items-start">
                <div>
                  {gettingUser
                    .filter((user) => user.email === appointment.patient)
                    .map((user) => (
                      <p className="text-xl text-[#212a31] font-bold">
                        {user?.name}
                      </p>
                    ))}
                  <div className="flex text-sm text-[#196d8e] items-center space-x-1">
                    {gettingUser
                      .filter((user) => user.email === appointment.doctor)
                      .map((user) => (
                        <p>{user?.name}</p>
                      ))}
                    <span>
                      <GoDotFill />
                    </span>
                    <p>{appointment.time}</p>
                  </div>
                </div>
                <p className="border px-3 text-sm font-semibold py-1 text-[#212a31] rounded-full border-gray-300">
                  {appointment.status}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-5 overflow-auto scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 h-[500px] w-[550px] rounded border border-gray-300">
            <div className="flex mb-2 text-[#196d8e] items-center space-x-2">
              <RxCounterClockwiseClock size={20} />
              <p className="text-xl font-bold">Recent Activities</p>
            </div>

            <div className="border rounded border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#212a31]">
                Appointment Update
              </p>
              <p className="text-[#196d8e] text-sm">
                New appointment created for Patient Rohit Sharma.
              </p>
            </div>

            <div className="border rounded my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#212a31]">
                Consultation added
              </p>
              <p className="text-[#196d8e] text-sm">
                Consultation added for Patient Ananya Singh.
              </p>
            </div>

            <div className="border rounded border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#212a31]">
                Appointment Update
              </p>
              <p className="text-[#196d8e] text-sm">
                New appointment created for Patient Rohit Sharma.
              </p>
            </div>
          </div>
          <div className="border bg-white overflow-auto scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 h-[500px] w-full border-gray-300 p-5 rounded">
            <div className="flex mb-2 text-[#196d8e] items-center space-x-2">
              <MdTimer size={20} />
              <p className="text-xl font-bold">Quick Actions</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <FaIndianRupeeSign
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    Process Payment
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">
                  Record a payment or issue a refund.
                </p>
                <button
                  onClick={() => {
                    navigation("/AdminBillingPayment");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]"
                >
                  Process Payment
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    Schedule Appointment
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">
                  Create a new appointment for a patient.
                </p>
                <button 
                onClick={()=>{
                    navigation('/AdminAppointment');
                  }}
                className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                  + Create Appointment
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <GiMedicines
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    Update Medicine
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">
                  Add or update medicine and their stock.
                </p>
                <button 
                onClick={()=>{
                    navigation('/MedicinesTreatment');
                  }}
                className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                  Update Medicine
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <FaUser
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    Manage Staff
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">
                  Add or Manage Staff and their stock.
                </p>
                <button 
                onClick={()=>{
                    navigation('/StaffManagement');
                  }}
                className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                   Manage Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
