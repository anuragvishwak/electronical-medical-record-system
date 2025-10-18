import React, { useEffect, useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { MdCurrencyRupee, MdDelete } from "react-icons/md";
import RenderingTestResults from "./Lab Results Details/RenderingTestResults";
import { FaPencil, FaPlus, FaRupeeSign, FaRupiahSign } from "react-icons/fa6";
import AddChargesForm from "./AddChargesForm";

function UploadTestResults() {
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingLabResults, setgettingLabResults] = useState([]);
  const [gettingLabOrders, setgettingLabOrders] = useState([]);
  const [capturingLab, setcapturingLab] = useState({});
  const [openingTestResults, setopeningTestResults] = useState(false);
  const [openingChargesForm, setopeningChargesForm] = useState(false);

  async function renderingLabOrders() {
    const taskDetails = await getDocs(
      collection(database, "lab_order_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingLabOrders(multipleArray);
  }

  async function renderingLabResults() {
    const taskDetails = await getDocs(
      collection(database, "lab_order_results_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingLabResults(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  const labTestsList = [
    { id: 1, name: "Complete Blood Count (CBC)" },
    { id: 2, name: "Blood Sugar (Fasting)" },
    { id: 3, name: "Blood Sugar (Postprandial)" },
    { id: 4, name: "Lipid Profile" },
    { id: 5, name: "Liver Function Test (LFT)" },
    { id: 6, name: "Kidney Function Test (KFT)" },
    { id: 7, name: "Thyroid Stimulating Hormone (TSH)" },
    { id: 8, name: "Urinalysis" },
    { id: 9, name: "Electrolyte Panel" },
    { id: 10, name: "Hemoglobin A1c (HbA1c)" },
    { id: 11, name: "C-Reactive Protein (CRP)" },
    { id: 12, name: "Erythrocyte Sedimentation Rate (ESR)" },
    { id: 13, name: "Prothrombin Time (PT/INR)" },
    { id: 14, name: "Vitamin D" },
    { id: 15, name: "Calcium" },
    { id: 16, name: "Iron Studies" },
    { id: 17, name: "Pregnancy Test (hCG)" },
    { id: 18, name: "HIV Test" },
    { id: 19, name: "Hepatitis B Surface Antigen (HBsAg)" },
    { id: 20, name: "Chest X-Ray" },
  ];

  useEffect(() => {
    renderingLabResults();
    renderingUser();
    renderingLabOrders();
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <LabTechnicianNavbar />
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold text-[#212a31]">
            Upload Test Results
          </p>
          <p className="text-[#196d8e]">
            Upload and manage test lab results across the healthcare system
          </p>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search lab results..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <div>
            <div className="flex items-center space-x-3">
              <select className="border border-gray-300 w-60 p-1.5 rounded">
                <option>Patient</option>
                {gettingUser
                  .filter((user) => user.role === "patient")
                  .map((user) => (
                    <option>{user.name}</option>
                  ))}
              </select>

              <select className="border border-gray-300 w-60 p-1.5 rounded">
                <option>Doctor</option>
                {gettingUser
                  .filter((user) => user.role === "doctor")
                  .map((user) => (
                    <option>{user.name}</option>
                  ))}
              </select>
              <select className="border border-gray-300 w-60 p-1.5 rounded">
                <option>Tests</option>
                {labTestsList.map((test) => (
                  <option value={test.name}>{test.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center m-5 p-5 bg-white border border-gray-300 shadow rounded">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-[#212a31] border border-gray-300">
              <tr>
                <th className="py-1.5">Patient Name</th>
                <th>Doctor Name</th>
                <th>Test Requested</th>
                <th>Appointment Id</th>
                <th>Consutlation Id</th>
                <th>Priority</th>
                <th>Lab Charges</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {gettingLabResults.map((lab) => (
                <tr className="text-[#196d8e] border-b border-gray-300">
                  {gettingUser
                    .filter((user) => user.email === lab.patient)
                    .map((user) => (
                      <td className="text-center  py-3">{user.name}</td>
                    ))}

                  {gettingUser
                    .filter((user) => user.email === lab.doctor)
                    .map((user) => (
                      <td className="text-center">{user.name}</td>
                    ))}

                  <td className="text-center">{lab.testRequested}</td>
                  <td className="text-center text-sm">{lab.appointmentId}</td>
                  <td className="text-center text-sm">{lab.constulationId}</td>
                  {gettingLabOrders
                    .filter((order) => order.id === lab.orderId)
                    .map((order) => (
                      <td className="text-center">{order.priority}</td>
                    ))}

                  <th>
                    <div className="flex items-center justify-center">
                      <MdCurrencyRupee />
                      <p>{lab.labCharges}/-</p>
                    </div>
                  </th>

                  {gettingLabOrders
                    .filter((order) => order.id === lab.orderId)
                    .map((order) => (
                      <td className="text-center">{order.orderStatus}</td>
                    ))}

                  <td>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => {
                          setcapturingLab(lab);
                          setopeningChargesForm(true);
                        }}
                        className="text-[#196d8e] text-sm border border-[#196d8e] hover:bg-[#196d8e] py-1 px-3 rounded hover:text-white"
                      >
                        <div className="flex items-center space-x-1">
                          <FaPlus />
                          <p>Charges</p>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setcapturingLab(lab);
                          setopeningTestResults(true);
                        }}
                        className="text-[#212a31]"
                      >
                        <FaEye />
                      </button>
                      <button className="text-[#212a31]">
                        <FaPencil />
                      </button>

                      <button className="text-[#196d8e]">
                        <MdDelete size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openingTestResults && (
        <RenderingTestResults
          setopeningTestResults={setopeningTestResults}
          capturingLab={capturingLab}
        />
      )}

      {openingChargesForm && (
        <AddChargesForm
          renderingLabResults={renderingLabResults}
          capturingLab={capturingLab}
          setopeningChargesForm={setopeningChargesForm}
        />
      )}
    </div>
  );
}

export default UploadTestResults;
