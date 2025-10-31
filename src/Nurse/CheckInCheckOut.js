import React, { useEffect, useState } from "react";
import NurseNavbar from "./NurseNavbar";
import CentralizedAppointment from "../CentralizedAppointment";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function CheckInCheckOut() {
  const [filterByPatient, setfilterByPatient] = useState("");
  const [gettingUser, setgettingUser] = useState([]);

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
    <div className="bg-gray-100 h-screen">
      <NurseNavbar />
      <div className="m-5 bg-white p-3 border rounded border-gray-300">
        <div>
          <p className="text-2xl font-bold text-[#212a31]">Check In Check Out</p>
          <p className="text-[#196d8e]">
            Track every patient’s journey — from arrival to checkout — with
            real-time status updates.
          </p>
        </div>
        <hr className="my-3 border-gray-300" />

        <div className="flex items-center justify-between">
          <input
            placeholder="Search Appointments by Id..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>
          <select
            onChange={(event) => {
              setfilterByPatient(event.target.value);
            }}
            className="border border-gray-300 w-60 p-1.5 rounded"
          >
            <option>Filter by Patient</option>
            {gettingUser
              .filter((user) => user.role === "patient")
              .map((user) => (
                <option>{user.name}</option>
              ))}
          </select>
        </div>
      </div>
      <div>
        <CentralizedAppointment />
      </div>
    </div>
  );
}

export default CheckInCheckOut;
