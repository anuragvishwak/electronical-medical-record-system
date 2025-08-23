import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfiguration";
import { FaIndianRupeeSign } from "react-icons/fa6";

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
      <div className="bg-white p-4 rounded">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[#212a31] text-xl font-bold">
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

        <div>
          <p className="text-sm text-gray-500">
            <span className="font-[500] ">Appointmetn Id:</span>{" "}
            {capturingObject.id}
          </p>
          {gettingUser
            .filter((user) => user.email === capturingObject.patient)
            .map((user) => (
              <p className="font-semibold">
                <span className="font-[500] text-gray-500">Patient:</span>{" "}
                {user?.name}
              </p>
            ))}

          {gettingUser
            .filter((user) => user.email === capturingObject.doctor)
            .map((user) => (
              <p className="font-semibold">
                <span className="font-[500] text-gray-500">Doctor:</span>{" "}
                {user?.name}
              </p>
            ))}
        </div>

        <div>
          <div>
            <p className="font-semibold text-[#196d8e]">Invoice Date</p>
            <input
              type="date"
              onChange={(e) => {
                setbillDate(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Star Health Insurance"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox"></input>
            <p>Surgery fee applied ?</p>
          </div>
          <div>
            <p className="font-semibold text-[#196d8e]">Surgery Fee</p>
            <input
              onChange={(e) => {
                setsurgeryFee(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="60000/-"
            />
          </div>
        </div>

        <hr className="border-gray-400 my-5" />
        <div>
          <p className="text-xl font-semibold">Breakdown of Charges</p>

          {gettingConsultations
            .filter((consult) => consult.appointmentId === capturingObject.id)
            .map((consult) => (
              <p className="font-semibold flex items-center">
                <span className="font-[500] text-gray-500 mr-1">
                  Consultation Charges:
                </span>
                <FaIndianRupeeSign />
                {consult.consultationCharges}/-
              </p>
            ))}

          {gettingLabResults
            .filter((consult) => consult.appointmentId === capturingObject.id)
            .map((consult) => (
              <p className="font-semibold flex items-center">
                <span className="font-[500] text-gray-500 mr-1">
                  lab Charges:
                </span>
                <FaIndianRupeeSign />
                {consult.labCharges}/-
              </p>
            ))}

          <p className="font-semibold flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Nursing Charges:
            </span>
            <FaIndianRupeeSign />
            {nursingCharges}/-
          </p>

          <p className="font-semibold flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Service Charges:
            </span>
            <FaIndianRupeeSign />
            {serviceCharges}/-
          </p>

          <p className="font-semibold flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Surgery Charges:
            </span>
            <FaIndianRupeeSign />
            {surgeryFee ? surgeryFee + "/-" : "N/A"}
          </p>

          <p className="font-semibold flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Sub Total Charges:
            </span>
            <FaIndianRupeeSign />
            {subTotal}/-
          </p>

          <p className="font-semibold flex items-center">
            <span className="font-[500] text-gray-500 mr-1">
              Final Amount:
            </span>
            <FaIndianRupeeSign />
            {subTotal}/-
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddBillingPaymentForm;
