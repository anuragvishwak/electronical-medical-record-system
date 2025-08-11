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
import AdminPatient from "./Admin & Receptionist/AdminPatient";
import UserManagement from "./Admin & Receptionist/UserManagement";
import AdminAppointment from "./Admin & Receptionist/AdminAppointment";
import MedicinesTreatment from "./Admin & Receptionist/MedicinesTreatment";
import PatientAppointment from "./Patients/PatientAppointment";
import DoctorAppointment from "./Doctor/DoctorAppointment";
import DoctorPrescription from "./Doctor/DoctorPrescription";
import DoctorConsultation from "./Doctor/DoctorConsultation";

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

          {/* Internal Routes */}
          <Route path="/AdminPatient" element={<AdminPatient />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/AdminAppointment" element={<AdminAppointment />} />
          <Route path="/MedicinesTreatment" element={<MedicinesTreatment />} />
          <Route path="/PatientAppointment" element={<PatientAppointment />} />
          <Route path="/DoctorAppointment" element={<DoctorAppointment />} />
          <Route path="/DoctorPrescription" element={<DoctorPrescription />} />
          <Route path="/DoctorConsultation" element={<DoctorConsultation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
