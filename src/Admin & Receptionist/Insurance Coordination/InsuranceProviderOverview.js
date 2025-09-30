import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../FirebaseConfiguration";
import { RouterProvider } from "react-router-dom";

function InsuranceProviderOverview() {
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
    <div className="bg-white p-3 border border-gray-300 shadow rounded m-5">
         <table className="table-auto w-full">
        <thead className="bg-[#d1f2ff] text-[#196d8e]">
            <th className="text-start px-3 py-2">Provider Name</th>
            <th className="text-start">Provider Code</th>
            <th className="text-start">Policy Type Supported</th>
            <th className="text-start">Contact Person</th>
            <th className="text-start">Email</th>
            <th className="text-start">Phone</th>
        </thead>
        <tbody>
            {gettingInsuranceCompanies.map((provider) => (
            <tr key={provider.id} className="border-b border-gray-300">
              <td className="px-2 py-2">{provider.providerName}</td>
              <td className="px-2 py-1">{provider.companyCode}</td>
              <td className="px-2 py-1">{provider.policyTypeSupported}</td>
              <td className="px-2 py-1">{provider.contactPerson}</td>
              <td className="px-2 py-1">{provider.email}</td>
              <td className="px-2 py-1">{provider.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  );
}

export default InsuranceProviderOverview;
