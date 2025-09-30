import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";
import InsuranceCoodinationNavbar from "./Insurance Coordination/InsuranceCoodinationNavbar";
import InsuranceProviderOverview from "./Insurance Coordination/InsuranceProviderOverview";
import ClaimMonitoring from "./Insurance Coordination/ClaimMonitoring";
import InsuranceToPatient from "./Insurance Coordination/InsuranceToPatient";

function AdminInsuranceCoordination() {
  const [currentTab, setcurrentTab] = useState("insurance-provider-overview");

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <AdminNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl text-[#212a31] font-bold">
            Insurance Coordinations
          </p>
          <p className="text-[#196d8e]">
            <span className="text-[#212a31] font-semibold">
              Insurance Coordination
            </span>
            Where admin can manage view insurance details.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Billing & Payment..."
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
      <div className="flex">
        <InsuranceCoodinationNavbar
          setcurrentTab={setcurrentTab}
          currentTab={currentTab}
        />

        <div className="w-full">
          {currentTab === "insurance-provider-overview" ? (
            <InsuranceProviderOverview />
          ) : currentTab === "insurance-to-patient" ? (
            <InsuranceToPatient />
          ) : (
            <ClaimMonitoring />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminInsuranceCoordination;
