import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

const NAppointments = () => {
    useEffect(() => {
      AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    }, []);
  
    const appointments = [

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
      // Your appointments data here...
    ];
  
    const navigate = useNavigate();
  
    const [filter, setFilter] = useState("all");
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [declinedCount, setDeclinedCount] = useState(0);
  
    const [status, setStatus] = useState(
      appointments.reduce((acc, appointment) => {
        acc[appointment.id] = { accepted: false, declined: false };
        return acc;
      }, {})
    );
  
    const filterAppointments = (appointments, filter) => {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
  
      return appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.nextAppointment.split(",")[0]);
        if (filter === "today") {
          return (
            appointmentDate.getDate() === today.getDate() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getFullYear() === today.getFullYear()
          );
        } else if (filter === "nextWeek") {
          return (
            appointmentDate > today &&
            appointmentDate <= nextWeek &&
            appointmentDate.getFullYear() === today.getFullYear()
          );
        } else {
          return true;
        }
      });
    };
  
    const filteredAppointments = filterAppointments(appointments, filter);
  
    const handleAccept = (id) => {
      setStatus((prevStatus) => {
        const newStatus = { ...prevStatus, [id]: { accepted: true, declined: false } };
        setAcceptedCount((prevCount) => prevCount + 1);
        return newStatus;
      });
    };
  
    const handleDecline = (id) => {
      setStatus((prevStatus) => {
        const newStatus = { ...prevStatus, [id]: { accepted: false, declined: true } };
        setDeclinedCount((prevCount) => prevCount + 1);
        return newStatus;
      });
    };
  
    return (
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800" data-aos="fade-up">
            <FaCalendarAlt className="mr-3 text-teal-500" />
            Appointments
          </h2>
          <div className="mb-6 flex gap-4" data-aos="fade-up">
            <button
              className={`px-3 py-1 text-white rounded-lg ${filter === "today" ? "bg-teal-600" : "bg-teal-300 hover:bg-teal-400"}`}
              onClick={() => setFilter("today")}
            >
              Today's Appointments
            </button>
            <button
              className={`px-3 py-1 text-white rounded-lg ${filter === "nextWeek" ? "bg-teal-600" : "bg-teal-300 hover:bg-teal-400"}`}
              onClick={() => setFilter("nextWeek")}
            >
              Next Week's Appointments
            </button>
            <button
              className={`px-3 py-1 text-white rounded-lg ${filter === "all" ? "bg-teal-600" : "bg-teal-300 hover:bg-teal-400"}`}
              onClick={() => setFilter("all")}
            >
              All Appointments
            </button>
          </div>
        </div>
  
        {/* Accepted and Declined Count */}
        <div className="flex gap-10 m-5 text-lg font-semibold text-teal-600"data-aos="fade-up">
          <h1>Accepted: {acceptedCount}</h1>
          <h1>Declined: {declinedCount}</h1>
        </div>
  
        {/* Appointments List */}
        <div className="flex flex-col gap-6" data-aos="fade-up">
          {filteredAppointments.map((appointment) => {
            const appointmentStatus = status[appointment.id] || { accepted: false, declined: false }; // Fallback to default status if not found
            return (
              <div
                key={appointment.id}
                className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-6 hover:shadow-2xl transition duration-300 ease-in-out"
                data-aos=""
                data-aos-delay={appointment.id * 100}
              >
                <div className="flex-shrink-0">
                  <img
                    src={appointment.picture}
                    alt={appointment.name}
                    className="w-24 h-24 rounded-full border-2 border-teal-500"
                  />
                </div>
  
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{appointment.name}</h3>
                  <p className="text-gray-500 text-sm">Next Appointment:</p>
                  <p className="text-teal-500 font-medium text-sm">{appointment.nextAppointment}</p>
                  <p className="text-gray-500 text-sm">Appointment: {appointment.appointmentType}</p>
                </div>
  
                <div className="flex gap-4">
                  {/* Accept Button */}
                  {!appointmentStatus.accepted && !appointmentStatus.declined && (
                    <button
                      className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                      onClick={() => handleAccept(appointment.id)}
                    >
                      <FaCheck className="mr-2" />
                      Accept
                    </button>
                  )}
                  {appointmentStatus.accepted && (
                    <button
                      disabled
                      className="flex items-center bg-teal-300 text-white px-4 py-2 rounded-lg"
                    >
                      Accepted
                    </button>
                  )}
  
                  {/* Decline Button */}
                  {!appointmentStatus.accepted && !appointmentStatus.declined && (
                    <button
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleDecline(appointment.id)}
                    >
                      <FaTimes className="mr-2" />
                      Decline
                    </button>
                  )}
                  {appointmentStatus.declined && (
                    <button
                      disabled
                      className="flex items-center bg-red-300 text-white px-4 py-2 rounded-lg"
                    >
                      Declined
                    </button>
                  )}
  
                  {/* View Details Button */}
                  <button
                    onClick={() => navigate(`/nutritionist/appointments/${appointment.id}`)}
                    className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                  >
                    <FaEye className="mr-2" />
                    View Appointment Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default NAppointments;
  