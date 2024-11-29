import { Outlet } from "react-router-dom";
import DashboardButton from "../components/doctor/DashboardButton";

const DoctorDashBoard = () => {
  return (
    <div className="flex h-screen no-scrollbar">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 overflow-y-auto no-scrollbar">
        <DashboardButton />
      </aside>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashBoard;

