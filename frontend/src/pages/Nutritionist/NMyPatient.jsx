import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const NMyPatient = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([
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
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 600, offset: 50, easing: "ease-in-out", once: true });
  }, []);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    if (filterType === "All") {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(patients.filter((patient) => patient.patientType === filterType));
    }
  };

  return (
    <div className="p-8 bg-gray-50" data-aos="fade-right" data-aos-delay="100">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-200 p-6 rounded-xl shadow-xl text-center transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800">Total Patients</h3>
          <p className="text-2xl font-bold text-gray-900">679</p>
        </div>
        <div className="bg-green-200 p-6 rounded-xl shadow-xl text-center transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800">New Patients</h3>
          <p className="text-2xl font-bold text-gray-900">339</p>
        </div>
        <div className="bg-yellow-200 p-6 rounded-xl shadow-xl text-center transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800">Cured Patients</h3>
          <p className="text-2xl font-bold text-gray-900">340</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => handleFilterChange("All")}
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${filter === "All" ? "bg-indigo-400 text-white" : "bg-transparent text-indigo-500 border-2 border-indigo-600"} hover:bg-indigo-600 hover:text-white transition-all`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("New")}
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${filter === "New" ? "bg-green-400 text-white" : "bg-transparent text-green-500 border-2 border-green-400"} hover:bg-green-600 hover:text-white transition-all`}
        >
          New
        </button>
        <button
          onClick={() => handleFilterChange("Old")}
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${filter === "Old" ? "bg-yellow-300 text-white" : "bg-transparent text-yellow-400 border-2 border-yellow-300"} hover:bg-yellow-400 hover:text-white transition-all`}
        >
          Old
        </button>
        <button
          onClick={() => handleFilterChange("Cured")}
          className={`px-6 py-2 text-lg font-semibold rounded-lg ${filter === "Cured" ? "bg-blue-400 text-white" : "bg-transparent text-blue-400 border-2 border-blue-400"} hover:bg-blue-600 hover:text-white transition-all`}
        >
          Cured
        </button>
      </div>

      {/* Patients Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <img
                src={patient.picture}
                alt={patient.name}
                className="w-16 h-16 rounded-full border-2 border-gray-300"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
                <p className="text-sm text-gray-500">{patient.email}</p>
                <p className="text-sm text-gray-500">{patient.mobile}</p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">
              Type:{" "}
              <span
                className={
                  patient.patientType === "New"
                    ? "text-green-600"
                    : patient.patientType === "Cured"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }
              >
                {patient.patientType}
              </span>
            </p>
            <button
              onClick={() => navigate(`/nutritionist/myPatients/${patient.id}`)}
              className="mt-4 px-5 py-2 bg-indigo-300 text-white rounded-lg hover:bg-indigo-500 transition-all"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 text-lg font-semibold text-indigo-600 bg-transparent border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
          View More
        </button>
      </div>
    </div>
  );
};

export default NMyPatient;
