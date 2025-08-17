import React, { useState } from "react";
import AdvancedInvestoryManagement from "./AdvancedInvestoryManagement";
import ResourceUtilizationAnalysis from "./ResourceUtilizationAnalysis";
import FacilityInfrastructure from "./FacilityInfrastructure";
import UtilityAssetManagment from "./UtilityAssetManagment";

function HRMS({ setopeningHRMS }) {
  const [currentTab, setcurrentTab] = useState("advanced_inventory_management");

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen my-10 w-10/12 p-4 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">
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

        <div className="font-semibold flex items-center space-x-5">
          <button
            onClick={() => {
              setcurrentTab("advanced_inventory_management");
            }}
            className={`${
              currentTab === "advanced_inventory_management"
                ? "text-[#1976D2]"
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
              currentTab === "facility_infrastructure" ? "text-[#1976D2]" : ""
            }`}
          >
            Facility & Infrastructure
          </button>
          <button
            onClick={() => {
              setcurrentTab("utility_asset_management");
            }}
            className={`${
              currentTab === "utility_asset_management" ? "text-[#1976D2]" : ""
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
                ? "text-[#1976D2]"
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
      </div>
    </div>
  );
}

export default HRMS;
