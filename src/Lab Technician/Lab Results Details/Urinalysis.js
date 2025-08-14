import React, { useState } from "react";

function Urinalysis({ email, capturingLabOrderObject }) {
  const [color, setColor] = useState({
    value: "",
    unit: "",
    reference: "Pale yellow to amber",
  });

  const [appearance, setAppearance] = useState({
    value: "",
    unit: "",
    reference: "Clear",
  });

  const [specificGravity, setSpecificGravity] = useState({
    value: "",
    unit: "",
    reference: "1.005 – 1.030",
  });

  const [pH, setPh] = useState({
    value: "",
    unit: "",
    reference: "4.5 – 8.0",
  });

  const [protein, setProtein] = useState({
    value: "",
    unit: "mg/dL",
    reference: "Negative",
  });

  const [glucose, setGlucose] = useState({
    value: "",
    unit: "mg/dL",
    reference: "Negative",
  });

  const [ketones, setKetones] = useState({
    value: "",
    unit: "mg/dL",
    reference: "Negative",
  });

  const [bilirubin, setBilirubin] = useState({
    value: "",
    unit: "mg/dL",
    reference: "Negative",
  });

  const [urobilinogen, setUrobilinogen] = useState({
    value: "",
    unit: "mg/dL",
    reference: "0.1 – 1.0",
  });

  const [nitrite, setNitrite] = useState({
    value: "",
    unit: "",
    reference: "Negative",
  });

  const [leukocyteEsterase, setLeukocyteEsterase] = useState({
    value: "",
    unit: "",
    reference: "Negative",
  });

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h2 className="text-lg font-bold text-[#1976D2]">Urinalysis</h2>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="font-semibold text-[#1976D2]">Color</label>
          <input
            type="text"
            value={color.value}
            onChange={(e) =>
              setColor((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter urine color..."
          />
          <p className="text-sm text-gray-500">
            Ref: {color.reference} {color.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Appearance</label>
          <input
            type="text"
            value={appearance.value}
            onChange={(e) =>
              setAppearance((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Clear, cloudy..."
          />
          <p className="text-sm text-gray-500">
            Ref: {appearance.reference} {appearance.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">
            Specific Gravity
          </label>
          <input
            type="number"
            value={specificGravity.value}
            onChange={(e) =>
              setSpecificGravity((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter specific gravity..."
          />
          <p className="text-sm text-gray-500">
            Ref: {specificGravity.reference}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">pH</label>
          <input
            type="number"
            step="0.1"
            value={pH.value}
            onChange={(e) =>
              setPh((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter pH..."
          />
          <p className="text-sm text-gray-500">Ref: {pH.reference}</p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Protein</label>
          <input
            type="text"
            value={protein.value}
            onChange={(e) =>
              setProtein((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter protein level..."
          />
          <p className="text-sm text-gray-500">
            Ref: {protein.reference} {protein.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Glucose</label>
          <input
            type="text"
            value={glucose.value}
            onChange={(e) =>
              setGlucose((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter glucose level..."
          />
          <p className="text-sm text-gray-500">
            Ref: {glucose.reference} {glucose.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Ketones</label>
          <input
            type="text"
            value={ketones.value}
            onChange={(e) =>
              setKetones((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter ketones level..."
          />
          <p className="text-sm text-gray-500">
            Ref: {ketones.reference} {ketones.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Bilirubin</label>
          <input
            type="text"
            value={bilirubin.value}
            onChange={(e) =>
              setBilirubin((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter bilirubin level..."
          />
          <p className="text-sm text-gray-500">
            Ref: {bilirubin.reference} {bilirubin.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Urobilinogen</label>
          <input
            type="text"
            value={urobilinogen.value}
            onChange={(e) =>
              setUrobilinogen((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Enter urobilinogen level..."
          />
          <p className="text-sm text-gray-500">
            Ref: {urobilinogen.reference} {urobilinogen.unit}
          </p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">Nitrite</label>
          <input
            type="text"
            value={nitrite.value}
            onChange={(e) =>
              setNitrite((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Negative/Positive..."
          />
          <p className="text-sm text-gray-500">Ref: {nitrite.reference}</p>
        </div>

        <div>
          <label className="font-semibold text-[#1976D2]">
            Leukocyte Esterase
          </label>
          <input
            type="text"
            value={leukocyteEsterase.value}
            onChange={(e) =>
              setLeukocyteEsterase((prev) => ({
                ...prev,
                value: e.target.value,
              }))
            }
            className="w-full border rounded-md p-2"
            placeholder="Negative/Positive..."
          />
          <p className="text-sm text-gray-500">
            Ref: {leukocyteEsterase.reference}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
          <button
            onClick={() => {
            //   CreateConsultationForm();
            }}
            className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded"
          >
            Create Consultation
          </button>
        </div>
    </div>
  );
}

export default Urinalysis;
