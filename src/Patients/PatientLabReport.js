import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { IoNotifications } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaEye } from "react-icons/fa6";
import { email } from "zod";

function PatientLabReport() {
  const email = localStorage.getItem("email");
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingLabResults, setgettingLabResults] = useState([]);
  const [extendingTable, setextendingTable] = useState(false);
  const [capturingResultId, setcapturingResultId] = useState("");

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
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <PatientNavbar />
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">Lab Reports</p>
            <p className="text-[#01B49C]">
              Doctor can view patient's{" "}
              <span className="text-[#003441] font-semibold">Lab Reports</span>{" "}
              here
            </p>
          </div>
          <div className="border-gray-400">
            <p className="text-2xl text-center font-bold">
              {gettingLabResults.filter((lab) => lab.patient === email).length}
            </p>
            <p className="text-gray-500">Total Lab Reports</p>
          </div>
        </div>

        <hr className="my-4 border-gray-300"/>
        <div className="flex items-center justify-end space-x-2">
          <input
            placeholder="Search Lab Reports..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>

      <div className="m-5 grid grid-cols-3 gap-5">
        {gettingLabResults.map((lab) => (
          <div className="rounded bg-white border border-gray-300 shadow">
            <div className=" bg-[#01B49C] rounded-t p-3 text-white ">
              <div className="flex text-sm items-center space-x-1">
                <p>
                  <span className="text-gray-300">Appointment Id:</span>{" "}
                  {lab.appointmentId}
                </p>
              </div>
              <p>
                <span className="text-gray-300">Consultation Id:</span>{" "}
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
                className="bg-[#003441] text-sm text-white py-1 px-4 rounded hover:bg-blue-800"
              >
                <div className="flex items-center space-x-1">
                  <FaEye />
                  <p>View Test Results</p>
                </div>
              </button>
            </div>

            {extendingTable && capturingResultId === lab.id && (
              <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
                <div className="bg-white p-5 w-6/12 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#01B49C] text-xl font-bold">
                      Lab Results
                    </p>
                    <button
                      onClick={() => {
                        setextendingTable(false);
                      }}
                      className="font-semibold text-red-500"
                    >
                      Close
                    </button>
                  </div>
                  <div className="w-full">
                    <table className="table-auto w-full">
                      <thead className="bg-gray-100 border border-gray-300">
                        <tr>
                          <th className="py-1.5">Parameter</th>
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
                                  <td className="text-center py-2">{key}</td>
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
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientLabReport;
