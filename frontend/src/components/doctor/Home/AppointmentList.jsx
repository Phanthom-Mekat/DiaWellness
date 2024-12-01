import { format } from "date-fns";
import { LiaTimesCircle } from "react-icons/lia";
import { RxCheckCircled } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
const AppointmentList = () => {
    const appointments = [
        {
            id: "Apt0001",
            name: "Adrian Marshall",
            date: new Date(2024, 10, 11, 10, 45),
            type: "General",
            image: "https://i.postimg.cc/x8rPf4MJ/image.png",
        },
        {
            id: "Apt0002",
            name: "Kelly Stevens",
            date: new Date(2024, 10, 10, 11, 0),
            type: "Clinic Consulting",
            image: "https://i.postimg.cc/76JVykGr/image.png",
        },
        {
            id: "Apt0003",
            name: "Samuel Anderson",
            date: new Date(2024, 10, 3, 14, 0),
            type: "General",
            image: "https://i.postimg.cc/50XPNzrG/image.png",
        },
        {
            id: "Apt0004",
            name: "Catherine Griffin",
            date: new Date(2024, 10, 1, 16, 0),
            type: "Clinic Consulting",
            image: "https://i.postimg.cc/k511msTK/image.png",
        },
        {
            id: "Apt0005",
            name: "Emily Martin",
            date: new Date(2024, 9, 28, 17, 30),
            type: "General",
            image: "https://i.postimg.cc/52mKPbvP/image.png",
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Appointment</h3>

                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-sm btn-outline text-secondary rounded-full"
                    >
                        Last 7 Days<MdOutlineKeyboardArrowDown size={25} />

                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Last 7 Days</a>
                        </li>
                        <li>
                            <a>Last 30 Days</a>
                        </li>
                    </ul>
                </div>

            </div>
            <hr className="border-gray-200 mb-3" />
            {/* Appointment List */}
            <ul className="space-y-4">
                {appointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className="flex items-center  justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md"
                    >
                        {/* Left Section */}
                        <div className="flex items-center space-x-4">
                            <img
                                src={appointment.image}
                                alt={appointment.name}
                                className="w-12 h-12 rounded-full ring-2 ring-gray-300"
                            />

                        </div>
                        <div className="text-start ">
                            <p className="text-gray-400">
                                #{appointment.id}
                            </p>
                            <p className="font-medium text-sm text-gray-800">
                                {appointment.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500">
                                {format(appointment.date, "dd MMM yyyy hh:mm a")}
                            </p>
                            <span
                                className={`badge badge-sm text-white ${appointment.type === "General"
                                    ? "bg-secondary"
                                    : "bg-tertiary"
                                    }`}
                            >
                                {appointment.type}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <Link to='requests'>
                                <button className="text-green-500 hover:bg-green-600 hover:text-white hover:rounded-full ">
                                    <RxCheckCircled size={25} />
                                </button>
                            </Link>
                            <Link to='requests'>
                                <button className=" text-red-500 hover:bg-red-600 hover:text-white hover:rounded-full ">
                                    <LiaTimesCircle size={27} />
                                </button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
