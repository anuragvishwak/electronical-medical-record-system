import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { Toast } from "primereact/toast";

function CreatingPrescription({ setopeningPrescriptionForm, appointment }) {
  const toast = useRef(null);
  const [patientData, setpatientData] = useState([]);
  const [gettingMedicines, setgettingMedicines] = useState([]);
  const email = localStorage.getItem("email");
  const [patient, setpatient] = useState("");
  const [medicine, setmedicine] = useState("");
  const [test, settest] = useState("");
  const [additionalNote, setadditionalNote] = useState("");

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
    const currentDate = new Date();

    try {
      addDoc(collection(database, "prescription_database"), {
        createdAt: currentDate,
        doctor: email,
        patient: patient,
        test: test,
        medicine: medicine,
        additionalNote: additionalNote,
        appointmentId: appointment.id,
      });

      console.log("Prescription added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Prescription created Successfully!!!",
        life: 3000,
      });
      setopeningPrescriptionForm(false);
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-3 rounded">
        <Toast ref={toast} />
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">
            Create Prescription
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningPrescriptionForm(false);
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
                onChange={(e) => setpatient(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Patient</option>
                {patientData.map((user) => (
                  <option value={user.email}>{user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">Medicines</p>
              <select
                onChange={(e) => setmedicine(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Medicines</option>
                {gettingMedicines.map((med) => (
                  <option value={med.name}>{med.name}</option>
                ))}
              </select>
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
                onChange={(e) => {
                  settest(e.target.value);
                }}
                placeholder="Combiflame"
                className="border rounded border-gray-300 w-full p-1.5"
              ></input>
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">
                Notes (Additional Test Notes)
              </p>
              <textarea
                type="text"
                onChange={(e) => {
                  setadditionalNote(e.target.value);
                }}
                placeholder="Test should be completed within 2 days..."
                className="border rounded border-gray-300 h-40 w-full p-1.5"
              ></textarea>
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
            Create Prescription
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatingPrescription;
