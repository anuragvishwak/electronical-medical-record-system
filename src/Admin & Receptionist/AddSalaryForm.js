import React, { useState, useEffect } from "react";
import { database } from "../FirebaseConfiguration";
import { doc, updateDoc } from "firebase/firestore";

function AddSalaryForm({ setopeningSalaryForm, currentStaffId }) {
  const [basicPay, setbasicPay] = useState(0);
  const [hra, sethra] = useState(0);
  const [allowance, setallowance] = useState(0);
  const [deduction, setdeduction] = useState(0);
  const [netSalary, setnetSalary] = useState(0);

  useEffect(() => {
    const AddAmount =
      parseInt(basicPay || 0) + parseInt(hra || 0) + parseInt(allowance || 0);
    const finalNetSalary = AddAmount - parseInt(deduction || 0);
    setnetSalary(finalNetSalary);
  }, [basicPay, hra, allowance, deduction]);

  async function AddSalary() {
    try {
      const staffRef = doc(database, "user_database", currentStaffId);

      await updateDoc(staffRef, {
        basicPay: parseInt(basicPay || 0),
        hra: parseInt(hra || 0),
        allowance: parseInt(allowance || 0),
        deduction: parseInt(deduction || 0),
        netSalary: netSalary,
        lastUpdated: new Date(),
      });

      console.log("Salary added successfully!!!");
      setopeningSalaryForm(false);
    } catch (error) {
      console.log("Something went worng while adding saary", error);
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5 rounded">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Add Salary</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningSalaryForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="font-semibold text-[#196d8e]">Basic Pay</p>
            <input
              type="number"
              onChange={(e) => setbasicPay(e.target.value)}
              placeholder="₹ 20,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">
              HRA (House Rent Allowance)
            </p>
            <input
              type="number"
              onChange={(e) => sethra(e.target.value)}
              placeholder="₹ 10,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Allowance</p>
            <input
              type="number"
              onChange={(e) => setallowance(e.target.value)}
              placeholder="₹ 5,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Deduction</p>
            <input
              type="number"
              onChange={(e) => setdeduction(e.target.value)}
              placeholder="₹ 3,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Net Salary</p>
            <input
              type="number"
              value={netSalary}
              readOnly
              className="border rounded border-gray-300 w-full p-1.5 bg-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 justify-end mt-5">
          <button
            onClick={() => {
              AddSalary();
            }}
            className="bg-[#196d8e] border hover:text-white hover:bg-[#196d8e] border-[#196d8e] text-white py-1 px-4 rounded"
          >
            Add Salary
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSalaryForm;
