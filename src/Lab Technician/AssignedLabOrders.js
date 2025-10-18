import React, { useEffect, useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaClosedCaptioning, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrNote, GrNotes } from "react-icons/gr";
import CreateLabResultForm from "./CreateLabResultForm";
import { FaPencil } from "react-icons/fa6";

function AssignedLabOrders() {
  const [gettingLabOrders, setgettingLabOrders] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingNote, setopeningNote] = useState(false);
  const [capturingLabOrderObject, setcapturingLabOrderObject] = useState({});
  const [openingCreateLabResultsForm, setopeningCreateLabResultsForm] =
    useState(false);

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

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingLabOrders();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 h-screen">
      <LabTechnicianNavbar />
      <div>
        <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
          <div>
            <p className="text-2xl text-[#212a31] font-bold">
              Assigned Lab Orders
            </p>
            <p className="text-[#196d8e]">
              Lab Technicians can view and manage lab orders.
            </p>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="flex items-center justify-between ">
            <input
              placeholder="Search Lab Orders by order id or appointment id..."
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

        <div className="flex justify-center m-5 p-5 bg-white border border-gray-300 shadow rounded">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border border-gray-300 text-[#212a31]">
              <tr>
                <th className="py-1.5">Patient Name</th>
                <th>Doctor Name</th>
                <th>Test Requested</th>
                <th>Priority</th>
                <th>Order Status</th>
                <th>Specimen Type</th>
                <th>Date & Time</th>
                <th>Clinical Notes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {gettingLabOrders.map((order) => (
                <>
                  <tr className="text-[#196d8e] border-b border-gray-300">
                    {gettingUser
                      .filter((user) => user.email === order.patient)
                      .map((user) => (
                        <td className="text-center">{user.name}</td>
                      ))}

                    {gettingUser
                      .filter((user) => user.email === order.doctor)
                      .map((user) => (
                        <td className="text-center">{user.name}</td>
                      ))}

                    <td className="text-center py-3">{order.testRequested}</td>
                    <td className="text-center">{order.priority}</td>
                    <td className="text-center">{order.orderStatus}</td>
                    <td className="text-center">{order.specimenType}</td>
                    <td className="text-center">{order.dateTime}</td>
                    <td className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          setopeningNote(true);
                        }}
                        className="bg-[#196d8e] text-white px-2 mt-1.5 py-1 rounded"
                      >
                        <div className="flex items-center space-x-1">
                          <GrNotes />
                          <p>View Note</p>
                        </div>
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => {
                            setcapturingLabOrderObject(order);
                            setopeningCreateLabResultsForm(true);
                          }}
                          className="text-[#196d8e] border border-[#196d8e] hover:bg-[#196d8e] py-1 px-3 rounded hover:text-white"
                        >
                          + Upload Results
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
                  {openingNote && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-3.5 rounded shadow-lg w-5/12">
                        <div className="p-3.5 rounded border border-gray-400">
                          <div className="flex itesm-center justify-between mb-3">
                            <div className="flex items-center space-x-1">
                              <GrNotes size={18} className="text-[#196d8e]" />
                              <p className="text-[#196d8e] font-semibold text-xl">
                                Cinical Note
                              </p>
                            </div>

                            <button
                              onClick={() => setopeningNote(false)}
                              className="font-semibold text-red-500"
                            >
                              Close
                            </button>
                          </div>
                          <p className="text-justify">{order.clinicalNotes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openingCreateLabResultsForm && (
        <CreateLabResultForm
          capturingLabOrderObject={capturingLabOrderObject}
          setopeningCreateLabResultsForm={setopeningCreateLabResultsForm}
        />
      )}
    </div>
  );
}

export default AssignedLabOrders;
