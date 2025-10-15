import React, { useEffect } from "react";
import PatientNavbar from "./PatientNavbar";
import CentralizedAppointment from "../CentralizedAppointment";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function PatientAppointment() {
  const [gettingAppointments, setgettingAppointments] = React.useState([]);
  const email = localStorage.getItem("email");

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
    <div className="bg-gray-50 h-screen">
      <PatientNavbar />
      <div className="m-5 bg-white p-3 border border-gray-300 shadow rounded">
       <div className="flex items-center justify-between">
         <div>
          <p className="text-2xl text-[#212a31] font-bold">Appointments</p>
          <p className="text-[#196d8e]">
            Patient can their{" "}
            <span className="font-semibold text-[#212a31]">appointments</span>{" "}
            here
          </p>
        </div>
          <div className="border-gray-400">
            <p className="text-2xl text-center font-bold">
              {gettingAppointments.filter(appointment => appointment.patient === email).length}
            </p>
            <p className="text-gray-500">Total Appointment</p>
          </div>
       </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-end space-x-2">
          <input
            placeholder="Search Appointments..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>
      <div>
        <CentralizedAppointment email={email} />
      </div>
    </div>
  );
}

export default PatientAppointment;
