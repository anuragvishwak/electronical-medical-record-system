import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../../../FirebaseConfiguration";
import { Toast } from "primereact/toast";

function HousekeepingMaintainenace() {
  const toast = useRef(null);
  const [
    openingHousekeepingMaintainenance,
    setopeningHousekeepingMaintainenance,
  ] = useState(false);

  const [roomNumber, setroomNumber] = useState("");
  const [staff, setstaff] = useState("");
  const [cleaningStatus, setcleaningStatus] = useState("");
  const [scheduleTime, setscheduleTime] = useState("");
  const [cleaningType, setcleaningType] = useState("");
  const [equipment, setequipment] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingHousekeepingData, setgettingHousekeepingData] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingHousekeeping() {
    const taskDetails = await getDocs(
      collection(database, "facility_infrastructure_management_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingHousekeepingData(multipleArray);
  }

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

  function addingHouseKeeping() {
    try {
      addDoc(
        collection(database, "facility_infrastructure_management_database"),
        {
          roomNumber: roomNumber,
          staff: staff,
          cleaningStatus: cleaningStatus,
          scheduleTime: scheduleTime,
          cleaningType: cleaningType,
          equipment: equipment,
          facilityType: "housekeeping_maintainenance",
        }
      );

      console.log("User document added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Housekeeping Scheduled Successfully!!!",
        life: 3000,
      });
      setopeningHousekeepingMaintainenance(false);
      renderingHousekeeping();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    renderingUser();
    renderingHousekeeping();
  }, []);

  return (
    <div className="ml-5 mt-5">
      {openingHousekeepingMaintainenance && (
        <div className="border border-gray-300 rounded p-3">
          <Toast ref={toast} />

          <h2 className="text-lg text-[#1976D2] font-bold mb-4">
            Housekeeping & Management
          </h2>

          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block font-medium">Room Number</label>
              <select
                name="roomNumber"
                onChange={(e) => setroomNumber(e.target.value)}
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
              <label className="block font-medium">Assigned Staff</label>
              <select
                name="staff"
                onChange={(e) => setstaff(e.target.value)}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option value="">Select Staff</option>
                {gettingUser.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Cleaning Status</label>
              <select
                name="cleaningStatus"
                onChange={(e) => setcleaningStatus(e.target.value)}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Maintenance Required">
                  Maintenance Required
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Scheduled Time</label>
              <input
                type="datetime-local"
                name="scheduleTime"
                onChange={(e) => setscheduleTime(e.target.value)}
                className="w-full border rounded border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Cleaning Type</label>
              <select
                name="cleaningType"
                onChange={(e) => setcleaningType(e.target.value)}
                className="w-full border rounded border-gray-300 p-2"
              >
                <option value="">Select Type</option>
                <option value="Regular">Regular</option>
                <option value="Deep Cleaning">Deep Cleaning</option>
                <option value="Disinfection">Disinfection</option>
                <option value="Laundry">Laundry</option>
              </select>
            </div>

            <div>
              <p className="block font-medium mb-1">Equipment Used</p>
              <div className="flex gap-4">
                {["Vacuum", "Mop", "Sanitizer", "Laundry Machine"].map(
                  (item) => (
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
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => addingHouseKeeping()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Record
            </button>
          </div>
        </div>
      )}
      <div className="flex space-x-2 justify-end">
        <input
          placeholder="Search House keeping and Maintainenace"
          className="border rounded border-gray-300 w-60 p-1"
        ></input>
        <button
          onClick={() => {
            setopeningHousekeepingMaintainenance(
              !openingHousekeepingMaintainenance
            );
          }}
          className="bg-[#1976D2] flex  hover:bg-blue-800 py-1 px-3 rounded text-white"
        >
          Add House & Maintainenace
        </button>
      </div>

      <div className="border border-gray-300 p-3 rounded my-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 border">
            <th className="py-1">Room No</th>
            <th>Staff</th>
            <th>Cleaning Status</th>
            <th>Cleaning Type</th>
            <th>Schedule Time</th>
            <th>Equipment</th>
          </thead>

          <tbody>
            {gettingHousekeepingData
              .filter(
                (room) => room.facilityType === "housekeeping_maintainenance"
              )
              .map((room) => (
                <tr className="border-b text-gray-500 border-gray-300">
                  <td className="text-center py-1.5">{room.roomNumber}</td>
                  <td className="text-center">Parth</td>

                  <td className="text-center">{room.cleaningStatus}</td>
                  <td className="text-center">{room.cleaningType}</td>
                  <td className="text-center">{room.scheduleTime}</td>

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

export default HousekeepingMaintainenace;
