import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function CreateAppointmentForm({ setopeningCreateAppointmentForm, renderingAppointments }) {
  const toast = useRef(null);
  const createdAt = new Date();
  const [patientData, setpatientData] = useState([]);
  const [doctorData, setdoctorData] = useState([]);
  const [doctor, setdoctor] = useState("");
  const [patient, setpatient] = useState("");
  const [additionalNote, setadditionalNote] = useState("");
  const [time, settime] = useState("");
  const [status, setstatus] = useState("");
  

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const fitleringDoctor = multipleArray.filter(
      (user) => user.role === "doctor"
    );

    const fitleringPatient = multipleArray.filter(
      (user) => user.role === "patient"
    );

    setpatientData(fitleringPatient);
    setdoctorData(fitleringDoctor);
  }
  

  function creatingAppointment() {
    try {
      addDoc(collection(database, "appointment_database"), {
        patient: patient,
        doctor: doctor,
        time: time,
        status: status,
        additionalNote: additionalNote,
        createdAt: createdAt,
      });

      console.log("User document added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Appointment created Successfully!!!",
        life: 3000,
      });
      setopeningCreateAppointmentForm(false);
      renderingAppointments();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    renderingUser();
    
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="p-4 rounded bg-white">
        <Toast ref={toast} />
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Create Appointment</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningCreateAppointmentForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-[#196d8e]">Doctor Name</p>
              <select
                onChange={(e) => setdoctor(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Doctor</option>
                {doctorData.map((user) => (
                  <option value={user.email}>{user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">Patient Name</p>
              <select
                onChange={(e) => setpatient(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Patient</option>
                {patientData.map((user) => (
                  <option value={user.email}>{user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">Time</p>
              <input
                type="text"
                onChange={(e) => {
                  settime(e.target.value);
                }}
                placeholder="2:20pm"
                className="border rounded border-gray-300 w-full p-1.5"
              ></input>
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">Status</p>
              <select
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Status</option>
                <option value={"scheduled"}>Scheduled</option>
                <option value={"completed"}>Completed</option>
                <option value={"cancelled"}>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <p className="font-semibold text-[#196d8e]">Additional Note</p>
            <textarea
              onChange={(e) => {
                setadditionalNote(e.target.value);
              }}
              placeholder="Note for the doctor and patients..."
              className="border rounded border-gray-300 w-full p-2 h-40"
            ></textarea>
          </div>

          <div className="flex justify-end mt-3 ">
            <button
              onClick={() => {
                creatingAppointment();
              }}
              className="bg-[#212a31] hover:bg-blue-800 py-1 px-3 rounded text-white"
            >
              + Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointmentForm;
