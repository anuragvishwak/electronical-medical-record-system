import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import CreateAppointmentForm from "./CreateAppointmentForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { CgLock } from "react-icons/cg";
import { BsClock } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import AddBillingPaymentForm from "./AddBillingPaymentForm";
import { FaBars } from "react-icons/fa6";

function AdminAppointment() {
  const [openingCreateAppointmentForm, setopeningCreateAppointmentForm] =
    useState(false);
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [openingAddBillingPaymentForm, setopeningAddBillingPaymentForm] =
    useState(false);
  const [openingAdminNavbar, setopeningAdminNavbar] = useState(false);
  const [capturingObject, setcapturingObject] = useState({});

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
    renderingAppointments();
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <AdminNavbar
        setopeningAdminNavbar={setopeningAdminNavbar}
        openingAdminNavbar={openingAdminNavbar}
      />

      <div className="py-3 px-5 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-3xl font-bold text-[#212a31]">
              Appointments
            </p>
            <button
              onClick={() => {
                setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
            >
              <FaBars size={15} />
            </button>
          </div>
          <p className="text-[#196d8e] text-sm sm:text-base">
            Manage appointments across the healthcare system
          </p>
        </div>

      <div className="mx-5 bg-white p-5 shadow border rounded border-gray-300 sm:flex items-end justify-between">

          <input
            placeholder="Search Appointments..."
            className="border border-gray-400 w-full mb-2 sm:w-5/12 p-1 rounded"
          ></input>
        <div className="sm:flex items-center sm:space-x-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setopeningCreateAppointmentForm(true);
              }}
              className="bg-[#196d8e] py-1 sm:px-5 w-full sm:w-auto text-sm sm:text-base rounded shadow text-white"
            >
              + Create Appointment
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
      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-auto h-[460px] scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 m-5 gap-5">
        {gettingAppointments.map((appointment) => (
          <div className="bg-white border border-gray-300 shadow p-4 rounded">
            <div className="text-[#196d8e] items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center space-x-1">
                  <BsClock />
                  <p>{appointment.time}</p>
                </div>
                <p className="text-gray-500 px-2">|</p>
                <div className="flex items-center space-x-1">
                  <MdDateRange />
                  <p>
                    {appointment.createdAt
                      ? new Date(
                          appointment.createdAt.seconds * 1000
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No Date"}
                  </p>
                </div>
              </div>

              <div className="flex items-center border-y text-gray-500 border-gray-300 py-3 my-3 space-x-2">
                <select
                  // onChange={(e) => {
                  //   setstatus(e.target.value);
                  // }}
                  className="border text-sm rounded border-gray-300 w-full p-1"
                >
                  <option>Select Status</option>
                  <option value={"scheduled"}>Scheduled</option>
                  <option value={"completed"}>Completed</option>
                  <option value={"cancelled"}>Cancelled</option>
                </select>

                <button
                  onClick={() => {
                    setopeningAddBillingPaymentForm(true);
                    setcapturingObject(appointment);
                  }}
                  className="bg-[#212a31] w-48 text-white py-1 px-3 rounded text-sm"
                >
                  + Add Bill
                </button>
              </div>
            </div>

            <p className="text-gray-400">
              Doctor:{" "}
              <span className="text-[#212a31] font-semibold">
                {appointment.doctor}
              </span>
            </p>
            <p className="text-gray-400">
              Patient:{" "}
              <span className="text-[#212a31] font-semibold">
                {appointment.patient}
              </span>
            </p>

            <hr className="my-4 border-gray-300" />

            <p className="text-gray-400">
              Note:{" "}
              <span className="text-[#196d8e]">
                {appointment.additionalNote}
              </span>
            </p>
          </div>
        ))}
      </div>

      {openingCreateAppointmentForm && (
        <CreateAppointmentForm
          setopeningCreateAppointmentForm={setopeningCreateAppointmentForm}
          renderingAppointments={renderingAppointments}
        />
      )}

      {openingAddBillingPaymentForm && (
        <AddBillingPaymentForm
        capturingObject = {capturingObject}
          setopeningAddBillingPaymentForm={setopeningAddBillingPaymentForm}
        />
      )}
    </div>
  );
}

export default AdminAppointment;
