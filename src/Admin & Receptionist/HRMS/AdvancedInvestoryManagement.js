import React from "react";
import AddItems from "./AddItems";

function AdvancedInvestoryManagement() {
  return (
    <div>
      <div className="flex items-center space-x-2 my-3 justify-end">
        <input
          placeholder="Search Items...."
          className="p-0.5 border border-gray-400 rounded"
        ></input>
        <button className="bg-[#1976D2] border hover:text-white hover:bg-[#1976D2] border-[#1976D2] text-sm text-white py-1 px-4 rounded">
          + Add Item
        </button>
      </div>
      <AddItems />
    </div>
  );
}

export default AdvancedInvestoryManagement;
