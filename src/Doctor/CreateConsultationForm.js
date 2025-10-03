import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { database } from "../FirebaseConfiguration";
import CentralizedDiagnosis from "../CentralizedDiagnosis";
import CentralizedSymptoms from "../CentralizedSymptoms";
import { Toast } from "primereact/toast";
import { z } from "zod";

function CreateConsultationForm({
  setopeningCreateConsultationForm,
  appointment,
}) {
  const toast = useRef(null);
  const email = localStorage.getItem("email");
  const [patient, setpatient] = useState("");
  const [historyofPresentIllness, setHistoryofPresentIllness] = useState("");
  const [pastMedicalHistory, setPastMedicalHistory] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [symptoms, setsymptoms] = useState("");
  const [diafgnosis, setdiagnosis] = useState("");
  const [medication_procedures, setmedication_procedures] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [patientData, setpatientData] = useState([]);
  const [istreatmentRequired, setistreatmentRequired] = useState(false);
  const [consultationCharges, setconsultationCharges] = useState("");
  const [errors, setErrors] = useState({});

  const consultationSchema = z.object({
    patient: z.string().min(1, "Patient is compulsory."),
    historyofPresentIllness: z
      .string()
      .min(1, "History of Present Illness is compulsory."),
    pastMedicalHistory: z
      .string()
      .min(1, "Past Medical History is compulsory."),
    treatmentType: z.string().min(1, "Treatment Type is compulsory."),
    dosage: z.string().min(1, "Dosage is compulsory."),
    duration: z.string().min(1, "Duration is compulsory."),
    followUpDate: z.string().min(1, "Follow Up Date is compulsory."),
    symptoms: z.string().min(1, "Symptomns is compulsory."),
    diafgnosis: z.string().min(1, "Diagnosis is compulsory."),
    medication_procedures: z
      .string()
      .min(1, "Medication Procedures is compulsory."),
    additionalInstructions: z
      .string()
      .min(1, "Additional Instructions is compulsory."),
    consultationCharges: z
      .string()
      .min(1, "Consultation Charges is compulsory."),
  });

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const fitleringPatient = multipleArray.filter(
      (user) => user.role === "patient"
    );

    setpatientData(fitleringPatient);
  }

  async function CreateConsultationForm() {
    const consultationData = {
      doctor: email,
      patient: patient,
      symptoms: symptoms,
      historyofPresentIllness: historyofPresentIllness,
      pastMedicalHistory: pastMedicalHistory,
      treatmentType: treatmentType,
      dosage: dosage,
      duration: duration,
      diagnosis: diafgnosis,
      followUpDate: followUpDate,
      medication_procedures: medication_procedures,
      additionalInstructions: additionalInstructions,
      diagnosis: diafgnosis,
      appointmentId: appointment.id,
      treatmentPlanRequired: istreatmentRequired,
      consultationCharges: consultationCharges,
    };

    try {
      consultationSchema.parse(consultationData);
      addDoc(collection(database, "consultation_database"),  consultationData);

      console.log("Consultation added to Firestore.");
      toast.current.show({
        severity: "success",
        summary: "Consultation created Successfully!!!",
        life: 3000,
      });
      setopeningCreateConsultationForm(false);
    } catch (error) {
       if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        return; 
      } else {
        console.error("Error while creating prescription:", error.message);
      }
    }
  }

  useEffect(() => {
    renderingUser();
    // renderingMedicines();
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white  p-3 my-5 rounded">
        <Toast ref={toast} />
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#1976D2] text-xl font-bold">
            Create Consultation
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningCreateConsultationForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="h-[580px] overflow-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-semibold text-[#1976D2]">Patient Name</p>
              <select
                onChange={(e) => setpatient(e.target.value)}
                className="border rounded border-gray-300 w-full p-2"
              >
                <option>Select Patient</option>
                {patientData.map((user) => (
                  <option value={user.email}>{user.name}</option>
                ))}
              </select>
                {errors.patient && (
                <p className="text-red-500 text-sm">{errors.patient}</p>
              )}
            </div>
            <CentralizedSymptoms error={errors.symptoms}  setsymptoms={setsymptoms} />
          </div>

          <div className="grid grid-cols-2 my-3 gap-3">
            <div>
              <p className="font-semibold text-[#1976D2]">
                History of present Illness
              </p>
              <textarea
                type="text"
                onChange={(e) => {
                  setHistoryofPresentIllness(e.target.value);
                }}
                placeholder="Test should be completed within 2 days..."
                className="border rounded border-gray-300 h-40 w-full p-1.5"
              ></textarea>
                {errors.historyofPresentIllness && (
                <p className="text-red-500 text-sm">{errors.historyofPresentIllness}</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-[#1976D2]">
                Past Medical History
              </p>
              <textarea
                onChange={(e) => {
                  setPastMedicalHistory(e.target.value);
                }}
                className="w-full h-40 border border-gray-300 rounded-md p-2"
                placeholder="Enter past medical history..."
                rows={3}
              />
               {errors.pastMedicalHistory && (
                <p className="text-red-500 text-sm">{errors.pastMedicalHistory}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CentralizedDiagnosis setdiagnosis={setdiagnosis} />
            <div>
              <label className="font-semibold text-[#1976D2]">
                Consultation Charges
              </label>
              <input
                onChange={(e) => setconsultationCharges(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="40000/-"
              />
               {errors.consultationCharges && (
                <p className="text-red-500 text-sm">{errors.consultationCharges}</p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4 space-x-1">
            <input
              checked={istreatmentRequired}
              onChange={(e) => setistreatmentRequired(e.target.checked)}
              type="checkbox"
              className=""
            ></input>
            <p className="text-lg ofnt-semibold">
              Is treatment plan is required ?
            </p>
          </div>

          {istreatmentRequired && (
            <div className="my-4">
              <p className="text-xl mb-3 font-bold">Treatment Plan</p>

              <div>
                <label className="font-semibold text-[#1976D2]">
                  Treatment Type
                </label>
                <select
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select treatment type...</option>
                  <option value="medication">Medication</option>
                  <option value="physiotherapy">Physiotherapy</option>
                  <option value="surgery">Surgery</option>
                  <option value="lifestyle">Lifestyle Changes</option>
                  <option value="counseling">Counseling</option>
                  <option value="other">Other</option>
                </select>
                 {errors.treatmentType && (
                <p className="text-red-500 text-sm">{errors.treatmentType}</p>
              )}
              </div>

              <div className="grid grid-cols-3 my-3 gap-3">
                <div>
                  <label className="font-semibold text-[#1976D2]">Dosage</label>
                  <input
                    type="text"
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="e.g. 500mg twice daily"
                  />
                   {errors.dosage && (
                <p className="text-red-500 text-sm">{errors.dosage}</p>
              )}
                </div>
                <div>
                  <label className="font-semibold text-[#1976D2]">
                    Duration
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="e.g. 5 days"
                  />
                   {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
                </div>

                <div>
                  <label className="font-semibold text-[#1976D2]">
                    Follow-Up Date
                  </label>
                  <input
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                   {errors.followUpDate && (
                <p className="text-red-500 text-sm">{errors.followUpDate}</p>
              )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1976D2]">
                    Medications / Procedures
                  </label>
                  <textarea
                    onChange={(e) => setmedication_procedures(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter medication details or procedures..."
                    rows={3}
                  />
                   {errors.medication_procedures && (
                <p className="text-red-500 text-sm">{errors.medication_procedures}</p>
              )}
                </div>
                <div>
                  <label className="font-semibold text-[#1976D2]">
                    Additional Instructions
                  </label>
                  <textarea
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter any special notes or advice..."
                    rows={3}
                  />
                   {errors.additionalInstructions && (
                <p className="text-red-500 text-sm">{errors.additionalInstructions}</p>
              )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              CreateConsultationForm();
            }}
            className="bg-[#1976D2] hover:border-blue-800 hover:bg-blue-800 border border-[#1976D2] text-white py-1 px-4 rounded"
          >
            Create Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateConsultationForm;
