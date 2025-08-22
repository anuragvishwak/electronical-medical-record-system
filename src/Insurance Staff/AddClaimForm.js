import React from "react";

function AddClaimForm({ setopeningClaimStatus }) {
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-4 rounded">
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#212a31] text-xl font-bold">Add Claim</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningClaimStatus(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
            
        </div>
      </div>
    </div>
  );
}

export default AddClaimForm;
