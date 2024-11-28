import { Outlet } from "react-router-dom";
import DashboardButton from "../components/doctor/DashboardButton";

const DoctorDashBoard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100">
        <DashboardButton />
      </aside>
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashBoard;
