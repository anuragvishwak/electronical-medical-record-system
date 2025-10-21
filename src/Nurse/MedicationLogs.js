import React, { useEffect, useState } from "react";
import NurseNavbar from "./NurseNavbar";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";

function MedicationLogs() {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingConsultation, setgettingConsultation] = useState([]);
  const [gettingPrescription, setgettingPrescription] = useState([]);

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

  async function renderingPrescription() {
    const taskDetails = await getDocs(
      collection(database, "prescription_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingPrescription(multipleArray);
  }

  async function renderingConsultation() {
    const taskDetails = await getDocs(
      collection(database, "consultation_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingConsultation(multipleArray);
  }

  useEffect(() => {
    renderingAppointments();
    renderingPrescription();
    renderingConsultation();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <NurseNavbar />

      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold text-[#212a31]">
            Medication Logs
          </p>
          <p className="text-[#196d8e]">
            Upload and manage Medication Logs across the healthcare system
          </p>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search patients..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <div>
            <div className="flex items-center space-x-3">
              <select className="border border-gray-300 w-60 p-1.5 rounded">
                <option>Patient</option>
                {gettingUser
                  .filter((user) => user.role === "patient")
                  .map((user) => (
                    <option>{user.name}</option>
                  ))}
              </select>

              <select className="border border-gray-300 w-60 p-1.5 rounded">
                <option>Doctor</option>
                {gettingUser
                  .filter((user) => user.role === "doctor")
                  .map((user) => (
                    <option>{user.name}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="grid grid-cols-3 gap-5">
          {gettingAppointments.map((appointment) => (
            <div className="bg-white p-5 shadow rounded border border-gray-300">
              <div>
                <div className="flex items-center space-x-2">
                  {gettingUser
                    .filter((user) => user.email === appointment.patient)
                    .map((user) => (
                      <p className="text-lg text-[#212a31] capitalize font-semibold ">
                        {user?.name}
                      </p>
                    ))}
                  <span>|</span>
                  <p className="font-sm font-semibold text-[#196d8e]">
                    <span className="font-normal mr-1">Appointment:</span>
                    {appointment.id}
                  </p>
                </div>
                <div className="flex items-center text-[#212a31] space-x-2">
                  <p>Doctor:</p>
                  {gettingUser
                    .filter((user) => user.email === appointment.doctor)
                    .map((user) => (
                      <p className="font-semibold ">{user?.name}</p>
                    ))}
                </div>
              </div>

              <hr className="border-gray-400 my-4" />
              <div>
                <p className="text-lg text-[#212a31] font-semibold">Medication Logs</p>

                <div className="border-y border-gray-300 my-2 py-2">
                  <p className="text-[#196d8e]">Prescription Medication</p>

                  <div className="text-[#212a31]">
                    {gettingPrescription &&
                      (() => {
                        const filteredConsults = gettingPrescription.filter(
                          (consult) => consult.appointmentId === appointment.id
                        );

                        if (filteredConsults.length === 0) {
                          return (
                            <p className="text-red-600">
                              No Medication Found for this Appointment!
                            </p>
                          );
                        }

                        return filteredConsults.map((consult) => (
                          <p
                            key={consult.id}
                            className={
                              consult.medicine ? "text-black" : "text-red-600"
                            }
                          >
                            {consult.medicine ||
                              "No Medication Procedures found !"}
                          </p>
                        ));
                      })()}
                  </div>
                </div>

                <div>
                  <p className="text-[#196d8e]">Consultation Medication</p>

                  <div className="text-sm text-[#212a31]">
                    {gettingConsultation &&
                      (() => {
                        const filteredConsults = gettingConsultation.filter(
                          (consult) => consult.appointmentId === appointment.id
                        );

                        if (filteredConsults.length === 0) {
                          return (
                            <p className="text-red-600">
                              No Consultation Found for this Appointment!
                            </p>
                          );
                        }

                        return filteredConsults.map((consult) => (
                          <p
                            key={consult.id}
                            className={
                              consult.medication_procedures
                                ? "text-black"
                                : "text-red-600"
                            }
                          >
                            {consult.medication_procedures ||
                              "No Medication Procedures found !"}
                          </p>
                        ));
                      })()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MedicationLogs;
