import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import CreateMedicineForm from "./CreateMedicineForm";
import RenderingMedicines from "./RenderingMedicines";

function MedicinesTreatment() {
  const [openingMedicineForm, setopeningMedicineForm] = useState();
  const [search, setsearch] = useState("");

  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold text-[#212a31]">Medicines</p>
          <p className="text-[#196d8e]">
            Manage medicines across the healthcare system.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            placeholder="Search Medicines..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>

          <button
            onClick={() => {
              setopeningMedicineForm(true);
            }}
            className="bg-[#196d8e] py-1.5 px-3 rounded shadow text-white"
          >
            + Create Medicine
          </button>
        </div>
      </div>
      <div>
        <RenderingMedicines search = {search} />
      </div>

      {openingMedicineForm && (
        <CreateMedicineForm setopeningMedicineForm={setopeningMedicineForm} />
      )}
    </div>
  );
}

export default MedicinesTreatment;
