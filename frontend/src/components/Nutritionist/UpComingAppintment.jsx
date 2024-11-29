import patient from '../../assets/patient.jpeg'

const UpcomingAppointment = () => {
  return (
    <div className="bg-emerald-100 rounded-lg p-4 mb-8 w-2/5 h-full">
      <h3 className="text-lg font-semibold mb-4">Upcoming Appointment</h3>
      <div className="flex flex-col items-center gap-4">
        <img
          src={patient}
          alt="Patient"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h4 className="text-gray-800 font-medium">Adrian Marshall</h4>
          <p className="text-sm text-gray-500">
            General visit - Today, 10:45 AM
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">
            Chat Now
          </button>
          <button className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg">
            Start Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointment;
