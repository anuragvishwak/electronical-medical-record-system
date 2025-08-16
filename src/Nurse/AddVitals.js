import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";

function AddVitals({ setaddVitalsForm, capturingWholeObject }) {
  const toast = useRef(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");

  async function UpdateVitals() {
    try {
      const appointmentRef = doc(
        database,
        "appointment_database",
        capturingWholeObject.id
      );

      await updateDoc(appointmentRef, {
        height: height,
        weight: weight,
        temperature: temperature,
        bloodPressure: bloodPressure,
        pulseRate: pulseRate,
        respiratoryRate: respiratoryRate,
        oxygenSaturation: oxygenSaturation,
      });

      console.log("Vitals updated successfully.");
      toast.current.show({
        severity: "success",
        summary: "Vitals updated successfully!",
        life: 3000,
      });

      setaddVitalsForm(false);
    } catch (error) {
      console.error("Error updating vitals:", error.message);
      throw error;
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white  p-3 my-5 rounded">
        <Toast ref={toast} />
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Add Vitals</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setaddVitalsForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="font-semibold text-[#1976D2]">Height (cm)</p>
            <input
              type="number"
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter height..."
            />
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">Weight (kg)</p>
            <input
              type="number"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter weight..."
            />
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">Temperature (°C)</p>
            <input
              type="number"
              onChange={(e) => {
                setTemperature(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter temperature..."
            />
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">
              Blood Pressure (mmHg)
            </p>
            <input
              type="text"
              onChange={(e) => {
                setBloodPressure(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g. 120/80"
            />
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">Pulse Rate (bpm)</p>
            <input
              type="number"
              onChange={(e) => {
                setPulseRate(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter pulse rate..."
            />
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">
              Respiratory Rate (breaths/min)
            </p>
            <input
              type="number"
              onChange={(e) => {
                setRespiratoryRate(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter respiratory rate..."
            />
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">
              Oxygen Saturation (%)
            </p>
            <input
              onChange={(e) => {
                setOxygenSaturation(e.target.value);
              }}
              type="number"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter SpO₂..."
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={() => {
              UpdateVitals();
            }}
            className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded"
          >
            + Add Vitals
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVitals;
