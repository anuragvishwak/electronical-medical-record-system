import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddInsuranceCompanyForm from "./AddInsuranceCompanyForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import UpdateInsuranceCompanyForm from "./UpdateInsuranceCompanyForm";

function InsuranceProvider() {
  const [openingAddInsuranceCompany, setopeningAddInsuranceCompany] =
    useState(false);
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingAdditionalDetails, setopeningAdditionalDetails] =
    useState(false);
  const [
    openingUpdateInsuranceCompanyForm,
    setopeningUpdateInsuranceCompanyForm,
  ] = useState(false);

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
    renderingInsuranceCompany();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <InsuranceStaffNavbar />

      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl text-[#212a31] font-bold">
            Insurance Provider
          </p>
          <p className="text-[#196d8e]">
            All the{" "}
              Insurance provider
            details will be displayed here.
          </p>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex items-center justify-between">
          <input
            placeholder="Search Insurance provider..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-400 w-60 p-1 rounded">
              <option>Policy Type</option>
              <option>Select Poicy Supported</option>
              <option value={"health"}>Health</option>
              <option value={"accident"}>Accident</option>
              <option value={"corporate"}>Corporate (Employer-based)</option>
              <option value={"travel_spacial"}>
                Travel / Special Medical Cover
              </option>
            </select>
            <button
              onClick={() => {
                setopeningAddInsuranceCompany(true);
              }}
              className="bg-[#196d8e] py-1 w-56 rounded shadow text-white"
            >
              + Add Insurance Provider
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 overflow-auto h-[460px] gap-5 m-5 scrollbar-thin scrollbar-thumb-[#196d8e] scrollbar-track-gray-200">
        {gettingInsuranceCompanies.map((insurance) => (
          <div className="bg-white mb-5 p-5 rounded-lg border border-gray-300 shadow">
            <div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-[#212a31] font-bold">
                    {insurance.providerName}
                  </p>
                  <p className="bg-[#196d8e] rounded-full text-white py-1 text-sm font-semibold px-4">
                    {insurance.policyTypeSupported}
                  </p>
                </div>
                <p className="text-gray-500">
                  <span>Code:</span> {insurance.companyCode}
                </p>
              </div>
            </div>

            <div className="my-5">
              <p className="text-[#196d8e]">Contact Person</p>
              <p className="text-[#212a31] font-semibold">
                {insurance.contactPerson}
              </p>
            </div>

            <div className="grid grid-cols-3">
              <div>
                <p className="text-[#196d8e]">Phone No</p>
                <p className="text-[#212a31] font-semibold">
                  {insurance.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-[#196d8e]">Email</p>
                <p className="text-[#212a31] font-semibold">
                  {insurance.email}
                </p>
              </div>
            </div>

            <hr className="border-gray-300 my-3" />
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setopeningAdditionalDetails(true);
                  setcapturingDataObject(insurance);
                }}
                className="bg-[#212a31] text-white px-3 rounded py-1"
              >
                <div className="flex items-center space-x-1">
                  <FaEye />
                  <p>Additional Details</p>
                </div>
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setopeningUpdateInsuranceCompanyForm(true);
                    setcapturingDataObject(insurance);
                  }}
                  className="text-green-500"
                >
                  <FaEdit size={25} />
                </button>

                <button className="text-red-500">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openingAdditionalDetails && (
        <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
          <div className="bg-white w-6/12 p-4 rounded">
            <div className="flex items-start mb-5 justify-between">
              <p className="text-[#212a31] text-xl font-bold">
                Additonal Details (Address / Coverage Notes / Limitations)
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

            <div className="">
              <div>
                <p className="text-[#212a31] font-semibold">Address:</p>
                <p className="text-gray-600 text-justify  w-auto italic">
                  {capturingDataObject.address}
                </p>
              </div>

              <div className="my-3">
                <p className="text-[#196d8e] flex items-center font-semibold">
                  <GrNotes className="mr-1" /> Coverage Notes
                </p>
                <p className="text-gray-600 shadow p-3 rounded bg-[#e6f3f8] border border-[#196d8e] text-justify w-auto  italic">
                  {capturingDataObject.coverageNotes}
                </p>
              </div>

              <div>
                <p className="text-orange-500 flex items-center space-x-2 font-semibold">
                  <CgDanger size={20} className="mr-1" /> Limitations:
                </p>
                <p className="text-gray-600 p-3 rounded shadow bg-orange-50 border border-orange-500 text-justify w-auto  italic">
                  {capturingDataObject.limitations}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {openingAddInsuranceCompany && (
        <AddInsuranceCompanyForm
          setopeningAddInsuranceCompany={setopeningAddInsuranceCompany}
          renderingInsuranceCompany={renderingInsuranceCompany}
        />
      )}

      {openingUpdateInsuranceCompanyForm && (
        <UpdateInsuranceCompanyForm
          setopeningUpdateInsuranceCompanyForm={
            setopeningUpdateInsuranceCompanyForm
          }
          capturingDataObject={capturingDataObject}
          renderingInsuranceCompany={renderingInsuranceCompany}
        />
      )}
    </div>
  );
}

export default InsuranceProvider;
