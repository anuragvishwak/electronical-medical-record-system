import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoShieldCheckmark } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function InsuranceDeptDashboard() {
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );

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
    <div className="bg-gray-50 min-h-screen">
      <InsuranceStaffNavbar />

      <div>
        <div>
          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <IoShieldCheckmark
                size={45}
                className="text-[#196d8e] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#196d8e] font-semibold">
                  Total Insurance Provider
                </p>
                <p className="text-center text-3xl font-bold text-[#212a31]">
                  {gettingInsuranceCompanies.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceDeptDashboard;
