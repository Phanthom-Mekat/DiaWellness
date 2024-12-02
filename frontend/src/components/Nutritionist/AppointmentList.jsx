

const AppointmentsList = () => {
  const appointments = [
    
   
    {
      id: 5,
      name: "Emily Davis",
      email: "emily@example.com", // Email
      mobile: "321-654-9870", // Mobile number
      patientType: "Old", // Patient type
      details: "Emily has been under treatment for chronic migraines and needs regular checkups.", // Patient details
      notes: "Review progress of migraine treatment", // Notes
      picture: "https://via.placeholder.com/100", // Picture URL
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
      picture: "https://via.placeholder.com/100", // Picture URL
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
      picture: "https://via.placeholder.com/100", // Picture URL
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
      picture: "https://via.placeholder.com/100", // Picture URL
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
      picture: "https://via.placeholder.com/100", // Picture URL
      nextAppointment: "2024-12-18, 11:00 AM", // Next appointment details
      appointmentType: "Clinic Consulting", // Appointment type
      BP: "118/75", // Blood Pressure
      Cholesterol: "200 mg/dL", // Cholesterol level
      BloodSugarLevel: "105 mg/dL", // Blood sugar level
      Height: "5'6\"",
      Weight: "150 lbs",
      Goal: "Reduce stress and improve mental well-being through counseling", // Goal
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-3/5 h-fit">
      <h3 className="text-lg font-semibold mb-4"> Today's Appointments</h3>
      <ul className="space-y-4">
        {appointments.map((appointment, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2 last:border-none"
          >
            <span className="font-medium">{appointment.name}</span>
            <span className="text-sm text-gray-500">{appointment.appointmentType}</span>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white text-sm px-2 py-1 rounded-lg">
                ✔
              </button>
              <button className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg">
                ✘
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
