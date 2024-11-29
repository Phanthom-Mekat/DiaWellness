import { useContext, useState } from 'react'
import { FaHeartbeat } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
import Analytics from '../../components/patient/Analytics';
// import PastAppointments from '../../components/doctor/patient/PastAppointments';
import Appointments from '../../components/patient/Appointments';
import { Context } from '../../provider/ContextProvider';
export default function PatientDashboard() {
  const [selectedUser, setSelectedUser] = useState('Grey')
  const {doctors,loading} = useContext(Context);

  if (loading) {
    return <p>Loading doctors...</p>; // Loader
  }


  // const favorites = [
  //   { name: 'Dr. Edalin', specialty: 'Endodontists'  , image: '/public/founder.jpg'},
  //   { name: 'Dr. Maloney', specialty: 'Cardiologist'  , image: '/public/johnDoe.jpg'},
  //   { name: 'Dr. Wayne', specialty: 'Dental Specialist'  , image: '/public/founder.jpg'},
  //   { name: 'Dr. Maria', specialty: 'Endodontists' , image: '/public/johnDoe.jpg'},
  //   { name: 'Dr. Maria', specialty: 'Endodontists' , image: '/public/founder.jpg' },
  //   { name: 'Dr. Maria', specialty: 'Endodontists'  , image: '/public/johnDoe.jpg'},
  // ]

  return (
    <div className="p-6 w-11/12 mx-auto">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Health Records</h2>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <img src="/janeDoe.jpg" alt="" className="w-8 h-8 rounded-full" />
                <span>{selectedUser}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

           <div className='flex  justify-between '>
           <div className="grid grid-cols-3  w-10/12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                  <FaHeartbeat className='text-2xl'></FaHeartbeat>
                  <span className="text-sm text-gray-600">Heart Rate</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">140</span>
                  <span className="text-sm">Bpm</span>
                  <span className="text-xs text-green-500">2%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-yellow-500">
                  <FaTemperatureHigh className='text-2xl'></FaTemperatureHigh>
                  <span className="text-sm text-gray-600">Body Temprature</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">37.5</span>
                  <span className="text-sm">C</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500">
                  <IoSpeedometer className='text-2xl'></IoSpeedometer>
                  <span className="text-sm text-gray-600">Glucose Level</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">70-90</span>
                  <span className="text-xs text-red-500">6%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-purple-500">
                  <IoIosHeartEmpty className='text-2xl'></IoIosHeartEmpty>
                  <span className="text-sm text-gray-600">SPo2</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">96%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                  <MdBloodtype className='text-2xl'></MdBloodtype>
                  <span className="text-sm text-gray-600">Blood Pressure</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">100</span>
                  <span className="text-sm">mg/dl</span>
                  <span className="text-xs text-green-500">2%</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-500">
                  <IoManSharp className='text-2xl'></IoManSharp>
                  <span className="text-sm text-gray-600">BMI</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">20.1</span>
                  <span className="text-sm">kg/m2</span>
                </div>
                
              </div>
           
            </div>
            

                {/* overall report section */}
                <div className="bg-white rounded-lg p-6 shadow w-1/3">
            <h3 className="text-lg font-semibold mb-4">Overall Report</h3>
            <div className="flex items-center justify-between flex-col gap-4">
              <div className="relative w-32 h-32">
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
                  <span className="text-sm text-gray-500">Last visit</span>
                  <span className="text-sm font-medium">25 Mar 2024</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Your health is</p>
                <p className="text-xl font-semibold">95% Normal</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800">
              View Details
            </button>
          </div>

           </div>
           <div className=''>
            <p className="text-sm text-gray-500 w-full">
        Report generated on last visit : 25 Mar 2024
      </p>
            </div>


          </div>

          
        </div>

        <div className="space-y-6">
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700">
            Book a new Appointment
          </button>

          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Doctors</h3>
              <button className="text-blue-600 text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {doctors.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={doctor.Images} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium">{doctor.Name}</p>
                      <p className="text-sm text-gray-600">{doctor.Speciality}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14m7-7H5" />
                    </svg>
                  </button>

                  
                </div>

                 
              ))}
            </div>
            
          </div>
          
        </div>
        
      </div>

      <div className='flex  mt-5'>
        <div className='w-2/3 '>
        {/* <PastAppointments></PastAppointments> */}
        <Appointments></Appointments>
        </div>

        <div className='w-1/3'><Analytics></Analytics></div>

        </div>

    </div>
  )
}