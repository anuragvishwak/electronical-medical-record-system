import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddingInsuranceForm from "./AddingInsuranceForm";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function ViewInsuranceInfo() {
  const [openingAddInsuranceForm, setopeningAddInsuranceForm] = useState(false);
  const [gettingInsurances, setgettingInsurances] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);

  async function renderingInsurances() {
    const taskDetails = await getDocs(
      collection(database, "insurance_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingInsurances(multipleArray);
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
    renderingInsurances();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <InsuranceStaffNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold">View Insurance Information</p>
          <p className="text-gray-600">
            All the <span className="text-[#1976D2] font-semibold">Insurance information</span>{" "}
             will be displayed here.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Insurance details..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button
            onClick={() => {
              setopeningAddInsuranceForm(true);
            }}
            className="bg-[#1976D2] py-1 px-3 rounded shadow text-white"
          >
            + Add Insurance
          </button>

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
      </div>

      <div className="flex bg-white shadow m-3 border border-gray-300 rounded p-3 justify-center">
        <table className="w-full table-auto">
          <thead className="border border-gray-300 text-[#1976D2] bg-blue-50">
            <th className="py-1.5">Patient</th>
            <th>Provider</th>
            <th>Policy Number</th>
            <th>Coverage Type</th>
            <th>Sum Insured</th>
            <th>Valid From</th>
            <th>Valid To</th>
            <th>Status</th>
            <th>Action</th>
          </thead>

          <tbody className="">
            {gettingInsurances.map((insurance) => (
              <>
                <tr className="text-gray-500 border-b border-gray-300">
                  <td className="text-center py-1.5">{insurance.patient}</td>
                  <td className="text-center py-1.5">
                    {insurance.providerName}
                  </td>
                  <td className="text-center">{insurance.policyNumber}</td>
                  <td className="text-center">{insurance.coverageType}</td>
                  <td className="text-center">{insurance.sumInsured}/-</td>
                  <td className="text-center">{insurance.validFrom}</td>
                  <td className="text-center">{insurance.validTo}</td>
                  <td className="text-center">{insurance.status}</td>
                  <td>
                    <div className="flex items-center space-x-2 justify-center">
                      <button className="text-green-500">
                        <FaEdit />
                      </button>

                      <button className="text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {openingAddInsuranceForm && (
        <AddingInsuranceForm
          setopeningAddInsuranceForm={setopeningAddInsuranceForm}
          renderingInsurances={renderingInsurances}
        />
      )}
    </div>
  );
}

export default ViewInsuranceInfo;
