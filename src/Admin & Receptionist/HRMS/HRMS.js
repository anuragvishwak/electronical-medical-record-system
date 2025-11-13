import React, { useState } from "react";
import AdvancedInvestoryManagement from "./AdvancedInvestoryManagement";
import ResourceUtilizationAnalysis from "./ResourceUtilizationAnalysis";
import FacilityInfrastructure from "./FacilityInfrastructure";
import UtilityAssetManagment from "./UtilityAssetManagment";
import { motion } from "framer-motion";

function HRMS({ setopeningHRMS }) {
  const [currentTab, setcurrentTab] = useState("advanced_inventory_management");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white h-screen my-7 w-10/12 p-4 rounded"
      >
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#003441] text-xl font-bold">
            Hospital Resource Management System (HRMS)
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningHRMS(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="font-semibold text-[#003441] flex items-center space-x-5">
          <button
            onClick={() => {
              setcurrentTab("advanced_inventory_management");
            }}
            className={`${
              currentTab === "advanced_inventory_management"
                ? "text-[#01B49C]"
                : ""
            }`}
          >
            Advanced Inventory Management
          </button>
          <button
            onClick={() => {
              setcurrentTab("facility_infrastructure");
            }}
            className={`${
              currentTab === "facility_infrastructure" ? "text-[#01B49C]" : ""
            }`}
          >
            Facility & Infrastructure
          </button>
          <button
            onClick={() => {
              setcurrentTab("utility_asset_management");
            }}
            className={`${
              currentTab === "utility_asset_management" ? "text-[#01B49C]" : ""
            }`}
          >
            Utility & Asset Management
          </button>
          <button
            onClick={() => {
              setcurrentTab("resource_utilization_analysis");
            }}
            className={`${
              currentTab === "resource_utilization_analysis"
                ? "text-[#01B49C]"
                : ""
            }`}
          >
            Resource Utilization Analysis
          </button>
        </div>

        <div>
          {currentTab === "advanced_inventory_management" ? (
            <AdvancedInvestoryManagement />
          ) : currentTab === "facility_infrastructure" ? (
            <FacilityInfrastructure />
          ) : currentTab === "utility_asset_management" ? (
            <UtilityAssetManagment />
          ) : (
            <ResourceUtilizationAnalysis />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HRMS;
