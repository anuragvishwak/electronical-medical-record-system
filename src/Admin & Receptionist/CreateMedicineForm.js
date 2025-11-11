import React, { useEffect, useState } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Form } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";

function CreateMedicineForm({ setopeningMedicineForm }) {
  const toast = useRef(null);
  const hospitalName = localStorage.getItem("hospitalName");
  const [name, setname] = useState("");
  const [brand, setbrand] = useState("");
  const [genericName, setgenericName] = useState("");
  const [category, setcategory] = useState("");
  const [Form, setform] = useState("");
  const [dosage, setdosage] = useState([]);
  const [dosage_instruction, setdosage_instruction] = useState("");
  const [errors, setErrors] = useState({});
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

  const medicineSchema = z.object({
    name: z.string().min(1, "Medicine name is required"),
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
    genericName: z.string().min(1, "Generic name is required"),
    Form: z.string().min(1, "Form is required"),
    dosage_instruction: z.string().min(1, "Dosage instruction is required."),
    maxDailyDose: z.string().min(1, "Daily Dose is required"),
    ageGroupRestriction: z.string().min(1, "Age Restriction is required."),
    timing: z.string().min(1, "Timing is required."),
    frequency: z.string().min(1, "Frequency is required."),
    precautions: z.string().min(1, "Precautions are required."),
    sideEffects: z.string().min(1, "Side Effects are required."),
    constraindications: z.string().min(1, "constraindications are required."),
    storage_instruction: z.string().min(1, "Storage Instruction is required."),
    stock: z.string().min(1, "Stock is required"),
    expiry_date: z.string().min(1, "Expiry date is required"),
  });

  function creatingMedicine() {
    const medicineData = {
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
      hospitalName: hospitalName
    };
    try {
      medicineSchema.parse(medicineData);

      addDoc(collection(database, "medicine_database"), medicineData);

      console.log("Medicine added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Medicine created Successfully!!!",
        life: 3000,
      });
      setopeningMedicineForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        console.error("Validation Errors:", fieldErrors);
      } else {
        console.error("Error while creating medicine:", error.message);
      }
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
          <p className="text-[#003441] text-2xl font-bold">Create Medicine</p>
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
            <p className="text-[#003441] text-lg  font-bold">
              Basic Information
            </p>
            <div className="grid grid-cols-5 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Name</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  placeholder="Combiflame"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Brand</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setbrand(e.target.value);
                  }}
                  placeholder="Sanofi India Limited"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Category</p>
                <select
                  onChange={(e) => setcategory(e.target.value)}
                  className="border rounded border-gray-300 w-full p-2"
                >
                  <option>Select Category</option>
                  <option value={"antibiotic"}>Antibiotic</option>
                  <option value={"analgesic"}>Analgesic</option>
                  <option value={"antipyretic"}>Antipyretic</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Generic Name</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setgenericName(e.target.value);
                  }}
                  placeholder="Acetaminophen"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.genericName && (
                  <p className="text-red-500 text-sm">{errors.genericName}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Form</p>
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
                {errors.Form && (
                  <p className="text-red-500 text-sm">{errors.Form}</p>
                )}
              </div>
            </div>
          </div>

          <div className="my-5">
            <p className="text-[#003441] text-lg font-bold">Dosage Details</p>
            <div className="grid grid-cols-6 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">
                  Available Dosages
                </p>
                <div className="flex items-center justify-between">
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
                <p className="font-semibold text-[#01B49C]">
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
                {errors.dosage_instruction && (
                  <p className="text-red-500 text-sm">
                    {errors.dosage_instruction}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Max Daily Dose</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setmaxDailyDose(e.target.value);
                  }}
                  placeholder="4 tablets"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.maxDailyDose && (
                  <p className="text-red-500 text-sm">{errors.maxDailyDose}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.ageGroupRestriction && (
                  <p className="text-red-500 text-sm">
                    {errors.ageGroupRestriction}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Timing</p>
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
                {errors.timing && (
                  <p className="text-red-500 text-sm">{errors.timing}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Frequency</p>
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
                {errors.frequency && (
                  <p className="text-red-500 text-sm">{errors.frequency}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text-[#003441] text-lg font-bold">
              Warnings & Instructions
            </p>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Precautions</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setprecautions(e.target.value);
                  }}
                  placeholder="Liver patient caution"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.precautions && (
                  <p className="text-red-500 text-sm">{errors.precautions}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Side Effects</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setsideEffects(e.target.value);
                  }}
                  placeholder="Drowsiness, Nausea"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.sideEffects && (
                  <p className="text-red-500 text-sm">{errors.sideEffects}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.constraindications && (
                  <p className="text-red-500 text-sm">
                    {errors.constraindications}
                  </p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">
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
                {errors.storage_instruction && (
                  <p className="text-red-500 text-sm">
                    {errors.storage_instruction}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[#003441] text-lg font-bold">Inventory Info</p>
            <div className="grid grid-cols-2  gap-3">
              <div>
                <p className="font-semibold text-[#01B49C]">Stock Available</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setstock(e.target.value);
                  }}
                  placeholder="100 units"
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-[#01B49C]">Expiry Date</p>
                <input
                  type="date"
                  onChange={(e) => {
                    setexpiry_date(e.target.value);
                  }}
                  className="border rounded border-gray-300 w-full p-1.5"
                ></input>
                {errors.expiry_date && (
                  <p className="text-red-500 text-sm">{errors.expiry_date}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 justify-end mt-5">
          <button
            onClick={() => {
              creatingMedicine();
            }}
            className="bg-[#01B49C] border hover:text-white hover:bg-[#01B49C] border-[#01B49C] text-white py-1 px-4 rounded"
          >
            Create Medicine
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateMedicineForm;
