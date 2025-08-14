import React, { useState } from "react";

function BloodSugar() {
  const [fastingBloodSugar, setFastingBloodSugar] = useState({
    value: "",
    unit: "mg/dL",
    reference: "70 - 99",
  });

  return (
    <div>
      <p className="font-semibold text-[#1976D2]">
        Fasting Blood Glucose (mg/dL)
      </p>
      <input
        type="number"
        onChange={(e) => {
          setFastingBloodSugar((prev) => ({
            ...prev,
            value: e.target.value,
          }));
        }}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Enter fasting blood sugar..."
      />
    </div>
  );
}

export default BloodSugar;
