import React, { useState } from "react";
import BedRoomManagement from "./Facility ad Infrastructure/BedRoomManagement";
import OperationTheatreSchedulling from "./Facility ad Infrastructure/OperationTheatreSchedulling";
import HousekeepingMaintainenace from "./Facility ad Infrastructure/HousekeepingMaintainenace";
import ResourceAllocation from "./Facility ad Infrastructure/ResourceAllocation";
import AnalyticsReport from "./Facility ad Infrastructure/AnalyticsReport";

function FacilityInfrastructure() {
  const [currentTab, setcurrentTab] = useState("bed_room_management");

  return (
    <div className="flex w-full text-start space justify-center">
      <div className="w-[300px] text-sm mt-4 border p-3 bg-[#1976D2] text-white h-[550px] rounded">
        <button
          onClick={() => {
            setcurrentTab("bed_room_management");
          }}
          className={`mt-4 px-2 py-1 rounded  ${
            currentTab === "bed_room_management"
              ? "bg-white w-full shadow text-[#1976D2]"
              : ""
          }`}
        >
          Room & Bed Management
        </button>
        <button
          onClick={() => {
            setcurrentTab("operation_theatre_scheduling");
          }}
          className={`my-4 px-2 py-1 rounded ${
            currentTab === "operation_theatre_scheduling"
              ? "bg-white w-full shadow text-[#1976D2]"
              : ""
          }`}
        >
          Operation Theatre Scheduling
        </button>
        <button
          onClick={() => {
            setcurrentTab("housekeeping_maintenance");
          }}
          className={`px-2 py-1 rounded ${
            currentTab === "housekeeping_maintenance"
              ? "bg-white w-full shadow text-[#1976D2]"
              : ""
          }`}
        >
          Housekeeping & Maintenance
        </button>
        <button
          onClick={() => {
            setcurrentTab("resource_allocation");
          }}
          className={`my-4 px-2 py-1 rounded ${
            currentTab === "resource_allocation"
              ? "bg-white w-full shadow text-[#1976D2]"
              : ""
          }`}
        >
          Resource Allocation
        </button>
        <button
          onClick={() => {
            setcurrentTab("analytics_report");
          }}
          className={`px-2 py-1 rounded ${
            currentTab === "analytics_report"
              ? "bg-white w-full shadow text-[#1976D2]"
              : ""
          }`}
        >
          Analytics & Report
        </button>
      </div>
      <div className="w-full">
        <div>
          {currentTab === "bed_room_management" ? (
            <BedRoomManagement />
          ) : currentTab === "operation_theatre_scheduling" ? (
            <OperationTheatreSchedulling />
          ) : currentTab === "housekeeping_maintenance" ? (
            <HousekeepingMaintainenace />
          ) : currentTab === "resource_allocation" ? (
            <ResourceAllocation />
          ) : (
            <AnalyticsReport />
          )}
        </div>
      </div>
    </div>
  );
}

export default FacilityInfrastructure;
