import profile from '../../assets/nutritionist.jpeg'

const ProfileCard = () => {
  return (
    <div className="text-center bg-teal-50 p-5 rounded-xl shadow-lg">
      <img
        src={profile}
        alt="Doctor"
        className="w-28 h-28 mx-auto rounded-full shadow-xl"
      />
      <h3 className="mt-4 text-lg font-semibold">Dr. Jane Doe</h3>
      <p className="text-sm text-gray-500">MBBS - Nutritionist</p>
      <span className="bg-teal-600 text-white text-xs py-1 px-2 rounded-full inline-block mt-2">
        Specialist
      </span>
      <div className="mt-4">
        
        <select className="mt-1 border-2 border-teal-200 rounded-lg w-full p-2">
          <option>I am Available</option>
          <option>Busy</option>
          <option>Unavailable</option>
        </select>
      </div>
    </div>
  );
};

export default ProfileCard;
