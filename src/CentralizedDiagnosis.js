import React from "react";

function CentralizedDiagnosis({ diagnosis, setdiagnosis }) {
  const diagnosesList = [
    { id: 1, name: "Hypertension" },
    { id: 2, name: "Diabetes Mellitus" },
    { id: 3, name: "Asthma" },
    { id: 4, name: "Chronic Obstructive Pulmonary Disease (COPD)" },
    { id: 5, name: "Coronary Artery Disease" },
    { id: 6, name: "Heart Failure" },
    { id: 7, name: "Pneumonia" },
    { id: 8, name: "Tuberculosis" },
    { id: 9, name: "Migraine" },
    { id: 10, name: "Anemia" },
    { id: 11, name: "Hypothyroidism" },
    { id: 12, name: "Hyperthyroidism" },
    { id: 13, name: "Osteoarthritis" },
    { id: 14, name: "Rheumatoid Arthritis" },
    { id: 15, name: "Depression" },
    { id: 16, name: "Anxiety Disorder" },
    { id: 17, name: "Stroke" },
    { id: 18, name: "Seizure Disorder" },
    { id: 19, name: "Chronic Kidney Disease" },
    { id: 20, name: "Peptic Ulcer Disease" },
  ];

  return (
    <div>
      <p className="font-semibold text-[#1976D2]">Diagnosis</p>
      <select
        value={diagnosis}
        onChange={(e) => {
          setdiagnosis(e.target.value);
        }}
        className="border rounded border-gray-300 w-full p-2"
      >
        {diagnosesList.map((diagnosis) => (
          <option key={diagnosis.name} value={diagnosis.name}>
            {diagnosis.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CentralizedDiagnosis;
