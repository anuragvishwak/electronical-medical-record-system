import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { database } from "./FirebaseConfiguration";
import { useEffect, useState } from "react";
import { MdDateRange } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function CentralizedAppointment({ email }) {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const location = useLocation();

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
      <div className="grid grid-cols-3 m-3 gap-3">
        {filteredAppointments.map((appointment) => (
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
    </div>
  );
}

export default CentralizedAppointment;
