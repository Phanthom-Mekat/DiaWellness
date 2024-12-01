import VisitsFromRegions from "@/components/doctor/Home/VisitsFromRegions";
import AppointmentList from "../../components/doctor/Home/AppointmentList";
import ClinicAvailability from "../../components/doctor/Home/ClinicAvailability";
import DiabetesCalendar from "../../components/doctor/Home/DiabetesCalender";
import DiabetesTypeChart from "../../components/doctor/Home/DiabetesTypeChart";
import Notification from "../../components/doctor/Home/Notification";
import PatientCount from "../../components/doctor/Home/PatientCount";
import UpcomingAppointment from "../../components/doctor/Home/UpcomingAppointment";
import WeeklyOverview from "../../components/doctor/Home/WeeklyOverview";

const DoctorHome = () => {
  return (
    <div className="space-y-3 overflow-hidden " data-aos="fade-up">
      <PatientCount />
      <div className="grid grid-cols-8 gap-4 " >
        <div className="col-span-2 space-y-8" data-aos="fade-up" >
          <WeeklyOverview />
          <DiabetesTypeChart/>
          <VisitsFromRegions />
        </div>
        <div className="col-span-3 space-y-6" data-aos="fade-up" >

          <UpcomingAppointment />
          <DiabetesCalendar />
        <AppointmentList />

        </div>
        <div className="col-span-3 space-y-6" data-aos="fade-up" >
          <Notification />

          <ClinicAvailability />

        </div>
      </div>
      <div className="">
          
        </div>
      
      
      <div className="flex justify-evenly">
      
      </div>
    </div>
  );
};

export default DoctorHome;