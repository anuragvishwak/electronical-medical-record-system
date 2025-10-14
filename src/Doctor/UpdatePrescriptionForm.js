import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { z } from "zod";
import { Toast } from "primereact/toast";

function UpdatePrescriptionForm({
  setopeningUpdatePrescriptionForm,
  capturingPrescriptionObject,
  renderingPrescriptions
}) {
  const toast = useRef(null);
  const [patientData, setpatientData] = useState([]);
  const [gettingMedicines, setgettingMedicines] = useState([]);
  const [patient, setpatient] = useState(
    capturingPrescriptionObject.patient || ""
  );
  const [medicine, setmedicine] = useState(
    capturingPrescriptionObject.medicine || ""
  );
  const [test, settest] = useState(capturingPrescriptionObject.test || "");
  const [additionalNote, setadditionalNote] = useState(
    capturingPrescriptionObject.additionalNote || ""
  );
  const [errors, setErrors] = useState({});

  console.log("finding data from object",capturingPrescriptionObject)

  const prescriptionSchema = z.object({
    patient: z.string().min(1, "Patient is compulsory."),
    medicine: z.string().min(1, "Medicine is compulsory."),
    test: z.string().min(1, "Test is compulsory."),
    additionalNote: z.string().min(1, "Additional Note is compulsory."),
  });

  async function renderingMedicines() {
    const taskDetails = await getDocs(
      collection(database, "medicine_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgettingMedicines(multipleArray);
  }

  console.log("finding medicines", gettingMedicines);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const fitleringPatient = multipleArray.filter(
      (user) => user.role === "patient"
    );

    setpatientData(fitleringPatient);
  }

  useEffect(() => {
    renderingUser();
    renderingMedicines();
  }, []);

  async function creatingPrescription() {
    const prescriptionData = {
      patient: patient,
      test: test,
      medicine: medicine,
      additionalNote: additionalNote,
    };
    try {
      prescriptionSchema.parse(prescriptionData);
      const appointmentRef = doc(
        database,
        "prescription_database",
        capturingPrescriptionObject.id
      );
      await updateDoc(appointmentRef, prescriptionData);

      console.log("Prescription updated to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Prescription updated Successfully!!!",
        life: 3000,
      });
      setopeningUpdatePrescriptionForm(false);
      renderingPrescriptions();
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        console.error("Error while creating prescription:", error.message);
      }
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <Toast ref={toast} />
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">
            Update Prescription
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningUpdatePrescriptionForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="p-3 border border-gray-300 rounded-lg">
          <p className="text-xl font-bold">Basic Information</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-[#1976D2]">Patient Name</p>
              <select
                value={patient}
                onChange={(e) => setpatient(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option value="">Select Patient</option>
                {patientData.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.patient && (
                <p className="text-red-500 text-sm">{errors.patient}</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">Medicines</p>
              <select
                value={medicine}
                onChange={(e) => setmedicine(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option value="">Select Medicines</option>
                {gettingMedicines.map((med) => (
                  <option key={med.id} value={med.name}>
                    {med.name}
                  </option>
                ))}
              </select>
              {errors.medicine && (
                <p className="text-red-500 text-sm">{errors.medicine}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg my-4 border border-gray-300">
          <p className="text-xl mt-5 font-bold">Tests / Investigations</p>
          <div>
            <div className="mb-1.5">
              <p className="font-semibold text-[#1976D2]">Test Name</p>
              <input
                type="text"
                value={test}
                onChange={(e) => {
                  settest(e.target.value);
                }}
                placeholder="Combiflame"
                className="border rounded border-gray-300 w-full p-1.5"
              ></input>
              {errors.test && (
                <p className="text-red-500 text-sm">{errors.test}</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">
                Notes (Additional Test Notes)
              </p>
              <textarea
                type="text"
                value={additionalNote}
                onChange={(e) => {
                  setadditionalNote(e.target.value);
                }}
                placeholder="Test should be completed within 2 days..."
                className="border rounded border-gray-300 h-40 w-full p-1.5"
              ></textarea>
              {errors.additionalNote && (
                <p className="text-red-500 text-sm">{errors.additionalNote}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              creatingPrescription();
            }}
            className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded"
          >
            Update Prescription
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePrescriptionForm;
