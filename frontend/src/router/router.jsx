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
import MyPatients from "@/pages/doctor/MyPatient";
import SpecialtyAndServicePage from "@/pages/doctor/Speciality&ServicePage";
import NMyPatient from "@/pages/Nutritionist/NMyPatient";
import PatientDetails from "@/components/Nutritionist/PatientDetails";
import NAppointments from "@/pages/Nutritionist/NAppointments";
import NAppointmentDetails from "@/components/Nutritionist/NAppointmentDetails";
import MealRequest from "@/pages/Nutritionist/MealRequest";
import MyPatientDetails from "@/components/doctor/patientdetails/MyPatientDetails";
import ReviewDoctor from "@/pages/doctor/ReviewDoctor";
import AccountsDashboard from "@/pages/doctor/AccountDashboard";
import DoctorForm from "@/components/doctor/DoctorForm";
import PatientForm from "@/components/patient/PatientForm";
import AuthLayout from "@/layout/AuthLayout";
import Login from "@/components/Login";
import Register from "@/components/Register";


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
            },
            {
                path: 'settings',
                element: <PatientForm/>
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
            path: 'timings',
            element: <AvailabilityScheduler/>
        },
        {
            path: 'patients',
            element: <MyPatients/>
        },
        {
            path:'patients/treatment',
            element: <MyPatientDetails/>
        },
         {
            path: 'services',
            element: <SpecialtyAndServicePage/>
        },
        {
            path: 'reviews',
            element:<ReviewDoctor/>
        },
        {
            path: 'accounts',
            element: <AccountsDashboard/>
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
            element: <DoctorForm/>
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
                path:'',
                element:<NDashboard></NDashboard>
            },
            {
                path:'myPatients',
                element:<NMyPatient></NMyPatient>
            },
            {
                path:'myPatients/:id',
                element:<PatientDetails></PatientDetails>
            },

            {
                path:'appointments',
                element:<NAppointments></NAppointments>
            },
            {
                path:'appointments/:id',
                element:<NAppointmentDetails></NAppointmentDetails>
            },
            {
                path:'mealRequest',
                element:<MealRequest></MealRequest>
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register/>
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