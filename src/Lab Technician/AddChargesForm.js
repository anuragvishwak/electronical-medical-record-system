import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";

function AddChargesForm({ setopeningChargesForm, capturingLab, renderingLabResults }) {
  const [labCharges, setlabCharges] = useState("");

  async function addLabCharges() {
    if (!labCharges) {
      alert("Please enter charges!");
      return;
    }

    try {
      const labDocRef = doc(
        database,
        "lab_order_database",
        capturingLab.id
      );

      await updateDoc(labDocRef, {
        labCharges: Number(labCharges),
      });
      setopeningChargesForm(false);
      renderingLabResults();
    } catch (error) {
      console.error("Error updating lab charges:", error);
      alert("Error while adding charges");
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-96 p-4 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">
            Add Lab Test Charges
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningChargesForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <p className="font-semibold text-[#1976D2]">Lab Test Charges</p>
          <input
            onChange={(e) => {
              setlabCharges(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="3000/-"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              addLabCharges();
            }}
            className="bg-[#1976D2] text-white py-1.5 px-4 rounded mt-3  hover:bg-blue-800"
          >
            Add Charges
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddChargesForm;
