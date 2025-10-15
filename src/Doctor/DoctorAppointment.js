import React, { useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { IoNotifications } from "react-icons/io5";
import CentralizedAppointment from "../CentralizedAppointment";
import { useNavigate } from "react-router-dom";


function DoctorAppointment() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [capturingObject, setcapturingObject] = useState({});
  const [openingAppointmentUpdateForm, setopeningAppointmentUpdateForm] =
    useState(false);
  const [capturingAppointmentObject, setcapturingAppointmentObject] = useState(
    {}
  );

  return (
    <div className="bg-gray-50 h-screen">
      <DoctorNavbar />
      <div className="m-5 bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl text-[#212a31] font-bold">Appointments</p>
          <p className="text-[#196d8e]">
            Doctor can view their patient's{" "}
            <span className="text-[#212a31] font-semibold">appointments</span>{" "}
            here
          </p>
        </div>
        <hr className="my-4 border-gray-300" />

        <div className="flex items-center space-x-2 justify-end">
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
        <CentralizedAppointment setopeningAppointmentUpdateForm = {setopeningAppointmentUpdateForm} openingAppointmentUpdateForm = {openingAppointmentUpdateForm} setcapturingAppointmentObject = {setcapturingAppointmentObject} capturingAppointmentObject = {capturingAppointmentObject} email={email} />
      </div>
    </div>
  );  
}

export default DoctorAppointment;
