import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { IoShieldCheckmark } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaCalendar, FaHandshake, FaIndianRupeeSign } from "react-icons/fa6";
import { HiClipboardList } from "react-icons/hi";
import { GiMedicinePills, GiMedicines } from "react-icons/gi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaCalendarAlt } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function InsuranceDeptDashboard() {
  const navigation = useNavigate();
  const email = localStorage.getItem("email");
  const hospitalName = localStorage.getItem("hospitalName");
  const [gettingInsuranceCompanies, setgettingInsuranceCompanies] = useState(
    []
  );
  const [gettingInsurances, setgettingInsurances] = useState([]);
  const [gettingClaimStatus, setgettingClaimStatus] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);

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

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
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
    renderingInsuranceCompany();
    renderingInsurances();
    renderingClaimStatus();
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <InsuranceStaffNavbar />
      {gettingUser
        .filter((user) => user.email === email)
        .map((user) => (
          <div className="flex justify-between p-5 border border-gray-300  m-5 bg-white">
            <div>
              <p className="text-3xl text-[#003441] font-bold">
                {hospitalName}
              </p>
              <p className="text-[#01B49C] text-lg font-semibold">
                Welcome back, Insurance Dept
              </p>
            </div>

            <div>
              <p className="text-[#003441] text-xl text-end font-bold">
                {user.name}
              </p>
                <p className="text-[#01B49C] text-end">{user.email}</p>
            </div>
          </div>
        ))}
      <div>
        <div className="grid grid-cols-3 gap-5 mt-5 mx-5">
          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <IoShieldCheckmark
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#01B49C] font-semibold">
                  Total Insurance Provider
                </p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {gettingInsuranceCompanies.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaHandshake
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#01B49C] font-semibold">
                  Total Insurance Assigned
                </p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {gettingInsurances.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <HiClipboardList
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 rounded"
              />
              <div>
                <p className="text-[#01B49C] font-semibold">Total Claims</p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {gettingClaimStatus.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start p-5 gap-5">
          <div className="bg-white p-5 overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px] w-[550px] rounded border border-gray-300">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <RxCounterClockwiseClock size={20} />
              <p className="text-xl font-bold">Recent Activities</p>
            </div>

            <div className="border rounded border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                Claim Submitted
              </p>
              <p className="text-[#01B49C] text-sm">
                atient: Arjun Mehta submitted claim for ₹18,500 (Policy
                #INS-4099).
              </p>
            </div>

            <div className="border rounded my-3 border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                Policy Assigned to Patient.
              </p>
              <p className="text-[#01B49C] text-sm">
                Policy #INS-2034 linked to Patient: Ramesh Kumar.
              </p>
            </div>

            <div className="border rounded border-gray-300 p-2.5">
              <p className="text-lg font-semibold text-[#003441]">
                New Insurance Provider Added.
              </p>
              <p className="text-[#01B49C] text-sm">
                HDFC Ergo Health Insurance” was added to provider list.
              </p>
            </div>
          </div>

          <div className="border bg-white overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px] w-full border-gray-300 p-5 rounded">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <MdTimer size={20} />
              <p className="text-xl font-bold">Quick Actions</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <IoShieldCheckmark
                    size={25}
                    className="text-[#003441] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Insurance Provider
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  View a provider instantly.
                </p>
                <button
                  onClick={() => {
                    navigation("/InsuranceProvider");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#003441]"
                >
                  View Insurance Provider
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <FaHandshake
                    size={25}
                    className="text-[#003441] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Assigned Patients
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  View Linked insurances to patient.
                </p>
                <button
                  onClick={() => {
                    navigation("/ViewInsuranceInfo");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#003441]"
                >
                  View Assigned Insurances
                </button>
              </div>

              <div className="border p-3 rounded border-gray-300">
                <div className="flex items-center space-x-1">
                  <HiClipboardList
                    size={25}
                    className="text-[#003441] border p-1 rounded border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Claim Status
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  View Claim Status details quickly.
                </p>
                <button
                  onClick={() => {
                    navigation("/InsuranceStaffClaimStatus");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3 rounded bg-[#003441]"
                >
                  View Claim Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceDeptDashboard;
