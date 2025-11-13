import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { GrMoney, GrTest } from "react-icons/gr";
import { MdTimer } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { negative } from "zod";

function PatientDashboard() {
  const email = localStorage.getItem("email");
  const navigation = useNavigate();
  const hospitalName = localStorage.getItem('hospitalName');
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingAppointments, setgettingAppointments] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingAppointments() {
    const taskDetails = await getDocs(
      collection(database, "appointment_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredPatients = multipleArray.filter(
      (appoint) => appoint.patient === email
    );
    setgettingAppointments(filteredPatients);
  }

  useEffect(() => {
    renderingUser();
    renderingAppointments();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PatientNavbar />
      <div>
        <div>
        {gettingUser
          .filter((user) => user.email === email)
          .map((user) => (
            <div className="flex justify-between p-5 border border-gray-300  m-5 bg-white">
              <div>
                <p className="text-3xl text-[#003441] font-bold">
                  {hospitalName}
                </p>
                <p className="text-[#01B49C] text-lg font-semibold">
                  Welcome back, Patient
                </p>
              </div>

              <div>
                <p className="text-[#003441] text-xl text-end font-bold">{user.name}</p>
               <div className="flex items-center space-x-1">
                <p className="text-[#01B49C]">{user.email}</p> <span>|</span>
                 <p className="text-[#003441] font-bold">Patient Id -</p>
                <p className="text-[#01B49C] font-bold text-end">{user.patientId}</p>
               </div>
              </div>
            </div>
          ))}

          <div className="flex items-start m-5 gap-5">
            <div className="w-[600px] bg-white p-5 border border-gray-300 ">
              <div className="flex items-center space-x-1 text-[#01B49C] mb-3">
                <FaCalendarAlt />
                <p className="text-xl font-bold">Recent Appointments</p>
              </div>
              {gettingAppointments.map((appoint) => (
                <div className=" border flex items-start justify-between p-3 mb-5 border-gray-300">
                  <div>
                    {gettingUser
                      .filter((user) => user.email === appoint.doctor)
                      .map((user) => (
                        <p className="text-lg text-[#003441] font-semibold">
                          {user?.name}
                        </p>
                      ))}
                    <p className="text-[#01B49C]">{appoint.additionalNote}</p>
                  </div>

                  <div className="text-sm font-semibold">
                    <p className="border border-gray-300 py-0.5 px-4 -full">
                      {appoint.status}
                    </p>
                    <p className="border border-gray-300 py-0.5 px-4 -full">
                      {appoint.visitvisitStatus}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 overflow-auto scrollbar-thin scrollbar-thumb-[#01B49C] scrollbar-track-gray-200 h-[500px] w-[550px]  border border-gray-300">
              <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
                <RxCounterClockwiseClock size={20} />
                <p className="text-xl font-bold">Recent Activities</p>
              </div>

              <div className="border  border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#003441]">
                  Appointment Scheduled
                </p>
                <p className="text-[#01B49C] text-sm">
                  Appointment booked with Dr. R. Mehta (Cardiologist) for 28 Oct
                  2025 at 10:30 AM.
                </p>
              </div>

              <div className="border  my-3 border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#003441]">
                  Prescription Added
                </p>
                <p className="text-[#01B49C] text-sm">
                  New prescription uploaded by Dr. R. Mehta on 28 Oct 2025 for
                  Blood Pressure medication.
                </p>
              </div>

              <div className="border  border-gray-300 p-2.5">
                <p className="text-lg font-semibold text-[#003441]">
                  Insurance Claim Submitted
                </p>
                <p className="text-[#01B49C] text-sm">
                  Claim #C789 submitted for reimbursement on 30 Oct 2025.
                </p>
              </div>
            </div>

            <div className=" bg-white p-5  border border-gray-300 w-full">
              <div className="flex mb-2 text-[#01B49C] items-center space-x-2">
                <MdTimer size={20} />
                <p className="text-xl font-bold">Quick Actions</p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="border border-gray-300 p-3 ">
                  <div className="flex items-center space-x-1">
                    <FaCalendarAlt
                      size={25}
                      className="border  border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#003441]">
                      Request Appointment
                    </p>
                  </div>
                  <p className="text-[#01B49C]">Request your next visit.</p>
                  <button className="bg-[#003441] text-white py-1 px-3 text-sm ">
                    Request Appointment
                  </button>
                </div>

                <div className="border border-gray-300 p-3 ">
                  <div className="flex items-center space-x-1">
                    <GiMedicinePills
                      size={25}
                      className="border  border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#003441]">
                      View Prescriptions
                    </p>
                  </div>
                  <p className="text-[#01B49C]">See your doctor’s advice.</p>
                  <button 
                  onClick={()=>{
                    navigation('/PatientPrescription');
                  }}
                  className="bg-[#003441] text-white py-1 px-3 text-sm ">
                    View Prescriptions
                  </button>
                </div>

                <div className="border border-gray-300 p-3 ">
                  <div className="flex items-center space-x-1">
                    <GrTest
                      size={25}
                      className="border  border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#003441]">
                      Check Lab Reports
                    </p>
                  </div>
                  <p className="text-[#01B49C]">Access your medical tests.</p>
                  <button 
                  onClick={()=>{
                    navigation('/PatientLabReport');
                  }}
                  className="bg-[#003441] text-white py-1 px-3 text-sm ">
                    View Reports
                  </button>
                </div>

                <div className="border border-gray-300 p-3 ">
                  <div className="flex items-center space-x-1">
                    <GrMoney
                      size={25}
                      className="border  border-gray-300 p-1"
                    />
                    <p className="text-lg font-semibold text-[#003441]">
                      View Payment History
                    </p>
                  </div>
                  <p className="text-[#01B49C]">Track your past payments.</p>
                  <button 
                  onClick={()=>{
                    navigation('/PatientPaymentHistory');
                  }}
                  className="bg-[#003441] text-white py-1 px-3 text-sm ">
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
