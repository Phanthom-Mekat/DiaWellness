import { FaEdit } from 'react-icons/fa';

const ClinicAvailability = () => {
    const clinics = [
        {
            image: "https://i.postimg.cc/2yMGqhT1/image.png", 
            name: "Sofi's Clinic",
            price: "$900",
            availability: [
                { day: "Tue", time: "07:00 AM - 09:00 PM" },
                { day: "Wed", time: "07:00 AM - 09:00 PM", changeable: true },
            ],
        },
        {
            image: "https://i.postimg.cc/YSRx6JbK/image.png",
            name: "The Family Dentistry Clinic",
            price: "$600",
            availability: [
                { day: "Sat", time: "07:00 AM - 09:00 PM" },
                { day: "Tue", time: "07:00 AM - 09:00 PM", changeable: true },
            ],
        },
    ];

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-lg font-semibold">Clinics & Availability</h2>
                <div className="mt-4 space-y-4">
                    {clinics.map((clinic, index) => (
                        <div key={index} className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img src={clinic.image} alt="Clinic" className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h3 className="text-md font-bold text-gray-800">{clinic.name}</h3>
                                        <p className="text-sm text-blue-600 font-semibold">{clinic.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-2">
                                {clinic.availability.map((slot, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium text-gray-800">{slot.day}:</span> {slot.time}
                                        </p>
                                        {slot.changeable && (
                                            <a href="#" className="text-blue-500 flex items-center space-x-1 hover:underline">
                                                <FaEdit className="text-xs" />
                                                <span>Change</span>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClinicAvailability;
