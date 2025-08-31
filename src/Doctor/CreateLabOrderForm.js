import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { Toast } from "primereact/toast";

function CreateLabOrderForm({ setopeningLabOrderForm, capturingDataObject }) {

  const date = new Date();
  console.log("finding time", date);    

  const toast = useRef();
  const email = localStorage.getItem("email");
  const [dateTime, setdateTime] = useState("");
  const [testRequested, settestRequested] = useState("");
  const [specimenType, setspecimenType] = useState("");
  const [priority, setpriority] = useState("");
  const [clinicalNotes, setclinicalNotes] = useState("");
  const [orderStatus, setorderStatus] = useState("");

  async function handleCreateLabOrder() {
    try {
      addDoc(collection(database, "lab_order_database"), {
        doctor: email,
        patient: capturingDataObject.patient,
        appointmentId: capturingDataObject.appointmentId,
        constulationId: capturingDataObject.id,
        dateTime: dateTime,
        testRequested: testRequested,
        specimenType: specimenType,
        priority: priority,
        clinicalNotes: clinicalNotes,
        orderStatus: orderStatus,
      });

      console.log("Lab Order added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Lab Order created Successfully!!!",
        life: 3000,
      });
      setopeningLabOrderForm(false);
    } catch (error) {
      console.error("Error during creating Consultation:", error.message);
      throw error;
    }
  }

  const labTestsList = [
    { id: 1, name: "Complete Blood Count (CBC)" },
    { id: 2, name: "Blood Sugar (Fasting)" },
    { id: 3, name: "Blood Sugar (Postprandial)" },
    { id: 4, name: "Lipid Profile" },
    { id: 5, name: "Liver Function Test (LFT)" },
    { id: 6, name: "Kidney Function Test (KFT)" },
    { id: 7, name: "Thyroid Stimulating Hormone (TSH)" },
    { id: 8, name: "Urinalysis" },
    { id: 9, name: "Electrolyte Panel" },
    { id: 10, name: "Hemoglobin A1c (HbA1c)" },
    { id: 11, name: "C-Reactive Protein (CRP)" },
    { id: 12, name: "Erythrocyte Sedimentation Rate (ESR)" },
    { id: 13, name: "Prothrombin Time (PT/INR)" },
    { id: 14, name: "Vitamin D" },
    { id: 15, name: "Calcium" },
    { id: 16, name: "Iron Studies" },
    { id: 17, name: "Pregnancy Test (hCG)" },
    { id: 18, name: "HIV Test" },
    { id: 19, name: "Hepatitis B Surface Antigen (HBsAg)" },
    { id: 20, name: "Chest X-Ray" },
  ];

  const specimenTypes = [
    { id: 1, name: "Blood" },
    { id: 2, name: "Urine" },
    { id: 3, name: "Stool" },
    { id: 4, name: "Sputum" },
    { id: 5, name: "Saliva" },
    { id: 6, name: "CSF (Cerebrospinal Fluid)" },
    { id: 7, name: "Tissue Biopsy" },
    { id: 8, name: "Swab (Throat/Nasal/Wound)" },
    { id: 9, name: "Pleural Fluid" },
    { id: 10, name: "Amniotic Fluid" },
    { id: 11, name: "Synovial Fluid" },
    { id: 12, name: "Bone Marrow" },
    { id: 13, name: "Hair" },
    { id: 14, name: "Nail" },
    { id: 15, name: "Seminal Fluid" },
  ];

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-4 rounded">
                <Toast ref={toast} />
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">
            Create Consultation
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningLabOrderForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-[#1976D2]">Date and Time</p>
              <input
                type="datetime-local"
                onChange={(e) => {
                  setdateTime(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="12/6/2023"
              />
            </div>
            <div>
              <p className="font-semibold text-[#1976D2]">Lab Test Requested</p>
              <select
                onChange={(e) => {
                  settestRequested(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="12/6/2023"
              >
                <option>Select Test</option>
                {labTestsList.map((test) => (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div>
              <p className="font-semibold text-[#1976D2]">Specimen Type</p>
              <select
                onChange={(e) => {
                  setspecimenType(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="12/6/2023"
              >
                <option>Select Specimen Type</option>
                {specimenTypes.map((test) => (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">Priorities</p>
              <select
                onChange={(e) => {
                  setpriority(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="12/6/2023"
              >
                <option>Select Priority</option>
                <option>Routine</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#1976D2]">
              Clinical Notes (Additional Notes)
            </p>
            <textarea
              type="text"
              onChange={(e) => {
                setclinicalNotes(e.target.value);
              }}
              placeholder="Test should be completed within 2 days..."
              className="border rounded border-gray-300 h-40 w-full p-1.5"
            ></textarea>
          </div>

          <div className="mt-3">
            <p className="font-semibold text-[#1976D2]">Lab Order Status</p>
            <select
              onChange={(e) => {
                setorderStatus(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              name="orderStatus"
              id="orderStatus"
            >
              <option>select Status</option>
              <option value="pending">Pending</option>
              <option value="collected">Collected</option>
              <option value="in_process">In Process</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select> 
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              handleCreateLabOrder();
            }}
            className="bg-[#1976D2] text-white py-1.5 px-4 rounded mt-4  hover:bg-blue-800"
          >
            Create Lab Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLabOrderForm;
