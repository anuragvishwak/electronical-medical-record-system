import React from "react";
import { GrNotes } from "react-icons/gr";

function AdditionalConsultationDetails({
  setopeningAdditionalDetails,
  capturingDataObject,
}) {
  console.log(capturingDataObject);
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen overflow-auto my-5 w-8/12 p-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#1976D2] text-xl font-bold">
            Additional Consultation Details
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAdditionalDetails(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div className="broder p-2 border border-gray-300">
            <p className="text-xl font-semibold">
              <span className="text-gray-400">Patient:</span>{" "}
              {capturingDataObject.patientName}
            </p>

            <p className="text-sm text-gray-400">
              <span className="">appointment id:</span>{" "}
              {capturingDataObject.appointmentId}
            </p>
          </div>

          <div className="border border-gray-300 my-3 p-3">
            <p className="mb-2">Vitals</p>

            <table className="min-w-full border text-sm border-gray-200  overflow-hidden text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-1.5">Height</th>
                  <th className="">Weight</th>
                  <th className="">Temperature</th>
                  <th className="">Blood Pressure</th>
                  <th className="">Pulse Rate</th>
                  <th className="">Respiratory Rate</th>
                  <th className="">Oxygen Saturation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-green-500">
                    {capturingDataObject.height} cm
                  </td>
                  <td className="px-4 py-2 text-red-500">
                    {capturingDataObject.weight} kg
                  </td>
                  <td className="px-4 py-2 text-purple-500">
                    {capturingDataObject.temprature} F
                  </td>
                  <td className="px-4 py-2 text-orange-500">
                    {capturingDataObject.bloodPressure} mmHg
                  </td>
                  <td className="px-4 py-2 text-yellow-500">
                    {capturingDataObject.pulseRate} bpm
                  </td>
                  <td className="px-4 py-2 text-blue-500">
                    {capturingDataObject.respiratoryRate}/min
                  </td>
                  <td className="px-4 py-2 text-pink-500">
                    {capturingDataObject.oxygenSaturation}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        <div className="border border-gray-300 my-3 p-3">
            <div className="flex items-center space-x-2 my-3">
                <GrNotes/>
                <p>Medical Records</p>
            </div>
            <div className="mb-5">
                <p className="font-semibold text-gray-500 mb-2">
                History of Present Illness
                </p>
                <p className="text-gray-600 text-sm text-justify">
                {capturingDataObject.historyofPresentIllness}
                </p>
            </div>

             <div className="">
                <p className="font-semibold text-gray-500 mb-2">
                Past Medical History
                </p>
                <p className="text-gray-600 text-sm text-justify">
                {capturingDataObject.pastMedicalHistory}
                </p>
            </div>
        </div>


         <div className="border border-gray-300 my-3 p-3">
            <div className="flex items-center space-x-2 my-3">
                <GrNotes/>
                <p>Medicine Procedures and Additional Instruction</p>
            </div>
            <div className="mb-5">
                <p className="font-semibold text-gray-500 mb-2">
                Medical Procedures
                </p>
                <p className="text-gray-600 text-sm text-justify">
                {capturingDataObject.medication_procedures}
                </p>
            </div>

             <div className="">
                <p className="font-semibold text-gray-500 mb-2">
                Additional Instructions
                </p>
                <p className="text-gray-600 text-sm text-justify">
                {capturingDataObject.additionalInstructions}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalConsultationDetails;
