/* eslint-disable react/prop-types */
import {  FaUserInjured } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 
                        flex items-center justify-center shadow-sm">
          {typeof icon === "string" ? (
            <img src={icon} alt={title} className="w-full h-full object-contain" />
          ) : (
            icon
          )}
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
        icon={<FaUserInjured size={25} />}
      />
      <StatCard
        title="Today's Patients"
        count={data.todayPatients.count}
        percentage={data.todayPatients.percentage}
        isIncrease={data.todayPatients.isIncrease}
        icon={  <DotLottieReact
          src="https://lottie.host/e85e0a14-ba83-4aa7-9ea9-b4af77a7ccf6/rzjOYMx2lJ.lottie"
          loop
          autoplay
          speed={1.5} 
          style={{ width: "48px", height: "48px" }}
        />  }
      />
      <StatCard
        title="Appointments"
        count={data.todayAppointments.count}
        percentage={data.todayAppointments.percentage}
        isIncrease={data.todayAppointments.isIncrease}
        icon={
          <DotLottieReact
          src="https://lottie.host/75574bd1-ffca-4785-a92b-ade959f724b8/tZbVM9fHvx.lottie"
          loop
          autoplay
          style={{ width: "80px", height: "60px" }}
        />  
        }
      />
      <StatCard
        title="Treated Patients"
        count={data.treatedPatients.count}
        percentage={data.treatedPatients.percentage}
        isIncrease={data.treatedPatients.isIncrease}
        icon={
          <DotLottieReact
            src="https://lottie.host/972c1798-46e2-4adf-a2cc-28e208c68498/WWezZgbcdM.lottie"
            loop
            speed={2}
            autoplay
            style={{ width: 50, height: 50 }}
          />
        }
      />
      <StatCard
        title="Total Invoices"
        count={`$${data.totalInvoices.amount}`}
        percentage={data.totalInvoices.percentage}
        isIncrease={data.totalInvoices.isIncrease}
        icon={<DotLottieReact
          src="https://lottie.host/cedc5e72-2dfd-4797-a106-eaf037f0a8b0/Y6qKRNjSIU.lottie"
          loop
          autoplay
          style={{ width: "80px", height: "100px", background: "none" }}
        />}
      />
    </div>
  );
};

export default PatientDashboard;
