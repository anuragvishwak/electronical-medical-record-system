import React, { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Form } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function CreateMedicineForm({ setopeningMedicineForm }) {
  const toast = useRef(null);
  const [name, setname] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [genericName, setgenericName] = useState("");
  const [Form, setform] = useState("");
  const [dosage, setdosage] = useState([]);
  const [dosage_instruction, setdosage_instruction] = useState("");
  const [maxDailyDose, setmaxDailyDose] = useState("");
  const [ageGroupRestriction, setageGroupRestriction] = useState("");
  const [timing, settiming] = useState("");
  const [frequency, setfrequency] = useState("");
  const [precautions, setprecautions] = useState("");
  const [sideEffects, setsideEffects] = useState("");
  const [constraindications, setconstraindications] = useState("");
  const [storage_instruction, setstorage_instruction] = useState("");
  const [stock, setstock] = useState("");
  const [expiry_date, setexpiry_date] = useState("");

  function creatingMedicine() {
    try {
      addDoc(collection(database, "medicine_database"), {
        name: name,
        brand: brand,
        category: category,
        genericName: genericName,
        Form: Form,
        dosage: dosage,
        dosage_instruction: dosage_instruction,
        maxDailyDose: maxDailyDose,
        ageGroupRestriction: ageGroupRestriction,
        timing: timing,
        frequency: frequency,
        precautions: precautions,
        sideEffects: sideEffects,
        constraindications: constraindications,
        storage_instruction: storage_instruction,
        stock: stock,
        expiry_date: expiry_date,
      });

      console.log("Medicine added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Medicine created Successfully!!!",
        life: 3000,
      });
      setopeningMedicineForm(false);
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  const handleDosageChange = (value) => {
    setdosage((prevDosage) => {
      if (prevDosage.includes(value)) {
        return prevDosage.filter((item) => item !== value);
      } else {
        return [...prevDosage, value];
      }
    });
  };

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="p-4 rounded bg-white">
        <Toast ref={toast} />
        <div className="flex items-start mb-5 justify-between">
          <p className="text-[#212a31] text-2xl font-bold">Create Medicine</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningMedicineForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div>
            <p className="text-[#212a31] text-lg  font-bold">Basic Information</p>
            <div className="grid grid-cols-5 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Name</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  placeholder="Combiflame"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Brand</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setbrand(e.target.value);
                  }}
                  placeholder="Sanofi India Limited"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Category</p>
                <select
                  onChange={(e) => setcategory(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Category</option>
                  <option value={"antibiotic"}>Antibiotic</option>
                  <option value={"analgesic"}>Analgesic</option>
                  <option value={"antipyretic"}>Antipyretic</option>
                </select>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Generic Name</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setgenericName(e.target.value);
                  }}
                  placeholder="Acetaminophen"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Form</p>
                <select
                  onChange={(e) => setform(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Category</option>
                  <option value={"tablet"}>Tablet</option>
                  <option value={"capsule"}>Capsule</option>
                  <option value={"syrup"}>Syrup</option>
                  <option value={"injection"}>Injection</option>
                </select>
              </div>
            </div>
          </div>

          <div className="my-5">
            <p className="text-[#212a31] text-lg font-bold">Dosage Details</p>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">
                  Available Dosages
                </p>
                <div className="flex items-center space-x-5">
                  {["250mg", "500mg", "650mg"].map((dose) => (
                    <div key={dose} className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        value={dose}
                        onChange={() => handleDosageChange(dose)}
                        checked={dosage.includes(dose)}
                      />
                      <p>{dose}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                <p className="font-semibold text-[#196d8e]">
                  Dosage Instruction
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setdosage_instruction(e.target.value);
                  }}
                  placeholder="1 tablet after meal, every 8 hours"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Max Daily Dose</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setmaxDailyDose(e.target.value);
                  }}
                  placeholder="4 tablets"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Age Group Restrictions
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setageGroupRestriction(e.target.value);
                  }}
                  placeholder="Not for under 5 yrs"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Timing</p>
                <select
                  onChange={(e) => {
                    settiming(e.target.value);
                  }}
                  placeholder="Not for under 5 yrs"
                  className="border rounded border-gray-300 w-full p-1.5"
                >
                  <option>Select Timing</option>
                  <option value={"before_food"}>Before Food</option>
                  <option value={"after_food"}>After Food</option>
                </select>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Frequency</p>
                <select
                  onChange={(e) => {
                    setfrequency(e.target.value);
                  }}
                  placeholder="Not for under 5 yrs"
                  className="border rounded border-gray-300 w-full p-1.5"
                >
                  <option>Select Frequency</option>
                  <option value={"once"}>Once a day</option>
                  <option value={"twice"}>Twice a day</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text-[#212a31] text-lg font-bold">Warnings & Instructions</p>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Precautions</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setprecautions(e.target.value);
                  }}
                  placeholder="Liver patient caution"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Side Effects</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setsideEffects(e.target.value);
                  }}
                  placeholder="Drowsiness, Nausea"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Contraindications
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setconstraindications(e.target.value);
                  }}
                  placeholder="Not with alcohol"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">
                  Storage Instructions
                </p>
                <input
                  type="text"
                  onChange={(e) => {
                    setstorage_instruction(e.target.value);
                  }}
                  placeholder="Keep below 25°C"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[#212a31] text-lg font-bold">Inventory Info</p>
            <div className="grid grid-cols-2  gap-3">
              <div>
                <p className="font-semibold text-[#196d8e]">Stock Available</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setstock(e.target.value);
                  }}
                  placeholder="100 units"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>

              <div>
                <p className="font-semibold text-[#196d8e]">Expiry Date</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setexpiry_date(e.target.value);
                  }}
                  placeholder="2026-01-01"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 justify-end mt-5">
          <button
            onClick={() => {
              creatingMedicine();
            }}
            className="bg-[#196d8e] border hover:text-white hover:bg-[#196d8e] border-[#196d8e] text-white py-1 px-4 rounded"
          >
            Create Medicine
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMedicineForm;
