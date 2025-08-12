import React, { useEffect, useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaClosedCaptioning, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrNote, GrNotes } from "react-icons/gr";
import CreateLabResultForm from "./CreateLabResultForm";

function AssignedLabOrders() {
  const [gettingLabOrders, setgettingLabOrders] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingNote, setopeningNote] = useState(false);
  const [capturingLabOrderObject, setcapturingLabOrderObject] = useState({});
  const [openingCreateLabResultsForm, setopeningCreateLabResultsForm] =
    useState(false);

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
        <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
          <div>
            <p className="text-2xl font-bold">Assigned Lab Orders</p>
            <p className="text-gray-600">
              Lab Technicians can view and manage lab orders.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              placeholder="Search Lab Orders..."
              className="border border-gray-400 w-60 p-1 rounded"
            ></input>

            <button>
              <IoNotifications
                size={31}
                className="border border-gray-500 p-1 rounded text-gray-500"
              />
            </button>
          </div>
        </div>

        <div className="flex justify-center m-3 p-3 bg-white border border-gray-300 shadow rounded">
          <table className="w-full table-auto">
            <thead className="bg-blue-50 text-[#1976D2]">
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
                  <tr className="text-gray-500 border-b border-gray-300">
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
                        className="bg-blue-500 text-white px-2 mt-1.5 py-1 rounded"
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
                            className="text-[#1976D2] border border-[#1976D2] hover:bg-[#1976D2] py-1 px-3 rounded hover:text-white"
                          >
                            + Upload Results
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
                  {openingNote && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-5 rounded shadow-lg w-5/12">
                        <div className="flex itesm-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            <GrNotes size={18} className="text-[#1976D2]" />
                            <p className="text-[#1976D2] font-semibold text-xl">
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
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openingCreateLabResultsForm && (
        <CreateLabResultForm
        capturingLabOrderObject = {capturingLabOrderObject}
          setopeningCreateLabResultsForm={setopeningCreateLabResultsForm}
        />
      )}
    </div>
  );
}

export default AssignedLabOrders;
