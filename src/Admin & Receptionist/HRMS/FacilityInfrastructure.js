import React, { useState } from "react";
import BedRoomManagement from "./Facility ad Infrastructure/BedRoomManagement";
import OperationTheatreSchedulling from "./Facility ad Infrastructure/OperationTheatreSchedulling";
import HousekeepingMaintainenace from "./Facility ad Infrastructure/HousekeepingMaintainenace";
import AnalyticsReport from "./Facility ad Infrastructure/AnalyticsReport";

function FacilityInfrastructure() {
  const [currentTab, setcurrentTab] = useState("bed_room_management");

  return (
    <div className="">
      <div className="mt-4 border shadow-inner px-4 py-1.5 bg-gray-200 flex items-center text-[#003441] space-x-2 rounded-full">
        <button
          onClick={() => {
            setcurrentTab("bed_room_management");
          }}
          className={`${
            currentTab === "bed_room_management"
              ? "bg-white py-1 px-3 rounded-full shadow text-[#01B49C]"
              : ""
          }`}
        >
          Room & Bed Management
        </button>
        <button
          onClick={() => {
            setcurrentTab("operation_theatre_scheduling");
          }}
          className={`${
            currentTab === "operation_theatre_scheduling"
              ? "bg-white py-1 px-3 rounded-full shadow text-[#01B49C]"
              : ""
          }`}
        >
          Operation Theatre Scheduling
        </button>
        <button
          onClick={() => {
            setcurrentTab("housekeeping_maintenance");
          }}
          className={`${
            currentTab === "housekeeping_maintenance"
              ? "bg-white py-1 px-3 rounded-full shadow text-[#01B49C]"
              : ""
          }`}
        >
          Housekeeping & Maintenance
        </button>
        <button
          onClick={() => {
            setcurrentTab("analytics_report");
          }}
          className={`${
            currentTab === "analytics_report"
              ? "bg-white py-1 px-3 rounded-full shadow text-[#01B49C]"
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
          ) : (
            <AnalyticsReport />
          )}
        </div>
      </div>
    </div>
  );
}

export default FacilityInfrastructure;
