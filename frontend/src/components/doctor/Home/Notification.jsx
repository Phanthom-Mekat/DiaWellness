import { AiOutlineBell, AiOutlineStar, AiOutlineCalendar, AiOutlineCreditCard } from 'react-icons/ai';

const Notification = () => {
    const notifications = [
        { icon: <AiOutlineBell className="text-xl text-secondary" />, message: "Booking Confirmed on 21 Mar 2024 10:30 AM", time: "Just Now" },
        { icon: <AiOutlineStar className="text-xl text-blue-500" />, message: "You have a New Review for your Appointment", time: "5 Days ago" },
        { icon: <AiOutlineCalendar className="text-xl text-pink-500" />, message: "You have Appointment with Ahmed by 01:20 PM", time: "12:55 PM" },
        { icon: <AiOutlineCreditCard className="text-xl text-yellow-500" />, message: "Sent an amount of $200 for an Appointment by 01:20 PM", time: "2 Days ago" },
        { icon: <AiOutlineStar className="text-xl text-blue-500" />, message: "You have a New Review for your Appointment", time: "5 Days ago" },
    ];

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title text-lg font-semibold">Notifications</h2>
                    <a href="#" className="link link-hover text-blue-500">View All</a>
                </div>
                <div className="mt-4 space-y-3">
                    {notifications.map((notification, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100">
                            <div>{notification.icon}</div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
