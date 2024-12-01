import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PatientDashBoard from "../layout/PatientDashBoard";
import DoctorDashBoard from "../layout/DoctorDashBoard";
import NutritionistDashBoard from "../layout/NutritionistDashBoard";
import DoctorHome from "../pages/doctor/DoctorHome";
import PatientDashboard from "../pages/Patient/PatientDashboardPage";
import CreateApppintment from "../pages/Patient/Appointment";

import NDashboard from "../pages/Nutritionist/NDashboard";
import Request from "../pages/doctor/Request";
import DailyHealthData from "../pages/Patient/DailyHealthData";
import DiagnosisReport from "../components/patient/DiagnosisReport";
import DietPlan from "../pages/Patient/DietPlan";
import SystemDiet from "../pages/Patient/SystemDietRecommendation";
import Prescription from "../pages/Patient/Prescription";
import AppointmentsList from "../pages/doctor/AppointmentsList";
import AppointmentDetails from "@/components/doctor/appointment/AppointmentDetails";
import AvailabilityScheduler from "@/pages/doctor/AvailabilityScheduler";


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
            },
            {
                path: 'dailyHealthdata',
                element: <DailyHealthData></DailyHealthData>
            },
            {
                path: 'diagnosisReport',
                element: <DiagnosisReport></DiagnosisReport>
            },
            {
                path: 'dietPlan',
                element: <DietPlan></DietPlan>
            },
            
            {
                path: 'systemDiet',
                element: <SystemDiet></SystemDiet>
            },
            
            {
                path: 'prescription',
                element: <Prescription></Prescription>
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
            path: 'requests',
            element: <Request/>
        },
        {
            path: 'appointments',
            element: <AppointmentsList/>
        },
        {
            path:'appointments/treatment',
            element: <AppointmentDetails/>,
        },
        {
            path: 'profile',
            element: <div>Profile</div>
        },
     
        {
            path: 'timings',
            element: <AvailabilityScheduler/>
        },
        {
            path: 'patients',
            element: <div>Patients</div>
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
        path:'/nutritionist',
        element: <NutritionistDashBoard />,
        children:[
            {
                path:'/nutritionist',
                element:<NDashboard></NDashboard>
            }
        ]
    },
    {
        path: '*',
        element: <div>404 Page Not Found</div>
        // children
    },

]);

export default router;