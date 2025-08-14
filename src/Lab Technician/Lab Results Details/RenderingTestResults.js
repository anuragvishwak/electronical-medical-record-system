import React from "react";
import { GrNotes } from "react-icons/gr";

function RenderingTestResults({ setopeningTestResults, capturingLab }) {
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-6/12 p-3 rounded">
        <div className="flex itesm-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <GrNotes size={18} className="text-[#1976D2]" />
            <p className="text-[#1976D2] font-semibold text-xl">Test Results</p>
          </div>

          <button
            onClick={() => setopeningTestResults(false)}
            className="font-semibold text-red-500"
          >
            Close
          </button>
        </div>

        <div className="w-full">
         <p className="mb-2 font-semibold"><span className="text-gray-400">Test Name:</span> {capturingLab.testRequested}</p>

          <div className="w-full overflow-x-auto border p-3 border-gray-300">
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
                {capturingLab.testRequested === "Complete Blood Count (CBC)" &&
                  Object.entries(capturingLab).map(([key, value]) => {
                    if (
                      typeof value === "object" &&
                      value !== null &&
                      "value" in value &&
                      "unit" in value
                    ) {
                      return (
                        <tr className="text-gray-500 border-b border-gray-300" key={key}>
                          <td className="text-center py-1">{key}</td>
                          <td className="text-center">{value.value}</td>
                          <td className="text-center">{value.unit}</td>
                          <td className="">
                            <div className=" flex justify-center">
                                <p className="text-start">{value.reference || "-"}</p>
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
    </div>
  );
}

export default RenderingTestResults;
