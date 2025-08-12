import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

function CreateLabResultForm({
  setopeningCreateLabResultsForm,
  capturingLabOrderObject,
}) {
  const toast = useRef();
  const email = localStorage.getItem("email");
  const [hemoglobin, setHemoglobin] = useState("");
  const [hematocrit, setHematocrit] = useState("");
  const [wbcCount, setWbcCount] = useState("");
  const [rbcCount, setRbcCount] = useState("");
  const [plateletCount, setPlateletCount] = useState("");
  const [mcv, setMcv] = useState("");
  const [mch, setMch] = useState("");
  const [mchc, setMchc] = useState("");
  const [rdw, setRdw] = useState("");
  const [fastingBloodSugar, setFastingBloodSugar] = useState("");
  const [postprandialBloodSugar, setPostprandialBloodSugar] = useState("");
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [ldlCholesterol, setLdlCholesterol] = useState("");
  const [hdlCholesterol, setHdlCholesterol] = useState("");
  const [triglycerides, setTriglycerides] = useState("");

  console.log("finding tests", capturingLabOrderObject.testRequested);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white  p-3 my-5 rounded">
        <Toast ref={toast} />
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">Upload Lab Results</p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningCreateLabResultsForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div>
          {capturingLabOrderObject.testRequested ===
            "Complete Blood Count (CBT)" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Hemoglobin (g/dL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setHemoglobin(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter hemoglobin..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">Hematocrit (%)</p>
                <input
                  type="number"
                  onChange={(e) => setHematocrit(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter hematocrit..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  White Blood Cell Count (cells/mm³)
                </p>
                <input
                  type="number"
                  onChange={(e) => setWbcCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter WBC count..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Red Blood Cell Count (million cells/mm³)
                </p>
                <input
                  type="number"
                  onChange={(e) => setRbcCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter RBC count..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Platelet Count (cells/mm³)
                </p>
                <input
                  type="number"
                  onChange={(e) => setPlateletCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter platelet count..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Mean Corpuscular Volume (fL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setMcv(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter MCV..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Mean Corpuscular Hemoglobin (pg)
                </p>
                <input
                  type="number"
                  onChange={(e) => setMch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter MCH..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Mean Corpuscular Hemoglobin Concentration (g/dL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setMchc(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter MCHC..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Red Cell Distribution Width (%)
                </p>
                <input
                  type="number"
                  onChange={(e) => setRdw(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter RDW..."
                />
              </div>
            </div>
          )}

          {capturingLabOrderObject.testRequested ===
            "Blood Sugar (Fasting)" && (
            <div>
              <p className="font-semibold text-[#1976D2]">
                Fasting Blood Glucose (mg/dL)
              </p>
              <input
                type="number"
                onChange={(e) => setFastingBloodSugar(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter fasting blood sugar..."
              />
            </div>
          )}

          {capturingLabOrderObject.testRequested ===
            "Blood Sugar (Postprandial)" && (
            <div>
              <p className="font-semibold text-[#1976D2]">
                Postprandial Blood Glucose (mg/dL)
              </p>
              <input
                type="number"
                onChange={(e) => setPostprandialBloodSugar(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter post-meal blood sugar..."
              />
            </div>
          )}

          {capturingLabOrderObject.testRequested === "Lipid Profile" && (
            <>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Total Cholesterol (mg/dL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setTotalCholesterol(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter total cholesterol..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  LDL Cholesterol (mg/dL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setLdlCholesterol(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter LDL cholesterol..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  HDL Cholesterol (mg/dL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setHdlCholesterol(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter HDL cholesterol..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Triglycerides (mg/dL)
                </p>
                <input
                  type="number"
                  onChange={(e) => setTriglycerides(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter triglycerides..."
                />
              </div>
            </>
          )}

          {capturingLabOrderObject.testRequested ===
            "Liver Function Test (LFT)" && (
            <>
              <div>
                <p className="font-semibold text-[#1976D2]">ALT (U/L)</p>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter value..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">AST (U/L)</p>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter value..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Bilirubin Total (mg/dL)
                </p>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter value..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">Albumin (g/dL)</p>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter value..."
                />
              </div>
            </>
          )}

          {capturingLabOrderObject.testRequested ===
            "Kidney Function Test (KFT)" && (
            <>
              <div>
                <p className="font-semibold text-[#1976D2]">
                  Creatinine (mg/dL)
                </p>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter value..."
                />
              </div>
              <div>
                <p className="font-semibold text-[#1976D2]">Urea (mg/dL)</p>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter value..."
                />
              </div>
            </>
          )}

          {capturingLabOrderObject.testRequested ===
            "Thyroid Stimulating Hormones (TSH)" && (
            <div>
              <p className="font-semibold text-[#1976D2]">TSH (mIU/L)</p>
              <input
                type="number"
                step="0.01"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter value..."
              />
            </div>
          )}
        </div>

        {capturingLabOrderObject.testRequested === "Urinalysis" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-[#1976D2]">Color</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter value..."
              />
            </div>
            <div>
              <p className="font-semibold text-[#1976D2]">pH</p>
              <input
                type="number"
                step="0.1"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter value..."
              />
            </div>
            <div>
              <p className="font-semibold text-[#1976D2]">Protein (mg/dL)</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter value..."
              />
            </div>
            <div>
              <p className="font-semibold text-[#1976D2]">Glucose</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter value..."
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 mt-5">
          <button className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded">
            + Upload Test Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLabResultForm;
