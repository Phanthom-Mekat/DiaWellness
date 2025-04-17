import { Outlet } from "react-router-dom";
import DashboardButton from "../components/doctor/DashboardButton";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const DoctorDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    AOS.init({ duration: 1700, easing: "ease-in-out" });
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen no-scrollbar">
      {/* Mobile Header with Toggle Button */}
      <div className="md:hidden bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">Doctor Dashboard</h1>
        <button 
          onClick={toggleSidebar} 
          className="text-white focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - hidden by default on mobile, toggle with state */}
      <aside 
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-blue-100 overflow-y-auto no-scrollbar ${
          sidebarOpen ? 'h-screen absolute z-10 top-16 left-0' : ''
        } md:relative md:h-auto`}
      >
        <DashboardButton />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6 overflow-y-auto bg-gray-100 no-scrollbar" data-aos="fade-up">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashBoard;