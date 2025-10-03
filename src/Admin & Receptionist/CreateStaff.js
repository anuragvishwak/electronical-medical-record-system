import React, { useState } from "react";
import { database } from "../FirebaseConfiguration";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

function CreateStaff({ setopeningAddStaffForm }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [designation, setdesignation] = useState("");
    const [errors, setErrors] = useState({});
  

  const staffSchema = z.object({
    name: z.string().min(1, "Staff name is neccessary."),
    email: z.string().min(1, "Email is compulsory."),
    phoneNo: z.string().min(1, "Phone no is neccessary."),
    designation: z.string().min(1, "Designation is compulsory."),
  });

  async function addStaff() {
    const staffData = {
      name: name,
      email: email,
      phone_no: phoneNo,
      role: "Support Staff",
      designation: designation,
    };
    try {
      staffSchema.parse(staffData);
      await addDoc(collection(database, "user_database"), staffData);

      console.log("Staff added successfully!!");
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        console.error("Validation Errors:", fieldErrors);
      } else {
        console.error("Error while creating medicine:", error.message);
      }
      console.log("Something went wrong!!!", error);
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="p-5 rounded bg-white">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Add Staff</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAddStaffForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="font-semibold text-[#196d8e]">Name</p>
            <input
              onChange={(e) => {
                setname(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="John D Souza"
            />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Email</p>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="john@gmail.com"
            />
              {errors.email && (
                <p className  ="text-red-500 text-sm">{errors.email}</p>
              )}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Phone Number</p>
            <input
              onChange={(e) => {
                setphoneNo(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="+91 78345387"
            />
              {errors.phoneNo && (
                <p className="text-red-500 text-sm">{errors.phoneNo}</p>
              )}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Role</p>
            <p className="w-full border border-gray-300 rounded-md p-2">
              Support Staff
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Designation</p>
            <input
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
              addStaff();
            }}
            className="bg-[#196d8e] border hover:text-white hover:bg-[#196d8e] border-[#196d8e] text-white py-1 px-4 rounded"
          >
            Create Staff
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStaff;
