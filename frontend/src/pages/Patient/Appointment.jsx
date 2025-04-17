import  { useContext, useState } from "react";
import { Context } from "../../provider/ContextProvider";
import { Heart, MapPin, Calendar, Star, CheckCircle2, Search } from "lucide-react";
import swal from 'sweetalert';

export default function CreateAppointment() {
  const [searchTerm, setSearchTerm] = useState("");

  // Use the context
  const { doctors, loading } = useContext(Context);

  if (loading) {
    return <p>Loading doctors...</p>; // Loader
  }

  if (!doctors || doctors.length === 0) {
    return <p>No doctors found.</p>;
  }

  const handleBookNow =(id)=>{
    swal({
      title: "Are you sure?",
      text: "Confirm your Booking",
      icon: "info",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Booking Confirmed!", "Your Booking  has been placed!", "success");

          fetch('http://localhost:5000/appointments', {
            method: "POST",
            headers: {
              'content-type' : 'application/json'
            },
            body: JSON.stringify({ DoctorID: id })
          })
          .then(res=>res.json())
          .then(data => {
            console.log(data);
          })
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-11/12 mx-auto">
        <div className="py-5">
          <span className="text-2xl font-bold">Book Appointments : </span>
        </div>
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors, specialties, conditions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm p-6 relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center mb-4">
                <img
                  src={doctor.Photo}
                  alt={doctor.Name}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <h3 className="text-lg font-semibold">{doctor.Name}</h3>
                    {doctor.verified && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{doctor.Speciality}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < doctor.Rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-gray-600 ml-1">
                  {doctor.Rating}
                  {doctor.totalRatings && ` (${doctor.totalRatings})`}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Next Availability : {doctor.Schedule}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">Location : {doctor.Location}</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mb-4">
                Last Book on {doctor.lastBooked}
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
                <button onClick={()=>handleBookNow(doctor.ID)} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
