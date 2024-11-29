// import React from "react";

import AppointmentsList from "../../components/Nutritionist/AppointmentList";
import StatsOverview from "../../components/Nutritionist/StatsOverview";
import UpcomingAppointment from "../../components/Nutritionist/UpComingAppintment";
import WeeklyOverView from "../../components/Nutritionist/WeeklyOverView";
// import WeeklyOverview from "./components/WeeklyOverview";



const NDashboard = () => {
  return (
    <div className="flex">
      <main className="flex-1 p-8 bg-gray-50">
        <StatsOverview />
        {/* <WeeklyOverview /> */}
        <div className="flex justify-between gap-5 items-center my-2">
            <UpcomingAppointment />
            <AppointmentsList />
            
        </div>
       
        <WeeklyOverView></WeeklyOverView>
      </main>
    </div>
  );
};

export default NDashboard;
