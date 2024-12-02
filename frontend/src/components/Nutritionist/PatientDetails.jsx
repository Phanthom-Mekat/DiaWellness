import { useParams } from "react-router-dom";
import { MdFavorite, MdFitnessCenter, MdHeight, MdHealthAndSafety, MdOutlineAccessTime } from "react-icons/md"; // Import icons

const PatientDetails = () => {
  const { id } = useParams();

  const patients = [
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
      // Add other patient objects here...
  ];

  const patient = patients.find((p) => p.id === parseInt(id));

  if (!patient) {
    return <div>Patient not found!</div>;
  }

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6">Patient Details</h2>
      <div className="bg-teal-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center bg-teal-100 px-3 rounded-lg border-[1px] border-teal-200 m-3 gap-6 mb-6">
          <img
            src={patient.picture}
            alt={patient.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h3 className="text-2xl font-bold">{patient.name}</h3>
            <p className="text-sm text-gray-500">{patient.patientType} Patient</p>
            <p className="mt-2">
              <strong>Email:</strong> {patient.email}
            </p>
            <p>
              <strong>Mobile:</strong> {patient.mobile}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold">Details</h4>
            <p>{patient.details}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Notes</h4>
            <p>{patient.notes}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Next Appointment</h4>
            <p>{patient.nextAppointment}</p>
            <p>{patient.appointmentType}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Health Information</h4>
            <ul className="*:mt-1">
              <li className="flex gap-2 mr-2"> <img className="size-5" src="https://img.icons8.com/?size=160&id=cq2rA7c1lXF4&format=png" alt="" /> <strong> Blood Pressure:</strong> {patient.BP}</li>
              <li className="flex gap-2 mr-2" > <img className="size-5" src="https://img.icons8.com/?size=128&id=vwrxEdM2LPB1&format=png" alt="" /><strong>Blood Sugar Level:</strong> {patient.BloodSugarLevel}</li>
              <li className="flex gap-2 mr-2" > <img className="size-5" src="https://img.icons8.com/?size=160&id=RmwURoM0H1BH&format=png" alt="" /><strong>Cholesterol:</strong> {patient.Cholesterol}</li>
              <li className="flex gap-2 mr-2" > <img className="size-5" src="https://img.icons8.com/?size=160&id=h6xWXSNsrpxf&format=png" alt="" /><strong>Height:</strong> {patient.Height}</li>
              <li className="flex gap-2 mr-2" ><img className="size-5" src="https://img.icons8.com/?size=80&id=44737&format=png" alt="" /><strong>Weight:</strong> {patient.Weight}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Goal</h4>
            <p>{patient.Goal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
