import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../../FirebaseConfiguration";

function LiverFunctionTest({
  capturingLabOrderObject,
  email,
  setopeningCreateLabResultsForm,
}) {
  const [alt, setAlt] = useState({
    value: "",
    unit: "U/L",
    reference: "7 - 56",
  });

  const [ast, setAst] = useState({
    value: "",
    unit: "U/L",
    reference: "10 - 40",
  });

  const [bilirubinTotal, setBilirubinTotal] = useState({
    value: "",
    unit: "mg/dL",
    reference: "0.1 - 1.2",
  });

  const [albumin, setAlbumin] = useState({
    value: "",
    unit: "g/dL",
    reference: "3.5 - 5.0",
  });

  async function SubmittingLiverFunctionTest() {
    try {
      addDoc(collection(database, "lab_order_results_database"), {
        lab_technician: email,
        patient: capturingLabOrderObject.patient,
        doctor: capturingLabOrderObject.doctor,
        appointmentId: capturingLabOrderObject.appointmentId,
        constulationId: capturingLabOrderObject.constulationId,
        alt: alt,
        ast: ast,
        bilirubinTotal: bilirubinTotal,
        albumin: albumin,
      });

      console.log("Test results uploaded added to Firestore.");
      //   toast.current.show({
      //     severity: "success",
      //     summary: "Test results uploaded created Successfully!!!",
      //     life: 3000,
      //   });
      setopeningCreateLabResultsForm(false);
    } catch (error) {
      console.error("Error during creating Consultation:", error.message);
      throw error;
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 border border-gray-300 p-3 rounded gap-3">
        <div>
          <p className="font-semibold text-[#1976D2]">ALT (U/L)</p>
          <input
            type="number"
            step="0.1"
            onChange={(e) => {
              setAlt((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter value..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">AST (U/L)</p>
          <input
            type="number"
            step="0.1"
            onChange={(e) => {
              setAst((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter value..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Bilirubin Total (mg/dL)
          </p>
          <input
            type="number"
            step="0.1"
            onChange={(e) => {
              setBilirubinTotal((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter value..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">Albumin (g/dL)</p>
          <input
            type="number"
            step="0.1"
            onChange={(e) => {
              setAlbumin((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter value..."
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 mt-5">
        <button
          onClick={() => {
            SubmittingLiverFunctionTest();
          }}
          className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded"
        >
          + Upload Test Results
        </button>
      </div>
    </div>
  );
}

export default LiverFunctionTest;
