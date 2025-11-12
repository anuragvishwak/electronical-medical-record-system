import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { FaEdit, FaSearch } from "react-icons/fa";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { GrNote, GrNotes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

function PatientPrescription() {
  const hospitalName = localStorage.getItem('hospitalName');
  const email = localStorage.getItem("email");
  const [gettingPrescriptions, setgettingPrescriptions] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingMedicines, setgettingMedicines] = useState([]);

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
      <PatientNavbar />
      <div className="m-5 bg-white p-3 border border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#003441]">Prescriptions</p>
            <p className="text-[#01B49C]">
              Patient's can see their{" "}
              <span className="text-[#003441] font-semibold">
                Prescriptions
              </span>{" "}
              across the healthcare system
            </p>
          </div>
          <div className="border-gray-400">
            <p className="text-2xl text-center font-bold">
              {
                gettingPrescriptions.filter(
                  (prescribe) => prescribe.patient === email
                ).length
              }
            </p>
            <p className="text-gray-500">Total Prescriptions</p>
          </div>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-end space-x-2">
          <input
            placeholder="Search Prescriptions..."
            className="border border-gray-400 w-96 p-1"
          ></input>

          <button>
            <FaSearch
              size={31}
              className="border border-gray-500 p-1 text-gray-500"
            />
          </button>
        </div>
      </div>
     <div className="grid grid-cols-3 gap-5">
  {gettingPrescriptions
    .filter(
      (prep) => 
        prep.patient === email &&
        prep.hospitalName === hospitalName // ✅ Filter by hospital
    )
    .map((prep) => (
      <div key={prep.id} className="bg-white border border-gray-300 mx-5">
        <div className="p-5">
          {gettingUser
            .filter(
              (user) => 
                user.email === prep.doctor && 
                user.hospitalName === hospitalName // ✅ Doctor from same hospital
            )
            .map((user) => (
              <p key={user.id}>
                <span className="text-gray-400">Doctor:</span> {user?.name}
              </p>
            ))}

          <div className="my-4">
            <p className="font-semibold text-gray-400">Medicines</p>
            <table className="w-full text-sm border border-gray-300 border-collapse">
              <thead className="bg-gray-100 border border-gray-300">
                <tr>
                  <th className="py-1 pl-2">Name</th>
                  <th>Dosage</th>
                  <th className="py-1 pr-2">Duration</th>
                </tr>
              </thead>

              <tbody>
                {gettingMedicines
                  .filter(
                    (med) =>
                      med.name === prep.medicine &&
                      med.hospitalName === hospitalName // ✅ Medicine of same hospital
                  )
                  .map((med) => (
                    <tr key={med.id}>
                      <td className="text-center text-gray-500">{med.name}</td>
                      <td className="text-center text-gray-500">
                        {med.dosage.map((dose, i) => (
                          <p key={i}>{dose}</p>
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
            <p className="bg-blue-50 text-[#1976D2] text-sm p-2">
              {prep.additionalNote}
            </p>
          </div>
        </div>
      </div>
    ))}
</div>

    </div>
  );
}

export default PatientPrescription;
