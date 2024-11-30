import { 
    RiDashboardLine, 
    RiCalendarCheckLine,
    RiFileList3Line,
    RiWalletLine,
    RiFileTextLine,
    RiMessage2Line,
    RiUserSettingsLine,
    RiHospitalLine,
    RiLockPasswordLine
  } from 'react-icons/ri'
  import { CiLogout } from "react-icons/ci";
  import { BsCheckCircleFill } from 'react-icons/bs'
  import { NavLink } from 'react-router-dom'
function PatientSidebar() {
    const menuItems = [
      { icon: RiDashboardLine, text: 'Dashboard', path: '/patient',exact: true },
      { icon: RiCalendarCheckLine, text: 'Book Appointments', path: '/patient/appointments' },
    //   { icon: RiHeartLine, text: 'Favourites', path: '/patient/favourites' },
    //   { icon: RiTeamLine, text: 'Dependants', path: '/patient/dependants' },
    { icon: RiFileList3Line, text: 'Daily Health Data', path: '/patient/dailyHealthdata' },
      { icon: RiFileList3Line, text: 'Add Diagnosis Records', path: '/patient/diagnosisReport' },
      { icon: RiWalletLine, text: 'Diet Plan', path: '/patient/dietPlan' },
      { icon: RiFileTextLine, text: 'Recommendation', path: '/patient/systemDiet' },
      { icon: RiHospitalLine, text: 'Prescription', path: '/patient/prescription' },
      { icon: RiMessage2Line, text: 'Message', path: '/patient/message' },
      { icon: RiUserSettingsLine, text: 'Profile Settings', path: '/patient/settings' },
      
      { icon: CiLogout, text: 'Logout', path: '/' },
    ]
  
    return (
      <div className="max-w-sm mx-auto bg-white overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-[url('/public/bg-1.jpg')] bg-cover bg-center bg-opacity-90 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="relative">
              <img 
                src="/janeDoe.jpg" 
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <BsCheckCircleFill className="absolute bottom-1 right-1 text-green-500 text-lg bg-white rounded-full" />
            </div>
          </div>
        </div>
  
        {/* Profile Info */}
        <div className="pt-14 pb-6 text-center">
          <h2 className="text-xl font-semibold">Jean Grey</h2>
          <p className="text-gray-600 text-sm mt-1">Patient ID : 20000001</p>
          <p className="text-gray-600 text-sm mt-1">
            <span className="text-blue-600">Female</span> • 32 years 03 Months
          </p>
        </div>
  
        {/* Menu Items */}
        <div className="px-4 pb-6">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end={item.exact}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                }`
              }
            >
              <item.icon className="text-xl" />
              <span className="flex-1 text-left">{item.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
    )
  }
export default PatientSidebar