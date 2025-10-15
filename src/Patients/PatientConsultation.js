import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import PatientNavbar from "./PatientNavbar";
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import AdditionalConsultationDetails from "../Doctor/AdditionalConsultationDetails";

function PatientConsultation() {
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingAdditionalDetails, setopeningAdditionalDetails] =
    useState(false);
  const [capturingDataObject, setcapturingDataObject] = useState({});

  const email = localStorage.getItem("email");

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
      <PatientNavbar />
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#212a31]">Consultation</p>
            <p className="text-[#196d8e]">
              Patient's can see their{" "}
              <span className="text-[#212a31] font-semibold">
                Consultations
              </span>{" "}
              across the healthcare system
            </p>
          </div>
          <div className="border-gray-400">
            <p className="text-2xl text-center font-bold">
              {
                gettingConsultations.filter(
                  (consult) => consult.patient === email
                ).length
              }
            </p>
            <p className="text-gray-500">Total Consultation</p>
          </div>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-end space-x-2">
          <input
            placeholder="Search Users..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <button>
            <FaSearch
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 m-5 gap-5">
        {gettingConsultations
          .filter((prep) => prep.patient === email)
          .map((prep) => (
            <div className="bg-white rounded shadow border border-gray-300 ">
              <div className="m-5">
                <p className="font-semibold text-[#1976D2] mb-3">
                  History of Present Illness
                </p>
                <p className="text-gray-600 p-2 bg-gray-50 rounded-xl border-l-8 border-blue-500 text-sm text-justify">
                  {prep.historyofPresentIllness}
                </p>
              </div>

              <div className="flex justify-end pb-3 pr-3">
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
    </div>
  );
}

export default PatientConsultation;
