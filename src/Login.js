import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./FirebaseConfiguration";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function Login() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gettingUsers, setgettingUsers] = useState([]);

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

      console.log("finding user", user)

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

      if (status === "approved") {
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome, ${role.replace("_", " ")}`,
          life: 3000,
        });
        localStorage.setItem("email", email);
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
              navigate("/InsuranceStaffDashboard");
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
    <div className="flex bg-[#ddeeff] justify-center items-center w-full h-screen">
      <Toast ref={toast} />
      <div>
        <div className="border m-5 sm:m-0 sm:w-[430px] bg-white border-gray-300 shadow-lg p-6 rounded-lg">
          <div className="text-center mb-10">
            <p className="text-2xl font-bold">Login</p>
            <p className="text-gray-600">
              Access your medical records securely
            </p>
          </div>

          <p className="text-[#1976D2] mb-3 bg-blue-50 rounded-lg p-2 border border-[#1976D2]">
            This is a secure medical system. All access is logged and monitored.
          </p>
          <div>
            <p className="font-semibold text-[#1976D2]">Email</p>
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
            <p className="font-semibold text-[#1976D2]">Password</p>
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
            <button className="text-blue-700 font-semibold">
              Forgot Password?
            </button>
          </div>

          <div className="flex mt-10 justify-center">
            <button
              onClick={() => {
                Login();
              }}
              className="bg-[#1976D2] hover:bg-blue-800 font-semibold py-1 w-full shadow rounded text-white"
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <p className="text-gray-600">Don't have an account</p>
            <button
              onClick={() => {
                navigate("/SignUp");
              }}
              className="text-[#1976D2] font-semibold"
            >
              SignUp
            </button>
          </div>

          <div className="flex text-[#1976D2] items-center mt-5 justify-center">
            <button className="">Technical Support</button>
            <p className="text-gray-500 mx-3">|</p>
            <button>Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
