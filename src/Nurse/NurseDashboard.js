import React, { useEffect, useState } from "react";
import NurseNavbar from "./NurseNavbar";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { BsClock } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import AddVitals from "./AddVitals";
import { FaUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";

function NurseDashboard() {
  const [addVitalsForm, setaddVitalsForm] = useState(false);
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [capturingWholeObject, setcapturingWholeObject] = useState({});
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingPrescriptions, setgettingPrescriptions] = useState([]);
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [totalMedications, setTotalMedications] = useState(0);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingAppointments() {
    const taskDetails = await getDocs(
      collection(database, "appointment_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingAppointments(multipleArray);
  }

  async function renderingConsultation() {
    const taskDetails = await getDocs(
      collection(database, "consultation_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingConsultations(multipleArray);
  }

  async function renderingPrescriptions() {
    const taskDetails = await getDocs(
      collection(database, "prescription_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingPrescriptions(multipleArray);
  }

  const findingTotalValue = gettingConsultations.map(
    (consult) => consult.medication_procedures.length
  );

  console.log("investigating medications", findingTotalValue);

  useEffect(() => {
    renderingAppointments();
    renderingUser();
    renderingConsultation();
    renderingPrescriptions();
  }, []);

  useEffect(() => {
    if (gettingConsultations.length > 0 || gettingPrescriptions.length > 0) {
      let total = 0;

      gettingConsultations.forEach((cons) => {
        const meds = cons?.medication_procedures;
        if (Array.isArray(meds)) total += meds.length;
        else if (typeof meds === "number") total += meds;
        else if (typeof meds === "object" && meds !== null)
          total += Object.keys(meds).length;
      });

      gettingPrescriptions.forEach((pres) => {
        const meds = pres?.medicine;
        if (Array.isArray(meds)) total += meds.length;
        else if (typeof meds === "number") total += meds;
        else if (typeof meds === "object" && meds !== null)
          total += Object.keys(meds).length;
      });

      setTotalMedications(total);
    }
  }, [gettingConsultations, gettingPrescriptions]);

  return (
    <div className="bg-gray-100 h-screen">
      <NurseNavbar />

      <div>
        <div>
          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaUser
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">Total Patients</p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {gettingUser.filter((user) => user.role === "patient").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300 flex-1 min-w-[250px]">
            <div className="flex items-center justify-center space-x-5">
              <GiMedicines
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">Medication Logs</p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {totalMedications}
                  {console.log("finding medications results",totalMedications)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white h-[660px] shadow-inner border border-gray-300 overflow-auto m-3 p-3">
            <p className="mb-3 text-lg text-[#1976D2] font-semibold">
              Patient's Appointments
            </p>
            <div>
              {gettingAppointments.map((appointment) => (
                <div className="bg-white border mb-3 border-gray-300 shadow p-3 rounded">
                  <div className="flex items-start justify-between">
                    <div className="text-sm">
                      <div className="flex items-center space-x-1">
                        <BsClock />
                        <p>{appointment.time}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MdDateRange />
                        <p>
                          {appointment.createdAt
                            ? new Date(
                                appointment.createdAt.seconds * 1000
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "No Date"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <select
                        // onChange={(e) => {
                        //   setstatus(e.target.value);
                        // }}
                        className="border text-sm rounded border-gray-300 w- p-1"
                      >
                        <option>Select Status</option>
                        <option value={"scheduled"}>Scheduled</option>
                        <option value={"completed"}>Completed</option>
                        <option value={"cancelled"}>Cancelled</option>
                      </select>
                      <button
                        onClick={() => {
                          setaddVitalsForm(true);
                          setcapturingWholeObject(appointment);
                        }}
                        className="bg-[#1976D2] text-sm py-1 px-3 rounded text-white"
                      >
                        + Add Vitals
                      </button>
                    </div>
                  </div>

                  <hr className="my-1.5 border-gray-300" />

                  <p className="text-gray-400">
                    Doctor:{" "}
                    <span className="text-[#1976D2] font-semibold">
                      {appointment.doctor}
                    </span>
                  </p>
                  <p className="text-gray-400">
                    Patient:{" "}
                    <span className="text-[#1976D2] font-semibold">
                      {appointment.patient}
                    </span>
                  </p>

                  <hr className="my-1.5 border-gray-300" />
                  <p className="bg-gray-50 rounded border border-gray-300 p-3">
                    <span className="text-gray-400">Note:</span>{" "}
                    <span className="text-black">
                      {appointment.additionalNote}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {addVitalsForm && (
        <AddVitals
          capturingWholeObject={capturingWholeObject}
          setaddVitalsForm={setaddVitalsForm}
        />
      )}
    </div>
  );
}

export default NurseDashboard;
