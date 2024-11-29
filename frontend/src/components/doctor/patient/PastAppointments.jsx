export default function PastAppointments() {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm w-11/12 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Past Appointments</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
  
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Thursday, Mar 2024</h3>
          </div>
  
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Time : 04:00 PM - 04:30 PM (30 Min)</span>
          </div>
  
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Newyork, United States</span>
          </div>
  
          <div className="flex items-center gap-3 pt-2">
            <img 
              src="/public/founder.jpg" 
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-medium">Dr.Edalin Hendry</h4>
              <p className="text-sm text-gray-600">Dental Specialist</p>
            </div>
          </div>
  
          <div className="flex gap-4 pt-4">
            <button className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium">
              Reschedule
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    )
  }