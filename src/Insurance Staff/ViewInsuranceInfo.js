import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddingInsuranceForm from "./AddingInsuranceForm";
import { FaEdit } from "react-icons/fa";
import { FaIndianRupeeSign, FaTrash } from "react-icons/fa6";
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
      <div className="p-5">
          <p className="text-3xl text-[#212a31] font-bold">
            View Insurance Information
          </p>
          <p className="text-[#196d8e]">
            All the{" "}
            <span className="text-[#212a31] font-semibold">
              Insurance information
            </span>{" "}
            will be displayed here.
          </p>
        </div>
      <div className="mx-5 flex items-end justify-between bg-white p-5 border border-gray-300 shadow rounded">

          <input
            placeholder="Search Insurance details..."
            className="border border-gray-400 w-6/12 p-1 rounded"
          ></input>
         <div className="flex items-center space-x-5">
           <button
            onClick={() => {
              setopeningAddInsuranceForm(true);
            }}
            className="bg-[#196d8e] py-1 px-3 rounded shadow text-white"
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

      <div className="grid grid-cols-4 overflow-auto h-[460px] gap-5 m-5 scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200">
        {gettingInsurances.map((insurance) => (
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-start justify-between">
              <p className="text-xl font-bold">{insurance.patient}</p>
              <p className="bg-[#196d8e] rounded-full text-white py-1 text-sm font-semibold px-4">
                {insurance.status}
              </p>
            </div>
            <p className="">
              <span className="mr-1">Policy</span>#{insurance.policyNumber}
            </p>

            <div className="my-8">
              <p className="text-[#196d8e]">Provider</p>
              <p className="text-[#212a31] font-semibold">
                {insurance.providerName}
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="">
                <p className="text-[#196d8e]">Coverage Type</p>
                <p className="text-[#212a31] font-semibold">
                  {insurance.coverageType}
                </p>
              </div>

              <div className="">
                <p className="text-[#196d8e]">Sum Insured</p>
                <div className="text-green-500 flex items-center space-x-1 font-semibold">
                  <FaIndianRupeeSign />
                  <p>{insurance.sumInsured}/-</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-14 mt-3">
              <div className="">
                <p className="text-[#196d8e]">Valid From</p>
                <p className="text-[#212a31] font-semibold">
                  {insurance.validFrom}
                </p>
              </div>

              <div className="">
                <p className="text-[#196d8e]">Valid To</p>
                <p className="text-[#212a31] font-semibold">
                  {insurance.validTo}
                </p>
              </div>
            </div>

            <hr className="border-gray-300 my-3" />
            <div className="flex items-center space-x-2 justify-end">
              <button className="text-green-500">
                <FaEdit />
              </button>

              <button className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
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
