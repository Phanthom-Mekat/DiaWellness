import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PatientDashBoard from "../layout/PatientDashBoard";
import DoctorDashBoard from "../layout/DoctorDashBoard";
import NutritionistDashBoard from "../layout/NutritionistDashBoard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, //home page basic navigation
    },
    {
        path:'/patient',
        element: <PatientDashBoard/>
        // children
    },
    {
        path:'/doctor',
        element: <DoctorDashBoard/>
        // children
    },
    {
        path:'/nutritionist',
        element: <NutritionistDashBoard/>
        // children
    },

]);

export default router;