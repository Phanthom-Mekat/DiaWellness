
import { FaUser, FaCalendarDay, FaClipboardList, FaUserCheck, FaDollarSign } from "react-icons/fa";

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "679",
      change: "+15%",
      positive: true,
      icon: <FaUser className="text-teal-500 text-3xl mb-3" />,
    },
    {
      title: "Today's Patients",
      value: "23",
      change: "+15%",
      positive: true,
      icon: <FaCalendarDay className="text-teal-500 text-3xl mb-3" />,
    },
    {
      title: "Appointments",
      value: "15",
      change: "-20%",
      positive: false,
      icon: <FaClipboardList className="text-teal-500 text-3xl mb-3" />,
    },
    {
      title: "Treated Patients",
      value: "340",
      change: "+5%",
      positive: true,
      icon: <FaUserCheck className="text-teal-500 text-3xl mb-3" />,
    },
    {
      title: "Total Invoices",
      value: "$7800",
      change: "+12%",
      positive: true,
      icon: <FaDollarSign className="text-teal-500 text-3xl mb-3" />,
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 text-center transform transition duration-300 ease-in-out hover:scale-105 hover:bg-teal-50 hover:shadow-lg flex flex-col items-center"
        >
          {stat.icon}
          <h4 className="text-gray-700 font-medium">{stat.title}</h4>
          <p className="text-xl font-semibold mt-2">
            {stat.value}
            <span
              className={`text-sm ml-2 ${
                stat.positive ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </span>
          </p>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
