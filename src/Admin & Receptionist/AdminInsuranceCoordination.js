import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import { database } from "../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";

function AdminInsuranceCoordination() {

  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState([]);

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
    <div>
      <AdminNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="login-2xl text-[#212a31] font-bold">
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
      <div>
        <p>Overview</p>
        {gettingInsuranceCompanies.length}
      </div>
    </div>
  );
}

export default AdminInsuranceCoordination;
