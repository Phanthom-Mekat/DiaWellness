

const AppointmentsList = () => {
  const appointments = [
    { name: "Adrian Marshall", type: "General" },
    { name: "Kelly Stevens", type: "Clinic Consulting" },
    { name: "Samuel Anderson", type: "General" },
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
            <span className="text-sm text-gray-500">{appointment.type}</span>
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
