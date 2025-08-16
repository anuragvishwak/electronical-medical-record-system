import React, { useState } from "react";
import NurseNavbar from "./NurseNavbar";
import { IoNotifications } from "react-icons/io5";
import CentralizedAppointment from "../CentralizedAppointment";

function CheckInCheckOut() {



  return (
    <div className="bg-gray-100 h-screen">
      <NurseNavbar />
      <div className="mx-3 bg-white p-3 border rounded border-gray-300 flex items-end shadow justify-between mt-3">
        <div>
          <p className="text-2xl font-bold ">Check In Check Out</p>
          <p className="text-gray-600">
            Track every patient’s journey — from arrival to checkout — with
            real-time status updates.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Appointments..."
            className="border border-gray-400 w-60 p-1 rounded"
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
        <CentralizedAppointment />
      </div>
    </div>
  );
}

export default CheckInCheckOut;
