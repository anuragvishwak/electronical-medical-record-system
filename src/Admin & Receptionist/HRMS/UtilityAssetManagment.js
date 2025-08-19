import React, { useState } from "react";
import UtilityManagementForm from "./Utility and Asset Management/UtilityManagementForm";
import AssetManagement from "./Utility and Asset Management/AssetManagement";

function UtilityAssetManagment() {
  const [currentTab, setcurrentTab] = useState("utility");

  return (
    <div>
      <div className="bg-gray-100 border flex items-center justify-between w-36 rounded  border-gray-400 shadow-inner p-1">
        <button
          onClick={() => {
            setcurrentTab("utility");
          }}
          className={`px-2 ${currentTab === "utility" ? "bg-white shadow border text-[#1976D2] border-gray-400 rounded" : ""}`}
        >
          Utility
        </button>
        <button
          onClick={() => {
            setcurrentTab("asset");
          }}

          className={`px-2 ${currentTab === "asset" ? "bg-white shadow border text-[#1976D2] border-gray-400  rounded" : ""}`}
        >
          Asset
        </button>
      </div>

      <div>
        {currentTab === "utility" ? 
        <UtilityManagementForm />
      : <AssetManagement />
      }
      </div>
    </div>
  );
}

export default UtilityAssetManagment;
