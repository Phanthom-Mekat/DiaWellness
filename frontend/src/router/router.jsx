import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PatientDashBoard from "../layout/PatientDashBoard";
import DoctorDashBoard from "../layout/DoctorDashBoard";
import NutritionistDashBoard from "../layout/NutritionistDashBoard";
import DoctorHome from "../pages/doctor/DoctorHome";
import PatientDashboard from "../pages/Patient/PatientDashboardPage";
import CreateApppintment from "../pages/Patient/Appointment";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, //home page basic navigation
    },
    {
        path: '/patient',
        element: <PatientDashBoard />,
        children: [
            {
                path: '',
                element: <PatientDashboard></PatientDashboard>
            },
            {
                path: 'appointments',
                element: <CreateApppintment></CreateApppintment>
            }
        ]
    },
    {
        path: '/doctor',
        element: <DoctorDashBoard />,
        children: [
        {
            path: '',
            element: <DoctorHome/>
        },
        {
            path: 'profile',
            element: <div>Profile</div>
        },
        {
            path: 'appointments',
            element: <div>Appointments</div>
        },
        {
            path: 'timings',
            element: <div>Timings</div>
        },
        {
            path: 'patients',
            element: <div>Patients</div>
        },
        {
            path: 'requests',
            element: <div>Requests</div>
        },
        {
            path: 'services',
            element: <div>Specialties & Services</div>
        },
        {
            path: 'reviews',
            element: <div>Reviews</div>
        },
        {
            path: 'accounts',
            element: <div>Accounts</div>
        },
        {
            path: 'invoices',
            element: <div>Invoices</div>
        },
        {
            path: 'messages',
            element: <div>Messages</div>
        },
        {
            path: 'settings',
            element: <div>Profile Settings</div>
        },
        {
            path: 'social',
            element: <div>Social Media</div>
        },
        {
            path: 'change-password',
            element: <div>Change Password</div>
        },

        ]
    },
    {
        path: '/nutritionist',
        element: <NutritionistDashBoard />
        // children
    },
    {
        path: '*',
        element: <div>404 Page Not Found</div>
        // children
    },

]);

export default router;