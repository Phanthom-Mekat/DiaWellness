import { useState } from "react";

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com", // Email
        mobile: "123-456-7890", // Mobile number
        patientType: "New", // Patient type
        details: "John is a new patient suffering from diabetes.", // Patient details
        notes: "Diet consultation for diabetes management", // Notes
        picture: "https://i.postimg.cc/3xCsZy6x/download-31.jpg", // Picture URL
        nextAppointment: "2024-12-04, 10:00 AM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "130/85", // Blood Pressure
        Cholesterol: "220 mg/dL", // Cholesterol level
        BloodSugarLevel: "150 mg/dL", // Blood sugar level
        Height: "5'10\"",
        Weight: "180 lbs",
        Goal: "Control diabetes by following a proper diet", // Goal
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com", // Email
        mobile: "987-654-3210", // Mobile number
        patientType: "Old", // Patient type
        details: "Jane has been a patient for 3 years and is undergoing treatment for high blood pressure.", // Patient details
        notes: "Follow-up on fitness progress", // Notes
        picture: "https://i.postimg.cc/mZj1KVHY/images-14.jpg", // Picture URL
        nextAppointment: "2024-12-05, 2:00 PM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "140/90", // Blood Pressure
        Cholesterol: "180 mg/dL", // Cholesterol level
        BloodSugarLevel: "110 mg/dL", // Blood sugar level
        Height: "5'6\"",
        Weight: "155 lbs",
        Goal: "Maintain a healthy blood pressure and active lifestyle", // Goal
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com", // Email
        mobile: "456-789-1230", // Mobile number
        patientType: "Cured", // Patient type
        details: "Bob has successfully completed his treatment for obesity and is now maintaining a healthy weight.", // Patient details
        notes: "Post-treatment checkup for weight maintenance", // Notes
        picture: "https://i.postimg.cc/3RFR2JhM/download-32.jpg", // Picture URL
        nextAppointment: "2024-12-06, 11:00 AM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "120/80", // Blood Pressure
        Cholesterol: "190 mg/dL", // Cholesterol level
        BloodSugarLevel: "100 mg/dL", // Blood sugar level
        Height: "6'1\"",
        Weight: "190 lbs",
        Goal: "Maintain healthy weight and lifestyle", // Goal
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com", // Email
        mobile: "789-123-4560", // Mobile number
        patientType: "New", // Patient type
        details: "Alice is a new patient seeking advice for a balanced diet and weight loss.", // Patient details
        notes: "Initial consultation for weight loss plan", // Notes
        picture: "https://i.postimg.cc/9FYypCWB/images-15.jpg", // Picture URL
        nextAppointment: "2024-12-07, 9:00 AM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "125/82", // Blood Pressure
        Cholesterol: "195 mg/dL", // Cholesterol level
        BloodSugarLevel: "130 mg/dL", // Blood sugar level
        Height: "5'5\"",
        Weight: "160 lbs",
        Goal: "Lose weight by following a proper diet and exercise plan", // Goal
      },
      {
        id: 5,
        name: "Emily Davis",
        email: "emily@example.com", // Email
        mobile: "321-654-9870", // Mobile number
        patientType: "Old", // Patient type
        details: "Emily has been under treatment for chronic migraines and needs regular checkups.", // Patient details
        notes: "Review progress of migraine treatment", // Notes
        picture: "https://i.postimg.cc/LXWxmRqP/download-33.jpg", // Picture URL
        nextAppointment: "2024-12-10, 1:00 PM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "135/88", // Blood Pressure
        Cholesterol: "210 mg/dL", // Cholesterol level
        BloodSugarLevel: "105 mg/dL", // Blood sugar level
        Height: "5'7\"",
        Weight: "145 lbs",
        Goal: "Manage migraine triggers and maintain overall health", // Goal
      },
      {
        id: 6,
        name: "Michael Thompson",
        email: "michael@example.com", // Email
        mobile: "654-987-3210", // Mobile number
        patientType: "New", // Patient type
        details: "Michael is a new patient diagnosed with high cholesterol and needs lifestyle changes.", // Patient details
        notes: "Initial consultation for cholesterol management", // Notes
        picture: "https://i.postimg.cc/rmWL6hsq/download-34.jpg", // Picture URL
        nextAppointment: "2024-12-11, 3:00 PM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "130/85", // Blood Pressure
        Cholesterol: "250 mg/dL", // Cholesterol level
        BloodSugarLevel: "110 mg/dL", // Blood sugar level
        Height: "5'8\"",
        Weight: "200 lbs",
        Goal: "Lower cholesterol and improve overall health through diet and exercise", // Goal
      },
      {
        id: 7,
        name: "Sophie Miller",
        email: "sophie@example.com", // Email
        mobile: "987-321-6540", // Mobile number
        patientType: "Cured", // Patient type
        details: "Sophie has successfully completed her rehabilitation after knee surgery.", // Patient details
        notes: "Post-surgery follow-up for knee rehabilitation", // Notes
        picture: "https://i.postimg.cc/3xCsZy6x/download-31.jpg", // Picture URL
        nextAppointment: "2024-12-12, 9:30 AM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "120/80", // Blood Pressure
        Cholesterol: "180 mg/dL", // Cholesterol level
        BloodSugarLevel: "90 mg/dL", // Blood sugar level
        Height: "5'4\"",
        Weight: "135 lbs",
        Goal: "Maintain mobility and physical health after knee surgery", // Goal
      },
      {
        id: 8,
        name: "David Wilson",
        email: "david@example.com", // Email
        mobile: "321-987-6540", // Mobile number
        patientType: "Old", // Patient type
        details: "David has been receiving treatment for his asthma and needs regular follow-ups.", // Patient details
        notes: "Checkup for asthma control and medication review", // Notes
        picture: "https://i.postimg.cc/3RFR2JhM/download-32.jpg", // Picture URL
        nextAppointment: "2024-12-15, 10:00 AM", // Next appointment details
        appointmentType: "General", // Appointment type
        BP: "125/78", // Blood Pressure
        Cholesterol: "220 mg/dL", // Cholesterol level
        BloodSugarLevel: "95 mg/dL", // Blood sugar level
        Height: "5'9\"",
        Weight: "170 lbs",
        Goal: "Control asthma symptoms with medication and lifestyle changes", // Goal
      },
      {
        id: 9,
        name: "Charlotte Green",
        email: "charlotte@example.com", // Email
        mobile: "543-210-9876", // Mobile number
        patientType: "New", // Patient type
        details: "Charlotte is a new patient seeking advice on managing stress and mental well-being.", // Patient details
        notes: "Initial consultation for stress management and counseling", // Notes
        picture: "https://i.postimg.cc/mZj1KVHY/images-14.jpg", // Picture URL
        nextAppointment: "2024-12-18, 11:00 AM", // Next appointment details
        appointmentType: "Clinic Consulting", // Appointment type
        BP: "118/75", // Blood Pressure
        Cholesterol: "200 mg/dL", // Cholesterol level
        BloodSugarLevel: "105 mg/dL", // Blood sugar level
        Height: "5'6\"",
        Weight: "150 lbs",
        Goal: "Reduce stress and improve mental well-being through counseling", // Goal
      }
];

const MealRequest = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanChange = (e) => {
    
    const selectedPlanKey = e.target.value;
    setSelectedPlan(dietPlan[selectedPlanKey]);
  };

  const handleSuggestDietClick = (user) => {
    setSelectedUser(user);

    const generatedPlan = {
        plan1: {
          breakfast: { time: "7 AM - 10 AM", items: ["Avocado", "Eggs"], calories: 400 },
          lunch: { time: "12 PM - 2 PM", items: ["Grilled Chicken", "Salad"], calories: 600 },
          dinner: { time: "6 PM - 8 PM", items: ["Steamed Veggies", "Fish"], calories: 500 },
        },
        plan2: {
          breakfast: { time: "7 AM - 10 AM", items: ["Greek Yogurt", "Blueberries", "Granola"], calories: 350 },
          lunch: { time: "12 PM - 2 PM", items: ["Turkey Sandwich", "Apple"], calories: 550 },
          dinner: { time: "6 PM - 8 PM", items: ["Baked Salmon", "Quinoa", "Broccoli"], calories: 600 },
        },
        plan3: {
          breakfast: { time: "7 AM - 10 AM", items: ["Oatmeal", "Almond Butter", "Banana"], calories: 450 },
          lunch: { time: "12 PM - 2 PM", items: ["Chicken Stir Fry", "Brown Rice"], calories: 600 },
          dinner: { time: "6 PM - 8 PM", items: ["Lentil Soup", "Whole-Grain Bread"], calories: 500 },
        },
        plan4: {
          breakfast: { time: "7 AM - 10 AM", items: ["Smoothie (Spinach, Mango, Protein Powder)"], calories: 300 },
          lunch: { time: "12 PM - 2 PM", items: ["Grilled Shrimp", "Mixed Greens", "Sweet Potato"], calories: 550 },
          dinner: { time: "6 PM - 8 PM", items: ["Turkey Meatballs", "Zucchini Noodles"], calories: 500 },
        },
        plan5: {
          breakfast: { time: "7 AM - 10 AM", items: ["Whole Grain Toast", "Avocado", "Poached Egg"], calories: 400 },
          lunch: { time: "12 PM - 2 PM", items: ["Beef Stir Fry", "Vegetables", "Wild Rice"], calories: 650 },
          dinner: { time: "6 PM - 8 PM", items: ["Grilled Tofu", "Asparagus", "Mashed Cauliflower"], calories: 450 },
        },
        plan6: {
          breakfast: { time: "7 AM - 10 AM", items: ["Smoothie Bowl", "Chia Seeds", "Berries"], calories: 350 },
          lunch: { time: "12 PM - 2 PM", items: ["Grilled Chicken Wrap", "Carrot Sticks"], calories: 500 },
          dinner: { time: "6 PM - 8 PM", items: ["Herb-Roasted Chicken", "Steamed Spinach", "Brown Rice"], calories: 550 },
        },
        plan7: {
          breakfast: { time: "7 AM - 10 AM", items: ["Pancakes (Whole Wheat)", "Honey", "Strawberries"], calories: 400 },
          lunch: { time: "12 PM - 2 PM", items: ["Quinoa Salad", "Grilled Halloumi"], calories: 550 },
          dinner: { time: "6 PM - 8 PM", items: ["Baked Cod", "Green Beans", "Mashed Sweet Potato"], calories: 500 },
        },
      };

    setDietPlan(generatedPlan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setDietPlan(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Meal Plan Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg border-separate border-spacing-2">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">BP</th>
              <th className="py-3 px-6 text-left">Weight</th>
              <th className="py-3 px-6 text-left">Blood Sugar</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6">{user.id}</td>
                <td className="py-4 px-6 flex gap-2 items-center"><img className="w-10 h-10 rounded-full" src={user.picture} alt="" />{user.name}</td>
                <td className="py-4 px-6">{user.BP}</td>
                <td className="py-4 px-6">{user.Weight}</td>
                <td className="py-4 px-6">{user.BloodSugarLevel}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleSuggestDietClick(user)}
                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full shadow-md"
                  >
                    Suggest Diet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && dietPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-4/5 md:w-1/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Diet Plan for {selectedUser.name}</h2>
            <form>
              <div className="flex gap-6 mb-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Patient ID:</label>
                    <input
                      type="text"
                      value={selectedUser.id}
                      readOnly
                      className="w-full border-teal-500 rounded-lg py-2 px-3 border-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Diet Type:</label>
                    <input
                      type="text"
                      placeholder="Enter diet type"
                      className="w-full border-teal-500 rounded-lg py-2 px-3 border-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Goal:</label>
                    <input
                      type="text"
                      placeholder="Enter goal"
                      className="w-full border-teal-500 rounded-lg py-2 px-3 border-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Calories:</label>
                    <input
                      type="text"
                      placeholder="Enter calories"
                      className="w-full border-teal-500 rounded-lg py-2 px-3 border-2"
                    />
                  </div>
                </div>

                {/* Meal Plan */}
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Select Diet Plan:</label>
                    <select
                      className="w-full border-teal-500 rounded-lg py-2 px-3 border-2"
                      onChange={handlePlanChange}
                      defaultValue=""
                    >
                      <option value="">-- Select a Plan --</option>
                      {Object.keys(dietPlan).map((planKey) => (
                        <option key={planKey} value={planKey}>
                          {planKey.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedPlan && (
                    <div className="">
                      <div>
                        <h3 className="text-lg font-semibold">Breakfast</h3>
                        <p className="text-sm text-gray-600">{selectedPlan.breakfast.time}</p>
                        <ul className="list-disc text-sm pl-5">
                          {selectedPlan.breakfast.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600">Calories: {selectedPlan.breakfast.calories}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Lunch</h3>
                        <p className="text-sm text-gray-600">{selectedPlan.lunch.time}</p>
                        <ul className="list-disc text-sm pl-5">
                          {selectedPlan.lunch.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600">Calories: {selectedPlan.lunch.calories}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">Dinner</h3>
                        <p className="text-sm text-gray-600">{selectedPlan.dinner.time}</p>
                        <ul className="list-disc text-sm pl-5">
                          {selectedPlan.dinner.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600">Calories: {selectedPlan.dinner.calories}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full shadow-md"
                >
                  Close
                </button>
                <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full shadow-md">
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealRequest;
