import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { z } from "zod";
import { database } from "../FirebaseConfiguration";

function UpdateStaffForm({
  setopeningStaffUpdateForm,
  capturingStaffData,
  renderingUser,
}) {
  const [phone_no, setphone_no] = useState(capturingStaffData.phone_no || "");
  const [designation, setdesignation] = useState(
    capturingStaffData.designation || ""
  );
  const [errors, setErrors] = useState({});
  const staffSchema = z.object({
    phone_no: z.string().min(1, "Phone no is neccessary."),
    designation: z.string().min(1, "Designation is compulsory."),
  });

  async function updateStaff() {
    const staffData = {
      phone_no: phone_no,
      designation: designation,
    };
    try {
      staffSchema.parse(staffData);
      const appointmentRef = doc(
        database,
        "user_database",
        capturingStaffData.id
      );
      await updateDoc(appointmentRef, staffData);

      setopeningStaffUpdateForm(false);
      renderingUser();
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error updating appointment:", error.message);
      }
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="p-5 rounded bg-white">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Update Staff</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningStaffUpdateForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="font-semibold text-[#01B49C]">Name</p>
            <p className="w-full border border-gray-300 rounded-md p-2">
              {capturingStaffData.name}
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#01B49C]">Email</p>
            <p className="w-full border border-gray-300 rounded-md p-2">
              {capturingStaffData.email}
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#01B49C]">Phone Number</p>
            <input
              value={phone_no}
              onChange={(e) => {
                setphone_no(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="+91 78345387"
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-sm">{errors.phoneNo}</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-[#01B49C]">Role</p>
            <p className="w-full border border-gray-300 rounded-md p-2">
              Support Staff
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#01B49C]">Designation</p>
            <input
              value={designation}
              onChange={(e) => {
                setdesignation(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Cleaner"
            />
            {errors.designation && (
              <p className="text-red-500 text-sm">{errors.designation}</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              updateStaff();
            }}
            className="bg-[#01B49C] border hover:text-white hover:bg-[#01B49C] border-[#01B49C] text-white py-1 px-4 rounded"
          >
            Create Staff
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStaffForm;
