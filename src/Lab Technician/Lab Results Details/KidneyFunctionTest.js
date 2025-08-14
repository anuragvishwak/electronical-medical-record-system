import React, { useState } from "react";

function KidneyFunctionTest() {
  const [color, setColor] = useState({ value: "", unit: "", reference: "Yellow to amber" });
  const [pH, setPH] = useState({ value: "", unit: "", reference: "4.5 - 8.0" });
  const [protein, setProtein] = useState({ value: "", unit: "mg/dL", reference: "< 150 mg/day" });
  const [glucose, setGlucose] = useState({ value: "", unit: "mg/dL", reference: "< 15 mg/dL" });

  return (
    <div className="space-y-4">
      {/* Color */}
      <div>
        <p className="font-semibold text-[#1976D2]">Color</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter value..."
          value={color.value}
          onChange={(e) => setColor((prev) => ({ ...prev, value: e.target.value }))}
        />
      </div>

      {/* pH */}
      <div>
        <p className="font-semibold text-[#1976D2]">pH</p>
        <input
          type="number"
          step="0.1"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter value..."
          value={pH.value}
          onChange={(e) => setPH((prev) => ({ ...prev, value: e.target.value }))}
        />
      </div>

      {/* Protein */}
      <div>
        <p className="font-semibold text-[#1976D2]">Protein ({protein.unit})</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter value..."
          value={protein.value}
          onChange={(e) => setProtein((prev) => ({ ...prev, value: e.target.value }))}
        />
      </div>

      {/* Glucose */}
      <div>
        <p className="font-semibold text-[#1976D2]">Glucose ({glucose.unit})</p>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter value..."
          value={glucose.value}
          onChange={(e) => setGlucose((prev) => ({ ...prev, value: e.target.value }))}
        />
      </div>
    </div>
  );
}

export default KidneyFunctionTest;
