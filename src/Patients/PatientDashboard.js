import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { GrMoney, GrTest } from "react-icons/gr";
import { MdTimer } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";

function PatientDashboard() {
  const email = localStorage.getItem("email");
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingAppointments, setgettingAppointments] = useState([]);

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

    const filteredPatients = multipleArray.filter(
      (appoint) => appoint.patient === email
    );
    setgettingAppointments(filteredPatients);
  }

  useEffect(() => {
    renderingUser();
    renderingAppointments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PatientNavbar />
      <div>
        <div>
          {gettingUser
            .filter((user) => user.email === email)
            .map((user) => (
              <div className="flex justify-between p-5 rounded border border-gray-300 shadow m-5 bg-white">
                <div>
                  <p className="text-[#212a31] text-2xl font-bold">
                    {user.name}
                  </p>
                  <p className="text-[#196d8e]">{user.email}</p>
                </div>

                <div>
                  <p className="text-[#212a31] font-bold">Patient Id</p>
                  <p className="text-[#196d8e] text-end">{user.patientId}</p>
                </div>
              </div>
            ))}

          <div className="flex items-start m-5 gap-5">
            <div className="w-[600px] bg-white p-5 border border-gray-300 rounded shadow">
              <div className="flex items-center space-x-1 text-[#196d8e] mb-3">
                <FaCalendarAlt />
                <p className="text-xl font-bold">Recent Appointments</p>
              </div>
              {gettingAppointments.map((appoint) => (
                <div className="rounded border flex items-start justify-between p-3 mb-5 border-gray-300">
                  <div>
                    {gettingUser
                      .filter((user) => user.email === appoint.doctor)
                      .map((user) => (
                        <p className="text-lg text-[#212a31] font-semibold">
                          {user?.name}
                        </p>
                      ))}
                    <p className="text-[#196d8e]">{appoint.additionalNote}</p>
                  </div>

                  <div className="text-sm font-semibold">
                    <p className="border border-gray-300 py-0.5 px-4 rounded-full">
                      {appoint.status}
                    </p>
                    <p className="border border-gray-300 py-0.5 px-4 rounded-full">
                      {appoint.visitvisitStatus}
                    </p>
                  </div>
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
                  Appointment Scheduled
                </p>
                <p className="text-[#196d8e] text-sm">
                  Appointment booked with Dr. R. Mehta (Cardiologist) for 28 Oct
                  2025 at 10:30 AM.
                </p>
              </div>

              <div className="border rounded my-3 border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Prescription Added
                </p>
                <p className="text-[#196d8e] text-sm">
                  New prescription uploaded by Dr. R. Mehta on 28 Oct 2025 for
                  Blood Pressure medication.
                </p>
              </div>

              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Insurance Claim Submitted
                </p>
                <p className="text-[#196d8e] text-sm">
                  Claim #C789 submitted for reimbursement on 30 Oct 2025.
                </p>
              </div>
            </div>

            <div className=" bg-white p-5 rounded shadow border border-gray-300 w-full">
              <div className="flex mb-2 text-[#196d8e] items-center space-x-2">
                <MdTimer size={20} />
                <p className="text-xl font-bold">Quick Actions</p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="border border-gray-300 p-3 rounded">
                  <div className="flex items-center space-x-1">
                    <FaCalendarAlt
                      size={25}
                      className="border rounded border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#212a31]">
                      Book Appointment
                    </p>
                  </div>
                  <p className="text-[#196d8e]">Schedule your next visit.</p>
                  <button className="bg-[#212a31] text-white py-1 px-3 text-sm rounded">
                    Schedule Appointment
                  </button>
                </div>

                <div className="border border-gray-300 p-3 rounded">
                  <div className="flex items-center space-x-1">
                    <GiMedicinePills
                      size={25}
                      className="border rounded border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#212a31]">
                      View Prescriptions
                    </p>
                  </div>
                  <p className="text-[#196d8e]">See your doctor’s advice.</p>
                  <button className="bg-[#212a31] text-white py-1 px-3 text-sm rounded">
                    View Prescriptions
                  </button>
                </div>

                <div className="border border-gray-300 p-3 rounded">
                  <div className="flex items-center space-x-1">
                    <GrTest
                      size={25}
                      className="border rounded border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#212a31]">
                      Check Lab Reports
                    </p>
                  </div>
                  <p className="text-[#196d8e]">Access your medical tests.</p>
                  <button className="bg-[#212a31] text-white py-1 px-3 text-sm rounded">
                    View Reports
                  </button>
                </div>

                <div className="border border-gray-300 p-3 rounded">
                  <div className="flex items-center space-x-1">
                    <GrMoney
                      size={25}
                      className="border rounded border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#212a31]">
                      View Payment History
                    </p>
                  </div>
                  <p className="text-[#196d8e]">Track your past payments.</p>
                  <button className="bg-[#212a31] text-white py-1 px-3 text-sm rounded">
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
