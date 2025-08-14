import React, { useState } from "react";

function BloodSugarPostprandial() {
  const [postprandialBloodSugar, setPostprandialBloodSugar] = useState("");
  const [unit] = useState("mg/dL");
  const [normalRange] = useState({ min: 70, max: 140 });

  return (
    <div>
      <p className="font-semibold text-[#1976D2]">
        Postprandial Blood Glucose ({unit})
      </p>
      <input
        type="number"
        value={postprandialBloodSugar}
        onChange={(e) => setPostprandialBloodSugar(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder={`Enter post-meal blood sugar... (Normal: ${normalRange.min}-${normalRange.max} ${unit})`}
      />

      {postprandialBloodSugar !== "" && (
        <p
          className={`mt-2 text-sm ${
            postprandialBloodSugar >= normalRange.min &&
            postprandialBloodSugar <= normalRange.max
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {postprandialBloodSugar >= normalRange.min &&
          postprandialBloodSugar <= normalRange.max
            ? "Within normal range"
            : "Out of normal range"}
        </p>
      )}
    </div>
  );
}

export default BloodSugarPostprandial;
