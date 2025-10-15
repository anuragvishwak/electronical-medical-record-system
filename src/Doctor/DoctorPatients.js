import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaUser, FaUserAstronaut } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { LuCircleUser } from "react-icons/lu";

function DoctorPatients() {
  const currentUser = localStorage.getItem("email");
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [resultedPatients, setresultedPatients] = useState([]);

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

  useEffect(() => {
    renderingAppointments();
    renderingUser();
  }, []);

  useEffect(() => {
    if (gettingAppointments.length > 0 && gettingUser.length > 0) {
      const doctorAppointments = gettingAppointments.filter(
        (appt) => appt.doctor === currentUser
      );

      const patientEmails = doctorAppointments.map((appt) => appt.patient);

      const filteredPatients = gettingUser.filter((user) =>
        patientEmails.includes(user.email)
      );

      setresultedPatients(filteredPatients);
    }
  }, [gettingAppointments, gettingUser, currentUser]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DoctorNavbar />
      <div className="">
        <div className="bg-white border m-5 p-5 rounded border-gray-300 shadow">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-[#212a31]">
              Patients
            </p>
            <p className="text-[#196d8e]">
              Manage{" "}
              <span className="font-semibold text-[#212a31]">Patients</span>{" "}
              across the healthcare system
            </p>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex items-center justify-end space-x-2">
            <input
              placeholder="Search Patients..."
              className="border border-gray-400 w-full sm:w-5/12 p-1 rounded"
            ></input>
            <button>
              <IoNotifications
                size={31}
                className="border border-gray-500 p-1 rounded text-gray-500"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 m-5 w-full gap-5">
          {resultedPatients.map((patient) => (
            <div className="bg-white p-5 rounded shadow border border-gray-300">
              <div className="flex items-center gap-2">
                <div>
                  <p className="bg-[#bae6f7] text-[#196d8e]  rounded-full p-1.5">
                    <LuCircleUser size={40} />
                  </p>
                </div>
                <div>
                  <p className="capitalize font-bold text-xl">{patient.name}</p>
                  <div className="flex items-center gap-1">
                    <p>Dob: {patient.dateOfBirth}</p>
                    <span>|</span>
                    <p>{patient.gender}</p>
                    <span>|</span>
                    <p>{patient.patientId}</p>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <p className="text-lg font-bold mb-1.5">Contact Information</p>
                  <div>
                    <p className="text-[#212a31] font-semibold">
                      +91 {patient.phone_no}
                    </p>
                    <p className="text-[#196d8e]">Phone Number</p>
                  </div>

                  <div>
                    <p className="text-[#212a31] font-semibold">
                      {patient.email}
                    </p>
                    <p className="text-[#196d8e]">Email</p>
                  </div>

                <div>
                  <p className="text-[#212a31] font-semibold">
                    {patient.city}, {patient.state}, {patient.country}
                  </p>
                  <p className="text-[#196d8e]">Address</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-[#196d8e] text-white py-1.5 px-4 rounded   hover:bg-blue-800">View More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorPatients;
