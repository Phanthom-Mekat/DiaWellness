import { format } from "date-fns";
import { LiaTimesCircle } from "react-icons/lia";
import { RxCheckCircled } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import { BsClockFill } from "react-icons/bs";
import { FaPhoneAlt, FaStethoscope, FaVideo } from "react-icons/fa";

const Request = () => {
    const appointments = [
        {
            id: "Apt0001",
            name: "Adrian Marshall",
            date: new Date(2024, 10, 11, 10, 45),
            type: "General",
            appointment: "Audio Call",
            image: "https://i.postimg.cc/x8rPf4MJ/image.png",
        },
        {
            id: "Apt0002",
            name: "Kelly Stevens",
            date: new Date(2024, 10, 10, 11, 0),
            type: "Clinic Consulting",
            appointment: "Video Call",
            image: "https://i.postimg.cc/76JVykGr/image.png",
        },
        {
            id: "Apt0003",
            name: "Samuel Anderson",
            date: new Date(2024, 10, 3, 14, 0),
            type: "General",
            appointment: "Clinic Visit",
            image: "https://i.postimg.cc/50XPNzrG/image.png",
        },
        {
            id: "Apt0004",
            name: "Catherine Griffin",
            date: new Date(2024, 10, 1, 16, 0),
            type: "Clinic Consulting",
            appointment: "Video Call",
            image: "https://i.postimg.cc/k511msTK/image.png",
        },
        {
            id: "Apt0005",
            name: "Emily Martin",
            date: new Date(2024, 9, 28, 17, 30),
            type: "General",
            key: "video call",
            appointment: "Audio Call",
            image: "https://i.postimg.cc/52mKPbvP/image.png",
        },
        {
            id: "Apt0006",
            name: "Michael Johnson",
            date: new Date(2024, 10, 15, 9, 0),
            key: "clinic visit",
            type: "General",
            appointment: "Clinic Visit",
            image: "https://i.postimg.cc/QMcHFx2N/image.png",
        },
        {
            id: "Apt0007",
            name: "Sarah Williams",
            key: "audio call",
            date: new Date(2024, 10, 16, 13, 30),
            type: "Clinic Consulting",
            appointment: "Video Call",
            image: "https://i.postimg.cc/6qp3bVyT/image.png",
        },
        {
            id: "Apt0008",
            key: "video call",
            name: "David Lee",
            date: new Date(2024, 10, 18, 11, 15),
            type: "General",
            appointment: "Audio Call",
            image: "https://i.postimg.cc/Y930xD2J/image.png",
        },
        {
            key: "clinic visit",
            id: "Apt0009",
            name: "Jessica Brown",
            date: new Date(2024, 10, 20, 14, 45),
            type: "Clinic Consulting",
            appointment: "Video Call",
            image: "https://i.postimg.cc/sfT1QLNW/image.png",
        },
        {
            id: "Apt0010",
            name: "Robert Davis",
            date: new Date(2024, 10, 22, 16, 0),
            type: "General",
            appointment: "Clinic Visit",
            image: "https://i.postimg.cc/3J6R9v7J/image.png",
        },
    ];

    const [showAll, setShowAll] = useState(false);
    const visibleAppointments = showAll ? appointments : appointments.slice(0, 5);

    const handleAccept = () => {
        Swal.fire({
            title: "Appointment Accepted",
            text: "You have successfully accepted the appointment.",
            icon: "success",
            confirmButtonColor: "#3085d6",
        });
    };

    const handleReject = () => {
        Swal.fire({
            title: "Reject Appointment",
            text: "Please provide a reason for rejecting the appointment:",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Reject",
            confirmButtonColor: "#d33",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = result.value?.trim();
                if (reason) {
                    Swal.fire({
                        title: "Appointment Rejected",
                        text: `Reason: ${reason}`,
                        icon: "error",
                        confirmButtonColor: "#d33",
                    });
                } else {
                    Swal.fire({
                        title: "Rejection Cancelled",
                        text: "No reason provided for rejection.",
                        icon: "warning",
                        confirmButtonColor: "#f1c40f",
                    });
                }
            }
        });
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Appointment Requests</h3>
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-sm btn-outline text-secondary rounded-full"
                    >
                        today<MdOutlineKeyboardArrowDown size={25} />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-32"
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
                {visibleAppointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md"
                    >
                        {/* Left Section */}
                        <div className="flex  items-center space-x-4">
                            <img
                                src={appointment.image}
                                alt={appointment.name}
                                className="w-16 h-16 rounded-full ring-2 ring-gray-300"
                            />
                            <div className="text-start">
                                <p className="text-gray-400">#{appointment.id}</p>
                                <p className="font-medium h-font text-sm text-gray-800">{appointment.name}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                <BsClockFill className="inline mr-1" />
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
                        <div>
                            <p className="text-lg h-font">Type of Appointment</p>
                            <p className="text-sm text-gray-500 flex items-center">
                                {appointment.appointment === "Audio Call" && (
                                    <FaPhoneAlt className="mr-2 text-yellow-500" />
                                )}
                                {appointment.appointment === "Video Call" && (
                                    <FaVideo className="mr-2 text-green-500" />
                                )}
                                {appointment.appointment === "Clinic Visit" && (
                                    <FaStethoscope className="mr-2 text-blue-500" />
                                )}
                                {appointment.appointment}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <button
                                className="text-green-500 hover:bg-green-600 hover:text-white hover:rounded-full"
                                onClick={() => handleAccept(appointment)}
                            >
                                <RxCheckCircled size={25} />
                            </button>
                            <button
                                className="text-red-500 hover:bg-red-600 hover:text-white hover:rounded-full"
                                onClick={() => handleReject(appointment)}
                            >
                                <LiaTimesCircle size={27} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-4">
                <button
                    className="btn btn-sm btn-outline text-secondary rounded-full"
                    onClick={() => setShowAll(true)}
                >
                    View All {appointments.length - 5} More
                </button>
            </div>
        </div>
    );
};

export default Request;
