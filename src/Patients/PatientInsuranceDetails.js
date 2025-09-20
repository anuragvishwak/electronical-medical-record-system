import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { IoNotifications } from "react-icons/io5";

function PatientInsuranceDetails() {
  const [gatheringInsuranceDetails, setgatheringInsuranceDetails] = useState([]);
  const [gettingUser, setgettingUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const loggedInEmail = localStorage.getItem("email");

  async function renderingInsurances() {
    const taskDetails = await getDocs(
      collection(database, "insurance_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgatheringInsuranceDetails(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgettingUser(multipleArray);

    const matchedUser = multipleArray.find((u) => u.email === loggedInEmail);
    if (matchedUser) {
      setCurrentUser(matchedUser);
    }
  }

  useEffect(() => {
    renderingInsurances();
    renderingUser();
  }, []);

  const filteredInsuranceDetails = currentUser
    ? gatheringInsuranceDetails.filter(
        (insurance) => insurance.patient === currentUser.name
      )
    : [];

  return (
    <div className="bg-gray-50 h-screen">
      <PatientNavbar />
      <div>
       <div className="bg-white m-4 p-5 border border-gray-300 shadow rounded">
         <div className="">
          <p className="text-2xl text-[#212a31] font-bold">Insurance Details</p>
          <p className="text-[#196d8e]">
            All the{" "}
            <span className="text-[#212a31] text-sm font-semibold">
              Insurance Details
            </span>{" "}
            will be displayed here.
          </p>
        </div>
        <hr className="my-3 border-gray-300"/>
        <div className="flex items-center justify-between">
          <input
            placeholder="Search Insurance provider..."
            className="border border-gray-400 w-6/12 p-1 rounded"
          />

          <button>
            <IoNotifications
              size={31}
              className="border border-gray-500 p-1 rounded text-gray-500"
            />
          </button>
        </div>
       </div>

        <div className="mx-5 mt-5 space-y-3">
          {filteredInsuranceDetails.length > 0 ? (
            filteredInsuranceDetails.map((insurance) => (
              <div
                key={insurance.id}
                className="bg-white border p-4 rounded shadow-sm"
              >
                <p className="font-semibold text-lg">{insurance.providerName}</p>
                <p className="text-gray-600">Policy No: {insurance.policyNumber}</p>
                <p className="text-gray-600">Patient: {insurance.patient}</p>
                <p className="text-gray-600">
                  Coverage: ₹{insurance.sumInsured}/-
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No insurance details found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientInsuranceDetails;
