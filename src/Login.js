import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./FirebaseConfiguration";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import RegisterHospital from "./RegisterHospital";
import img1 from "./Anumed’s logo.jpg";
import { BiHealth, BiInjection } from "react-icons/bi";
import { MdHealthAndSafety } from "react-icons/md";
import { GiHealthCapsule, GiTestTubes } from "react-icons/gi";
import { TbRibbonHealth } from "react-icons/tb";
import { FaAmbulance, FaHospital } from "react-icons/fa";

function Login() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gettingUsers, setgettingUsers] = useState([]);
  const [openingRegisterHospital, setopeningRegisterHospital] = useState(false);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUsers(multipleArray);
  }

  async function Login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("finding user", user);

      const q = query(
        collection(database, "user_database"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User data not found in Firestore.");
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const role = userData.role;
      const status = userData.status;
      const hospitalName = userData.Hospital_name;

      if (status === "approved") {
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome, ${role.replace("_", " ")}`,
          life: 3000,
        });
        localStorage.setItem("email", email);
        localStorage.setItem("hospitalName", hospitalName);
        setTimeout(() => {
          switch (role) {
            case "admin":
              navigate("/AdminDashboard");
              break;
            case "doctor":
              navigate("/DoctorDashboard");
              break;
            case "patient":
              navigate("/PatientDashboard");
              break;
            case "nurse":
              navigate("/NurseDashboard");
              break;
            case "lab_technician":
              navigate("/LabTechnicianDashboard");
              break;
            case "insurance_dept":
              navigate("/InsuranceDeptDashboard");
              break;
            default:
              toast.current.show({
                severity: "error",
                summary: "Dashboard Error",
                detail: "No dashboard found for this role.",
                life: 3000,
              });
          }
        }, 1000);
      } else if (status === "rejected") {
        toast.current.show({
          severity: "error",
          summary: "Access Denied",
          detail: "Your registration has been rejected by the admin.",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Pending Approval",
          detail: "Your registration is pending admin approval.",
          life: 3000,
        });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
      alert("Invalid email or password.");
    }
  }

  useEffect(() => {
    renderingUser();
  }, []);

  return (
    <div className="flex bg-[#003441] justify-center items-center w-full h-screen">
      <BiHealth
        size={130}
        className="text-gray-300 opacity-20 fixed top-14 left-10"
      />
      <MdHealthAndSafety
        size={300}
        className="text-gray-300 opacity-20 fixed top-40 left-40"
      />

      <GiHealthCapsule
        size={160}
        className="text-gray-300 opacity-20 fixed top-40 right-10"
      />

      <TbRibbonHealth
        size={300}
        className="text-gray-300 opacity-20 fixed top-10 right-60"
      />
      <Toast ref={toast} />

      <FaHospital
        size={260}
        className="text-gray-300 opacity-20 fixed bottom-14 right-10"
      />
      <BiInjection
        size={160}
        className="text-gray-300 opacity-20 fixed bottom-12 left-12"
      />

      <GiTestTubes
        size={160}
        className="text-gray-300 opacity-20 fixed bottom-20 left-80"
      />

      <FaAmbulance
        size={160}
        className="text-gray-300 opacity-20 fixed bottom-48 right-80"
      />
      <div>
        <div className="border m-5 sm:m-0 sm:w-[430px] bg-white border-gray-300 shadow-lg p-6 rounded-lg">
          <div className="mb-5">
            <img src={img1} className="h-14  mb-2" />
            <p className="text-2xl mt-3 text-[#003441] font-bold">Welcome Back!</p>
            <p className="text-[#01B49C]">
              Access your medical records securely
            </p>
          </div>
    
          <div>
            <p className="font-semibold text-[#01B49C]">Email</p>
            <input
              type="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="anurag@gmail.com"
              className="border rounded border-gray-300 w-full p-2"
            ></input>
          </div>

          <div className="mt-5">
            <p className="font-semibold text-[#01B49C]">Password</p>
            <input
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="*******"
              className="border rounded border-gray-300 w-full p-2"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <input className="mt-1" type="checkbox"></input>
              <p className="text-gray-600">remember me</p>
            </div>
            <button className="text-[#003441] font-semibold">
              Forgot Password?
            </button>
          </div>

          <div className="flex mt-10 justify-center">
            <button
              onClick={() => {
                Login();
              }}
              className="bg-[#003441] hover:bg-[#154350] font-semibold py-1 w-full shadow rounded text-white"
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center space-x-2 justify-center">
            <p className="text-[#003441]">Don't have an account</p>
            <button
              onClick={() => {
                navigate("/SignUp");
              }}
              className="text-[#01B49C] font-bold"
            >
              SignUp
            </button>
          </div>


          <hr className="mt-4 mb-2.5 border-gray-300"/>

          <div className="flex text-[#01B49C] items-center justify-center">
            <button
              onClick={() => {
                setopeningRegisterHospital(true);
              }}
              className=""
            >
              Register Hospital
            </button>
            <p className="text-gray-500 mx-3">|</p>
            <button>Privacy Policy</button>
          </div>
        </div>
      </div>

      {openingRegisterHospital && (
        <RegisterHospital
          setopeningRegisterHospital={setopeningRegisterHospital}
        />
      )}
    </div>
  );
}

export default Login;
