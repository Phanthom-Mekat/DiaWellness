import { useState } from "react";
import { Outlet } from "react-router-dom";
import PatientSidebar from "../components/patient/PatientSidebar";
import { Menu, X } from "lucide-react";

const PatientDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-primary text-white shadow-md"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - hidden on mobile by default, shown when toggled */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 h-screen bg-white shadow-md z-20
          w-64 md:w-72 
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <PatientSidebar onLinkClick={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content - full width on mobile, adjusts for sidebar on larger screens */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50 md:ml-0 pt-16 md:pt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashBoard;