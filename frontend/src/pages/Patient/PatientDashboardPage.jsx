import { useContext, useState } from 'react'
import { FaHeartbeat } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
import Analytics from '../../components/patient/Analytics';
import Appointments from '../../components/patient/Appointments';
import { Context } from '../../provider/ContextProvider';

export default function PatientDashboard() {
  const [selectedUser, setSelectedUser] = useState('Grey')
  const { doctors, loading } = useContext(Context);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 w-full md:w-11/12 mx-auto text-xs md:text-base ">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 md:mb-6 ">
        <h1 className="text-lg md:text-3xl font-bold mb-2 md:mb-0 " >Patient Dashboard</h1>
        <button className="bg-indigo-600 text-white py-1 px-3 text-xs md:py-2 md:px-4 rounded-lg hover:bg-indigo-700 transition-all shadow-sm w-full md:w-auto">
          Book a new Appointment
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6">
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

            <div className="flex flex-col lg:flex-row justify-between gap-2 md:gap-6">
              <div className="grid grid-cols-3 gap-2 w-full lg:w-10/12">
                {/* Heart Rate */}
                <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-red-500 mb-1">
                    <div className="bg-red-100 p-1 rounded-md">
                      <FaHeartbeat className="text-xs md:text-lg" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Heart Rate</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-4xl font-bold">140</span>
                    <div className="text-xs">
                      <span className="text-gray-500">Bpm</span>
                      {/* <span className="text-green-500 ml-1 bg-green-50 px-1 rounded">+2%</span> */}
                    </div>
                  </div>
                </div>

                {/* Body Temperature */}
                <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <div className="bg-yellow-100 p-1 rounded-md">
                      <FaTemperatureHigh className="text-xs md:text-lg" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Temp</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-4xl font-bold">37.5</span>
                    <span className="text-xs text-gray-500">°C</span>
                  </div>
                </div>

                {/* Glucose Level */}
                <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-blue-500 mb-1">
                    <div className="bg-blue-100 p-1 rounded-md">
                      <IoSpeedometer className="text-xs md:text-lg" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">Glucose</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-4xl font-bold">70-90</span>
                    <span className="text-xs text-red-500 bg-red-50 px-1 rounded">-6%</span>
                  </div>
                </div>

                {/* SPO2 */}
                <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-purple-500 mb-1">
                    <div className="bg-purple-100 p-1 rounded-md">
                      <IoIosHeartEmpty className="text-xs md:text-lg" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">SPo2</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-4xl font-bold">96%</span>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-red-500 mb-1">
                    <div className="bg-red-100 p-1 rounded-md">
                      <MdBloodtype className="text-xs md:text-lg" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">BP</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-4xl font-bold">100</span>
                    <div className="text-xs">
                      <span className="text-gray-500">mg/dl</span>
                      {/* <span className="text-green-500 ml-1 bg-green-50 px-1 rounded">+2%</span> */}
                    </div>
                  </div>
                </div>

                {/* BMI */}
                <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-1 text-green-500 mb-1">
                    <div className="bg-green-100 p-1 rounded-md">
                      <IoManSharp className="text-xs md:text-lg" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">BMI</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-4xl font-bold">20.1</span>
                    <span className="text-xs text-gray-500">kg/m²</span>
                  </div>
                </div>
              </div>

              {/* Overall Report */}
              <div className="bg-white rounded-lg hidden p-2 shadow-sm border border-gray-100 w-full lg:w-1/3 md:lex flex-row lg:flex-col items-center justify-between lg:justify-start">
                <div>
                  <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-4">Overall Report</h3>
                  <div className="text-center lg:text-left mb-2">
                    <p className="text-xs text-gray-600">Your health is</p>
                    <p className="text-sm md:text-xl font-semibold text-green-600">95% Normal</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 md:w-28 md:h-28">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="10"
                        strokeDasharray={`${95 * 2.827} ${100 * 2.827}`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-500">Last visit</span>
                      <span className="text-xs md:text-sm font-medium">25 Mar</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 bg-gray-900 text-white py-1 px-2 text-xs md:py-2 md:px-4 rounded-lg hover:bg-gray-800 transition-all shadow-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 italic">
                Report generated on last visit: 25 Mar 2024
              </p>
            </div>
          </div>
        </div>

        {/* Doctors Section */}
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
                    <img src={doctor.Photo} alt="" className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm" />
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
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-xs md:text-base">
            <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1 mb-2">
              <span className="w-1 h-4 md:w-2 md:h-6 bg-indigo-600 rounded-full block"></span>
              Appointments
            </h3>
            <Appointments />
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 text-xs md:text-base">
            <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1 mb-2">
              <span className="w-1 h-4 md:w-2 md:h-6 bg-indigo-600 rounded-full block"></span>
              Analytics
            </h3>
            <Analytics />
          </div>
        </div>
      </div>
    </div>
  )
}