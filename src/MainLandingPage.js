import React from "react";
import { BiBrain, BiSupport } from "react-icons/bi";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { TbWaveSawTool } from "react-icons/tb";
import { IoIosCloudDownload } from "react-icons/io";
import { FaHospital, FaUsers } from "react-icons/fa6";
import { RiTestTubeLine } from "react-icons/ri";
import { MdCheckCircleOutline } from "react-icons/md";
import Footer from "./Footer";
import { FaBars } from "react-icons/fa";
import MainNavbar from "./MainNavbar";
import { useNavigate, useNavigationType } from "react-router-dom";

function MainLandingPage() {
  return (
    <div className="">
      <MainNavbar />

      <div className="py-10 sm:py-20">
        <div className="text-center">
          <p className="font-semibold text-lg sm:text-2xl">
            Empowering Health with Innovation
          </p>
          <p className="font-bold text-5xl sm:text-8xl mt-7 sm:mt-12 mb-3 sm:mb-5 text-[#003441]">
            <span className="text-[#01B49C]">ANU</span>med's -{" "}
            <span className="text-[#01B49C]">EMR</span>
          </p>
          <div className="flex justify-center w-full">
            <p className="text-[#01B49C] w-auto px-5  sm:w-7/12 italic text-sm sm:text-lg">
              Anumed's EMR system connects doctors, patients, and healthcare
              teams in one seamless platform. Streamline workflows, improve
              patient outcomes, and reduce administrative burden.
            </p>
          </div>

          <div className="flex items-center text-sm sm:text-base space-x-2 justify-center mt-2">
            <button className="flex items-center font-semibold bg-[#01B49C] py-1 px-3 rounded text-white space-x-1">
              Get Started <GoArrowRight />
            </button>
            <button className="flex bg-[#003441] text-white font-semibold py-1 px-3 rounded items-center space-x-1">
              Watch Demo
              <GoArrowUpRight />
            </button>
          </div>
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
                <p className="sm:text-xl font-semibold">Grows with Your Clinic</p>
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
            <p className="text-2xl sm:text-4xl text-[#003441] text-center font-semibold">Transform Your Healthcare Practice Today.</p>
            <div className="flex justify-center">
                <p className="text-[#01B49C] mt-4 text-sm text-center px-5 sm:text-lg">Join thousands of healthcare providers already using Anumed's to deliver better patient care</p>
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
