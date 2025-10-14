import React, { useState, useEffect } from "react";
import { database } from "../FirebaseConfiguration";
import { doc, updateDoc } from "firebase/firestore";
import { z } from "zod";

function AddSalaryForm({
  setopeningSalaryForm,
  capturingStaffData,
  renderingUser,
}) {
  const [basicPay, setbasicPay] = useState(capturingStaffData.basicPay || "");
  const [hra, sethra] = useState(capturingStaffData.hra || "");
  const [allowance, setallowance] = useState(
    capturingStaffData.allowance || ""
  );
  const [deduction, setdeduction] = useState(
    capturingStaffData.deduction || ""
  );
  const [netSalary, setnetSalary] = useState(
    capturingStaffData.netSalary || ""
  );
  const [errors, setErrors] = useState({});

  const salarySchema = z.object({
    basicPay: z.number().min(1, "Basic Pay is compulsory."),
    hra: z.number().min(1, "HRA is compulsory."),
    allowance: z.number().min(1, "Allowance is compulsory."),
    deduction: z.number().min(1, "Decuction is compulsory."),
    netSalary: z.number().min(1, "Net Salary is compulsory."),
  });

  useEffect(() => {
    const AddAmount =
      parseInt(basicPay) + parseInt(hra) + parseInt(allowance || 0);
    const finalNetSalary = AddAmount - parseInt(deduction || 0);
    setnetSalary(finalNetSalary);
  }, [basicPay, hra, allowance, deduction]);

  async function AddSalary() {
    const SalaryData = {
      basicPay: parseInt(basicPay),
      hra: parseInt(hra),
      allowance: parseInt(allowance),
      deduction: parseInt(deduction),
      netSalary: netSalary,
      lastUpdated: new Date(),
    };

    try {
      salarySchema.parse(SalaryData);
      const staffRef = doc(database, "user_database", capturingStaffData.id);
      await updateDoc(staffRef, SalaryData);

      console.log("Salary added successfully!!!");
      setopeningSalaryForm(false);
      renderingUser();
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
              value={basicPay}
              onChange={(e) => setbasicPay(Number(e.target.value))}
              placeholder="₹ 20,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
            {errors.basicPay && (
              <p className="text-red-500 text-sm">{errors.basicPay}</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">
              HRA (House Rent Allowance)
            </p>
            <input
              value={hra}
              onChange={(e) => sethra(e.target.value)}
              placeholder="₹ 10,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
            {errors.hra && <p className="text-red-500 text-sm">{errors.hra}</p>}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Allowance</p>
            <input
              value={allowance}
              onChange={(e) => setallowance(e.target.value)}
              placeholder="₹ 5,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
            {errors.allowance && (
              <p className="text-red-500 text-sm">{errors.allowance}</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Deduction</p>
            <input
              value={deduction}
              onChange={(e) => setdeduction(e.target.value)}
              placeholder="₹ 3,000/-"
              className="border rounded border-gray-300 w-full p-1.5"
            />
            {errors.deduction && (
              <p className="text-red-500 text-sm">{errors.deduction}</p>
            )}
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Net Salary</p>
            <input
              value={netSalary}
              readOnly
              className="border rounded border-gray-300 w-full p-1.5 bg-gray-100"
            />
            {errors.netSalary && (
              <p className="text-red-500 text-sm">{errors.netSalary}</p>
            )}
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
