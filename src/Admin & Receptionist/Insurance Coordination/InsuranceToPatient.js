import React, { useEffect, useState } from "react";
import { database } from "../../FirebaseConfiguration";
import { collection, getDocs } from "firebase/firestore";
import { FaIndianRupeeSign } from "react-icons/fa6";

function InsuranceToPatient() {
  const [gettingInsurances, setgettingInsurances] = useState([]);

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
    renderingInsurances();
  }, []);

  return (
    <div>
      <div className="bg-white p-3 border border-gray-300 shadow rounded m-5">
        <table className="table-auto w-full">
          <thead className="bg-[#d1f2ff] text-[#196d8e]">
            <th className="text-start px-3 py-2">Patient Name</th>
            <th className="text-start px-3 py-2">Provider Name</th>
            <th className="text-start">Policy Number</th>
            <th className="text-start">Valid From</th>
            <th className="text-start">Valid To</th>
            <th className="text-start">Sum Insured</th>
          </thead>
          <tbody>
            {gettingInsurances.map((provider) => (
              <tr key={provider.id} className="border-b border-gray-300">
                <td className="px-2 py-2">{provider.patient}</td>
                <td className="px-2 py-2">{provider.providerName}</td>
                <td className="px-2 py-1">{provider.policyNumber}</td>
                <td className="px-2 py-1">{provider.validFrom}</td>
                <td className="px-2 py-1">{provider.validTo}</td>
                <td className="px-2 py-1">
                  <div className="flex items-center">
                    <FaIndianRupeeSign />
                    <p>{provider.sumInsured}/-</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsuranceToPatient;
