import { useState } from 'react';
import { Heart, MapPin, Calendar, Star, CheckCircle2, Search } from 'lucide-react';

export default function CreateApppintment() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const doctors = [
    {
      id: 1,
      name: 'Dr.Edalin Hendry',
      verified: true,
      specialty: 'MDS - Periodontology and Oral Implantology, BDS',
      rating: 5.0,
      totalRatings: null,
      nextAvailable: '23 Mar 2024',
      location: 'Newyork, USA',
      lastBooked: '21 Jan 2023',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
    },
    {
      id: 2,
      name: 'Dr.Shanta Nesmith',
      verified: true,
      specialty: 'DO - Doctor of Osteopathic Medicine',
      rating: 4.0,
      totalRatings: 35,
      nextAvailable: '27 Mar 2024',
      location: 'Los Angeles, USA',
      lastBooked: '18 Jan 2023',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
    },
    {
      id: 3,
      name: 'Dr.John Ewel',
      verified: true,
      specialty: 'DPM - Doctor of Podiatric Medicine',
      rating: 5.0,
      totalRatings: null,
      nextAvailable: '02 Apr 2024',
      location: 'Dallas, USA',
      lastBooked: '28 Jan 2023',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="w-11/12 mx-auto">
     <div className='py-5'>
     <span className='text-2xl font-bold '>Book Appointments</span>
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
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    {doctor.verified && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < doctor.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-600 ml-1">
                  {doctor.rating}
                  {doctor.totalRatings && ` (${doctor.totalRatings})`}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    Next Availability : {doctor.nextAvailable}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">Location : {doctor.location}</span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mb-4">
                Last Book on {doctor.lastBooked}
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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