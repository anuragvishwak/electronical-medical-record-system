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
import UserManagement from "./Admin & Receptionist/UserManagement";
import AdminAppointment from "./Admin & Receptionist/AdminAppointment";
import MedicinesTreatment from "./Admin & Receptionist/MedicinesTreatment";
import PatientAppointment from "./Patients/PatientAppointment";
import DoctorAppointment from "./Doctor/DoctorAppointment";
import DoctorPrescription from "./Doctor/DoctorPrescription";
import DoctorConsultation from "./Doctor/DoctorConsultation";
import AssignedLabOrders from "./Lab Technician/AssignedLabOrders";
import UploadTestResults from "./Lab Technician/UploadTestResults";
import DoctorLabReports from "./Doctor/DoctorLabReports";
import NurseVitals from "./Nurse/NurseVitals";
import CheckInCheckOut from "./Nurse/CheckInCheckOut";
import PatientPrescription from "./Patients/PatientPrescription";
import PatientConsultation from "./Patients/PatientConsultation";
import PatientLabReport from "./Patients/PatientLabReport";
import ViewInsuranceInfo from "./Insurance Staff/ViewInsuranceInfo";
import InsuranceProvider from "./Insurance Staff/InsuranceProvider";
import AdminBillingPayment from "./Admin & Receptionist/AdminBillingPayment";
import InsuranceStaffClaimStatus from "./Insurance Staff/InsuranceStaffClaimStatus";
import AdminInsuranceCoordination from "./Admin & Receptionist/AdminInsuranceCoordination";
import PatientInsuranceDetails from "./Patients/PatientInsuranceDetails";
import AdminProfileSetting from "./Admin & Receptionist/AdminProfileSetting";
import PatientProfileSetting from "./Patients/PatientProfileSetting";
import DoctorProfileSetting from "./Doctor/DoctorProfileSetting";
import DoctorBillingFinance from "./Doctor/DoctorBillingFinance";
import DoctorPatients from "./Doctor/DoctorPatients";
import MedicationLogs from "./Nurse/MedicationLogs";
import StaffManagement from "./Admin & Receptionist/StaffManagement";
import InsuranceDeptProfile from "./Insurance Staff/InsuranceDeptProfile";
import PatientMedicalHistory from "./Patients/PatientMedicalHistory";
import PatientPaymentHistory from "./Patients/PatientPaymentHistory";
import NurseProfileUpdateSetting from "./Nurse/NurseProfileUpdateSetting";
import LabTechnicianProfileUpdateSetting from "./Lab Technician/LabTechnicianProfileUpdateSetting";
import InsuranceDeptDashboard from "./Insurance Staff/InsuranceDeptDashboard";
import MainLandingPage from "./MainLandingPage";
import Resource from "./Resource";
import AnimatorPage from "./AnimatorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Only dashboard routes */}
          <Route path="/Login" element={<Login />} />
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
          <Route path="/Resource" element={<Resource />} />
          <Route path="/MedicationLogs" element={<MedicationLogs />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          {/* Internal Routes */}
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/AdminAppointment" element={<AdminAppointment />} />
          <Route path="/MedicinesTreatment" element={<MedicinesTreatment />} />
          <Route path="/PatientAppointment" element={<PatientAppointment />} />
          <Route path="/DoctorAppointment" element={<DoctorAppointment />} />
          <Route path="/DoctorPrescription" element={<DoctorPrescription />} />
          <Route path="/DoctorConsultation" element={<DoctorConsultation />} />
          <Route path="/AssignedLabOrders" element={<AssignedLabOrders />} />
          <Route path="/UploadTestResults" element={<UploadTestResults />} />
          <Route path="/DoctorLabReports" element={<DoctorLabReports />} />
          <Route path="/NurseVitals" element={<NurseVitals />} />
          <Route path="/CheckInCheckOut" element={<CheckInCheckOut />} />
          <Route
            path="/InsuranceDeptDashboard"
            element={<InsuranceDeptDashboard />}
          />
          <Route
            path="/PatientPrescription"
            element={<PatientPrescription />}
          />
          <Route
            path="/PatientConsultation"
            element={<PatientConsultation />}
          />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/PatientLabReport" element={<PatientLabReport />} />
          <Route path="/ViewInsuranceInfo" element={<ViewInsuranceInfo />} />
          <Route path="/InsuranceProvider" element={<InsuranceProvider />} />
          <Route
            path="/AdminBillingPayment"
            element={<AdminBillingPayment />}
          />
          <Route
            path="/InsuranceStaffClaimStatus"
            element={<InsuranceStaffClaimStatus />}
          />
          <Route
            path="/AdminInsuranceCoordination"
            element={<AdminInsuranceCoordination />}
          />
          <Route
            path="/PatientInsuranceDetails"
            element={<PatientInsuranceDetails />}
          />
          <Route
            path="/AdminProfileSetting"
            element={<AdminProfileSetting />}
          />
          <Route
            path="/PatientProfileSetting"
            element={<PatientProfileSetting />}
          />
          <Route
            path="/DoctorProfileSetting"
            element={<DoctorProfileSetting />}
          />
          <Route
            path="/DoctorBillingFinance"
            element={<DoctorBillingFinance />}
          />
          <Route path="/DoctorPatients" element={<DoctorPatients />} />
          <Route
            path="/InsuranceDeptProfile"
            element={<InsuranceDeptProfile />}
          />
          <Route path="/StaffManagement" element={<StaffManagement />} />
          <Route
            path="/PatientMedicalHistory"
            element={<PatientMedicalHistory />}
          />
          <Route
            path="/PatientPaymentHistory"
            element={<PatientPaymentHistory />}
          />
          <Route
            path="/NurseProfileUpdateSetting"
            element={<NurseProfileUpdateSetting />}
          />
          <Route
            path="/LabTechnicianProfileUpdateSetting"
            element={<LabTechnicianProfileUpdateSetting />}
          />
          //created a animated route.
          <Route path="/AnimatorPage" element={<AnimatorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
