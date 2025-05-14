import React, { useContext, useState, useEffect } from 'react';
import { FaHeartbeat, FaTemperatureHigh } from "react-icons/fa";
import { IoSpeedometer, IoManSharp } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import axios from 'axios';
import Analytics from '../../components/patient/Analytics';
import Appointments from '../../components/patient/Appointments';
import { Context } from '../../provider/ContextProvider';

export default function PatientDashboard() {
  const [selectedUser, setSelectedUser] = useState('Grey');
  const [latestHealthData, setLatestHealthData] = useState(null);
  const [healthDataLoading, setHealthDataLoading] = useState(true);
  const { doctors, loading } = useContext(Context);

  // Fetch latest health data
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setHealthDataLoading(true);
        const response = await axios.get('http://localhost:5000/health-data/latest', {
          params: { patientId: 100000 } // Replace with dynamic patient ID
        });
        setLatestHealthData(response.data);
      } catch (error) {
        console.error('Error fetching health data:', error);
      } finally {
        setHealthDataLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No data available';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 w-full md:w-11/12 mx-auto text-xs md:text-base">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 md:mb-6">
        <h1 className="text-lg md:text-3xl font-bold mb-2 md:mb-0">Patient Dashboard</h1>
        <button className="bg-indigo-600 text-white py-1 px-3 text-xs md:py-2 md:px-4 rounded-lg hover:bg-indigo-700 transition-all shadow-sm w-full md:w-auto">
          Book a new Appointment
        </button>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6">
        {/* Left Column - Health Metrics */}
        <div className="lg:col-span-2 space-y-3 md:space-y-6">
          {/* Health Records Card */}
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              <h2 className="text-sm md:text-xl font-semibold flex items-center gap-1">
                <span className="w-1 h-4 md:w-2 md:h-6 bg-indigo-600 rounded-full block"></span>
                Health Records
              </h2>
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all text-xs">
                <img src="/janeDoe.jpg" alt="" className="w-5 h-5 md:w-8 md:h-8 rounded-full object-cover border-2 border-white shadow-sm" />
                <span className="font-medium">{selectedUser}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {healthDataLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {/* Heart Rate */}
                  <HealthMetricCard 
                    icon={<FaHeartbeat />}
                    color="text-red-500"
                    bgColor="bg-red-100"
                    label="Heart Rate"
                    value={latestHealthData?.HeartRate}
                    unit="Bpm"
                    isLoading={healthDataLoading}
                  />

                  {/* Body Temperature */}
                  <HealthMetricCard 
                    icon={<FaTemperatureHigh />}
                    color="text-yellow-500"
                    bgColor="bg-yellow-100"
                    label="Temperature"
                    value={latestHealthData?.BodyTemperature}
                    unit="°C"
                    isLoading={healthDataLoading}
                  />

                  {/* Glucose Level */}
                  <HealthMetricCard 
                    icon={<IoSpeedometer />}
                    color="text-blue-500"
                    bgColor="bg-blue-100"
                    label="Glucose"
                    value={latestHealthData?.GlucoseLevel}
                    unit="mg/dL"
                    isLoading={healthDataLoading}
                  />

                  {/* SPO2 */}
                  <HealthMetricCard 
                    icon={<IoIosHeartEmpty />}
                    color="text-purple-500"
                    bgColor="bg-purple-100"
                    label="SPO2"
                    value={latestHealthData?.SpO2}
                    unit="%"
                    isLoading={healthDataLoading}
                  />

                  {/* Blood Pressure */}
                  <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-1 text-red-500 mb-1">
                      <div className="bg-red-100 p-1 rounded-md">
                        <MdBloodtype className="text-xs md:text-lg" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Blood Pressure</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg md:text-4xl font-bold">
                        {latestHealthData?.BloodPressureSystolic || '--'}
                        {latestHealthData?.BloodPressureDiastolic ? `/${latestHealthData.BloodPressureDiastolic}` : ''}
                      </span>
                      <span className="text-xs text-gray-500">mmHg</span>
                    </div>
                  </div>

                  {/* BMI */}
                  <HealthMetricCard 
                    icon={<IoManSharp />}
                    color="text-green-500"
                    bgColor="bg-green-100"
                    label="BMI"
                    value="--" // Would need weight/height data
                    unit="kg/m²"
                    isLoading={healthDataLoading}
                  />
                </div>

                <div className="mt-2">
                  <p className="text-xs text-gray-500 italic">
                    Last updated: {formatDate(latestHealthData?.Date)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Doctors */}
        <div className="space-y-3 md:space-y-6">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1">
                <span className="w-1 h-4 md:w-2 md:h-6 bg-indigo-600 rounded-full block"></span>
                Doctors
              </h3>
              <button className="text-indigo-600 text-xs md:text-sm hover:text-indigo-800 font-medium transition-all flex items-center gap-1">
                View All
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {doctors.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-all border border-gray-100">
                  <div className="flex items-center gap-2">
                    <img src={doctor.Photo} alt={doctor.Name} className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                      <p className="font-medium text-xs md:text-base">{doctor.Name}</p>
                      <p className="text-xs text-gray-600">{doctor.Speciality}</p>
                    </div>
                  </div>
                  <button className="p-1 md:p-2 hover:bg-white rounded-lg text-indigo-600 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14m7-7H5" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-2 md:gap-6 mt-2 md:mt-6">
        {/* Appointments */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-xs md:text-base">
            <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1 mb-2">
              <span className="w-1 h-4 md:w-2 md:h-6 bg-indigo-600 rounded-full block"></span>
              Appointments
            </h3>
            <Appointments />
          </div>
        </div>

        {/* Analytics */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-xs md:text-base">
            <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1 mb-2">
              <span className="w-1 h-4 md:w-2 md:h-6 bg-indigo-600 rounded-full block"></span>
              Analytics
            </h3>
            <Analytics healthData={latestHealthData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Health Metric Card Component
function HealthMetricCard({ icon, color, bgColor, label, value, unit, isLoading }) {
  return (
    <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center gap-1 mb-1">
        <div className={`${bgColor} p-1 rounded-md`}>
          {React.cloneElement(icon, { className: `text-xs md:text-lg ${color}` })}
        </div>
        <span className="text-xs text-gray-600 font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg md:text-4xl font-bold">
          {isLoading ? '--' : (value || '--')}
        </span>
        <span className="text-xs text-gray-500">{unit}</span>
      </div>
    </div>
  );
}