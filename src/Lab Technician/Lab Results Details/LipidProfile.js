import React, { useState } from "react";

function LipidProfile() {
  const [totalCholesterol, setTotalCholesterol] = useState({
    value: "",
    unit: "mg/dL",
    reference: "< 200",
  });

  const [ldlCholesterol, setLdlCholesterol] = useState({
    value: "",
    unit: "mg/dL",
    reference: "< 100 optimal",
  });

  const [hdlCholesterol, setHdlCholesterol] = useState({
    value: "",
    unit: "mg/dL",
    reference: "> 40 (male), > 50 (female)",
  });

  const [triglycerides, setTriglycerides] = useState({
    value: "",
    unit: "mg/dL",
    reference: "< 150",
  });

  return (
    <div>
      <div>
        <p className="font-semibold text-[#1976D2]">
          Total Cholesterol (mg/dL)
        </p>
        <input
          type="number"
          onChange={(e) => {
            setTotalCholesterol((prev) => ({
              ...prev,
              value: e.target.value,
            }));
          }}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter total cholesterol..."
        />
      </div>
      <div>
        <p className="font-semibold text-[#1976D2]">LDL Cholesterol (mg/dL)</p>
        <input
          type="number"
          onChange={(e) => {
            setLdlCholesterol((prev) => ({
              ...prev,
              value: e.target.value,
            }));
          }}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter LDL cholesterol..."
        />
      </div>
      <div>
        <p className="font-semibold text-[#1976D2]">HDL Cholesterol (mg/dL)</p>
        <input
          type="number"
          onChange={(e) => {
            setHdlCholesterol((prev) => ({
              ...prev,
              value: e.target.value,
            }));
          }}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter HDL cholesterol..."
        />
      </div>
      <div>
        <p className="font-semibold text-[#1976D2]">Triglycerides (mg/dL)</p>
        <input
          type="number"
          onChange={(e) => {
            setTriglycerides((prev) => ({
              ...prev,
              value: e.target.value,
            }));
          }}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter triglycerides..."
        />
      </div>
    </div>
  );
}

export default LipidProfile;
