import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { collection } from "firebase/firestore";
import CompleteBloodCount from "./Lab Results Details/CompleteBloodCount";
import BloodSugar from "./Lab Results Details/BloodSugar";
import BloodSugarPostprandial from "./Lab Results Details/BloodSugarPostprandial";
import LipidProfile from "./Lab Results Details/LipidProfile";
import LiverFunctionTest from "./Lab Results Details/LiverFunctionTest";
import KidneyFunctionTest from "./Lab Results Details/KidneyFunctionTest";
import Urinalysis from "./Lab Results Details/Urinalysis";

function CreateLabResultForm({
  setopeningCreateLabResultsForm,
  capturingLabOrderObject,
}) {
  const toast = useRef();
  const email = localStorage.getItem("email");

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <Toast ref={toast} />
        <div className="flex items-center justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Upload Lab Results</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningCreateLabResultsForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="mt-5 mb-3">
            <p className="font-semibold">
              <span className="text-gray-500">Test Requested:</span>{" "}
              {capturingLabOrderObject.testRequested}
            </p>
          </div>
          {capturingLabOrderObject.testRequested ===
            "Complete Blood Count (CBC)" && (
            <CompleteBloodCount
              email={email}
              capturingLabOrderObject={capturingLabOrderObject}
              setopeningCreateLabResultsForm={setopeningCreateLabResultsForm}
            />
          )}

          {capturingLabOrderObject.testRequested ===
            "Blood Sugar (Fasting)" && <BloodSugar />}

          {capturingLabOrderObject.testRequested ===
            "Blood Sugar (Postprandial)" && <BloodSugarPostprandial />}

          {capturingLabOrderObject.testRequested === "Urinalysis" && (
            <Urinalysis
              email={email}
              capturingLabOrderObject={capturingLabOrderObject}
            />
          )}

          {capturingLabOrderObject.testRequested === "Lipid Profile" && (
            <LipidProfile />
          )}

          {capturingLabOrderObject.testRequested ===
            "Liver Function Test (LFT)" && (
            <LiverFunctionTest
              email={email}
              capturingLabOrderObject={capturingLabOrderObject}
              setopeningCreateLabResultsForm={setopeningCreateLabResultsForm}
            />
          )}

          {capturingLabOrderObject.testRequested ===
            "Kidney Function Test (KFT)" && <KidneyFunctionTest />}
        </div>
      </div>
    </div>
  );
}

export default CreateLabResultForm;
