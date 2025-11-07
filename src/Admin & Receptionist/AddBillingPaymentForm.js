import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { FaBriefcaseMedical, FaIndianRupeeSign, FaUser } from "react-icons/fa6";
import { z } from "zod";

function AddBillingPaymentForm({
  setopeningAddBillingPaymentForm,
  capturingObject,
}) {
  const [gettingUser, setgettingUser] = useState([]);
  const [gettingConsultations, setgettingConsultations] = useState([]);
  const [gettingLabResults, setgettingLabResults] = useState([]);
  const [surgeryFee, setsurgeryFee] = useState("");
  const [billDate, setbillDate] = useState("");
  const [subTotal, setsubTotal] = useState(0);
  const [finalAmount, setfinalAmount] = useState("");
  const nursingCharges = 2000;
  const serviceCharges = 1000;
  const [errors, setErrors] = useState({});
  const [consultationCharges, setconsultationCharges] = useState("");
  const [labCharges, setlabCharges] = useState("");

  const billSchema = z.object({
    surgeryFee: z.string().min(1, "surgery fee amount is required."),
    billDate: z.string().min(1, "Bill Date is required."),
  });

  async function creatingBill() {
    const billData = {
      appointmentId: capturingObject.id,
      billDate: billDate,
      consultationCharges: consultationCharges,
      patient: capturingObject.patient,
      doctor: capturingObject.doctor,
      surgeryFee: surgeryFee,
      labCharges: labCharges,
      subTotal: subTotal,
      finalAmount: finalAmount,
    };

    try {
      billSchema.parse(billData);
    await addDoc(collection(database, "billing_payment_database"), billData);

      setopeningAddBillingPaymentForm(false);
    } catch (error) {
      if (error.name === "ZodError") {
        const fieldErrors = {};
        error.issues.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        console.error("Validation Errors:", fieldErrors);
      } else {
        console.error("Error while creating medicine:", error.message);
      }
      console.error("Error during sign up:", error.message);
      throw error;
    }
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function renderingConsultation() {
    const taskDetails = await getDocs(
      collection(database, "consultation_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingConsultations(multipleArray);
  }

  async function renderingLabOrders() {
    const taskDetails = await getDocs(
      collection(database, "lab_order_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingLabResults(multipleArray);
  }

  useEffect(() => {
    renderingUser();
    renderingConsultation();
    renderingLabOrders();
  });

  useEffect(() => {
    const consultationTotal = gettingConsultations
      .filter((consult) => consult.appointmentId === capturingObject.id)
      .reduce(
        (acc, consult) => acc + Number(consult.consultationCharges || 0),
        0
      );

    const labTotal = gettingLabResults
      .filter((lab) => lab.appointmentId === capturingObject.id)
      .reduce((acc, lab) => acc + Number(lab.labCharges || 0), 0);

    setconsultationCharges(consultationTotal);
    setlabCharges(labTotal);

    const nursingTotal = Number(nursingCharges || 0);
    const serviceTotal = Number(serviceCharges || 0);

    const surgeryTotal = Number(surgeryFee || 0);

    const gst = subTotal * 0.18;
    const cess = subTotal * 0.01;

    const totalAmount = subTotal + gst + cess;

    setfinalAmount(totalAmount);

    setsubTotal(
      consultationTotal + labTotal + nursingTotal + serviceTotal + surgeryTotal
    );
  }, [gettingConsultations, gettingLabResults, surgeryFee]);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div
        className="bg-white h-[600px] overflow-auto sm:h-auto w-80 sm:w-auto sm
      :w-5/12 p-4 rounded"
      >
        <div className="flex items-center mb-4 justify-between">
          <p className="text-[#003441] text-xl font-bold">
            Create Bill / Invoice
          </p>
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setopeningAddBillingPaymentForm(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="border p-3 rounded border-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-3 gap-3">
            <div>
              <p className="font-semibold text-[#01B49C]">Appointment ID</p>
              <p className="w-full border border-gray-300 rounded-md p-2">
                {capturingObject.id}
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#01B49C]">Invoice Date</p>
              <input
                type="date"
                onChange={(e) => {
                  setbillDate(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Star Health Insurance"
              />
              {errors.billData && (
                <p className="text-red-500 text-sm">{errors.billDate}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gettingUser
              .filter((user) => user.email === capturingObject.patient)
              .map((user) => (
                <div className="flex items-center w-full p-2 rounded border border-gray-300 space-x-2">
                  <FaUser
                    size={30}
                    className="text-blue-500 bg-blue-50 p-1.5 shadow border rounded-full"
                  />
                  <div className="font-semibold">
                    <p className="font-[500] text-gray-500">Patient:</p>
                    <p>{user?.name}</p>
                  </div>
                </div>
              ))}

            {gettingUser
              .filter((user) => user.email === capturingObject.doctor)
              .map((user) => (
                <div className="flex items-center w-full p-2 rounded border border-gray-300 space-x-2">
                  <FaBriefcaseMedical
                    size={30}
                    className="text-green-500 bg-green-50 p-1.5 shadow border rounded-full"
                  />
                  <div className="font-semibold">
                    <p className="font-[500] text-gray-500">Doctor:</p>{" "}
                    <p>{user?.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="border p-3 rounded my-3 border-gray-300">
          <div className="flex items-center space-x-2">
            <input type="checkbox"></input>
            <p>Surgery fee applied ?</p>
          </div>
          <div>
            <p className="font-semibold text-[#01B49C]">Surgery Fee</p>
            <input
              onChange={(e) => {
                setsurgeryFee(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="60000/-"
            />
             {errors.surgeryFee && (
                <p className="text-red-500 text-sm">{errors.surgeryFee}</p>
              )}
          </div>
        </div>

        <div className="border border-gray-300 p-3">
          <p className="text-xl mb-2 font-semibold">Breakdown of Charges</p>

          {gettingConsultations
            .filter((consult) => consult.appointmentId === capturingObject.id)
            .map((consult) => (
              <div className="font-semibold flex justify-between items-center">
                <span className="font-[500] text-gray-500 mr-1">
                  Consultation Charges:
                </span>
                <div className="flex items-center space-1">
                  <FaIndianRupeeSign />
                  <p>{consult.consultationCharges}/-</p>
                </div>
              </div>
            ))}

          {gettingLabResults
            .filter((consult) => consult.appointmentId === capturingObject.id)
            .map((consult) => (
              <div className="font-semibold my-0.5 flex justify-between items-center">
                <span className="font-[500] text-gray-500 mr-1">
                  lab Charges:
                </span>
                <div className="flex items-center justify-between">
                  <FaIndianRupeeSign />
                  <p>{consult.labCharges}/-</p>
                </div>
              </div>
            ))}

          <div className="font-semibold justify-between flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Nursing Charges:
            </span>
            <div className="flex items-center space-x-1">
              <FaIndianRupeeSign />
              <p> {nursingCharges}/-</p>
            </div>
          </div>

          <div className="font-semibold justify-between my-0.5 flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Service Charges:
            </span>
            <div className="flex items-center space-x-1">
              <FaIndianRupeeSign />
              <p> {serviceCharges}/-</p>
            </div>
          </div>

          <div className="font-semibold flex justify-between items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Surgery Charges:
            </span>
            <div className="flex items-center space-x-1">
              <FaIndianRupeeSign />
              <p>{surgeryFee ? surgeryFee + "/-" : "N/A"}</p>
            </div>
          </div>

          <div className="font-semibold mt-0.5 justify-between flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Sub Total Charges:
            </span>
            <div className="flex items-center space-x-1">
              <FaIndianRupeeSign />
              <p>{subTotal}/-</p>
            </div>
          </div>

          <hr className="border-gray-300 my-3" />

          <div className="font-semibold bg-[#ddf5ff] text-[#01B49C] justify-between border border-gray-300 p-2 flex items-center">
            <span className="font-[500] text-[#01B49C] mr-1">
              Final Amount (including GST(18%) and cess):
            </span>
            <div className="flex items-center  space-x-1">
              <FaIndianRupeeSign />
              <p>{subTotal}/-</p>
            </div>
          </div>
        </div>

        <div className="flex mt-4 justify-end">
          <button
            onClick={() => {
              creatingBill();
            }}
            className="bg-[#003441] hover:bg-blue-800 py-1 px-3 rounded text-white"
          >
            Add Bill
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBillingPaymentForm;
