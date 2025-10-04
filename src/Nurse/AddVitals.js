import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

function AddVitals({ setaddVitalsForm, capturingWholeObject }) {
  const toast = useRef(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");
  const [errors, setErrors] = useState({});

  const vitalSchema = z.object({
    height: z.string().min(1, "Height is compulsory."),
    weight: z.string().min(1, "Weight is compulsory."),
    temperature: z.string().min(1, "Temprature is compulsory."),
    bloodPressure: z.string().min(1, "Blood Pressure is compulsory."),
    pulseRate: z.string().min(1, "Pulse Rate is compulsory."),
    respiratoryRate: z.string().min(1, "Respiratory Rate is compulsory."),
    oxygenSaturation: z.string().min(1, "Oxygen Saturation is compulsory."),
  });

  async function UpdateVitals() {
    const vitalData = {
      height: height,
      weight: weight,
      temperature: temperature,
      bloodPressure: bloodPressure,
      pulseRate: pulseRate,
      respiratoryRate: respiratoryRate,
      oxygenSaturation: oxygenSaturation,
    };

    try {
      vitalSchema.parse(vitalData);
      const appointmentRef = doc(
        database,
        "appointment_database",
        capturingWholeObject.id
      );

      await updateDoc(appointmentRef, vitalData);

      console.log("Vitals updated successfully.");
      toast.current.show({
        severity: "success",
        summary: "Vitals updated successfully!",
        life: 3000,
      });

      setaddVitalsForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        console.error("Error while adding patient vitals:", error.message);
      }
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
            {errors.height && (
              <p className="text-red-500 text-sm">{errors.height}</p>
            )}
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
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight}</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">Temperature (°C)</p>
            <input
              onChange={(e) => {
                setTemperature(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter temperature..."
            />
            {errors.temperature && (
              <p className="text-red-500 text-sm">{errors.temperature}</p>
            )}
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
            {errors.bloodPressure && (
              <p className="text-red-500 text-sm">{errors.bloodPressure}</p>
            )}
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
            {errors.pulseRate && (
              <p className="text-red-500 text-sm">{errors.pulseRate}</p>
            )}
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
            {errors.respiratoryRate && (
              <p className="text-red-500 text-sm">{errors.respiratoryRate}</p>
            )}
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
            {errors.oxygenSaturation && (
              <p className="text-red-500 text-sm">{errors.oxygenSaturation}</p>
            )}
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
