import React from "react";

function AddBillingPaymentForm({ setopeningAddBillingPaymentForm }) {
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-4 rounded">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#212a31] text-xl font-bold">
            Create Bill / Invoice
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAddBillingPaymentForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          <div>
            <p className="font-semibold text-[#196d8e]">Invoice Date</p>
            <input
              type="date"
              onChange={(e) => {
                // setproviderName(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Star Health Insurance"
            />
          </div>

          <div>
            <p className="font-semibold text-[#196d8e]">Invoice Date</p>
            <input
              type="date"
              onChange={(e) => {
                // setproviderName(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Star Health Insurance"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBillingPaymentForm;
