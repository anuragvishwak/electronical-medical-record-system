import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import {
  collection,
  getDocFromServer,
  getDocs,
  loadBundle,
} from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { MdEmail } from "react-icons/md";
import { FaIndianRupeeSign, FaLocationDot, FaPhone } from "react-icons/fa6";
import { BsShield } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import PatientProfileUpdateForm from "./PatientProfileUpdateForm";
import { useLocation } from "react-router-dom";

function PatientProfileSetting() {
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingPatientProfileUpdateForm, setopeningPatientProfileUpdateForm] =
    useState(false);
  const [gettingInsurances, setgettingInsurances] = useState([]);
  const [currentUserName, setcurrentUserName] = useState("");

  const location = useLocation();
  const currentUser = localStorage.getItem("email");


  async function renderingInsurances() {
    const taskDetails = await getDocs(
      collection(database, "insurance_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingInsurances(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredUser = multipleArray.filter(
      (user) => user.email === localStorage.getItem("email")
    );

    setgettingUser(filteredUser);
  }

  async function renderingConsultation() {
    const taskDetails = await getDocs(
      collection(database, "consultation_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredConsultation = multipleArray.filter(
      (consult) => consult.patient === currentUser
    );

    setgettingConsultations(filteredConsultation);
  }

  function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  useEffect(() => {
    renderingConsultation();
    renderingInsurances();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PatientNavbar />
      <div className="p-5">
        <div className="flex justify-center">
          {gettingUser.map((user) => (
            <div className="w-full bg-white p-5 rounded border border-gray-300 shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <p className="bg-[#003441] py-14 px-12 text-5xl font-bold rounded-full text-white">
                    {getInitials(user.name)}
                  </p>
                  <div>
                    <div>
                      <p className="text-3xl text-[#003441] font-bold">
                        {user.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-[#01B49C] flex items-center gap-1">
                          <MdEmail />
                          {user.email}
                        </p>
                        <span className="font-semibold">|</span>
                        <p className="text-[#01B49C] flex items-center gap-1">
                          <FaPhone />
                          +91 {user.phone_no}
                        </p>
                      </div>
                    </div>

                    {location.pathname === "PatientProfileSetting" ? (
                      <div>
                        <p className="text-[#003441] font-semibold flex items-center gap-1">
                          <BsShield />
                          {user.designation}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      <p className="text-[#003441] font-semibold flex items-center gap-1">
                        <FaLocationDot />
                        {user.city}, {user.state}, {user.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center space-x-1">
                        <p className="text-[#01B49C]">DOB:</p>
                        <p className="text-[#003441] font-semibold">
                          {user.dateOfBirth}
                        </p>
                      </div>
                      <p className="text-white px-4 py-0.5 rounded-full text-sm bg-[#01B49C]">
                        {user.status}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setopeningPatientProfileUpdateForm(true);
                    setcurrentUserName(user);
                  }}
                  className="bg-[#003441] text-white font-semibold px-4 rounded py-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <FaRegEdit size={18} />
                    <p>Edit Profile</p>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {gettingUser.map((user) => (
          <div>
            <div className="bg-white p-5 my-5 rounded shadow border border-gray-300">
              <p className="text-xl font-semibold mb-2">Medical History</p>

              <div className="flex items-center gap-5">
                <div>
                  <p className="text-[#003441] font-semibold">
                    {user.knownAllegeries}
                  </p>
                  <p className="text-[#01B49C]">Known Allergies</p>
                </div>

                <div>
                  <p className="text-[#003441] font-semibold">
                    {user.chronicCondition}
                  </p>
                  <p className="text-[#01B49C]">Chronic Condition</p>
                </div>
              </div>

              <div className="p-3 my-3 rounded border border-gray-300">
                <p className="text-[#01B49C] font-bold">Current Medications</p>
                {gettingConsultations.map((consult) => (
                  <p className="text-[#003441] font-semibold text-sm text-justify">
                    {consult.medication_procedures}
                  </p>
                ))}
              </div>

              <div className="p-3 rounded border border-gray-300">
                <p className="text-[#01B49C] font-bold ">Medical History</p>
                {gettingConsultations.map((consult) => (
                  <p className="text-[#003441] font-semibold text-sm text-justify">
                    {consult.pastMedicalHistory}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded border shadow border-gray-300">
              <div>
                <p className="text-xl font-semibold mb-2">Insurance Details</p>
                <div>
                  {gettingInsurances
                    .filter((insurance) => insurance.patient === user.name)
                    .map((insurance) => (
                      <div>
                        <div className="flex items-center gap-10">
                          <div>
                            <p className="text-[#003441] font-semibold">
                              {insurance.providerName}
                            </p>
                            <p className="text-[#01B49C]">Provider Name</p>
                          </div>

                          <div>
                            <p className="text-[#003441] flex items-center space-x-2 font-semibold">
                              <FaIndianRupeeSign />
                              {insurance.sumInsured}/-
                            </p>
                            <p className="text-[#01B49C]">Sum Insured</p>
                          </div>

                          <div>
                            <p className="text-[#003441] font-semibold">
                              {insurance.policyNumber}
                            </p>
                            <p className="text-[#01B49C]">Policy Number</p>
                          </div>

                          <div>
                            <p className="text-[#003441] font-semibold">
                              {insurance.coverageType}
                            </p>
                            <p className="text-[#01B49C]">Coverage Type</p>
                          </div>
                        </div>
                        <div className="flex items-center mt-3 space-x-3">
                          <div>
                            <p className="text-[#003441] font-semibold">
                              {insurance.validFrom}
                            </p>
                            <p className="text-[#01B49C]">Valid From</p>
                          </div>
                          <span className="text-3xl">|</span>
                          <div>
                            <p className="text-[#003441] font-semibold">
                              {insurance.validTo}
                            </p>
                            <p className="text-[#01B49C]">Valid To</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openingPatientProfileUpdateForm && (
        <PatientProfileUpdateForm
          currentUserName = {currentUserName}
          setopeningPatientProfileUpdateForm={
            setopeningPatientProfileUpdateForm
          }
          gettingConsultations={gettingConsultations}
        />
      )}
    </div>
  );
}

export default PatientProfileSetting;
