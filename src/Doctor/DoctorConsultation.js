import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { MdDelete } from "react-icons/md";
import AdditionalConsultationDetails from "./AdditionalConsultationDetails";
import CreateLabOrderForm from "./CreateLabOrderForm";
import UpdateConsultationForm from "./UpdateConsultationForm";
import { FaPencil } from "react-icons/fa6";

function DoctorConsultation() {
  const hospitalName = localStorage.getItem("hospitalName");
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAdditionalDetails, setopeningAdditionalDetails] =
    useState(false);
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingLabOrderForm, setopeningLabOrderForm] = useState(false);
  const [openingUpdateConsultationForm, setopeningUpdateConsultationForm] =
    useState(false);

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

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingConsultation();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <DoctorNavbar />

      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold text-[#003441]">Consultation</p>
          <p className="text-[#01B49C]">
            Manage patient's Consultations across the healthcare system
          </p>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center w-full justify-between space-x-2">
          <input
            placeholder="Search Consultations by appointment id..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 w-60 p-1.5 rounded">
              <option>Patient</option>
              {gettingUser
                .filter((user) => user.role === "patient")
                .map((user) => (
                  <option>{user.name}</option>
                ))}
            </select>
            <input
              type="date"
              className="border border-gray-300 w-60 p-1 rounded"
            ></input>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 m-5 gap-5">
        {gettingConsultations.filter(consult => consult.hospitalName === hospitalName).map((prep) => (
          <div className="bg-white rounded shadow border border-gray-300">
            <div className="p-3 flex items-start justify-between bg-[#01B49C] text-white rounded-t">
              <div>
                {gettingUser
                  .filter((user) => user.email === prep.patient)
                  .map((user) => (
                    <p className="text-xl font-bold">
                      <span className="font-[300] text-sm">Patient:</span>{" "}
                      {user?.name}
                    </p>
                  ))}
                <p className="text-sm">
                  <span className="">appointment id</span> {prep.appointmentId}
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setcapturingDataObject(prep);
                    setopeningLabOrderForm(true);
                  }}
                  className="bg-white py-0.5 text-black shadow px-3 rounded"
                >
                  Order Lab Tests
                </button>
              </div>
            </div>

            <div className="m-5">
              <p className="font-semibold text-[#003441] mb-1">
                History of Present Illness
              </p>
              <p className="text-gray-600 p-2 bg-gray-50 rounded-xl border-l-8 border-[#003441] text-sm text-justify">
                {prep.historyofPresentIllness}
              </p>
            </div>

            <hr className="" />

            <div className="flex items-center justify-end space-x-2 p-3">
              <button
                onClick={() => {
                  const userName =
                    gettingUser.find((user) => user.email === prep.patient)
                      ?.name || "Unknown";

                  setcapturingDataObject(prep);
                  setopeningAdditionalDetails(true);
                }}
                className="text-[#003441]"
              >
                  <FaEye size={21} />
              </button>

              <button
                onClick={() => {
                  setcapturingDataObject(prep);
                  setopeningUpdateConsultationForm(true);
                }}
                className="text-[#003441]"
              >
                <FaPencil />
              </button>

              <button className="text-[#01B49C]">
                <MdDelete size={19}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {openingAdditionalDetails && (
        <AdditionalConsultationDetails
          capturingDataObject={capturingDataObject}
          setopeningAdditionalDetails={setopeningAdditionalDetails}
        />
      )}

      {openingUpdateConsultationForm && (
        <UpdateConsultationForm
          capturingDataObject={capturingDataObject}
          renderingConsultation={renderingConsultation}
          setopeningUpdateConsultationForm={setopeningUpdateConsultationForm}
        />
      )}

      {openingLabOrderForm && (
        <CreateLabOrderForm
          capturingDataObject={capturingDataObject}
          setopeningLabOrderForm={setopeningLabOrderForm}
        />
      )}
    </div>
  );
}

export default DoctorConsultation;
