import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { FaEdit, FaSearch } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { GrNotes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UpdatePrescriptionForm from "./UpdatePrescriptionForm";

function DoctorPrescription() {
  const [gettingPrescriptions, setgettingPrescriptions] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingMedicines, setgettingMedicines] = useState([]);
  const [openingUpdatePrescriptionForm, setopeningUpdatePrescriptionForm] =
    useState(false);
  const [capturingPrescriptionObject, setcapturingPrescriptionObject] =
    useState({});

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
    renderingPrescriptions();
    renderingUser();
    renderingMedicines();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <DoctorNavbar />
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Prescriptions</p>
          <p className="text-gray-600">
            Manage{" "}
            <span className="text-[#1976D2] font-semibold">
              patient's prescriptions
            </span>{" "}
            across the healthcare system
          </p>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-end space-x-2">
          <input
            placeholder="Search Prescriptions..."
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
      <div className="grid grid-cols-4 m-3 gap-3">
        {gettingPrescriptions.map((prep) => (
          <div className="bg-white rounded shadow border border-gray-300">
            <div className="p-2 bg-[#1976D2] text-white rounded-t">
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

            <div className="p-3">
              {gettingUser
                .filter((user) => user.email === prep.doctor)
                .map((user) => (
                  <p className="">
                    <span className="text-gray-400">Doctor:</span> {user?.name}
                  </p>
                ))}

              <div className="my-4">
                <p className="font-semibold text-gray-400">Medicines</p>
                <table className="w-full text-sm border border-gray-300 border-collapse">
                  <thead className="bg-gray-100 border border-gray-300">
                    <th className="py-1 pl-2">Name</th>
                    <th>Dosage</th>
                    <th className="py-1 pr-2">Duration</th>
                  </thead>

                  <tbody>
                    {gettingMedicines
                      .filter((med) => med.name === prep.medicine)
                      .map((med) => (
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
                            {med.timing === "after_food"
                              ? "After Food"
                              : "Before Food"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p>
                <span className="text-gray-400">Tests:</span> {prep.test}
              </p>

              <div>
                <div className="flex items-center space-x-1 mt-2">
                  <GrNotes className="text-blue-400" />
                  <p className="text-blue-400">Notes:</p>
                </div>
                <p className="bg-blue-50 text-[#1976D2] text-sm p-2 rounded">
                  {prep.additionalNote}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 p-3">
              <button
                onClick={() => {
                  setopeningUpdatePrescriptionForm(true);
                  setcapturingPrescriptionObject(prep);
                }}
                className="border-2 border-gray-400 py-0.5 px-2 rounded text-gray-400"
              >
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

      {openingUpdatePrescriptionForm && (
        <UpdatePrescriptionForm
          renderingPrescriptions={renderingPrescriptions}
          capturingPrescriptionObject={capturingPrescriptionObject}
          setopeningUpdatePrescriptionForm={setopeningUpdatePrescriptionForm}
        />
      )}
    </div>
  );
}

export default DoctorPrescription;
