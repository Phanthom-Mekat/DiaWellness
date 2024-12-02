import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

const NAppointmentDetails = () => {
  useEffect(() => {
    AOS.init({
      offset: 50, // Adjust the offset value (default is 120)
      duration: 600, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  const { id } = useParams();
  const [appointments, setAppointments] = useState([
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com", // Email
        mobile: "123-456-7890", // Mobile number
        patientType: "New", // Patient type
        details: "John is a new patient suffering from diabetes.", // Patient details
        notes: "Diet consultation for diabetes management", // Notes
        picture: "https://i.postimg.cc/3xCsZy6x/download-31.jpg", // Picture URL
        nextAppointment: "2024-12-04, 10:00 AM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "130/85", // Blood Pressure
        Cholesterol: "220 mg/dL", // Cholesterol level
        BloodSugarLevel: "150 mg/dL", // Blood sugar level
        Height: "5'10\"",
        Weight: "180 lbs",
        Goal: "Control diabetes by following a proper diet", // Goal
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com", // Email
        mobile: "987-654-3210", // Mobile number
        patientType: "Old", // Patient type
        details: "Jane has been a patient for 3 years and is undergoing treatment for high blood pressure.", // Patient details
        notes: "Follow-up on fitness progress", // Notes
        picture: "https://i.postimg.cc/mZj1KVHY/images-14.jpg", // Picture URL
        nextAppointment: "2024-12-05, 2:00 PM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "140/90", // Blood Pressure
        Cholesterol: "180 mg/dL", // Cholesterol level
        BloodSugarLevel: "110 mg/dL", // Blood sugar level
        Height: "5'6\"",
        Weight: "155 lbs",
        Goal: "Maintain a healthy blood pressure and active lifestyle", // Goal
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com", // Email
        mobile: "456-789-1230", // Mobile number
        patientType: "Cured", // Patient type
        details: "Bob has successfully completed his treatment for obesity and is now maintaining a healthy weight.", // Patient details
        notes: "Post-treatment checkup for weight maintenance", // Notes
        picture: "https://i.postimg.cc/3RFR2JhM/download-32.jpg", // Picture URL
        nextAppointment: "2024-12-06, 11:00 AM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "120/80", // Blood Pressure
        Cholesterol: "190 mg/dL", // Cholesterol level
        BloodSugarLevel: "100 mg/dL", // Blood sugar level
        Height: "6'1\"",
        Weight: "190 lbs",
        Goal: "Maintain healthy weight and lifestyle", // Goal
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com", // Email
        mobile: "789-123-4560", // Mobile number
        patientType: "New", // Patient type
        details: "Alice is a new patient seeking advice for a balanced diet and weight loss.", // Patient details
        notes: "Initial consultation for weight loss plan", // Notes
        picture: "https://i.postimg.cc/9FYypCWB/images-15.jpg", // Picture URL
        nextAppointment: "2024-12-07, 9:00 AM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "125/82", // Blood Pressure
        Cholesterol: "195 mg/dL", // Cholesterol level
        BloodSugarLevel: "130 mg/dL", // Blood sugar level
        Height: "5'5\"",
        Weight: "160 lbs",
        Goal: "Lose weight by following a proper diet and exercise plan", // Goal
      },
      {
        id: 5,
        name: "Emily Davis",
        email: "emily@example.com", // Email
        mobile: "321-654-9870", // Mobile number
        patientType: "Old", // Patient type
        details: "Emily has been under treatment for chronic migraines and needs regular checkups.", // Patient details
        notes: "Review progress of migraine treatment", // Notes
        picture: "https://i.postimg.cc/LXWxmRqP/download-33.jpg", // Picture URL
        nextAppointment: "2024-12-10, 1:00 PM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "135/88", // Blood Pressure
        Cholesterol: "210 mg/dL", // Cholesterol level
        BloodSugarLevel: "105 mg/dL", // Blood sugar level
        Height: "5'7\"",
        Weight: "145 lbs",
        Goal: "Manage migraine triggers and maintain overall health", // Goal
      },
      {
        id: 6,
        name: "Michael Thompson",
        email: "michael@example.com", // Email
        mobile: "654-987-3210", // Mobile number
        patientType: "New", // Patient type
        details: "Michael is a new patient diagnosed with high cholesterol and needs lifestyle changes.", // Patient details
        notes: "Initial consultation for cholesterol management", // Notes
        picture: "https://i.postimg.cc/rmWL6hsq/download-34.jpg", // Picture URL
        nextAppointment: "2024-12-11, 3:00 PM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "130/85", // Blood Pressure
        Cholesterol: "250 mg/dL", // Cholesterol level
        BloodSugarLevel: "110 mg/dL", // Blood sugar level
        Height: "5'8\"",
        Weight: "200 lbs",
        Goal: "Lower cholesterol and improve overall health through diet and exercise", // Goal
      },
      {
        id: 7,
        name: "Sophie Miller",
        email: "sophie@example.com", // Email
        mobile: "987-321-6540", // Mobile number
        patientType: "Cured", // Patient type
        details: "Sophie has successfully completed her rehabilitation after knee surgery.", // Patient details
        notes: "Post-surgery follow-up for knee rehabilitation", // Notes
        picture: "https://i.postimg.cc/3xCsZy6x/download-31.jpg", // Picture URL
        nextAppointment: "2024-12-12, 9:30 AM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "120/80", // Blood Pressure
        Cholesterol: "180 mg/dL", // Cholesterol level
        BloodSugarLevel: "90 mg/dL", // Blood sugar level
        Height: "5'4\"",
        Weight: "135 lbs",
        Goal: "Maintain mobility and physical health after knee surgery", // Goal
      },
      {
        id: 8,
        name: "David Wilson",
        email: "david@example.com", // Email
        mobile: "321-987-6540", // Mobile number
        patientType: "Old", // Patient type
        details: "David has been receiving treatment for his asthma and needs regular follow-ups.", // Patient details
        notes: "Checkup for asthma control and medication review", // Notes
        picture: "https://i.postimg.cc/3RFR2JhM/download-32.jpg", // Picture URL
        nextAppointment: "2024-12-15, 10:00 AM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "125/78", // Blood Pressure
        Cholesterol: "220 mg/dL", // Cholesterol level
        BloodSugarLevel: "95 mg/dL", // Blood sugar level
        Height: "5'9\"",
        Weight: "170 lbs",
        Goal: "Control asthma symptoms with medication and lifestyle changes", // Goal
      },
      {
        id: 9,
        name: "Charlotte Green",
        email: "charlotte@example.com", // Email
        mobile: "543-210-9876", // Mobile number
        patientType: "New", // Patient type
        details: "Charlotte is a new patient seeking advice on managing stress and mental well-being.", // Patient details
        notes: "Initial consultation for stress management and counseling", // Notes
        picture: "https://i.postimg.cc/mZj1KVHY/images-14.jpg", // Picture URL
        nextAppointment: "2024-12-18, 11:00 AM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "118/75", // Blood Pressure
        Cholesterol: "200 mg/dL", // Cholesterol level
        BloodSugarLevel: "105 mg/dL", // Blood sugar level
        Height: "5'6\"",
        Weight: "150 lbs",
        Goal: "Reduce stress and improve mental well-being through counseling", // Goal
      }
  ]);

  const appointment = appointments.find((appt) => appt.id === parseInt(id, 10));

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointment.id
          ? {
              ...appt,
              nextAppointment: `${formData.date}, ${formData.time}`,
              notes: formData.notes,
            }
          : appt
      )
    );
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (!appointment) return <div>Appointment not found!</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8" data-aos="fade-down">
        {`${appointment.name}'s Appointment Details`}
      </h2>

      <div className="flex items-center gap-6 mb-8" data-aos="fade-right" data-aos-delay="100">
        <img
          src={appointment.picture}
          alt={appointment.name}
          className="w-32 h-32 rounded-full border-4 border-teal-500"
          data-aos="zoom-in"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-700">{appointment.name}</h3>
          <p className="text-gray-600">Next Appointment:</p>
          <p className="text-teal-500 font-semibold text-lg">
            {appointment.nextAppointment}
          </p>
          <p className="text-gray-600 mt-2">{appointment.details}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-6 mb-6" data-aos="">
        <button
          onClick={() => {
            setShowModal(true);
            setFormData({
              date: appointment.nextAppointment.split(",")[0],
              time: appointment.nextAppointment.split(",")[1],
              notes: appointment.notes,
            });
          }}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
        >
          <FaEdit /> Reschedule Appointment
        </button>
      </div>

      {/* Appointment Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Appointment Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-600">Appointment Type:</p>
            <p>{appointment.appointmentType}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Patient Type:</p>
            <p>{appointment.patientType}</p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-600">Blood Sugar Level:</p>
            <p>{appointment.BloodSugarLevel}</p>
          </div>
          
          <div>
            <p className="font-semibold text-gray-600">Goal:</p>
            <p>{appointment.Goal}</p>
          </div>
        </div>
      </div>

      

      {/* Modal for editing/scheduling appointment */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Appointment</h3>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border p-2 rounded-lg w-full mb-4"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="border p-2 rounded-lg w-full mb-4"
            />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional Notes"
              className="border p-2 rounded-lg w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NAppointmentDetails;
