import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { z } from "zod";
import { database } from "../FirebaseConfiguration";

function UpdateMedicineForm({
  setopeningUpdateMedicineForm,
  capturingDataObject,
  renderingMedicines,
}) {
  const [category, setcategory] = useState(capturingDataObject.category || "");
  const [Form, setform] = useState(capturingDataObject.Form || "");
  const [dosage, setdosage] = useState([]);
  const [dosage_instruction, setdosage_instruction] = useState(
    capturingDataObject.dosage_instruction || ""
  );
  const [errors, setErrors] = useState({});
  const [maxDailyDose, setmaxDailyDose] = useState(
    capturingDataObject.maxDailyDose || ""
  );
  const [ageGroupRestriction, setageGroupRestriction] = useState(
    capturingDataObject.ageGroupRestriction || ""
  );
  const [timing, settiming] = useState(capturingDataObject.timing || "");
  const [frequency, setfrequency] = useState(
    capturingDataObject.frequency || ""
  );
  const [precautions, setprecautions] = useState(
    capturingDataObject.precautions || ""
  );
  const [sideEffects, setsideEffects] = useState(
    capturingDataObject.sideEffects || ""
  );
  const [constraindications, setconstraindications] = useState(
    capturingDataObject.constraindications || ""
  );
  const [storage_instruction, setstorage_instruction] = useState(
    capturingDataObject.storage_instruction || ""
  );
  const [stock, setstock] = useState(capturingDataObject.stock || "");
  const [expiry_date, setexpiry_date] = useState(
    capturingDataObject.expiry_date || ""
  );

  const medicineSchema = z.object({
    category: z.string().min(1, "Category is required"),
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

  const handleDosageChange = (value) => {
    setdosage((prevDosage) => {
      if (prevDosage.includes(value)) {
        return prevDosage.filter((item) => item !== value);
      } else {
        return [...prevDosage, value];
      }
    });
  };

  async function updatingMedicine() {
    const medicineData = {
      category: category,
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
    };
    try {
      medicineSchema.parse(medicineData);

      const medicineRef = doc(
        database,
        "medicine_database",
        capturingDataObject.id
      );
      await updateDoc(medicineRef, medicineData);

      console.log("Medicine updated to Firestore.");
      renderingMedicines();
      setopeningUpdateMedicineForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        console.error("Validation Errors:", fieldErrors);
      } else {
        console.error("Error while updating medicine:", error.message);
      }
    }
  }

  return (
    <div>
      <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
        <div className="p-4 rounded bg-white">
          <div className="flex items-start mb-5 justify-between">
            <p className="text-[#212a31] text-2xl font-bold">Create Medicine</p>
            <button
              className="text-red-500 font-semibold"
              onClick={() => {
                setopeningUpdateMedicineForm(false);
              }}
            >
              Close
            </button>
          </div>

          <div>
            <div>
              <p className="text-[#212a31] text-lg  font-bold">
                Basic Information
              </p>
              <div className="grid grid-cols-5 gap-3">
                <div>
                  <p className="font-semibold text-[#196d8e]">Name</p>
                  <p className="border rounded capitalize border-gray-300 w-full p-2">
                    {capturingDataObject.name}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#196d8e]">Brand</p>
                  <p className="border rounded capitalize border-gray-300 w-full p-2">
                    {capturingDataObject.brand}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#196d8e]">Category</p>
                  <select
                    value={category}
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
                  <p className="font-semibold text-[#196d8e]">Generic Name</p>
                  <p className="border rounded capitalize border-gray-300 w-full p-2">
                    {capturingDataObject?.genericName}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#196d8e]">Form</p>
                  <select
                    value={Form}
                    onChange={(e) => setform(e.target.value)}
                    className="border rounded border-gray-300 w-full p-2"
                  >
                    <option>Select Form</option>
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
              <p className="text-[#212a31] text-lg font-bold">Dosage Details</p>
              <div className="grid grid-cols-6 gap-3">
                <div>
                  <p className="font-semibold text-[#196d8e]">
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
                  <p className="font-semibold text-[#196d8e]">
                    Dosage Instruction
                  </p>
                  <input
                    type="text"
                    value={dosage_instruction}
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
                  <p className="font-semibold text-[#196d8e]">Max Daily Dose</p>
                  <input
                    type="text"
                    value={maxDailyDose}
                    onChange={(e) => {
                      setmaxDailyDose(e.target.value);
                    }}
                    placeholder="4 tablets"
                    className="border rounded border-gray-300 w-full p-1.5"
                  ></input>
                  {errors.maxDailyDose && (
                    <p className="text-red-500 text-sm">
                      {errors.maxDailyDose}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-[#196d8e]">
                    Age Group Restrictions
                  </p>
                  <input
                    type="text"
                    value={ageGroupRestriction}
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
                  <p className="font-semibold text-[#196d8e]">Timing</p>
                  <select
                    value={timing}
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
                  <p className="font-semibold text-[#196d8e]">Frequency</p>
                  <select
                    value={frequency}
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
              <p className="text-[#212a31] text-lg font-bold">
                Warnings & Instructions
              </p>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <p className="font-semibold text-[#196d8e]">Precautions</p>
                  <input
                    type="text"
                    value={precautions}
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
                  <p className="font-semibold text-[#196d8e]">Side Effects</p>
                  <input
                    type="text"
                    value={sideEffects}
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
                  <p className="font-semibold text-[#196d8e]">
                    Contraindications
                  </p>
                  <input
                    type="text"
                    value={constraindications}
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
                  <p className="font-semibold text-[#196d8e]">
                    Storage Instructions
                  </p>
                  <input
                    type="text"
                    value={storage_instruction}
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
              <p className="text-[#212a31] text-lg font-bold">Inventory Info</p>
              <div className="grid grid-cols-2  gap-3">
                <div>
                  <p className="font-semibold text-[#196d8e]">
                    Stock Available
                  </p>
                  <input
                    type="text"
                    value={stock}
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
                  <p className="font-semibold text-[#196d8e]">Expiry Date</p>
                  <input
                    type="date"
                    value={expiry_date}
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
                updatingMedicine();
              }}
              className="bg-[#196d8e] border hover:text-white hover:bg-[#196d8e] border-[#196d8e] text-white py-1 px-4 rounded"
            >
              Update Medicine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMedicineForm;
