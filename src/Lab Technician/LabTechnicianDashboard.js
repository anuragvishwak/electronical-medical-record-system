import React, { useEffect, useState } from "react";
import LabTechnicianNavbar from "./LabTechnicianNavbar";
import { RiProgress6Line, RiTestTubeLine } from "react-icons/ri";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { CgDanger } from "react-icons/cg";
import { FaCalendarAlt, FaRegCheckCircle } from "react-icons/fa";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { PiEyedropperSampleBold } from "react-icons/pi";
import { MdTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function LabTechnicianDashboard() {
  const navigation = useNavigate();
  const email = localStorage.getItem("email");
  const hospitalName = localStorage.getItem("hospitalName");
  const [gettingLabOrders, setgettingLabOrders] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);

  async function renderingUsers() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingLabOrders() {
    const taskDetails = await getDocs(
      collection(database, "lab_order_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingLabOrders(multipleArray);
  }

  useEffect(() => {
    renderingLabOrders();
    renderingUsers();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <LabTechnicianNavbar />
      {gettingUser
        .filter((user) => user.email === email)
        .map((user) => (
          <div className="flex justify-between p-5 border border-gray-300  m-5 bg-white">
            <div>
              <p className="text-3xl text-[#003441] font-bold">
                {hospitalName}
              </p>
              <p className="text-[#01B49C] text-lg font-semibold">
                Welcome back, Lab Technician
              </p>
            </div>

            <div>
              <p className="text-[#003441] text-xl text-end font-bold">
                {user.name}
              </p>
              <div className="flex items-center space-x-1">
                <p className="text-[#01B49C] text-end">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      <div>
        <div className="grid grid-cols-4 gap-5 m-5">
          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <RiTestTubeLine
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 "
              />
              <div>
                <p className="text-[#01B49C] font-semibold">
                  Total Test Requested
                </p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {gettingLabOrders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <FaRegCheckCircle
                size={45}
                className="text-green-500 bg-green-200 p-1.5 "
              />
              <div>
                <p className="text-green-500 font-semibold">
                  Total Tests Completed
                </p>
                <p className="text-center text-3xl font-bold text-green-500">
                  {
                    gettingLabOrders.filter(
                      (lab) => lab.orderStatus === "pending"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <RiProgress6Line
                size={45}
                className="text-[#01B49C] bg-gray-200 p-1.5 "
              />
              <div>
                <p className="text-[#01B49C] font-semibold">
                  Total Tests in Progress
                </p>
                <p className="text-center text-3xl font-bold text-[#003441]">
                  {
                    gettingLabOrders.filter(
                      (lab) => lab.orderStatus === "pending"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6  border border-gray-300">
            <div className="flex items-center justify-center space-x-5">
              <CgDanger size={45} className="text-red-500 bg-red-200 p-1.5 " />
              <div>
                <p className="text-red-500 font-semibold">
                  Total Tests Pending
                </p>
                <p className="text-center text-3xl font-bold text-red-500">
                  {
                    gettingLabOrders.filter(
                      (lab) => lab.orderStatus === "pending"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-5 mx-5">
          <div className="bg-white p-5 overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px] w-[550px]  border border-gray-300">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <RxCounterClockwiseClock size={20} />
              <p className="text-xl font-bold">Recent Activities</p>
            </div>

            <div className="border  border-gray-300 p-2.5">
              <p className="text-[#01B49C] text-sm">
                Blood test result uploaded for Patient #P102.
              </p>
            </div>

            <div className="border  my-3 border-gray-300 p-2.5">
              <p className="text-[#01B49C] text-sm">
                Urine sample received from Patient #P111.
              </p>
            </div>

            <div className="border  border-gray-300 p-2.5">
              <p className="text-[#01B49C] text-sm">
                X-Ray request assigned to Patient #P109.
              </p>
            </div>
          </div>

          <div className="bg-white p-5  border border-gray-300 w-full">
            <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
              <MdTimer size={20} />
              <p className="text-xl font-bold">Quick Actions</p>
            </div>
            <div className="grid grid-cols-2  gap-5">
              <div className="border p-3  border-gray-300">
                <div className="flex items-center space-x-1">
                  <PiEyedropperSampleBold
                    size={25}
                    className="text-[#003441] border p-1  border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    View Lab Orders
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">Views orders quickly.</p>
                <button
                  onClick={() => {
                    navigation("/AssignedLabOrders");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3  bg-[#003441]"
                >
                  View Orders
                </button>
              </div>
              <div className="border p-3  border-gray-300">
                <div className="flex items-center space-x-1">
                  <RiTestTubeLine
                    size={25}
                    className="text-[#003441] border p-1  border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    Add Test Result
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  Upload test report for patient.
                </p>
                <button
                  onClick={() => {
                    navigation("/UploadTestResults");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3  bg-[#003441]"
                >
                  Add Results
                </button>
              </div>

              <div className="border p-3  border-gray-300">
                <div className="flex items-center space-x-1">
                  <PiEyedropperSampleBold
                    size={25}
                    className="text-[#003441] border p-1  border-gray-300"
                  />
                  <p className="text-[#003441] text-lg font-semibold">
                    Sample Received
                  </p>
                </div>
                <p className="text-[#01B49C] text-sm">
                  Mark patient sample collected.
                </p>
                <button
                  onClick={() => {
                    navigation("/UploadTestResults");
                  }}
                  className="py-1 mt-3 text-white text-sm px-3  bg-[#003441]"
                >
                  Mark Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabTechnicianDashboard;
