import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../../../FirebaseConfiguration";
import { Toast } from "primereact/toast";

function BedRoomManagement() {
  const toast = useRef(null);
  const [openingAddForm, setopeningAddForm] = useState(false);
  const [bedNumber, setbedNumber] = useState("");
  const [roomNumber, setroomNumber] = useState("");
  const [wardType, setwardType] = useState("");
  const [status, setstatus] = useState("available");
  const [patientName, setpatientName] = useState("");
  const [admissionDate, setadmissionDate] = useState("");
  const [equipment, setequipment] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingRoomData, setgettingRoomData] = useState([]);

  async function renderingRoomandBed() {
    const taskDetails = await getDocs(
      collection(database, "facility_infrastructure_management_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingRoomData(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  function appointmentBedRoom() {
    try {
      addDoc(
        collection(database, "facility_infrastructure_management_database"),
        {
          patientName: patientName,
          bedNumber: bedNumber,
          roomNumber: roomNumber,
          wardType: wardType,
          status: status,
          equipment: equipment,
          admissionDate: admissionDate,
          facilityType: "bed_room_management",
        }
      );

      console.log("User document added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Bed appointed created Successfully!!!",
        life: 3000,
      });
      setopeningAddForm(false);
      // renderingAppointments();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    renderingUser();
    renderingRoomandBed();
  }, []);

  const rooms = [];
  for (let floor = 1; floor <= 5; floor++) {
    for (let room = 1; room <= 10; room++) {
      const roomNumber = `${floor}${room.toString().padStart(2, "0")}`;
      rooms.push(parseInt(roomNumber));
    }
  }

  const handleEquipmentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setequipment((prev) => [...prev, value]);
    } else {
      setequipment((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div className="ml-5 mt-5">
      {openingAddForm && (
        <div className=" border border-gray-300 rounded p-3 ">
          <Toast ref={toast} />
          <h2 className="text-lg text-[#1976D2] font-bold mb-4">
            Add Bed to Room
          </h2>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block  font-medium">Bed Number</label>
              <input
                type="text"
                name="bedNumber"
                onChange={(e) => {
                  setbedNumber(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
                placeholder="e.g. B1"
                required
              />
            </div>

            <div>
              <label className="block  font-medium">Room Number</label>
              <select
                name="roomNumber"
                onChange={(e) => {
                  setroomNumber(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
                required
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block  font-medium">Ward Type</label>
              <select
                name="wardType"
                onChange={(e) => {
                  setwardType(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
                required
              >
                <option value="">Select Type</option>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Private">Private</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Bed Status</label>
              <select
                name="status"
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Maintenance">Maintenance</option>
              </select>
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
              <label className="block mb-1 font-medium">Admission Date</label>
              <input
                type="datetime-local"
                name="admissionDate"
                onChange={(e) => {
                  setadmissionDate(e.target.value);
                }}
                className="w-full border rounded border-gray-300 p-2"
              />
            </div>

            <div>
              <p className="block w-40 mb-1 font-medium">Equipment Attached</p>
              <div className="flex gap-4">
                {["Oxygen", "Ventilator", "Monitor"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="equipment"
                      value={item}
                      checked={equipment.includes(item)}
                      onChange={handleEquipmentChange}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                appointmentBedRoom();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Bed
            </button>
          </div>
        </div>
      )}

      <div>
        <div className="flex space-x-2 justify-end">
          <input
            placeholder="Search Patient and room no"
            className="border rounded border-gray-300 w-60 p-1"
          ></input>
          <button
            onClick={() => {
              setopeningAddForm(!openingAddForm);
            }}
            className="bg-[#1976D2] flex  hover:bg-blue-800 py-1 px-3 rounded text-white"
          >
            Add Bed
          </button>
        </div>

        <div className="border border-gray-300 p-3 rounded my-3">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 border">
              <th className="py-1">Patient</th>
              <th>Bed No</th>
              <th>Room No</th>
              <th>Ward Type</th>
              <th>Bed Status</th>
              <th>Admission Date</th>
              <th>Equipment Attached</th>
            </thead>

            <tbody>
              {gettingRoomData.map((room) => (
                <tr className="border-b text-gray-500 border-gray-300">
                  {gettingUser
                    .filter((user) => user.email === room.patientName)
                    .map((user) => (
                      <td className="text-center py-1.5">{user?.name}</td>
                    ))}
                  <td className="text-center">{room.bedNumber}</td>
                  <td className="text-center">{room.roomNumber}</td>
                  <td>{
                  room.wardType}</td>
                  <td>{room.status}</td>
                  <td>{room.admissionDate}</td>
                  <td><div className="">
                    {room.equipment.map((equip) => (
                    <li className="text-center">{equip}</li>
                  ))}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BedRoomManagement;
