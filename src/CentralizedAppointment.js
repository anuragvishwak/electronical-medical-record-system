import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { database } from "./FirebaseConfiguration";
import { useEffect, useState } from "react";
import { MdDateRange, MdDelete } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import CreatingPrescription from "./Doctor/CreatingPrescription";
import CreateConsultationForm from "./Doctor/CreateConsultationForm";
import UpdateAppointmentForm from "./Admin & Receptionist/UpdateAppointmentForm";
import { FaPencil } from "react-icons/fa6";
import { supabase } from "./SupabaseClient";

function CentralizedAppointment({
  email,
  capturingAppointmentObject,
  setcapturingAppointmentObject,
  setopeningAppointmentUpdateForm,
  openingAppointmentUpdateForm,
}) {
  const [gettingAppointments, setgettingAppointments] = useState([]);
  const [openingPrescriptionForm, setopeningPrescriptionForm] = useState(false);
  const location = useLocation();
  const [capturingDataObject, setcapturingDataObject] = useState({});
  const [openingCreateConsultationForm, setopeningCreateConsultationForm] =
    useState(false);
  const [gettingUser, setgettingUser] = useState([]);
  const [openingUploadImage, setopeningUploadImage] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages(previews);
  };

  const handleUpload = async () => {
    if (!previewImages.length) return alert("No images selected.");
    if (!capturingDataObject?.id) return alert("No appointment found.");

    console.log("Finding appointment ID:", capturingDataObject.id);
    setUploading(true);

    try {
      const appointmentId = capturingDataObject.id;
      const uploadedUrls = [];

      for (const { file } of previewImages) {
        const filePath = `${appointmentId}/${Date.now()}-${file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("emr_images")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          console.error(uploadError);
          alert(`Upload failed for ${file.name}`);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("emr_images").getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      const appointmentRef = doc(
        database,
        "appointment_database",
        appointmentId
      );
      await updateDoc(appointmentRef, { treatmentImages: uploadedUrls });

      alert("✅ Images uploaded successfully!");
      setPreviewImages([]);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  async function renderingAppointments() {
    const taskDetails = await getDocs(
      collection(database, "appointment_database")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingAppointments(multipleArray);
  }

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  useEffect(() => {
    renderingAppointments();
    renderingUser();
  }, []);

  let filteredAppointments = [];

  if (location.pathname === "/PatientAppointment") {
    console.log("Filtering for Patient Appointment");
    filteredAppointments = gettingAppointments.filter(
      (appointment) => appointment.patient === email
    );
  } else if (location.pathname === "/DoctorAppointment") {
    filteredAppointments = gettingAppointments.filter(
      (appointment) => appointment.doctor === email
    );
  } else {
    console.log("No specific filter applied");
    filteredAppointments = gettingAppointments;
  }

  async function updateVisitStatus(appointmentId, visitStatus) {
    try {
      const appointmentRef = doc(
        database,
        "appointment_database",
        appointmentId
      );

      let payload = { visitvisitStatus: visitStatus };

      if (visitStatus === "Checked-In") {
        payload.checkInTime = new Date().toISOString();
      }

      if (visitStatus === "Checked-Out") {
        payload.checkOutTime = new Date().toISOString();
      }

      await updateDoc(appointmentRef, payload);

      console.log("Visit status updated successfully!");
      renderingAppointments();
    } catch (error) {
      console.error("Error updating visit visitStatus:", error.message);
    }
  }

  return (
    <div>
      <div className={`grid grid-cols-3 m-5 gap-5`}>
        {filteredAppointments?.map((appointment) => (
          <div className="bg-white border border-gray-300 p-5">
            <div className="flex items-start justify-between">
              <div className="text-sm">
                <div className="flex items-center space-x-1">
                  <BsClock />
                  <p>{appointment.time}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <MdDateRange />
                  <p>
                    {appointment.createdAt
                      ? new Date(
                          appointment.createdAt.seconds * 1000
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No Date"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  // onChange={(e) => {
                  //   setstatus(e.target.value);
                  // }}
                  className="border text-sm  border-gray-300 w- p-1"
                >
                  <option>Select Status</option>
                  <option value={"scheduled"}>Scheduled</option>
                  <option value={"completed"}>Completed</option>
                  <option value={"cancelled"}>Cancelled</option>
                </select>
                <button
                  onClick={() => {
                    setcapturingDataObject(appointment);
                    setopeningUploadImage(true);
                  }}
                  className="text-sm hidden bg-[#003441] text-white py-1 px-3"
                >
                  Upload Images
                </button>

                {location.pathname !== "/NurseVitals" &&
                  location.pathname !== "/PatientAppointment" &&
                  location.pathname !== "/CheckInCheckOut" && (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setopeningAppointmentUpdateForm(true);
                          setcapturingAppointmentObject(appointment);
                        }}
                        className="text-[#003441]"
                      >
                        <FaPencil />
                      </button>
                      <button className="text-[#01B49C]">
                        <MdDelete size={19} />
                      </button>
                    </div>
                  )}

                {location.pathname === "/CheckInCheckOut" && (
                  <select
                    value={appointment.visitStatus || "Not Arrived"}
                    onChange={(e) =>
                      updateVisitStatus(appointment.id, e.target.value)
                    }
                    className="border rounded border-gray-300 text-sm p-1"
                  >
                    <option value="Not Arrived">Not Arrived</option>
                    <option value="Checked-In">Checked-In</option>
                    <option value="In Consultation">In Consultation</option>
                    <option value="Checked-Out">Checked-Out</option>
                  </select>
                )}
              </div>
            </div>

            <hr className="my-3 border-gray-300" />
            {gettingUser
              .filter((user) => user.email === appointment.doctor)
              .map((user) => (
                <p className="font-semibold text-[#01B49C]">
                  <span className="font-[300] text-sm">Patient:</span>{" "}
                  {user?.name}
                </p>
              ))}

            <hr className="my-5 border-gray-300" />

            <p className="bg-gray-50 h-20 rounded border border-gray-300 p-3">
              <span className="text-gray-400">Note:</span>{" "}
              <span className="text-black">{appointment.additionalNote}</span>
            </p>

            {location.pathname !== "/NurseVitals" &&
              location.pathname !== "/PatientAppointment" &&
              location.pathname !== "/CheckInCheckOut" && (
                <>
                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      onClick={() => {
                        setcapturingDataObject(appointment);
                        setopeningPrescriptionForm(true);
                      }}
                      className="bg-[#003441] text-sm text-white py-1.5 w-full hover:bg-blue-800 "
                    >
                      + Create Prescription
                    </button>

                    <button
                      onClick={() => {
                        setcapturingDataObject(appointment);
                        setopeningCreateConsultationForm(true);
                      }}
                      className="bg-[#01B49C] text-sm text-white py-1.5 w-full hover:bg-blue-800 "
                    >
                      + Create Consultation
                    </button>
                  </div>

                  <div>
                    <p className="text-[#003441] mt-5 mb-2 text-xl font-bold">
                      Additional Images
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                      {appointment.images?.map((img) => (
                        <img src={img} className="h-40 border w-full"/>
                      ))}
                    </div>
                  </div>
                </>
              )}
          </div>
        ))}
      </div>

      {openingPrescriptionForm && (
        <CreatingPrescription
          setopeningPrescriptionForm={setopeningPrescriptionForm}
          appointment={capturingDataObject}
        />
      )}

      {openingCreateConsultationForm && (
        <CreateConsultationForm
          setopeningCreateConsultationForm={setopeningCreateConsultationForm}
          appointment={capturingDataObject}
        />
      )}

      {openingAppointmentUpdateForm && (
        <UpdateAppointmentForm
          setopeningAppointmentUpdateForm={setopeningAppointmentUpdateForm}
          capturingAppointmentObject={capturingAppointmentObject}
          renderingAppointments={renderingAppointments}
        />
      )}

      {openingUploadImage && (
        <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
          <div className="bg-white p-5 w-[90%] sm:w-[400px] shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#003441] text-xl font-bold">Upload Images</p>
              <button
                onClick={() => setopeningUploadImage(false)}
                className="text-red-500 font-semibold"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4 border-2 border-dashed border-gray-400 bg-gray-50 max-w-lg mx-auto">
              <label className="cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-400 bg-white hover:bg-gray-100 transition">
                <span className="text-gray-600 font-medium">
                  Click or drag to select images
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleSelectImages}
                />
              </label>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.url}
                        alt={`Preview ${index}`}
                        className="rounded-lg w-full h-28 object-cover border border-gray-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {previewImages.length > 0 && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {uploading ? "Uploading..." : "Upload to Supabase"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CentralizedAppointment;
