import React, { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { z } from "zod";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function UpdateAppointmentForm({
  setopeningAppointmentUpdateForm,
  capturingAppointmentObject,
  renderingAppointments
}) {
  const toast = useRef(null);
console.log("finding time",capturingAppointmentObject.time)
  const [additionalNote, setadditionalNote] = useState(capturingAppointmentObject.additionalNote || '');
  const [errors, setErrors] = useState({});
  const [time, settime] = useState(capturingAppointmentObject.time || '');
  const [status, setstatus] = useState(capturingAppointmentObject.status || '');
  const [gettingUser, setgettingUser] = useState([]);

  const appointmentSchema = z.object({
    time: z.string().min(1, "Time is required"),
    status: z.enum(["scheduled", "completed", "cancelled"], {
      errorMap: () => ({ message: "Please select a valid status" }),
    }),
    additionalNote: z.string().min(1, "Additional Note is required"),
  });

  async function updatingAppointment() {
  const appointmentData = {
    time: time,
    status: status,
    additionalNote: additionalNote,
  };

  try {
    appointmentSchema.parse(appointmentData);

    const appointmentRef = doc(database, "appointment_database", capturingAppointmentObject.id);
    await updateDoc(appointmentRef, appointmentData);

    toast.current.show({
      severity: "success",
      summary: "Appointment updated Successfully!!!",
      life: 3000,
    });

    setopeningAppointmentUpdateForm(false);
    renderingAppointments();
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldErrors = {};
      error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      console.error("Error updating appointment:", error.message);
    }
  }
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

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="p-4 rounded bg-white">
        <Toast ref={toast} />
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Create Appointment</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAppointmentUpdateForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-[#196d8e]">Doctor Name</p>
              {gettingUser
                .filter(
                  (user) => user.email === capturingAppointmentObject.doctor
                )
                .map((user) => (
                  <p className="border rounded capitalize border-gray-300 w-full p-2">
                    {user?.name}
                  </p>
                ))}
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">Patient Name</p>
               {gettingUser
                .filter(
                  (user) => user.email === capturingAppointmentObject.patient
                )
                .map((user) => (
                  <p className="border rounded capitalize border-gray-300 w-full p-2">
                    {user?.name}
                  </p>
                ))}
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">Time</p>
              <input
                type="text"
                value={time}
                onChange={(e) => {
                  settime(e.target.value);
                }}
                placeholder="2:20pm"
                className="border rounded border-gray-300 w-full p-1.5"
              ></input>
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time}</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-[#196d8e]">Status</p>
              <select
              value={status}
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
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status}</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <p className="font-semibold text-[#196d8e]">Additional Note</p>
            <textarea
            value={additionalNote}
              onChange={(e) => {
                setadditionalNote(e.target.value);
              }}
              placeholder="Note for the doctor and patients..."
              className="border rounded border-gray-300 w-full p-2 h-40"
            ></textarea>
            {errors.additionalNote && (
              <p className="text-red-500 text-sm">{errors.additionalNote}</p>
            )}
          </div>

          <div className="flex justify-end mt-3 ">
            <button
              onClick={() => {
                updatingAppointment();
              }}
              className="bg-[#212a31] hover:bg-blue-800 py-1 px-3 rounded text-white"
            >
              + Update Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAppointmentForm;
