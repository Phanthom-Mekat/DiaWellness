import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import {
    FaTachometerAlt, FaCalendarAlt, FaClipboardList, FaUsers,
    FaCogs, FaStar, FaWallet, FaFileInvoice, FaComments,
    FaSignOutAlt, FaClock, FaKey
} from "react-icons/fa";

const DashboardSidebar = () => {
    const [isAvailable, setIsAvailable] = useState(true);

    const menuItems = [
        {
            icon: <FaTachometerAlt />,
            label: 'Dashboard',
            path: '/doctor'
        },
        {
            icon: <FaClipboardList />,
            label: 'Requests',
            path: '/doctor/requests'
        },
        {
            icon: <FaCalendarAlt />,
            label: 'Appointments',
            path: '/doctor/appointments'
        },
        {
            icon: <FaClock />,
            label: 'Available Timings',
            path: '/doctor/timings'
        },
        {
            icon: <FaUsers />,
            label: 'My Patients',
            path: '/doctor/patients'
        },
        {
            icon: <FaCogs />,
            label: 'Specialties & Services',
            path: '/doctor/services'
        },
        {
            icon: <FaStar />,
            label: 'Reviews',
            path: '/doctor/reviews'
        },
        {
            icon: <FaWallet />,
            label: 'Accounts',
            path: '/doctor/accounts'
        },
        {
            icon: <FaFileInvoice />,
            label: 'Invoices',
            path: '/doctor/invoices'
        },
        {
            icon: <FaComments />,
            label: 'Messages',
            path: '/doctor/messages'
        },
        {
            icon: <FaCogs />,
            label: 'Profile Settings',
            path: '/doctor/settings'
        },
        {
            icon: <FaUsers />,
            label: 'Social Media',
            path: '/doctor/social'
        },
        {
            icon: <FaKey />,
            label: 'Change Password',
            path: '/doctor/change-password'
        },
    ];

    const handleAvailabilityChange = (e) => {
        setIsAvailable(e.target.value === 'available');
    };

    return (
        <div className="bg-blue-50 min-h-screen p-4 flex flex-col items-center shadow-xl w-64 " data-aos="fade-right">
            {/* Profile Section */}
            <div className="shadow-md bg-gradient-to-b from-primary/70 to-transparent rounded-lg p-6 w-full mb-6 text-center">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://i.postimg.cc/15vQ6jwk/ai-generated-9019520-640.jpg"
                        alt="Dr. Edalin Hendry"
                        className="rounded-full w-24 h-24 object-cover border-4 border-blue-200"
                    />
                    
                </div>
                <h2 className="text-xl h-font font-bold text-gray-800 mb-1">Dr. Edalin Hendry</h2>
                <p className="text-sm text-gray-600 mb-2">MBBS - Cardiologist</p>
                <div className="mb-3 flex items-center justify-center">
                    <span className="badge bg-primary border-none"><FaStar className="text-yellow-400 mr-2" />Specialist</span>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-start ml-2 text-gray-600 mb-1">Availability:</p>
                    <select
                        className={`select w-full ${isAvailable ? 'select-success' : 'select-error'}`}
                        value={isAvailable ? 'available' : 'unavailable'}
                        onChange={handleAvailabilityChange}
                    >
                        <option value="available">I am Available</option>
                        <option value="unavailable">I am Not Available</option>
                    </select>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="w-full">
                <ul className="menu bg-white rounded-lg shadow-md p-2 space-y-1">
                    {menuItems.map((item, index) => (
                        <li key={index} className="hover:bg-blue-50 rounded-md transition-colors">
                            <NavLink
                                to={item.path}
                                end 
                                className={({ isActive }) =>
                                    `flex items-center py-2 px-4 hover:bg-blue-50 hover:text-blue-600 rounded-md ${isActive ? 'bg-blue-100' : ''}`
                                }
                            >
                                {React.cloneElement(item.icon, { className: 'mr-3 text-lg text-blue-600' })}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                    <li className="mt-4 border-t pt-2">
                        <Link
                            to="/logout"
                            className="flex items-center py-2 px-4 text-red-600 hover:bg-red-50 rounded-md"
                        >
                            <FaSignOutAlt className="mr-3 text-lg" />
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default DashboardSidebar;