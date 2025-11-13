import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaCalendar, FaStethoscope, FaUserDoctor } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImOffice } from "react-icons/im";

function PatientMedicalHistory() {
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [gettingPrescriptions, setgettingPrescriptions] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingMedicines, setgettingMedicines] = useState([]);
  const currentUser = localStorage.getItem("email");

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

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
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

  useEffect(() => {
    renderingConsultation();
    renderingPrescriptions();
    renderingUser();
    renderingMedicines();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <PatientNavbar />

      <div className="flex space-x-5 m-5">
        <div className="bg-white border overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[550px] w-full p-4 border-gray-300">
          <div className="flex items-center mb-4 text-[#01B49C] space-x-3">
            <FaRegCalendarAlt size={20} />
            <p className="text-xl font-bold capitalize">Past Consultations</p>
          </div>
          {gettingConsultations.map((consult) => (
            <div className="border border-gray-300 p-3">
              <div className="flex items-center space-x-3">
                <FaRegCalendarAlt size={25} />
                <div>
                  <p className=" text-[#01B49C]">Follow Up Date</p>
                  <p className="text-[#003441] font-bold capitalize">
                    {consult.followUpDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-3">
                  <FaUserDoctor size={17} />
                  <div>
                    {gettingUser
                      .filter((user) => user.email === consult.doctor)
                      .map((user) => (
                        <p className="">Dr. {user?.name}</p>
                      ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ImOffice size={17} />
                  <div>
                    {gettingUser
                      .filter((user) => user.email === consult.doctor)
                      .map((user) => (
                        <p className="capitalize">{user?.department}</p>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-lg text-[#01B49C] font-semibold">
                  Present Illness
                </p>

                <p className="text-sm">{consult.historyofPresentIllness}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[550px] w-full border border-gray-300 bg-white">
          <div className="flex items-center mb-4 text-[#01B49C] space-x-3">
            <FaStethoscope size={20} />
            <p className="text-xl font-bold capitalize">Past Prescriptions</p>
          </div>
          {gettingPrescriptions.map((consult) => (
            <div className="border border-gray-300 p-3 mb-4">
              <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-3">
                  <FaUserDoctor size={17} />
                  <div>
                    {gettingUser
                      .filter((user) => user.email === consult.doctor)
                      .map((user) => (
                        <p className="">Dr. {user?.name}</p>
                      ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <ImOffice size={17} />
                  <div>
                    {gettingUser
                      .filter((user) => user.email === consult.doctor)
                      .map((user) => (
                        <p className="capitalize">{user?.department}</p>
                      ))}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <p className="font-semibold text-gray-400">Medicines</p>
                <table className="w-full text-sm border border-gray-300 border-collapse">
                    <thead className="bg-gray-100 border border-gray-300">
                        <th className="py-1 pl-2">Name</th>
                        <th>Dosage</th>
                        <th className="py-1 pr-2">Duration</th>
                    </thead>

                    <tbody>
                        {gettingMedicines.filter(med => med.name === consult.medicine).map((med)=>(
                            <tr>
                                <td className="text-center text-gray-500">
                                    {med.name}
                                </td>
                                 <td className="text-center text-gray-500">
                                    {med.dosage.map((med) => (
                                        <p>{med}</p>
                                    ))}
                                </td>
                                <td className="text-center text-gray-500">
                                    {med.timing === "after_food" ? "After Food" : "Before Food"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>

              <div>
                <p className="text-lg text-[#01B49C] font-semibold">Note</p>

                <p className="text-sm">{consult.additionalNote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientMedicalHistory;
