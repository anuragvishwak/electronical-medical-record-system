import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { GrNotes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import AdditionalConsultationDetails from "./AdditionalConsultationDetails";
import CreateLabOrderForm from "./CreateLabOrderForm";

function DoctorConsultation() {
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAdditionalDetails, setopeningAdditionalDetails] =
    useState(false);
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingLabOrderForm, setopeningLabOrderForm] = useState(false);

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

      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Consultation</p>
          <p className="text-gray-600">
            Manage patient's Consultations across the healthcare system
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Users..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>

          <button>
            <FaSearch
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {gettingConsultations.map((prep) => (
          <div className="bg-white rounded shadow border border-gray-300 m-3">
            <div className="p-2 flex items-start justify-between bg-black text-white rounded-t">
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
              <p className="font-semibold text-[#1976D2] mb-1">
                History of Present Illness
              </p>
              <p className="text-gray-600 p-2 bg-gray-50 rounded-xl border-l-8 border-blue-500 text-sm text-justify">
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
                className="border-2 border-[#1976D2] bg-[#1976D2] py-0.5 px-2 rounded text-white"
              >
                <div className="flex items-center space-x-1">
                  <FaEye />
                  <p>View more</p>
                </div>
              </button>

              <button className="border-2 text-white border-gray-400 py-0.5 px-2 rounded bg-gray-400">
                <div className="flex items-center space-x-1">
                  <FaEdit />
                  <p>Edit</p>
                </div>
              </button>

              <button className="border-2 bg-red-500 border-red-500 py-0.5 px-2 rounded text-white">
                <div className="flex items-center space-x-1">
                  <MdDelete />
                  <p>Delete</p>
                </div>
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
