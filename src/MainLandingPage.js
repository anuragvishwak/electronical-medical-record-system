import React from "react";
import { BiBrain, BiSupport } from "react-icons/bi";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { TbWaveSawTool } from "react-icons/tb";
import { IoIosCloudDownload } from "react-icons/io";
import {
  FaBolt,
  FaCircleCheck,
  FaHospital,
  FaLock,
  FaMessage,
  FaRobot,
  FaUsers,
} from "react-icons/fa6";
import { RiTestTubeLine } from "react-icons/ri";
import { MdCheckCircleOutline } from "react-icons/md";
import Footer from "./Footer";
import { FaBars } from "react-icons/fa";
import MainNavbar from "./MainNavbar";
import { motion } from "framer-motion";
import { BsArrowUp, BsFillSendFill } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline, IoSparkles } from "react-icons/io5";

function MainLandingPage() {
  return (
    <div className="">
      <MainNavbar />

      <div className="pb-10 pt-20 sm:pt-40 sm:pb-20">
        <div className="text-center">
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-semibold text-lg sm:text-2xl"
          >
            Empowering Health with Innovation
          </motion.p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 0.8,
              type: "spring",
              stiffness: 120,
            }}
            className="font-bold text-5xl sm:text-8xl mt-7 sm:mt-12 mb-3 sm:mb-5 text-[#003441]"
          >
            <span className="text-[#01B49C]">ANU</span>med's -{" "}
            <span className="text-[#01B49C]">EMR</span>
          </motion.p>
          <div className="flex justify-center w-full">
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
              className="text-[#01B49C] w-auto px-5  sm:w-7/12 italic text-sm sm:text-lg"
            >
              Anumed's EMR system connects doctors, patients, and healthcare
              teams in one seamless platform. Streamline workflows, improve
              patient outcomes, and reduce administrative burden.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            className="flex items-center text-sm sm:text-base space-x-2 justify-center mt-2"
          >
            <button className="flex items-center font-semibold bg-[#01B49C] py-1 px-3 rounded text-white space-x-1">
              Get Started <GoArrowRight />
            </button>
            <button className="flex bg-[#003441] text-white font-semibold py-1 px-3 rounded items-center space-x-1">
              Watch Demo
              <GoArrowUpRight />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="my-5 sm:py-10">
        <div className="text-center">
          <p className="text-[#003441] text-3xl sm:text-5xl font-semibold">
            Everything you need
          </p>
          <p className="font-semibold text-sm sm:text-lg px-5 text-[#01B49C] italic mt-2">
            Comprehensive features designed for modern healthcare delivery
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 bg-gray-50 py-5 sm:py-10 px-5 sm:px-20 my-4 sm:my-8 gap-5">
          <div className="border bg-white border-gray-300 rounded-lg shadow p-4">
            <div className="flex items-center space-x-1">
              <TbWaveSawTool
                size={32}
                className="text-[#003441] border-2 border-[#003441] p-0.5 rounded"
              />
              <p className="text-[#003441] text-lg sm:text-2xl font-semibold">
                Real-time Records
              </p>
            </div>
            <p className="text-[#01B49C] text-sm sm:text-base mt-2">
              Instantly update and access patient data across all departments in
              real time.
            </p>
          </div>

          <div className="border bg-white border-gray-300 rounded-lg shadow p-4">
            <div className="flex items-center space-x-1">
              <FaUsers
                size={32}
                className="text-[#003441] border-2 border-[#003441] p-0.5 rounded"
              />
              <p className="text-[#003441] text-lg sm:text-2xl font-semibold">
                Team Collaboration
              </p>
            </div>
            <p className="text-[#01B49C] text-sm sm:text-base mt-2">
              Instant communication between doctors, staff, and departments for
              faster decision-making and updates.
            </p>
          </div>

          <div className="border bg-white border-gray-300 rounded-lg shadow p-4">
            <div className="flex items-center space-x-1">
              <FaHospital
                size={32}
                className="text-[#003441] border-2 border-[#003441] p-0.5 rounded"
              />
              <p className="text-[#003441] text-lg sm:text-2xl font-semibold">
                Multi-Role Dashboards
              </p>
            </div>
            <p className="text-[#01B49C] text-sm sm:text-base mt-2">
              Dedicated portals for Admins, Doctors, Nurses, Lab Technicians,
              and Insurance Teams for smooth coordination.
            </p>
          </div>

          <div className="border bg-white border-gray-300 rounded-lg shadow p-4">
            <div className="flex items-center space-x-1">
              <BiBrain
                size={32}
                className="text-[#003441] border-2 border-[#003441] p-0.5 rounded"
              />
              <p className="text-[#003441] text-lg sm:text-2xl font-semibold">
                Smart Patient Management
              </p>
            </div>
            <p className="text-[#01B49C] text-sm sm:text-base mt-2">
              Easily manage patient records, appointments, and consultations —
              all in one unified dashboard.
            </p>
          </div>

          <div className="border bg-white border-gray-300 rounded-lg shadow p-4">
            <div className="flex items-center space-x-1">
              <IoIosCloudDownload
                size={32}
                className="text-[#003441] border-2 border-[#003441] p-0.5 rounded"
              />
              <p className="text-[#003441] text-lg sm:text-2xl font-semibold">
                Offline Data Backup
              </p>
            </div>
            <p className="text-[#01B49C] text-sm sm:text-base mt-2">
              Download complete hospital data as Excel files for offline access
              and compliance — even after subscription expiry.
            </p>
          </div>

          <div className="border bg-white border-gray-300 rounded-lg shadow p-4">
            <div className="flex items-center space-x-1">
              <RiTestTubeLine
                size={32}
                className="text-[#003441] border-2 border-[#003441] p-0.5 rounded"
              />
              <p className="text-[#003441] text-lg sm:text-2xl font-semibold">
                Lab & Reports Management
              </p>
            </div>
            <p className="text-[#01B49C] text-sm sm:text-base mt-2">
              Manage test requests, upload lab results, and share diagnostic
              data directly with doctors and patients.
            </p>
          </div>
        </div>

        <div className="my-14 sm:my-40 sm:flex items-center justify-center gap-24 px-5 sm:px-20">
          <div>
            <div className="flex items-center text-[#01B49C] space-x-1">
              <FaRobot size={28} />
              <p className="text-xl font-bold">ANUMED</p>
            </div>

            <p className="font-bold mt-5 sm:mt-8 p-0 mb-0 text-[#003441] text-5xl sm:text-8xl">
              AnuMed AI
            </p>
            <p className="text-[#01B49C] mb-3 sm:mb-6 text-lg sm:text-2xl font-semibold">
              Your Smart EMR Assistant
            </p>
            <p className="text-gray-500 w-auto sm:w-[600px] sm:text-xl text-justify">
              Transform the way your healthcare staff works with a powerful AI
              assistant that deeply understands your EMR system—instantly
              answering questions, simplifying navigation, and guiding every
              workflow with clarity and precision.
            </p>

            <div className="grid sm:grid-cols-2 mt-6 gap-2">
              <div className="flex items-center sm:text-base text-sm text-[#01B49C] space-x-1">
                <FaCircleCheck />
                <p className="">
                  Helps staff understand any feature instantly.
                </p>
              </div>

              <div className="flex items-center text-[#01B49C] space-x-1">
                <FaCircleCheck />
                <p className="">Real-time process guidance.</p>
              </div>

              <div className="flex items-center text-[#01B49C] space-x-1">
                <FaCircleCheck />
                <p className="">Works anytime without waiting for support.</p>
              </div>

              <div className="flex items-center text-[#01B49C] space-x-1">
                <FaCircleCheck />
                <p className="">Explains step-by-step with structured text.</p>
              </div>

              <div className="flex items-center text-[#01B49C] space-x-1">
                <FaCircleCheck />
                <p className="">Perfect for new hospital staff.</p>
              </div>

              <div className="flex items-center text-[#01B49C] space-x-1">
                <FaCircleCheck />
                <p className="">
                  Recommends features staff doesn’t know about.
                </p>
              </div>
            </div>
          </div>

          <div className="shadow sm:shadow-xl mt-6 sm:mt-0 bg-white border border-gray-300 h-96 sm:h-[550px] w-auto sm:w-[400px] rounded-lg flex flex-col">
            <div className="flex bg-[#01B49C] border border-white/30 rounded-t p-4 items-start justify-between">
              <div>
                <p className="text-[#003441] text-xl font-bold">AnuMed AI</p>
                <p className="text-white text-sm">Your Smart EMR Assistant</p>
              </div>

              <button className="font-semibold text-red-500 hover:text-red-800">
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <div className="p-2 rounded-lg text-sm bg-[#003441] text-white self-end ml-20">
                How to create an appointment?
              </div>

              <div className="p-2 rounded-lg text-sm bg-gray-200 text-black mr-20">
                To create an appointment, go to the Appointment section and
                click the "Create Appointment" button.
              </div>

              <p className="text-gray-400 text-sm">Thinking...</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 m-3 border border-gray-300 p-3 bg-gray-100">
                <input
                  placeholder="Ask your Questions..."
                  className="text-sm w-full bg-gray-100 border-b border-gray-300"
                />
                <button>
                  <BsArrowUp
                    size={33}
                    className="bg-white rounded-full border border-gray-300 shadow p-2"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-28 bg-gradient-to-r from-[#e5f7fb] via-white to-[#e5f7fb] mb-16 py-16">
          <div>
            <p className="text-2xl sm:text-5xl font-bold">DEPARTMENTS WE SUPPORT</p>
            <p className="text-[#01B49C]  mt-5 mb-10 sm:text-lg font-semibold w-auto sm:w-8/12 italic">
              An EMR built for every department — Doctors, Nurses, Lab,
              Pharmacy, Billing, Insurance, Admin & Patients — all connected in
              one powerful system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white border p-5 rounded border-gray-300 hover:shadow-xl">
              <p className=" text-[#01B49C] text-xl font-semibold mb-2 italic">
                Doctor
              </p>
              <p className="text-[#003441]">
                Smart tools for consultations, medical records, prescriptions,
                and real-time patient tracking.
              </p>
            </div>
            <div className="bg-white border p-5 rounded border-gray-300 hover:shadow-xl">
              <p className=" text-[#01B49C] text-xl font-semibold mb-2 italic">
                Nurse
              </p>
              <p className="text-[#003441]">
                Manage vitals, daily progress, ward updates, and support care
                workflows seamlessly.
              </p>
            </div>

            <div className="bg-white border p-5 rounded border-gray-300 hover:shadow-xl">
              <p className=" text-[#01B49C] text-xl font-semibold mb-2 italic">
                Patient
              </p>
              <p className="text-[#003441]">
                A dedicated portal for appointments, reports, prescriptions,
                bills, and payments.
              </p>
            </div>

            <div className="bg-white border p-5 rounded border-gray-300 hover:shadow-xl">
              <p className=" text-[#01B49C] text-xl font-semibold mb-2 italic">
                Admin
              </p>
              <p className="text-[#003441]">
                Full control over users, approvals, appointments, staff,
                medicines, finances, and hospital operations.
              </p>
            </div>

            <div className="bg-white border p-5 rounded border-gray-300 hover:shadow-xl">
              <p className=" text-[#01B49C] text-xl font-semibold mb-2 italic">
                Insurance Department
              </p>
              <p className="text-[#003441]">
                Simplified insurance card management, approvals, claims, and
                communication with providers.
              </p>
            </div>

            <div className="bg-white border p-5 rounded border-gray-300 hover:shadow-xl">
              <p className=" text-[#01B49C] text-xl font-semibold mb-2 italic">
                Lab Technician
              </p>
              <p className="text-[#003441]">
                Create, update, and deliver lab test reports directly linked to
                patient records.
              </p>
            </div>
          </div>
        </div>

        <div className="my-20 sm:my-40 sm:flex items-center sm:gap-20 justify-center px-5 sm:px-20">
          <div>
            <p className="text-3xl sm:text-6xl text-[#003441] font-bold">
              Introducing EMR Chat
            </p>
            <p className="text-[#01B49C] sm:mt-3  mb-3 sm:mb-6 sm:text-2xl font-semibold">
              Seamless Communication for Your Entire Clinic
            </p>

            <p className="sm:text-xl text-gray-500  sm:w-[540px] text-justify">
              Seamlessly connect every department — doctors, nurses,
              receptionists, and patients — through our integrated, real-time
              messaging platform.
            </p>

            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <FaMessage
                  size={35}
                  className="bg-[#01B49C] text-[#003441] p-2 rounded-lg"
                />
                <div>
                  <p className="text-[#003441] font-bold sm:text-xl">
                    Real-time messaging across all roles
                  </p>
                  <p className="text-[#01B49C] text-sm sm:text-base">
                    Instant communication for your entire team.
                  </p>
                </div>
              </div>

              <div className="flex my-3 items-center space-x-2">
                <FaUsers
                  size={35}
                  className="bg-[#01B49C] text-[#003441] p-2 rounded-lg"
                />
                <div>
                  <p className="text-[#003441] font-bold sm:text-xl">
                    Fast patient communication
                  </p>
                  <p className="text-[#01B49C] text-sm sm:text-base">
                    Connect with patients directly and securely.
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-3 space-x-2">
                <FaLock
                  size={35}
                  className="bg-[#01B49C] text-[#003441] p-2 rounded-lg"
                />
                <div>
                  <p className="text-[#003441] font-bold sm:text-xl">
                    Secure, in-clinic chat
                  </p>
                  <p className="text-[#01B49C] text-sm sm:text-base">
                    HIPAA-compliant messaging infrastructure.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaBolt
                  size={35}
                  className="bg-[#01B49C] text-[#003441] p-2 rounded-lg"
                />
                <div>
                  <p className="text-[#003441] font-bold sm:text-xl">
                    Integrated directly inside the EMR
                  </p>
                  <p className="text-[#01B49C] text-sm sm:text-base">
                    No switching between apps or systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

            <div className="w-full p-5 border border-gray-300 sm:shadow-xl sm:max-w-4xl mx-auto mt-10">
              <div className="flex items-start mb-3 justify-between">
                <div>
                  <div className="flex items-center space-x-1">
                    <IoChatbubbleEllipsesOutline
                      className="text-[#003441]"
                      size={20}
                    />
                    <p className="sm:text-xl font-bold text-[#003441]">
                      Message Center
                    </p>
                  </div>
                  <p className="text-[#01B49C] text-sm font-semibold">
                    EMR Chat: Everyone's Connected
                  </p>
                </div>

                <button className="text-red-500 text-sm sm:text-base font-semibold cursor-default">
                  Close
                </button>
              </div>

              <div className="bg-gray-100 shadow-inner border flex w-full border-gray-300 h-[530px]">
                <div className="bg-white border-r hidden sm:block w-60 border-gray-300 p-3">
                  <p className="text-[#01B49C] text-lg font-bold">Your Chats</p>

                  <div>
                    <div className="border-b py-2 border-gray-300">
                      <p className="text-[#003441] font-semibold">
                        Dr. John Smith
                      </p>
                      <p className="text-sm text-[#01B49C]">
                        doctor@hospital.com
                      </p>
                    </div>

                    <div className="border-b py-2 border-gray-300">
                      <p className="text-[#003441] font-semibold">
                        Nurse Amelia
                      </p>
                      <p className="text-sm text-[#01B49C]">
                        nurse@hospital.com
                      </p>
                    </div>

                    <div className="border-b py-2 border-gray-300">
                      <p className="text-[#003441] font-semibold">
                        Reception Desk
                      </p>
                      <p className="text-sm text-[#01B49C]">
                        reception@hospital.com
                      </p>
                    </div>

                    <div className="border-b py-2 border-gray-300">
                      <p className="text-[#003441] font-semibold">
                        Insurance Desk
                      </p>
                      <p className="text-sm text-[#01B49C]">
                        insurance@hospital.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="  `flex-1 flex flex-col">
                  <div className="p-3 border-b w-[292px] sm:w-auto bg-[#003441] border-gray-300">
                    <p className="text-lg font-semibold text-white">
                      Dr. John Smith
                    </p>
                    <div className="text-sm flex items-center text-[#01B49C]">
                      <p>doctor@hospital.com</p>
                      <span className="text-white mx-1">|</span>
                      <p className="capitalize">Doctor</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3">
                    <div className="w-60 sm:w-full flex justify-start my-2">
                      <div className="px-3 py-2 text-sm rounded-xl border border-gray-300 shadow bg-white text-black rounded-bl-none w-80">
                        Hello Doctor, please check the patient's latest vitals.
                      </div>
                    </div>

                    <div className="w-60 sm:ml-0 ml-6 sm:w-full flex justify-end my-2">
                      <div className="px-3 py-2 text-sm rounded-xl border border-gray-300 shadow bg-[#01B49C] text-white rounded-br-none w-80">
                        Sure. I will check and update shortly.
                      </div>
                    </div>

                    <div className="w-28 sm:w-full flex justify-start  my-2">
                      <div className="px-3 py-2 text-sm rounded-xl border border-gray-300 shadow bg-white text-black rounded-bl-none w-80">
                        Thank you!
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto p-3 border-t bg-white border-gray-300">
                    <div className="flex items-center space-x-2">
                      <input
                        className="border-b text-[#003441] border-gray-300 w-full p-2"
                        placeholder="Type a message..."
                        disabled
                      />
                      <button className="bg-[#01B49C] text-white px-4 py-2 opacity-60 cursor-default">
                        <BsFillSendFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="bg-[#01B49C] p-10 sm:p-14">
          <div className="text-3xl sm:text-5xl font-bold text-[#003441]">
            <p>Why Choose</p>
            <p className="mt-2">ANUmed's EMR?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 sm:mt-12 gap-7">
            <div className="flex items-center text-white space-x-2">
              <MdCheckCircleOutline size={30} />
              <div className="">
                <p className="sm:text-xl font-semibold">
                  Save Time, Focus on Patients
                </p>
                <p className="text-sm sm:text-base">
                  Cut down administrative work and manage everything from one
                  smart dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-center  text-white space-x-2">
              <MdCheckCircleOutline size={30} />
              <div className="">
                <p className="sm:text-xl font-semibold">Easy for Everyone</p>
                <p className="text-sm sm:text-base">
                  Designed for doctors, staff, and patients — no technical
                  training needed.
                </p>
              </div>
            </div>

            <div className="flex items-center text-white space-x-2">
              <MdCheckCircleOutline size={30} />
              <div className="">
                <p className="sm:text-xl font-semibold">Accurate & Reliable</p>
                <p className="text-sm sm:text-base">
                  Real-time updates across departments reduce errors and improve
                  coordination.
                </p>
              </div>
            </div>

            <div className="flex items-center text-white space-x-2">
              <MdCheckCircleOutline size={30} />
              <div className="">
                <p className="sm:text-xl font-semibold">
                  Offline Access, Always Ready
                </p>
                <p className="text-sm sm:text-base">
                  Download and store hospital data as Excel files for instant
                  offline access — even without internet or active subscription.
                </p>
              </div>
            </div>

            <div className="flex items-center text-white space-x-2">
              <MdCheckCircleOutline size={30} />
              <div className="">
                <p className="sm:text-xl font-semibold">
                  Grows with Your Clinic
                </p>
                <p className="text-sm sm:text-base">
                  From a single-doctor setup to multi-specialty hospitals —
                  ANUMED adapts to your scale.
                </p>
              </div>
            </div>

            <div className="flex items-center text-white space-x-2">
              <MdCheckCircleOutline size={30} />
              <div className="">
                <p className="sm:text-xl font-semibold">Always Here for You</p>
                <p className="text-sm sm:text-base">
                  Our support team is available 24/7 to help you with setup,
                  updates, or any query.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20">
          <p className="text-2xl sm:text-4xl text-[#003441] text-center font-semibold">
            Transform Your Healthcare Practice Today.
          </p>
          <div className="flex justify-center">
            <p className="text-[#01B49C] mt-4 text-sm text-center px-5 sm:text-lg">
              Join thousands of healthcare providers already using Anumed's to
              deliver better patient care
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm sm:text-base justify-center mt-2">
            <button className="flex items-center bg-[#01B49C] py-1 font-semibold px-3 rounded text-white space-x-1">
              Start Free Trial <GoArrowRight />
            </button>
            <button className="flex bg-[#003441] text-white font-semibold py-1 px-3 rounded items-center space-x-1">
              Schedule a Demo
              <GoArrowUpRight />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLandingPage;
