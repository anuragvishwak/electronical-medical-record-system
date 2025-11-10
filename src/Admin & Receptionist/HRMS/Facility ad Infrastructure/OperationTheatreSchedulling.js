import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../../../FirebaseConfiguration";
import { Toast } from "primereact/toast";

function OperationTheatreSchedulling() {
  const toast = useRef(null);
  const [openingTheatreScheduling, setopeningTheatreScheduling] =
    useState(false);
  const [equipment, setequipment] = useState([]);
  const [operationName, setoperationName] = useState("");
  const [patientName, setpatientName] = useState("");
  const [gettingUser, setgettingUser] = useState([]);
  const [theatreRoom, settheatreRoom] = useState("");
  const [doctorName, setdoctorName] = useState("");
  const [dateTime, setdateTime] = useState("");
  const [anaesthesiaType, setanaesthesiaType] = useState("");
  const [gettingTheatreData, setgettingTheatreData] = useState([]);

  async function renderingTheatreScheduling() {
    const taskDetails = await getDocs(
      collection(database, "facility_infrastructure_management_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingTheatreData(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setequipment((prev) => [...prev, value]);
    } else {
      setequipment((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    renderingUser();
    renderingTheatreScheduling();
  }, []);

  function TheatreScheduling() {
    try {
      addDoc(
        collection(database, "facility_infrastructure_management_database"),
        {
          patientName: patientName,
          doctorName: doctorName,
          operationName: operationName,
          theatreRoom: theatreRoom,
          dateTime: dateTime,
          anaesthesiaType: anaesthesiaType,
          equipment: equipment,
          facilityType: "operation_theatre_Scheduling",
        }
      );

      console.log("User document added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Operation Theatre Scheduled Successfully!!!",
        life: 3000,
      });
      setopeningTheatreScheduling(false);
      // renderingAppointments();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  return (
    <div className="ml-5 mt-5">
      {openingTheatreScheduling && (
        <div className="border border-gray-300 rounded p-3">
          <Toast ref={toast} />
          <h2 className="text-lg text-[#1976D2] font-bold mb-4">
            Schedule Operation Theatre
          </h2>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium">Operation Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setoperationName(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
                placeholder="e.g. OT-001"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Patient Name</label>
              <select
                onChange={(e) => setpatientName(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Patient</option>
                {gettingUser
                  .filter((user) => user.role === "patient")
                  .map((user) => (
                    <option value={user.email}>{user.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Doctor / Surgeon</label>
              <select
                onChange={(e) => {
                  setdoctorName(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option>Select Doctor</option>
                {gettingUser
                  .filter((user) => user.role === "doctor")
                  .map((user) => (
                    <option value={user.email}>{user.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Theatre Room</label>
              <select
                onChange={(e) => {
                  settheatreRoom(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option>Select Room</option>
                <option>OT-1</option>
                <option>OT-2</option>
                <option>OT-3</option>
                <option>OT-4</option>
                <option>OT-5</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Date & Time</label>
              <input
                type="datetime-local"
                onChange={(e) => {
                  setdateTime(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Anaesthesia Type</label>l
              <select
                onChange={(e) => {
                  setanaesthesiaType(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option value="">Select</option>
                <option value="General">General</option>
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Equipment Needed</label>
              <div className="flex gap-4">
                {["Ventilator", "Monitor", "Suction", "Defibrillator"].map(
                  (eq) => (
                    <label key={eq} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={eq}
                        checked={equipment.includes(eq)}
                        onChange={handleEquipmentChange}
                      />{" "}
                      {eq}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                TheatreScheduling();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-2 justify-end">
        <input
          placeholder="Search Patient and OTs"
          className="border rounded border-gray-300 w-60 p-1"
        ></input>
        <button
          onClick={() => {
            setopeningTheatreScheduling(!openingTheatreScheduling);
          }}
          className="bg-[#1976D2] flex  hover:bg-blue-800 py-1 px-3 rounded text-white"
        >
          Schedule OT
        </button>
      </div>

      <div className="border border-gray-300 p-3 rounded my-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border">
            <th>Theatre Room</th>
            <th className="py-1">Operation Name</th>
            <th>Anaesthsia Type</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date & Time</th>
            <th>Equipment</th>
          </thead>

          <tbody>
            {gettingTheatreData.filter(room => room.facilityType === "operation_theatre_Scheduling").map((room) => (
              <tr className="border-b text-gray-500 border-gray-300">
                <td className="text-center">{room.theatreRoom}</td>
                <td className="text-center">{room.operationName}</td>
                <td className="text-center">{room.anaesthesiaType}</td>
                {gettingUser
                  .filter((user) => user.email === room.patientName)
                  .map((user) => (
                    <td className="text-center py-1.5">{user?.name}</td>
                  ))}
                {gettingUser
                    .filter((user) => user.email === room.doctorName)
                    .map((user) => (
                      <td className="text-center py-1.5">{user?.name}</td>
                    ))}

                <td className="text-center">{room.dateTime}</td>

                 <td>
                    <div className="flex justify-center items-center space-x-1">
                      {room.equipment.map((equip) => (
                        <p className="text-center">{equip},</p>
                      ))}
                    </div>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OperationTheatreSchedulling;
