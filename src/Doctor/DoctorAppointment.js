import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { IoNotifications } from "react-icons/io5";
import CentralizedAppointment from "../CentralizedAppointment";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function DoctorAppointment() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAppointmentUpdateForm, setopeningAppointmentUpdateForm] =
    useState(false);
  const [capturingAppointmentObject, setcapturingAppointmentObject] = useState(
    {}
  );

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
    <div className="bg-gray-50 h-screen">
      <DoctorNavbar />
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl text-[#003441] font-bold">Appointments</p>
          <p className="text-[#01B49C]">
            Doctor can view their patient's{" "}
            appointments
            here
          </p>
        </div>
        <hr className="my-4 border-gray-300" />

        <div className="flex items-center space-x-2 justify-between">
          <input
            placeholder="Search Appointment id..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 w-60 p-1.5 rounded">
              <option>Filter by Patient</option>
              {gettingUser
                .filter((user) => user.role === "patient")
                .map((user) => (
                  <option>{user.name}</option>
                ))}
            </select>
            <input
              type="date"
              className="border border-gray-300 w-60 p-1 rounded"
            ></input>
          </div>
        </div>
      </div>
      <div>
        <CentralizedAppointment
          setopeningAppointmentUpdateForm={setopeningAppointmentUpdateForm}
          openingAppointmentUpdateForm={openingAppointmentUpdateForm}
          setcapturingAppointmentObject={setcapturingAppointmentObject}
          capturingAppointmentObject={capturingAppointmentObject}
          email={email}
        />
      </div>
    </div>
  );
}

export default DoctorAppointment;
