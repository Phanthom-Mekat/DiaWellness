import { Outlet } from "react-router-dom";
import NutritionistSidebar from "../components/Nutritionist/NutritionistSidebar";

const NutritionistDashBoard = () => {
    return (
       


        <div className="  flex h-screen no-scrollbar">
            {/* Sidebar */}
            <aside className=" w-72 bg-emerald-50 overflow-y-auto no-scrollbar">
                <NutritionistSidebar></NutritionistSidebar>
            </aside>
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 no-scrollbar">
                <Outlet />
            </div>
        </div>
            
    );
};

export default NutritionistDashBoard;