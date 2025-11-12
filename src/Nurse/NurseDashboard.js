import React, { useEffect, useState } from "react";
import NurseNavbar from "./NurseNavbar";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { BsBuildingFillCheck, BsClock } from "react-icons/bs";
import { MdDateRange, MdTimer } from "react-icons/md";
import AddVitals from "./AddVitals";
import { FaCalendarAlt, FaHeartbeat, FaUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function NurseDashboard() {
  const navigation = useNavigate();
  const [addVitalsForm, setaddVitalsForm] = useState(false);
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [capturingWholeObject, setcapturingWholeObject] = useState({});
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingPrescriptions, setgettingPrescriptions] = useState([]);
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [totalMedications, setTotalMedications] = useState(0);
  const [gettingVitals, setgettingVitals] = useState([]);

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

  async function renderingVitals() {
    const taskDetails = await getDocs(
      collection(database, "patient_vitals_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingVitals(multipleArray);
  }

  useEffect(() => {
    renderingAppointments();
    renderingUser();
    renderingConsultation();
    renderingPrescriptions();
    renderingVitals();
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
        <div className="grid grid-cols-4 gap-5 m-5">
          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaUser
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 "
              />
              <div>
                <p className="text-[#01B49C] font-semibold">Total Patients</p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {gettingUser.filter((user) => user.role === "patient").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6  border border-gray-300 flex-1 min-w-[250px]">
            <div className="flex items-center justify-center space-x-5">
              <GiMedicines
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 "
              />
              <div>
                <p className="text-[#01B49C] font-semibold">Medication Logs</p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {totalMedications}
                  {console.log("finding medications results", totalMedications)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaHeartbeat
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 "
              />
              <div>
                <p className="text-[#01B49C] font-semibold">
                  Total Vitals Recorded
                </p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {gettingVitals.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <BsBuildingFillCheck
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 "
              />
              <div>
                <p className="text-[#01B49C] font-semibold">Total Checked In</p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {
                    gettingAppointments.filter(
                      (appoint) => appoint.visitvisitStatus === "Checked-In"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start m-5 gap-5">
          <div className="bg-white p-5 w-[550px] overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px]  border border-gray-300">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <FaCalendarAlt />
              <p className="text-xl font-bold">Recent Appointments</p>
            </div>
            {gettingAppointments.map((appointment) => (
              <div className="flex p-3  border border-gray-300 mb-3 justify-between items-start">
                <div>
                  {gettingUser
                    .filter((user) => user.email === appointment.patient)
                    .map((user) => (
                      <p className="text-xl text-[#003441] font-bold">
                        {user?.name}
                      </p>
                    ))}
                  <div className="flex text-sm text-[#01B49C] items-center space-x-1">
                    {gettingUser
                      .filter((user) => user.email === appointment.doctor)
                      .map((user) => (
                        <p>{user?.name}</p>
                      ))}
                    <span>
                      <GoDotFill />
                    </span>
                    <p>{appointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="border px-3 text-sm font-semibold py-1 text-[#003441] -full border-gray-300">
                    {appointment.status}
                  </p>
                  <button
                    onClick={() => {
                      setaddVitalsForm(true);
                      setcapturingWholeObject(appointment);
                    }}
                    className="bg-[#01B49C] text-sm py-1 px-3  text-white"
                  >
                    + Add Vitals
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-5 overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px] w-[400px]  border border-gray-300">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <RxCounterClockwiseClock size={20} />
              <p className="text-xl font-bold">Recent Activities</p>
            </div>

            <div className="border  my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                Vitals Recorded
              </p>
              <p className="text-[#01B49C] text-sm">
                Patient vitals recorded for{" "}
                <span className="font-semibold">Rahul Verma</span>.
              </p>
            </div>

            <div className="border  my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                Patient Checked In
              </p>
              <p className="text-[#01B49C] text-sm">
                Appointment for{" "}
                <span className="font-semibold">Anita Sharma</span> marked as
                Checked In.
              </p>
            </div>

            <div className="border  my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                Medication Logged
              </p>
              <p className="text-[#01B49C] text-sm">
                Medication log updated for{" "}
                <span className="font-semibold">Dr. Mehta’s</span> patient{" "}
                <span className="font-semibold">Vivek Raj</span>.
              </p>
            </div>

            <div className="border  my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                Appointment Completed
              </p>
              <p className="text-[#01B49C] text-sm">
                Appointment with{" "}
                <span className="font-semibold">Dr. Sharma</span> marked as
                completed.
              </p>
            </div>

            <div className="border  my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">Note Added</p>
              <p className="text-[#01B49C] text-sm">
                Additional note added for patient{" "}
                <span className="font-semibold">Sneha Kapoor</span>.
              </p>
            </div>
          </div>
          <div className="border bg-white overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px] w-auto border-gray-300 p-5 ">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <MdTimer size={20} />
              <p className="text-xl font-bold">Quick Actions</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="border p-3  border-gray-300">
                <div className="flex items-center space-x-1">
                  <FaHeartbeat
                    size={25}
                    className="text-[#003441] border p-1  border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Patient Vitals
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  View new vitals in seconds.
                </p>
                <button
                  onClick={() => {
                    navigation("/NurseVitals");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3  bg-[#003441]"
                >
                  View Vitals
                </button>
              </div>

              <div className="border p-3  border-gray-300">
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt
                    size={25}
                    className="text-[#003441] border p-1  border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Checked-In Patients
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  Monitor today’s active patients.
                </p>
                <button
                  onClick={() => {
                    navigation("/CheckInCheckOut");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3  bg-[#003441]"
                >
                  View Today's Patients
                </button>
              </div>

              <div className="border p-3  border-gray-300">
                <div className="flex items-center space-x-1">
                  <GiMedicines
                    size={25}
                    className="text-[#003441] border p-1  border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Medication Logs
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  Quick access to medication logs and records.
                </p>
                <button
                  onClick={() => {
                    navigation("/MedicationLogs");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3  bg-[#003441]"
                >
                  View Logs
                </button>
              </div>
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
