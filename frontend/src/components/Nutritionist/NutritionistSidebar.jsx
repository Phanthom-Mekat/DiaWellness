import ProfileCard from "./ProfileCard";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUtensils, FaUserFriends, FaSignOutAlt } from "react-icons/fa";

const NutritionistSidebar = () => {
  return (
    <aside className="w-74 p-4 flex flex-col">
      <ProfileCard />
      <nav className="mt-6">
        <ul className="space-y-4 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/nutritionist"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 text-teal-600 font-semibold"
                  : "flex items-center gap-3 hover:text-teal-600"
              }
            >
              <FaHome className="text-lg" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="appointments"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 text-teal-600 font-semibold"
                  : "flex items-center gap-3 hover:text-teal-600"
              }
            >
              <FaCalendarAlt className="text-lg" />
              Appointments
            </NavLink>
          </li>

          <li>
            <NavLink
              to="mealRequest"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 text-teal-600 font-semibold"
                  : "flex items-center gap-3 hover:text-teal-600"
              }
            >
              <FaUtensils className="text-lg" />
              Meal Request
            </NavLink>
          </li>

          <li>
            <NavLink
              to="myPatients"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 text-teal-600 font-semibold"
                  : "flex items-center gap-3 hover:text-teal-600"
              }
            >
              <FaUserFriends className="text-lg" />
              My Patients
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 text-teal-600 font-semibold"
                  : "flex items-center gap-3 hover:text-teal-600"
              }
            >
              <FaSignOutAlt className="text-lg" />
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NutritionistSidebar;
