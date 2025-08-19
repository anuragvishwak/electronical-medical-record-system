import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../FirebaseConfiguration";

function UtilityManagementForm() {
  const [openingUtilityForm, setopeningUtilityForm] = useState(false);
  const [utilityType, setUtilityType] = useState("");
  const [utilityName, setutilityName] = useState("");
  const [location, setlocation] = useState("");
  const [status, setstatus] = useState("");
  const [capacity, setcapacity] = useState("");
  const [vendor, setvendor] = useState("");
  const [lastMaintenance, setlastMaintenance] = useState("");
  const [nextMaintenance, setnextMaintenance] = useState("");
  const [gettingUtilityDetails, setgettingUtilityDetails] = useState([]);

  function addingUtility() {
    try {
      addDoc(collection(database, "utility_asset_management_database"), {
        utilityName: utilityName,
        utilityType: utilityType,
        location: location,
        status: status,
        capacity: capacity,
        vendor: vendor,
        lastMaintenance: lastMaintenance,
        nextMaintenance: nextMaintenance,
        managementType: "utility_management"
      });
      console.log("User document added to Firestore.");
      setopeningUtilityForm(false);
      // renderingHousekeeping();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  async function renderingUtilities() {
    const taskDetails = await getDocs(
      collection(database, "utility_asset_management_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUtilityDetails(multipleArray);
  }

  useEffect(() => {
    renderingUtilities();
  }, []);

  return (
    <div className="">
      {openingUtilityForm && (
        <div className="border border-gray-300 p-3 rounded">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="block font-medium">Utility Type</label>
              <select
                name="utilityType"
                onChange={(e) => {
                  setUtilityType(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Utility</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water Supply</option>
                <option value="Gas">Medical Gas</option>
                <option value="Internet">Internet / Network</option>
                <option value="HVAC">HVAC / Air Filtration</option>
              </select>
            </div>

            {/* Utility Name */}
            <div>
              <label className="block font-medium">
                Utility Name / Identifier
              </label>
              <input
                type="text"
                name="utilityName"
                onChange={(e) => {
                  setutilityName(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., Generator 1, Cylinder A12"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., ICU, Ward 3, OT 2"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="block font-medium">Usage Capacity</label>
              <input
                type="text"
                name="capacity"
                onChange={(e) => {
                  setcapacity(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., 50 kWh, 200 L/day, 100 Mbps"
              />
            </div>

            {/* Vendor */}
            <div>
              <label className="block font-medium">Vendor / Provider</label>
              <input
                type="text"
                name="vendor"
                onChange={(e) => {
                  setvendor(e.target.value);
                }}
                className="w-full p-2 border rounded"
                placeholder="e.g., Tata Power, Airtel ISP"
              />
            </div>

            {/* Maintenance */}
            <div>
              <label className="block font-medium">Last Maintenance</label>
              <input
                type="date"
                name="lastMaintenance"
                onChange={(e) => {
                  setlastMaintenance(e.target.value);
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Next Maintenance</label>
              <input
                type="date"
                name="nextMaintenance"
                onChange={(e) => {
                  setnextMaintenance(e.target.value);
                }}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                addingUtility();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Utility
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-2 justify-end">
        <input
          placeholder="Search Utilities..."
          className="border rounded border-gray-300 w-60 p-1"
        ></input>
        <button
          onClick={() => {
            setopeningUtilityForm(!openingUtilityForm);
          }}
          className="bg-[#1976D2] flex  hover:bg-blue-800 py-1 px-3 rounded text-white"
        >
          Add Uility
        </button>
      </div>

      <div className="border border-gray-300 rounded p-3 mt-3">
        <table className="table-auto w-full">
          <thead className="bg-gray-100 border">
            <th className="py-1">Utility Name</th>
            <th>Utility Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Maintenance</th>
            <th>Next Maintenance</th>
            <th>Capacity</th>
            <th>Vendor</th>
          </thead>
          <tbody>
            {gettingUtilityDetails.filter(utility => utility.managementType === "utility_management").map((utility) => (
              <tr className="border-b text-gray-500 border-gray-300">
                <td className="text-center py-1.5">{utility.utilityName}</td>
                <td className="text-center">{utility.utilityType}</td>
                <td className="text-center">{utility.location}</td>
                <td className="text-center">{utility.status}</td>
                <td className="text-center">{utility.lastMaintenance}</td>
                <td className="text-center">{utility.nextMaintenance}</td>
                <td className="text-center">{utility.capacity}</td>
                <td className="text-center">{utility.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UtilityManagementForm;
