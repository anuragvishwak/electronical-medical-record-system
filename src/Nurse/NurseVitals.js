import React, { useEffect, useState } from "react";
import NurseDashboard from "./NurseDashboard";
import NurseNavbar from "./NurseNavbar";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";

function NurseVitals() {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingVitals, setgettingVitals] = useState([]);
  const [filterByPatient, setfilterByPatient] = useState("");

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
    renderingUser();
  }

  async function renderingVitals() {
    const taskDetails = await getDocs(
      collection(database, "patient_vitals_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingVitals(multipleArray);
  }

  useEffect(() => {
    renderingAppointments();
    renderingVitals();
  }, []);
  return (
    <div className="bg-gray-100 h-screen">
      <NurseNavbar />
      <div className="m-5 bg-white p-5 border border-gray-300">
        <div>
          <p className="text-2xl font-bold text-[#003441]">Patient Vitals</p>
          <p className="text-[#01B49C]">
            Manage Patient Vitals across the healthcare system.
          </p>
        </div>
        <hr className="my-3 border-gray-300" />

        <div className="flex items-center justify-between">
          <input
            onChange={(e) => {
              //   setsearch(e.target.value);
            }}
            placeholder="Search Patient's Vitals by Id..."
            className="border border-gray-400 w-96 p-1 "
          ></input>

          <select
            onChange={(event) => {
              setfilterByPatient(event.target.value);
            }}
            className="border border-gray-300 w-60 p-1.5 "
          >
            <option>Filter by Patient</option>
            {gettingUser
              .filter((user) => user.role === "patient")
              .map((user) => (
                <option>{user.name}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-5 m-5 border border-gray-300">
        <table className="w-full table-auto">
          <thead className="text-[#003441] bg-gray-100 border border-gray-300">
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Appointment Id</th>
              <th className="py-1.5">Height</th>
              <th className="">Weight</th>
              <th className="">Temperature</th>
              <th className="">Blood Pressure</th>
              <th className="">Pulse Rate</th>
              <th className="">Respiratory Rate</th>
              <th className="">Oxygen Saturation</th>
            </tr>
          </thead>

          <tbody>
            {gettingVitals
              .filter((vital) =>
                gettingAppointments.some(
                  (appointment) => appointment.id === vital.appointmentId
                )
              )
              .map((vital) => {
                const relatedAppointment = gettingAppointments.find(
                  (app) => app.id === vital.appointmentId
                );

                const patientUser = gettingUser.find(
                  (user) => user.email === relatedAppointment?.patient
                );
                const doctorUser = gettingUser.find(
                  (user) => user.email === relatedAppointment?.doctor
                );

                return (
                  <tr
                    key={vital.id}
                    className="border-b text-[#01B49C] border-gray-400"
                  >
                    <td className="pl-5">
                      <div className="">
                        <p>{patientUser?.name || "N/A"}</p>
                        <p className="text-sm text-gray-400">
                          {patientUser?.email || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="flex justify-center">
                      <div>
                        <p>{doctorUser?.name || "N/A"}</p>
                        <p className="text-sm text-gray-400">
                          {doctorUser?.email || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="text-center text-sm">
                      {vital.appointmentId}
                    </td>
                    <td className="px-4 py-2 text-center">{vital.height} cm</td>
                    <td className="px-4 py-2 text-center">{vital.weight} kg</td>
                    <td className="px-4 py-2 text-center">
                      {vital.temperature} °C
                    </td>
                    <td className="px-4 py-2 text-center">
                      {vital.bloodPressure} mmHg
                    </td>
                    <td className="px-4 py-2 text-center">
                      {vital.pulseRate} bpm
                    </td>
                    <td className="px-4 py-2 text-center">
                      {vital.respiratoryRate}/min
                    </td>
                    <td className="px-4 py-2 text-center">
                      {vital.oxygenSaturation}%
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NurseVitals;
