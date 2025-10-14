import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { IoNotifications } from "react-icons/io5";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";
import { FaEdit, FaEye } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UpdateLabOrderForm from "./UpdateLabOrderForm";

function DoctorLabReports() {
  const currentUser = localStorage.getItem('email');
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingLabResults, setgettingLabResults] = useState([]);
  const [gettingLabOrders, setgettingLabOrders] = useState([]);
  const [extendingTable, setextendingTable] = useState(false);
  const [capturingResultId, setcapturingResultId] = useState("");
  const [currentTab, setcurrentTab] = useState("order");
  const [openingNote, setopeningNote] = useState(false);
  const [openingLabOrderUpdateForm, setopeningLabOrderUpdateForm] =
    useState(false);
  const [capturingLabOrderObject, setcapturingLabOrderObject] = useState({});

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
    <div className="bg-gray-100 h-screen">
      <DoctorNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold">Lab Reports</p>
          <p className="text-gray-600">
            Doctor can view patient's Lab Reports here
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded border flex items-center space-x-2 border-gray-300 bg-gray-200">
            <button
              onClick={() => {
                setcurrentTab("order");
              }}
              className={`px-2 ${
                currentTab === "order" ? "bg-white shadow rounded" : ""
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => {
                setcurrentTab("report");
              }}
              className={`px-2 ${
                currentTab === "report" ? "bg-white shadow rounded" : ""
              }`}
            >
              Reports
            </button>
          </div>
          <input
            placeholder="Search Lab Reports..."
            className="border border-gray-400 w-60 p-1.5 rounded"
          ></input>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>
      {currentTab === "order" ? (
        <div>
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
                {gettingLabOrders.filter(order => order.doctor === currentUser).map((order) => (
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

                      <td className="text-center py-3">
                        {order.testRequested}
                      </td>
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
                              setopeningLabOrderUpdateForm(true);
                              setcapturingLabOrderObject(order);
                            }}
                            className="text-yellow-500 rounded border-2 p-1 hover:bg-yellow-500 hover:text-white border-yellow-500"
                          >
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
                        <div className="bg-white p-3.5 rounded shadow-lg w-5/12">
                          <div className="p-3.5 rounded border border-gray-400">
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
                            <p className="text-justify">
                              {order.clinicalNotes}
                            </p>
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
      ) : (
        <div className="m-3 grid grid-cols-2 gap-3">
          {gettingLabResults.map((lab) => (
            <div className="rounded bg-white shadow">
              <div className=" bg-black rounded-t p-3 text-white ">
                <div className="flex items-center space-x-1">
                  <p>
                    <span className="text-gray-400">Appointment Id:</span>{" "}
                    {lab.appointmentId}
                  </p>
                </div>
                <p>
                  <span className="text-gray-400">Consultation Id:</span>{" "}
                  {lab.constulationId}
                </p>
              </div>

              <div className="border m-3 p-2 rounded-lg border-gray-300">
                {gettingUser
                  .filter((user) => user.email === lab.doctor)
                  .map((user) => (
                    <p className="">
                      <span className="text-gray-500">Doctor:</span> {user.name}
                    </p>
                  ))}

                {gettingUser
                  .filter((user) => user.email === lab.patient)
                  .map((user) => (
                    <p className="">
                      <span className="text-gray-500">Patient:</span>{" "}
                      {user.name}
                    </p>
                  ))}

                {gettingUser
                  .filter((user) => user.email === lab.lab_technician)
                  .map((user) => (
                    <p className="">
                      <span className="text-gray-500">Lab Technician:</span>{" "}
                      {user.name}
                    </p>
                  ))}

                <p className="">
                  <span className="text-gray-500">Test Name:</span>{" "}
                  {lab.testRequested}
                </p>
              </div>

              <div
                className={`flex justify-end px-3 ${
                  !extendingTable ? "mb-3" : ""
                }`}
              >
                <button
                  onClick={() => {
                    setcapturingResultId(lab.id);
                    setextendingTable(!extendingTable);
                  }}
                  className="bg-[#1976D2] text-sm text-white py-1 px-4 rounded hover:bg-blue-800"
                >
                  <div className="flex items-center space-x-1">
                    <FaEye />
                    <p>View Test Results</p>
                  </div>
                </button>
              </div>

              {extendingTable && capturingResultId === lab.id && (
                <div className="m-3 border p-3 border-gray-300 rounded text-sm">
                  <table className="table-auto w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-1">Parameter</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Reference Value</th>
                      </tr>
                    </thead>

                    <tbody>
                      {lab.testRequested === "Complete Blood Count (CBC)" &&
                        Object.entries(lab).map(([key, value]) => {
                          if (
                            typeof value === "object" &&
                            value !== null &&
                            "value" in value &&
                            "unit" in value
                          ) {
                            return (
                              <tr
                                className="text-gray-500 border-b border-gray-300"
                                key={key}
                              >
                                <td className="text-center py-1">{key}</td>
                                <td className="text-center">{value.value}</td>
                                <td className="text-center">{value.unit}</td>
                                <td className="">
                                  <div className=" flex justify-center">
                                    <p className="text-start">
                                      {value.reference || "-"}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {openingLabOrderUpdateForm && <UpdateLabOrderForm renderingLabOrders = {renderingLabOrders} capturingLabOrderObject = {capturingLabOrderObject} setopeningLabOrderUpdateForm = {setopeningLabOrderUpdateForm}/>}
    </div>
  );
}

export default DoctorLabReports;
