import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import CreateMedicineForm from "./CreateMedicineForm";
import RenderingMedicines from "./RenderingMedicines";

function MedicinesTreatment() {
  const [openingMedicineForm, setopeningMedicineForm] = useState();

  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar />
      <div className="mx-3 mt-3 flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <p className="text-2xl font-bold ">Medicines</p>
          <p className="text-gray-600">
            Manage medicines across the healthcare system.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            placeholder="Search Medicines..."
            className="border border-gray-400 w-60 p-1 rounded"
          ></input>
          <button>
            <FaSearch
              size={33}
              className="border border-[#1976D2] p-1.5 rounded text-[#1976D2]"
            />
          </button>

            <button
              onClick={() => {
                setopeningMedicineForm(true);
              }}
              className="bg-[#1976D2] py-1.5 px-3 rounded shadow text-white"
            >
              + Create Medicine
            </button>
         
        </div>
      </div>
      <div>
          <RenderingMedicines />
      </div>

      {openingMedicineForm && (
        <CreateMedicineForm setopeningMedicineForm={setopeningMedicineForm} />
      )}

    </div>
  );
}

export default MedicinesTreatment;
