import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { database } from "./FirebaseConfiguration";
import { useEffect, useState } from "react";
import { MdDateRange, MdDelete } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import CreatingPrescription from "./Doctor/CreatingPrescription";
import CreateConsultationForm from "./Doctor/CreateConsultationForm";
import UpdateAppointmentForm from "./Admin & Receptionist/UpdateAppointmentForm";
import { FaPencil } from "react-icons/fa6";

function CentralizedAppointment({
  email,
  capturingAppointmentObject,
  setcapturingAppointmentObject,
  setopeningAppointmentUpdateForm,
  openingAppointmentUpdateForm
}) {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [openingPrescriptionForm, setopeningPrescriptionForm] = useState(false);
  const location = useLocation();
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingCreateConsultationForm, setopeningCreateConsultationForm] =
    useState(false);

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

  async function updateVisitStatus(appointmentId, visitStatus) {
    try {
      const appointmentRef = doc(
        database,
        "appointment_database",
        appointmentId
      );

      let payload = { visitvisitStatus: visitStatus };

      if (visitStatus === "Checked-In") {
        payload.checkInTime = new Date().toISOString();
      }

      if (visitStatus === "Checked-Out") {
        payload.checkOutTime = new Date().toISOString();
      }

      await updateDoc(appointmentRef, payload);

      console.log("Visit visitStatus updated successfully!");
      renderingAppointments();
    } catch (error) {
      console.error("Error updating visit visitStatus:", error.message);
    }
  }

  return (
    <div>
      <div className={`grid grid-cols-3 m-5 gap-5`}>
        {filteredAppointments.map((appointment) => (
          <div className="bg-white border border-gray-300 shadow p-5 rounded-lg">
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

              <div className="flex items-center space-x-2">
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

                {location.pathname !== "/NurseVitals" &&
                  location.pathname !== "/PatientAppointment" &&
                  location.pathname !== "/CheckInCheckOut" && (
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
                  )}

                {location.pathname == "/CheckInCheckOut" && (
                  <select
                    value={appointment.visitStatus || "Not Arrived"}
                    onChange={(e) =>
                      updateVisitStatus(appointment.id, e.target.value)
                    }
                    className="border rounded border-gray-300 text-sm p-1"
                  >
                    <option value="Not Arrived">Not Arrived</option>
                    <option value="Checked-In">Checked-In</option>
                    <option value="In Consultation">In Consultation</option>
                    <option value="Checked-Out">Checked-Out</option>
                  </select>
                )}
              </div>
            </div>

            <hr className="my-3 border-gray-300" />

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

            <hr className="my-5 border-gray-300" />

            <p className="bg-gray-50 h-20 rounded border border-gray-300 p-3">
              <span className="text-gray-400">Note:</span>{" "}
              <span className="text-black">{appointment.additionalNote}</span>
            </p>

            {location.pathname !== "/NurseVitals" &&
              location.pathname !== "/PatientAppointment" &&
              location.pathname !== "/CheckInCheckOut" && (
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
              )}
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

        {openingAppointmentUpdateForm && (
        <UpdateAppointmentForm
          setopeningAppointmentUpdateForm={setopeningAppointmentUpdateForm}
          capturingAppointmentObject={capturingAppointmentObject}
          renderingAppointments={renderingAppointments}
        />
      )}

    </div>
  );
}

export default CentralizedAppointment;
