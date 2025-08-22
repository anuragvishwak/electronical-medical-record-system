import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoNotifications } from "react-icons/io5";
import AddInsuranceCompanyForm from "./AddInsuranceCompanyForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function InsuranceProvider() {
  const [openingAddInsuranceCompany, setopeningAddInsuranceCompany] =
    useState(false);
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingAdditionalDetails, setopeningAdditionalDetails] =
    useState(false);

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
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl text-[#212a31] font-bold">
            Insurance Provider
          </p>
          <p className="text-[#196d8e]">
            All the{" "}
            <span className="text-[#212a31] font-semibold">
              Insurance provider
            </span>{" "}
            details will be displayed here.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Insurance provider..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button
            onClick={() => {
              setopeningAddInsuranceCompany(true);
            }}
            className="bg-[#196d8e] py-1 px-3 rounded shadow text-white"
          >
            + Add Insurance Provider
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
          <thead className="border border-gray-300 text-[#212a31] bg-gray-50">
            <th className="py-1">Company Code</th>
            <th>Provider Name</th>
            <th>Contact Person</th>
            <th>Phone No</th>
            <th>Email</th>
            <th>Policy Type Supported</th>
            <th>Action</th>
          </thead>

          <tbody className="">
            {gettingInsuranceCompanies.map((insurance) => (
              <>
                <tr className="text-[#196d8e] border-b border-gray-300">
                  <td className="text-center py-2">{insurance.companyCode}</td>
                  <td className="text-center">{insurance.providerName}</td>
                  <td className="text-center">{insurance.contactPerson}</td>
                  <td className="text-center">{insurance.phoneNumber}</td>
                  <td className="text-center">{insurance.email}</td>
                  <td className="text-center">
                    {insurance.policyTypeSupported}
                  </td>
                  <td>
                    <div className="flex items-center space-x-2 justify-between">
                      <button
                        onClick={() => {
                          setopeningAdditionalDetails(true);
                          setcapturingDataObject(insurance);
                        }}
                        className="bg-[#212a31] text-sm text-white px-2 rounded py-0.5"
                      >
                        <div className="flex items-center space-x-1">
                          <FaEye />
                          <p>Additional Details</p>
                        </div>
                      </button>
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

      {openingAdditionalDetails && (
        <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
          <div className="bg-white w-5/12 p-4 rounded">
            <div className="flex items-start mb-5 justify-between">
              <p className="text-[#1976D2] text-lg font-bold">
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
                <p className="text-[#1976D2] font-semibold">Address:</p>
                <p className="text-gray-600 text-justify text-sm w-auto italic">
                  {capturingDataObject.address}
                </p>
              </div>

              <div className="my-3">
                <p className="text-[#1976D2] font-semibold">Coverage Notes:</p>
                <p className="text-gray-600 text-justify w-auto text-sm italic">
                  {capturingDataObject.coverageNotes}
                </p>
              </div>

              <div>
                <p className="text-[#1976D2] font-semibold">Limitations:</p>
                <p className="text-gray-600 text-justify w-auto text-sm italic">
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
    </div>
  );
}

export default InsuranceProvider;
