import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import { Heart, Stethoscope, Apple, User, Activity } from "lucide-react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        setUserRole(data[0].role);
                    }
                });
        }
    }, [user]);

    const handleLogout = () => {
        logOut()
            .then(() => { 
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const getDashboardLink = () => {
        switch(userRole) {
            case 'doctor':
                return '/doctor';
            case 'patient':
                return '/patient';
            case 'nutritionist':
                return '/nutritionist';
            default:
                return '/dashboard';
        }
    };

    const activeClassName = "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-100 after:origin-left after:transition-transform after:duration-300";
    const inactiveClassName = "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

    const navLinks = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `px-3 py-2 inline-block transition-all duration-300 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/patient" 
                    className={({ isActive }) => 
                        `px-3 py-2 inline-flex items-center gap-2 transition-all duration-300 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    <User className="w-4 h-4" />
                    For Patients
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/doctor" 
                    className={({ isActive }) => 
                        `px-3 py-2 inline-flex items-center gap-2 transition-all duration-300 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    <Stethoscope className="w-4 h-4" />
                    For Doctors
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/nutritionist" 
                    className={({ isActive }) => 
                        `px-3 py-2 inline-flex items-center gap-2 transition-all duration-300 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    <Apple className="w-4 h-4" />
                    For Nutritionists
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                        `px-3 py-2 inline-block transition-all duration-300 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${
                scrolled 
                ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800" 
                : "bg-white dark:bg-gray-900"
            } sticky top-0 z-50 transition-all duration-300`}
        >
            <div className="navbar container mx-auto px-4 py-3">
                <div className="navbar-start lg:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMenuOpen ? (
                            <HiX className="text-2xl text-blue-600 dark:text-blue-400" />
                        ) : (
                            <HiMenuAlt3 className="text-2xl text-blue-600 dark:text-blue-400" />
                        )}
                    </button>
                </div>

                <div className="navbar-start hidden lg:flex items-center">
                    <Link to="/" className="flex items-center group">
                        <div className="relative overflow-hidden rounded-xl mr-3 p-2 bg-gradient-to-r from-blue-600 to-purple-600">
                            <Heart className="w-6 h-6 text-white transition-transform group-hover:scale-110 duration-300" />
                        </div>
                        <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-2xl font-bold relative"
                        >
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                                DiaWellness
                            </span>
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </motion.span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-8 items-center font-medium">
                        {navLinks}
                    </ul>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 lg:hidden z-50 border-t dark:border-gray-700 shadow-xl rounded-b-xl overflow-hidden"
                        >
                            <ul className="p-4 space-y-4">
                                {navLinks}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="navbar-end flex items-center space-x-4">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar group p-0 overflow-hidden ring-2 ring-blue-600/30 hover:ring-blue-600 dark:ring-blue-400/30 dark:hover:ring-blue-400 transition-all duration-300">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <img 
                                        src={user?.photoURL?.split("?")[0] || "https://via.placeholder.com/150"}
                                        alt="user-profile"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </label>
                            <motion.ul 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                tabIndex={0} 
                                className="mt-3 z-[1] p-2 shadow-xl menu dropdown-content bg-white dark:bg-gray-800 rounded-xl w-56 border dark:border-gray-700 overflow-hidden"
                            >
                                <li className="px-4 py-3 cursor-default border-b dark:border-gray-700">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                            {user?.displayName}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user?.email}
                                        </span>
                                        {userRole && (
                                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 capitalize mt-1">
                                                {userRole}
                                            </span>
                                        )}
                                    </div>
                                </li>
                                <div className="p-1">
                                    <li>
                                        <NavLink 
                                            to={getDashboardLink()}
                                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 group transition-colors"
                                        >
                                            <FiGrid className="text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 transition-colors" />
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/health-metrics"
                                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 group transition-colors"
                                        >
                                            <Activity className="text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 transition-colors" />
                                            Health Metrics
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-3 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left text-gray-700 dark:text-gray-300 group transition-colors"
                                        >
                                            <FiLogOut className="text-gray-500 group-hover:text-red-500 dark:text-gray-400 dark:group-hover:text-red-400 transition-colors" />
                                            Logout
                                        </button>
                                    </li>
                                </div>
                            </motion.ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <NavLink 
                                to="/auth/login"
                                className="relative inline-flex items-center px-6 py-2.5 font-medium overflow-hidden rounded-full group bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="relative flex items-center gap-2">
                                    <FiUser className="w-4 h-4" />
                                    Sign In
                                </span>
                            </NavLink>
                            <NavLink 
                                to="/auth/register"
                                className="hidden sm:inline-flex items-center px-6 py-2.5 font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300"
                            >
                                Get Started
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;