import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { CgUser } from "react-icons/cg";
import { FaCalendarAlt, FaRegCalendarAlt } from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { GoDiscussionClosed, GoDotFill } from "react-icons/go";
import { MdTimer } from "react-icons/md";
import { RiTestTubeLine } from "react-icons/ri";
import { RxCounterClockwiseClock } from "react-icons/rx";

function DoctorDashboard() {
  const email = localStorage.getItem("email");
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [gettingPrescriptions, setgettingPrescriptions] = useState([]);
  const [gettingConsultations, setgettingConsultations] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingPrescriptions() {
    const taskDetails = await getDocs(
      collection(database, "prescription_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingPrescriptions(multipleArray);
  }

  async function renderingConsultation() {
    const taskDetails = await getDocs(
      collection(database, "consultation_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingConsultations(multipleArray);
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

  useEffect(() => {
    renderingUser();
    renderingAppointments();
    renderingPrescriptions();
    renderingConsultation();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DoctorNavbar />

      <div>
        {gettingUser
          .filter((user) => user.email === email)
          .map((user) => (
            <div className="flex justify-between p-5 rounded border border-gray-300 shadow m-5 bg-white">
              <div>
                <p className="text-[#212a31] text-2xl font-bold">{user.name}</p>
                <p className="text-[#196d8e]">{user.email}</p>
              </div>

              <div>
                <p className="text-[#212a31] font-bold">Doctor Id</p>
                <p className="text-[#196d8e] text-end">{user.doctorId}</p>
              </div>
            </div>
          ))}

        <div className="grid grid-cols-4 gap-5 m-5">
          <div className="bg-white p-6 shadow rounded border border-gray-300">
            <div className="flex items-center  justify-center space-x-5">
              <CgUser
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">Total Patients</p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {
                    gettingAppointments.filter((user) => user.doctor === email)
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaRegCalendarAlt
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">
                  Total Appointments
                </p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {
                    gettingAppointments.filter((user) => user.doctor === email)
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <GiMedicinePills
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">
                  Total Prescriptions
                </p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {
                    gettingPrescriptions.filter((user) => user.doctor === email)
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <GoDiscussionClosed
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">
                  Total Consultations
                </p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {
                    gettingConsultations.filter((user) => user.doctor === email)
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-5 m-5">
          <div className="bg-white p-5 w-[800px] overflow-auto scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 h-[500px] rounded border border-gray-300">
            <div className="flex mb-2 text-[#196d8e] items-center space-x-2">
              <FaCalendarAlt />
              <p className="text-xl font-bold">Upcoming Appointments</p>
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

            <div className="space-y-3">
              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Consultation Completed
                </p>
                <p className="text-[#196d8e] text-sm">
                  Consultation completed for Patient{" "}
                  <span className="font-medium">Rahul Mehta</span>.
                </p>
              </div>

              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Prescription Added
                </p>
                <p className="text-[#196d8e] text-sm">
                  New prescription created for Patient{" "}
                  <span className="font-medium">Priya Sharma</span>.
                </p>
              </div>

              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Lab Report Reviewed
                </p>
                <p className="text-[#196d8e] text-sm">
                  Reviewed blood test report for Patient{" "}
                  <span className="font-medium">Amit Nair</span>.
                </p>
              </div>

              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Follow-up Scheduled
                </p>
                <p className="text-[#196d8e] text-sm">
                  Follow-up appointment scheduled for Patient{" "}
                  <span className="font-medium">Sunita Rao</span> on 4 Nov 2025.
                </p>
              </div>

              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Lab Test Requested
                </p>
                <p className="text-[#196d8e] text-sm">
                  MRI Scan requested for Patient{" "}
                  <span className="font-medium">Arjun Patel</span>.
                </p>
              </div>

              <div className="border rounded border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#212a31]">
                  Appointment Cancelled
                </p>
                <p className="text-[#196d8e] text-sm">
                  Appointment for Patient{" "}
                  <span className="font-medium">Deepak Rao</span> cancelled due
                  to no-show.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 w-full rounded border border-gray-300 shadow">
            <div className="flex mb-2 text-[#196d8e] items-center space-x-2">
              <MdTimer size={20} />
              <p className="text-xl font-bold">Quick Actions</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <GoDiscussionClosed
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    Start Consultation
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">Begin patient session.</p>
                <button className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                  Start Consultation
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <GiMedicinePills
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    Create Prescription
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">
                  Add or update medicines in prescriptions”.
                </p>
                <button className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                  Create Prescription
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <RiTestTubeLine
                    size={25}
                    className="text-[#212a31] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#212a31] text-lg font-semibold">
                    View Lab Reports
                  </p>
                </div>
                <p className="text-[#196d8e] text-sm">Review latest results.</p>
                <button className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                  View Reports
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
                <button className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#212a31]">
                  + Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
