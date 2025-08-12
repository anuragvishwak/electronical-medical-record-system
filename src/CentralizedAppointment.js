import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { database } from "./FirebaseConfiguration";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import CreatingPrescription from "./Doctor/CreatingPrescription";
import CreateConsultationForm from "./Doctor/CreateConsultationForm";

function CentralizedAppointment({ email }) {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [openingPrescriptionForm, setopeningPrescriptionForm] = useState(false);
  const location = useLocation();
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingCreateConsultationForm, setopeningCreateConsultationForm] =
    useState(false);

  console.log("Email and current route location", email, location.pathname);

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

  let filteredAppointments = [];

  if (location.pathname === "/PatientAppointment") {
    console.log("Filtering for Patient Appointment");
    filteredAppointments = gettingAppointments.filter(
      (appointment) => appointment.patient === email
    );
  } else if (location.pathname === "/DoctorAppointment") {
    filteredAppointments = gettingAppointments.filter(
      (appointment) => appointment.doctor === email
    );
  } else {
    console.log("No specific filter applied");
    filteredAppointments = gettingAppointments;
  }

  return (
    <div>
      <div className="grid grid-cols-4 m-3 gap-3">
        {filteredAppointments.map((appointment) => (
          <div className="bg-white border border-gray-300 shadow p-3 rounded">
            <div className="flex items-start justify-between">
              <div className="text-sm">
                <div className="flex items-center space-x-1">
                  <BsClock />
                  <p>{appointment.time}</p>
                </div>
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

              <select
                // onChange={(e) => {
                //   setstatus(e.target.value);
                // }}
                className="border text-sm rounded border-gray-300 w- p-1"
              >
                <option>Select Status</option>
                <option value={"scheduled"}>Scheduled</option>
                <option value={"completed"}>Completed</option>
                <option value={"cancelled"}>Cancelled</option>
              </select>
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

            <p className="bg-gray-50 rounded border border-gray-300 p-3">
              <span className="text-gray-400">Note:</span>{" "}
              <span className="text-black">{appointment.additionalNote}</span>
            </p>

            <div className="flex items-center space-x-2 mt-3">
              <button
                onClick={() => {
                  setcapturingDataObject(appointment);
                  setopeningPrescriptionForm(true);
                }}
                className="bg-[#1976D2] text-sm text-white py-1.5 w-full shadow rounded hover:bg-blue-800 "
              >
                + Create Prescription
              </button>

              <button
                onClick={() => {
                  setcapturingDataObject(appointment);
                  setopeningCreateConsultationForm(true);
                }}
                className="bg-[#1976D2] text-sm text-white py-1.5 w-full shadow rounded hover:bg-blue-800 "
              >
                + Create Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {openingPrescriptionForm && (
        <CreatingPrescription
          setopeningPrescriptionForm={setopeningPrescriptionForm}
          appointment={capturingDataObject}
        />
      )}

      {openingCreateConsultationForm && (
        <CreateConsultationForm
          setopeningCreateConsultationForm={setopeningCreateConsultationForm}
          appointment={capturingDataObject}
        />
      )}
    </div>
  );
}

export default CentralizedAppointment;
