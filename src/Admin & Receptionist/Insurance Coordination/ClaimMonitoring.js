import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { database } from '../../FirebaseConfiguration';
import { FaIndianRupeeSign } from 'react-icons/fa6';

function ClaimMonitoring() {
  const hospitalName = localStorage.getItem('hospitalName');
  const [gettingClaimStatus, setgettingClaimStatus] = useState([]);

  async function renderingClaimStatus() {
    const taskDetails = await getDocs(
      collection(database, "claim_status_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingClaimStatus(multipleArray);
  }

  useEffect(() => {
    renderingClaimStatus();
  }, []);

  return (
    <div>
      <div className="bg-white p-3 border border-gray-300 m-5">
        <table className="table-auto w-full">
          <thead className="bg-gray-100 text-[#003441]">
            <th className="text-start px-3 py-2">Claim ID</th>
            <th className="text-start px-3 py-2">Patient Name</th>
            <th className="text-start px-3 py-2">Provider Name</th>
            <th className="text-start px-3 py-2">Claim Amount Filed</th>
            <th className="text-start px-3 py-2">Claim Type</th>
            <th className="text-start px-3 py-2">Processed Date</th>


          </thead>
          <tbody>
            {gettingClaimStatus.filter(provider => provider.hospitalName === hospitalName).map((provider) => (
              <tr key={provider.id} className="border-b border-gray-300">
                <td className="px-2 py-2">{provider.id}</td>
                <td className="px-2 py-2">{provider.patient}</td>
                <td className="px-2 py-2">{provider.providerName}</td>
                <td className="px-2 py-1">{provider.claimAmountFiled}</td>
                <td className="px-2 py-1">{provider.claimType}</td>
                <td className="px-2 py-1">{provider.dateOfClaimSubmission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClaimMonitoring