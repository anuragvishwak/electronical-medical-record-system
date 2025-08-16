import React, { useEffect, useState } from "react";
import DoctorNavbar from "./DoctorNavbar";
import { IoNotifications } from "react-icons/io5";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";
import { FaEye } from "react-icons/fa";

function DoctorLabReports() {
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingLabResults, setgettingLabResults] = useState([]);
  const [gettingLabOrders, setgettingLabOrders] = useState([]);
  const [extendingTable, setextendingTable] = useState(false);
  const [capturingResultId, setcapturingResultId] = useState("");

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
          <input
            placeholder="Search Lab Reports..."
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
                    <span className="text-gray-500">Patient:</span> {user.name}
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

            {extendingTable &&
              capturingResultId ===
                lab.id && (
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
    </div>
  );
}

export default DoctorLabReports;
