import { Outlet } from "react-router-dom";
import DashboardButton from "../components/doctor/DashboardButton";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


const DoctorDashBoard = () => {
  useEffect(() => {
    AOS.init({ duration: 1700, easing: "ease-in-out" });
  }, []);
  return (
    <div className="flex h-screen no-scrollbar">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 overflow-y-auto no-scrollbar">
        <DashboardButton />
      </aside>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100 no-scrollbar" data-aos="fade-up" >
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashBoard;

