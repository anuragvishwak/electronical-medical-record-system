import React from 'react'

function CentralizedSymptoms({setsymptoms}) {

const symptomsList = [
  { id: 1, name: "Fever" },
  { id: 2, name: "Cough" },
  { id: 3, name: "Cold" },
  { id: 4, name: "Headache" },
  { id: 5, name: "Shortness of Breath" },
  { id: 6, name: "Chest Pain" },
  { id: 7, name: "Abdominal Pain" },
  { id: 8, name: "Nausea" },
  { id: 9, name: "Vomiting" },
  { id: 10, name: "Diarrhea" },
  { id: 11, name: "Body Ache" },
  { id: 12, name: "Dizziness" },
  { id: 13, name: "Sore Throat" },
  { id: 14, name: "Loss of Taste" },
  { id: 15, name: "Loss of Smell" },
  { id: 16, name: "Rash" },
  { id: 17, name: "Swelling" },
  { id: 18, name: "Joint Pain" },
  { id: 19, name: "Burning Sensation" },
  { id: 20, name: "Fatigue" }
];


  return (
    <div>
      <p className='font-semibold text-[#1976D2]'>Chief Complaint (Symptoms)</p>
      <select 
      onChange={(e) => setsymptoms(e.target.value)}
      className='border rounded border-gray-300 w-full p-2'>
        {symptomsList.map((diagnosis) => (
          <option key={diagnosis.name} value={diagnosis.name}>
            {diagnosis.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CentralizedSymptoms