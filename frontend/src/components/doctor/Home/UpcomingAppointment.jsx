import { Hospital } from "lucide-react";
import { Link } from "react-router-dom";

const UpcomingAppointment = () => {
    const appointment = {
      id: "Apt0002",
      name: "Kalasnikobi Sara",
      type: "General visit",
      date: "Today, 10:45 AM",
      image: "https://i.postimg.cc/76JVykGr/image.png",
    };
  
    return (
      <div className="bg-secondary text-white rounded-lg shadow-lg p-4 max-w-md mx-auto relative overflow-hidden">
        {/* Background design */}
        <div className="absolute inset-0">
          <div className="bg-[radial-gradient(circle,_#ADD8E6_10%,_transparent_30%)] opacity-30 h-full w-full"></div>
        </div>
  
        {/* Card Content */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-4">Upcoming Appointment</h3>
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <img
              src={appointment.image}
              alt={appointment.name}
              className="w-12 h-12 rounded-full ring-2 ring-white"
            />
  
            {/* Appointment Details */}
            <div>
              <p className="text-sm font-medium">#{appointment.id}</p>
              <p className="text-base font-semibold">{appointment.name}</p>
            </div>
  
            {/* Appointment Info */}
            <div className="ml-auto text-right">
              <p className="text-sm font-medium">{appointment.type}</p>
              <p className="text-sm">{appointment.date}</p>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-white/50 my-4"></div>
  
          {/* Action Section */}
          <div className="flex items-center justify-between">
            <p className="flex items-center text-sm font-medium">
            <Hospital className="mr-2" size={18} /> CLinic Visit
            </p>
            <div className="flex space-x-2">
              <Link to='/doctor/appointments' className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Chat Now
              </Link>
              <Link to='appointments/treatment' className="btn btn-sm bg-primary border-none text-secondary hover:bg-white hover:text-secondary">
                Start Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpcomingAppointment;
  