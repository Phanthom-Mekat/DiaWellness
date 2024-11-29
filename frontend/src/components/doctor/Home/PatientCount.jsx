/* eslint-disable react/prop-types */
import { FaUsers, FaCalendarCheck, FaReceipt, FaUserCheck } from "react-icons/fa";

const PatientDashboard = () => {
  const data = {
    totalPatients: { count: 978, percentage: 15, isIncrease: true },
    todayPatients: { count: 80, percentage: 15, isIncrease: true },
    todayAppointments: { count: 50, percentage: 20, isIncrease: false },
    treatedPatients: { count: 450, percentage: 5, isIncrease: true },
    totalInvoices: { amount: 9200, percentage: 12, isIncrease: true },
  };

  const StatCard = ({ title, count, percentage, isIncrease, icon }) => (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-md 
                 flex items-center space-x-4 relative overflow-hidden">
      
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 
                        flex items-center justify-center shadow-sm">
          <i className="icon" style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</i>
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <div className="flex items-center space-x-2">
          <p className="text-xl font-bold text-gray-800">{count}</p>
          <span 
            className={`text-xs font-semibold ${
              isIncrease ? "text-green-600" : "text-red-600"
            } flex items-center justify-center`}
          >
            {isIncrease ? "▲" : "▼"} {Math.abs(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      <StatCard
        title="Total Patients"
        count={data.totalPatients.count}
        percentage={data.totalPatients.percentage}
        isIncrease={data.totalPatients.isIncrease}
        icon={<FaUsers />}
      />
      <StatCard
        title="Today's Patients"
        count={data.todayPatients.count}
        percentage={data.todayPatients.percentage}
        isIncrease={data.todayPatients.isIncrease}
        icon={<FaUsers />}
      />
      <StatCard
        title="Appointments"
        count={data.todayAppointments.count}
        percentage={data.todayAppointments.percentage}
        isIncrease={data.todayAppointments.isIncrease}
        icon={<FaCalendarCheck />}
      />
      <StatCard
        title="Treated Patients"
        count={data.treatedPatients.count}
        percentage={data.treatedPatients.percentage}
        isIncrease={data.treatedPatients.isIncrease}
        icon={<FaUserCheck />}
      />
      <StatCard
        title="Total Invoices"
        count={`$${data.totalInvoices.amount}`}
        percentage={data.totalInvoices.percentage}
        isIncrease={data.totalInvoices.isIncrease}
        icon={<FaReceipt />}
      />
    </div>
  );
};

export default PatientDashboard;