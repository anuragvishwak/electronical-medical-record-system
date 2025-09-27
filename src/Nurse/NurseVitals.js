  import React, { useEffect, useState } from "react";
import NurseDashboard from "./NurseDashboard";
import NurseNavbar from "./NurseNavbar";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";

function NurseVitals() {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);

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

  useEffect(() => {
    renderingAppointments();
  }, []);
  return (
    <div className="bg-gray-100 h-screen">
      <NurseNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Patient Vitals</p>
          <p className="text-gray-600">
            Manage Patient Vitals across the healthcare system.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => {
              //   setsearch(e.target.value);
            }}
            placeholder="Search Patient's Vitals..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
        </div>
      </div>

      <div className="bg-white p-3 m-3 shadow rounded border border-gray-300">
        <table className="w-full table-auto">
          <thead className="text-[#1976D2] bg-blue-50">
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
            {gettingAppointments.map((vital) => (
              <tr className="border-b text-gray-500 brder-gray-400">
                {gettingUser
                  .filter((user) => user.email === vital.patient)
                  .map((user) => (
                    <td className="text-center">{user.name}</td>
                  ))}
                {gettingUser
                  .filter((user) => user.email === vital.doctor)
                  .map((user) => (
                    <td className="text-center">{user.name}</td>
                  ))}

                  <td className="text-center text-sm">{vital.id}</td>
                <td className="px-4 py-2 text-center">{vital.height} cm</td>
                <td className="px-4 py-2 text-center ">{vital.weight} kg</td>
                <td className="px-4 py-2 text-center">{vital.temprature} F</td>
                <td className="px-4 py-2 text-center">
                  {vital.bloodPressure} mmHg
                </td>
                <td className="px-4 py-2 text-center ">
                  {vital.pulseRate} bpm
                </td>
                <td className="px-4 py-2 text-center">
                  {vital.respiratoryRate}/min
                </td>
                <td className="px-4 py-2 text-center">
                  {vital.oxygenSaturation}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NurseVitals;
