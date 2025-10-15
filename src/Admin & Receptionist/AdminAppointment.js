import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import CreateAppointmentForm from "./CreateAppointmentForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { CgLock } from "react-icons/cg";
import { BsClock } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { MdDateRange, MdDelete } from "react-icons/md";
import AddBillingPaymentForm from "./AddBillingPaymentForm";
import { FaBars, FaPencil } from "react-icons/fa6";
import UpdateAppointmentForm from "./UpdateAppointmentForm";

function AdminAppointment() {
  const [openingCreateAppointmentForm, setopeningCreateAppointmentForm] =
    useState(false);
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [openingAddBillingPaymentForm, setopeningAddBillingPaymentForm] =
    useState(false);
  const [openingAdminNavbar, setopeningAdminNavbar] = useState(false);
  const [capturingObject, setcapturingObject] = useState({});
  const [openingAppointmentUpdateForm, setopeningAppointmentUpdateForm] =
    useState(false);
  const [capturingAppointmentObject, setcapturingAppointmentObject] = useState(
    {}
  );
  const [gettingUser, setgettingUser] = useState([]);

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

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingUser();
  }, []);

  useEffect(() => {
    renderingAppointments();
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <AdminNavbar
        setopeningAdminNavbar={setopeningAdminNavbar}
        openingAdminNavbar={openingAdminNavbar}
      />

      <div className="bg-white shadow rounded border border-gray-300 m-5 p-5">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-xl sm:text-2xl font-bold text-[#212a31]">
              Appointments
            </p>
            <p className="text-[#196d8e]">
              Manage appointments across the healthcare system
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
            >
              <FaBars size={15} />
            </button>

            <div className="border-gray-400">
              <p className="text-2xl text-center font-bold">
                {gettingAppointments.length}
              </p>
              <p className="text-gray-500">Total Appointment</p>
            </div>
          </div>
        </div>

        <hr className="my-3 border-gray-300" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search Appointments by appointment id..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 w-60 p-1.5 rounded">
              <option>Filter by Patient</option>
              {gettingUser
                .filter((user) => user.role === "patient")
                .map((user) => (
                  <option>{user.name}</option>
                ))}
            </select>
            <input
              type="date"
              className="border border-gray-300 w-60 p-1 rounded"
            ></input>
            <button
              onClick={() => {
                setopeningCreateAppointmentForm(true);
              }}
              className="bg-[#196d8e] py-1 sm:px-5 w-full sm:w-auto text-sm sm:text-base rounded shadow text-white"
            >
              + Create Appointment
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-auto h-[460px] scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200 m-5 gap-5">
        {gettingAppointments.map((appointment) => (
          <div className="bg-white border border-gray-300 shadow p-4 rounded">
            <div className="text-[#196d8e] items-center justify-between">
              <div className="flex items-center justify-between">
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

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setopeningAppointmentUpdateForm(true);
                      setcapturingAppointmentObject(appointment);
                    }}
                    className="text-[#212a31]"
                  >
                    <FaPencil />
                  </button>
                  <button className="text-[#196d8e]">
                    <MdDelete size={19} />
                  </button>
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

            {gettingUser
              .filter((user) => user.email === appointment.doctor)
              .map((user) => (
                <p className="text-gray-400">
                  Doctor:{" "}
                  <span className="text-[#212a31] capitalize font-semibold">
                    {user.name}
                  </span>
                </p>
              ))}

            {gettingUser
              .filter((user) => user.email === appointment.patient)
              .map((user) => (
                <p className="text-gray-400">
                  Patient:{" "}
                  <span className="text-[#212a31] capitalize font-semibold">
                    {user.name}
                  </span>
                </p>
              ))}

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

      {openingAppointmentUpdateForm && (
        <UpdateAppointmentForm
          setopeningAppointmentUpdateForm={setopeningAppointmentUpdateForm}
          capturingAppointmentObject={capturingAppointmentObject}
          renderingAppointments={renderingAppointments}
        />
      )}

      {openingAddBillingPaymentForm && (
        <AddBillingPaymentForm
          capturingObject={capturingObject}
          setopeningAddBillingPaymentForm={setopeningAddBillingPaymentForm}
        />
      )}
    </div>
  );
}

export default AdminAppointment;
