import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddingInsuranceForm from "./AddingInsuranceForm";
import { FaEdit } from "react-icons/fa";
import { FaIndianRupeeSign, FaTrash } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import UpdateInsuranceForm from "./UpdateInsuranceForm";

function ViewInsuranceInfo() {
  const hospitalName = localStorage.getItem('hospitalName');
  const [openingAddInsuranceForm, setopeningAddInsuranceForm] = useState(false);
  const [gettingInsurances, setgettingInsurances] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
  const [openingInsuranceUpdateForm, setopeningInsuranceUpdateForm] =
    useState(false);
  const [capturingDataObject, setcapturingDataObject] = useState({});

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

  async function renderingInsuranceCompany() {
    const taskDetails = await getDocs(
      collection(database, "insurance_provider_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgettingInsuranceCompanies(multipleArray);
  }

  useEffect(() => {
    renderingInsurances();
    renderingUser();
    renderingInsuranceCompany();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <InsuranceStaffNavbar />

      <div className="m-5 p-5 bg-white border border-gray-300">
        <div>
          <p className="text-3xl text-[#003441] font-bold">
            View Insurance Information
          </p>
          <p className="text-[#01B49C]">
            All the Insurance information will be displayed here.
          </p>
        </div>

        <hr className="my-4 border-gray-300" />
        <div className="flex items-center justify-between ">
          <input
            placeholder="Search Insurance details by policy number..."
            className="border border-gray-400 w-96 p-1"
          ></input>
          <div className="flex items-center space-x-3">
            <select className="p-1.5 w-60 border border-gray-300">
              <option>Insurance Company</option>
              {gettingInsuranceCompanies.map((company) => (
                <option value={company.providerName}>{company.providerName}</option>
              ))}
            </select>
            <select className="p-1.5 w-60 border border-gray-300">
              <option>Coverage Type</option>
               <option value={"inpatient"}>Inpatient</option>
                  <option value={"outpatient"}>Outpatient</option>
                  <option value={"surgery"}>Surgery</option>
                  <option value={"corporate"}>Corporate</option>
                  <option value={"general"}>General</option>
            </select>
            <button
              onClick={() => {
                setopeningAddInsuranceForm(true);
              }}
              className="bg-[#01B49C] py-1 px-3  text-white"
            >
              + Add Insurance
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 overflow-auto h-[460px] gap-5 m-5 scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200">
        {gettingInsurances.filter(insurance => insurance.hospitalName === hospitalName).map((insurance) => (
          <div className="bg-white p-5 border border-gray-300">
            <div className="flex items-start justify-between">
              <p className="text-xl font-bold">{insurance.patient}</p>
              <p className="bg-[#01B49C]-full text-white py-1 text-sm font-semibold px-4">
                {insurance.status}
              </p>
            </div>
            <p className="">
              <span className="mr-1">Policy</span>#{insurance.policyNumber}
            </p>

            <div className="my-8">
              <p className="text-[#01B49C]">Provider</p>
              <p className="text-[#003441] font-semibold">
                {insurance.providerName}
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="">
                <p className="text-[#01B49C]">Coverage Type</p>
                <p className="text-[#003441] font-semibold">
                  {insurance.coverageType}
                </p>
              </div>

              <div className="">
                <p className="text-[#01B49C]">Sum Insured</p>
                <div className="text-green-500 flex items-center space-x-1 font-semibold">
                  <FaIndianRupeeSign />
                  <p>{insurance.sumInsured}/-</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-14 mt-3">
              <div className="">
                <p className="text-[#01B49C]">Valid From</p>
                <p className="text-[#003441] font-semibold">
                  {insurance.validFrom}
                </p>
              </div>

              <div className="">
                <p className="text-[#01B49C]">Valid To</p>
                <p className="text-[#003441] font-semibold">
                  {insurance.validTo}
                </p>
              </div>
            </div>

            <hr className="border-gray-300 my-3" />
            <div className="flex items-center space-x-2 justify-end">
              <button
                onClick={() => {
                  setopeningInsuranceUpdateForm(true);
                  setcapturingDataObject(insurance);
                }}
                className="text-green-500"
              >
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

      {openingInsuranceUpdateForm && (
        <UpdateInsuranceForm
          capturingDataObject={capturingDataObject}
          renderingInsurances={renderingInsurances}
          setopeningInsuranceUpdateForm={setopeningInsuranceUpdateForm}
        />
      )}
    </div>
  );
}

export default ViewInsuranceInfo;
