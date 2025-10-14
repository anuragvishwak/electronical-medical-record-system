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
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
    const [gettingInsurances, setgettingInsurances] = useState([]);
  
console.log("finding insurances",gettingInsurances);

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

  useEffect(() => {
    renderingInsuranceCompany();
    renderingInsurances();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <AdminNavbar />
      <div className="p-5 bg-white mt-5 mx-5 border border-gray-300 shadow rounded">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-2xl text-[#212a31] font-bold">
              Insurance Coordinations
            </p>
            <p className="text-[#196d8e]">
              <span className="text-[#212a31] mr-1 font-semibold">
                Insurance Coordination
              </span>
              Where admin can manage view insurance details.
            </p>
          </div>
          <div>
            <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {gettingInsuranceCompanies.length}
              </p>
              <p className="text-gray-500">Total Insurance Companies</p>
            </div>

             <div className="text-center text-sm">
              <p className="text-2xl text-center font-bold">
                {gettingInsurances.length}
              </p>
              <p className="text-gray-500">Total patients enrolled in Insurances</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-end space-x-2">
          <input
            placeholder="Search Inusurance Related Queries..."
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
