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
      <div className="m-5 bg-white p-5 border border-gray-300 shadow rounded">
        <div>
          <div className="flex items-center justify">
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

        <hr className="border-gray-300 my-4" />

        <div className="flex items-center justify-between space-x-2">
          <input
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            placeholder="Search Medicines..."
            className="border border-gray-400 w-96 p-1 rounded"
          ></input>

          <div className="flex items-center space-x-3">
            <select className="border border-gray-400 w-60 p-1.5 rounded">
            <option>Filter by Form</option>
            <option>capsule</option>
            <option>tablet</option>
            <option>drops</option>
            <option>syrup</option>
            <option>injection</option>
            <option>ointment</option>
          </select>
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
