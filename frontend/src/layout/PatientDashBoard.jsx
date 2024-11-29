import { Outlet } from "react-router-dom";
import PatientSidebar from "../components/patient/PatientSidebar";

// process ur child 
const PatientDashBoard = () => {
    return (
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-72 sticky top-0 h-screen bg-white shadow-md">
          <PatientSidebar></PatientSidebar>
        </aside>
        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    );
};

export default PatientDashBoard;