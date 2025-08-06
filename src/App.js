import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import PatientDashboard from "./Patients/PatientDashboard";
import DoctorDashboard from "./Doctor/DoctorDashboard";
import NurseDashboard from "./Nurse/NurseDashboard";
import LabTechnicianDashboard from "./Lab Technician/LabTechnicianDashboard";
import InsuranceStaffDashboard from "./Insurance Staff/InsuranceStaffDashboard";
import AdminDashboard from "./Admin & Receptionist/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Only dashboard routes */}
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/PatientDashboard" element={<PatientDashboard />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/NurseDashboard" element={<NurseDashboard />} />
          <Route
            path="/LabTechnicianDashboard"
            element={<LabTechnicianDashboard />}
          />
          <Route
            path="/InsuranceStaffDashboard"
            element={<InsuranceStaffDashboard />}
          />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
