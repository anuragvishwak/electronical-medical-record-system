import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import CreateMedicineForm from "./CreateMedicineForm";
import RenderingMedicines from "./RenderingMedicines";
import { FaBars } from "react-icons/fa6";

function MedicinesTreatment() {
  const [openingMedicineForm, setopeningMedicineForm] = useState();
  const [search, setsearch] = useState("");
  const [openingAdminNavbar, setopeningAdminNavbar] = useState(false);
 

  return (
    <div className="bg-gray-100 h-screen">
      <AdminNavbar
        setopeningAdminNavbar={setopeningAdminNavbar}
        openingAdminNavbar={openingAdminNavbar}
      />
      <div className="mx-3 mt-3 sm:flex items-end justify-between bg-white p-3 border border-gray-300 shadow rounded">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-[#212a31]">Medicines</p>
            <button
              onClick={() => {
                setopeningAdminNavbar(true);
              }}
              className="border-2 border-[#212a31] text-[#212a31] p-1 rounded sm:hidden"
            >
              <FaBars />
            </button>
          </div>
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
        <RenderingMedicines search={search} />
      </div>

      {openingMedicineForm && (
        <CreateMedicineForm setopeningMedicineForm={setopeningMedicineForm} />
      )}
    </div>
  );
}

export default MedicinesTreatment;
