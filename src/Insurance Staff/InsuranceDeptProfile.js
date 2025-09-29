import React, { useEffect, useState } from "react";
import InsuranceStaffNavbar from "./InsuranceStaffNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfiguration";
import { MdEmail } from "react-icons/md";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { BsShield } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import InsuranceDeptProfileUpdateForm from "./InsuranceDeptProfileUpdateForm";

function InsuranceDeptProfile() {
  const [gettingUser, setgettingUser] = useState([]);
  const currentUser = localStorage.getItem("email");
  const [openingInsuranceDeptProfileForm, setopeningInsuranceDeptProfileForm] =
    useState(false);
  const [storingCurrentUser, setstoringCurrentUser] = useState({});

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredUser = multipleArray.filter(
      (user) => user.email === currentUser
    );

    setgettingUser(filteredUser);
  }

  useEffect(() => {
    renderingUser();
  });

  function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  return (
    <div className="bg-gray-50 min-h-screen h-full">
      <InsuranceStaffNavbar />

      <div className="m-5">
        {gettingUser.map((user) => (
          <div>
            <div className="flex justify-center">
              {gettingUser.map((user) => (
                <div className="w-full bg-white p-5 rounded border border-gray-300 shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-5">
                      <p className="bg-[#212a31] py-10 px-12 text-5xl font-bold rounded-full text-white">
                        {getInitials(user.name)}
                      </p>
                      <div>
                        <div>
                          <p className="text-3xl text-[#212a31] font-bold">
                            {user.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <p className="text-[#196d8e] flex items-center gap-1">
                              <MdEmail />
                              {user.email}
                            </p>
                            <span className="font-semibold">|</span>
                            <p className="text-[#196d8e] flex items-center gap-1">
                              <FaPhone />
                              +91 {user.phone_no}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[#212a31] font-semibold flex items-center gap-1">
                            <BsShield />
                            {user.designation}
                          </p>
                        </div>

                        <div>
                          <p className="text-[#212a31] font-semibold flex items-center gap-1">
                            <FaLocationDot />
                            {user.city}, {user.state}, {user.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setopeningInsuranceDeptProfileForm(true);
                        setstoringCurrentUser(user);
                      }}
                      className="bg-[#212a31] text-white font-semibold px-4 rounded py-1.5"
                    >
                      <div className="flex items-center space-x-2">
                        <FaRegEdit size={18} />
                        <p>Edit Profile</p>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>


            <div>
                <p className="font-semibold text-[#196d8e]">
                  
                </p>
            </div>
          </div>
        ))}
      </div>

      {openingInsuranceDeptProfileForm && (
        <InsuranceDeptProfileUpdateForm
          setopeningInsuranceDeptProfileForm={
            setopeningInsuranceDeptProfileForm
          }
          storingCurrentUser={storingCurrentUser}
        />
      )}
    </div>
  );
}

export default InsuranceDeptProfile;
