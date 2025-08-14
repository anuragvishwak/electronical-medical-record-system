import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../../FirebaseConfiguration";
import { Toast } from "primereact/toast";

function CompleteBloodCount({
  capturingLabOrderObject,
  email,
  setopeningCreateLabResultsForm,
}) {
  const [hemoglobin, setHemoglobin] = useState({
    value: "",
    unit: "g/dL",
    reference: "13.0 - 17.0 (male), 12.0 - 15.0 (female)",
  });

  const [hematocrit, setHematocrit] = useState({
    value: "",
    unit: "%",
    reference: "40 - 54 (male), 36 - 48 (female)",
  });

  const [wbcCount, setWbcCount] = useState({
    value: "",
    unit: "×10³/µL",
    reference: "4.0 - 11.0",
  });

  const [rbcCount, setRbcCount] = useState({
    value: "",
    unit: "×10⁶/µL",
    reference: "4.7 - 6.1 (male), 4.2 - 5.4 (female)",
  });

  const [plateletCount, setPlateletCount] = useState({
    value: "",
    unit: "×10³/µL",
    reference: "150 - 450",
  });

  const [mcv, setMcv] = useState({
    value: "",
    unit: "fL",
    reference: "80 - 100",
  });

  const [mch, setMch] = useState({
    value: "",
    unit: "pg",
    reference: "27 - 34",
  });

  const [mchc, setMchc] = useState({
    value: "",
    unit: "g/dL",
    reference: "32 - 36",
  });

  const [rdw, setRdw] = useState({
    value: "",
    unit: "%",
    reference: "11.5 - 14.5",
  });

  async function SubmittingCompleteBloodCount() {
    try {
      addDoc(collection(database, "lab_order_results_database"), {
        lab_technician: email,
        patient: capturingLabOrderObject.patient,
        doctor: capturingLabOrderObject.doctor,
        orderId: capturingLabOrderObject.id,
        testResquested: capturingLabOrderObject.testResquested,
        appointmentId: capturingLabOrderObject.appointmentId,
        constulationId: capturingLabOrderObject.constulationId,
        hematocrit: hematocrit,
        wbcCount: wbcCount,
        mch: mch,
        mchc: mchc,
        rdw: rdw,
        mcv: mcv,
        plateletCount: plateletCount,
        rbcCount: rbcCount,
        hemoglobin: hemoglobin,
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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-semibold text-[#1976D2]">Hemoglobin (g/dL)</p>
          <input
            type="number"
            onChange={(e) => {
              setHemoglobin((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter hemoglobin..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">Hematocrit (%)</p>
          <input
            type="number"
            onChange={(e) => {
              setHematocrit((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter hematocrit..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            White Blood Cell Count (cells/mm³)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setWbcCount((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter WBC count..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Red Blood Cell Count (million cells/mm³)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setRbcCount((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter RBC count..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Platelet Count (cells/mm³)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setPlateletCount((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter platelet count..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Mean Corpuscular Volume (fL)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setMcv((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter MCV..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Mean Corpuscular Hemoglobin (pg)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setMch((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter MCH..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Mean Corpuscular Hemoglobin Concentration (g/dL)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setMchc((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter MCHC..."
          />
        </div>
        <div>
          <p className="font-semibold text-[#1976D2]">
            Red Cell Distribution Width (%)
          </p>
          <input
            type="number"
            onChange={(e) => {
              setRdw((prev) => ({
                ...prev,
                value: e.target.value,
              }));
            }}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter RDW..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            SubmittingCompleteBloodCount();
          }}
          className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded"
        >
          Upload Details
        </button>
      </div>
    </div>
  );
}

export default CompleteBloodCount;
