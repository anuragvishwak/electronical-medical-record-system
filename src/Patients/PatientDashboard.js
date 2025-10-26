import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";

function PatientDashboard() {
  const email = localStorage.getItem("email");
  const [gettingUser, setgettingUser] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingUser();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PatientNavbar />
      <div>
          <div>
            {gettingUser
              .filter((user) => user.email === email)
              .map((user) => (
                <div className="flex justify-between p-5 rounded border border-gray-300 shadow m-5 bg-white">
                  <div>
                    <p className="text-[#212a31] text-2xl font-bold">
                      {user.name}
                    </p>
                    <p className="text-[#196d8e]">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-[#212a31] font-bold">Patient Id</p>
                    <p className="text-[#196d8e] text-end">{user.patientId}</p>
                  </div>
                </div>
              ))}

              <div>
                 
              </div>
          </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
