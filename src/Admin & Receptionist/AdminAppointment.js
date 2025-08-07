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

function AdminAppointment() {
  const [openingCreateAppointmentForm, setopeningCreateAppointmentForm] =
    useState(false);
  const [gettingAppointments, setgettingAppointments] = useState([]);

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
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />
      <div className="mx-3 bg-white p-3 border rounded border-gray-300 flex items-end justify-between mt-3">
        <div>
          <p className="text-2xl font-bold ">Appointments</p>
          <p className="text-gray-600">
            Manage appointments across the healthcare system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Appointments..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button
            onClick={() => {
              setopeningCreateAppointmentForm(true);
            }}
            className="bg-[#1976D2] py-1 px-3 rounded shadow text-white"
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
      <div className="grid grid-cols-3 m-3 gap-3">
        {gettingAppointments.map((appointment) => (
          <div className="bg-white border border-gray-300 shadow p-3 rounded">
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

              <div>
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
              </div>
            </div>

            <hr className="my-1.5 border-gray-300" />

            <p className="text-gray-400">
              Doctor:{" "}
              <span className="text-[#1976D2] font-semibold">
                {appointment.doctor}
              </span>
            </p>
            <p className="text-gray-400">
              Patient:{" "}
              <span className="text-[#1976D2] font-semibold">
                {appointment.patient}
              </span>
            </p>

            <hr className="my-1.5 border-gray-300" />

            <p className="text-gray-400">
              Note:{" "}
              <span className="text-black">{appointment.additionalNote}</span>
            </p>
          </div>
        ))}
      </div>

      {openingCreateAppointmentForm && (
        <CreateAppointmentForm
          setopeningCreateAppointmentForm={setopeningCreateAppointmentForm}

          renderingAppointments = {renderingAppointments}
        />
      )}
    </div>
  );
}

export default AdminAppointment;
