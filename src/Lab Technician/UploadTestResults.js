import React, { useEffect, useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { MdCurrencyRupee, MdDelete } from "react-icons/md";
import RenderingTestResults from "./Lab Results Details/RenderingTestResults";
import { FaPlus, FaRupeeSign, FaRupiahSign } from "react-icons/fa6";
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

  useEffect(() => {
    renderingLabResults();
    renderingUser();
    renderingLabOrders();
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <LabTechnicianNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Upload Test Results</p>
          <p className="text-gray-600">
            Upload and manage test lab results across the healthcare system
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search lab results..."
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

      <div>
        <div className="flex justify-center m-3 p-3 bg-white border border-gray-300 shadow rounded">
          <table className="w-full table-auto">
            <thead className="bg-blue-50 text-[#1976D2]">
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
                <tr className="text-gray-500 border-b border-gray-300">
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
                        <MdCurrencyRupee/>
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
                        className="text-[#1976D2] text-sm border border-[#1976D2] hover:bg-[#1976D2] py-1 px-3 rounded hover:text-white"
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
                        className="text-[#1976D2] text-sm border border-[#1976D2] hover:bg-[#1976D2] py-1 px-3 rounded hover:text-white"
                      >
                        <div className="flex items-center space-x-1">
                          <FaEye />
                          <p>Report</p>
                        </div>
                      </button>
                      <button className="text-yellow-500 rounded border-2 p-1 hover:bg-yellow-500 hover:text-white border-yellow-500">
                        <FaEdit size={21} />
                      </button>

                      <button className="text-red-500 rounded border-2 p-1 hover:bg-red-500 hover:text-white border-red-500">
                        <MdDelete size={20} />
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
        <AddChargesForm renderingLabResults={renderingLabResults} capturingLab = {capturingLab} setopeningChargesForm={setopeningChargesForm} />
      )}
    </div>
  );
}

export default UploadTestResults;
