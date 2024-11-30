import { useState } from 'react';
import { 
  Apple, 
  Salad,
  Scale,
  Heart,
  Activity,
  Flame,
  ChevronDown,
  AlertCircle,
  Bot,
  Sparkles,
  Filter,
  Clock
} from 'lucide-react';

export default function SystemDiet() {
  const [preferences, setPreferences] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    goal: 'maintain',
    restrictions: [],
    allergies: []
  });

  const [showRecommendation, setShowRecommendation] = useState(false);

  const dietaryRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Keto', 'Low-Carb', 'Halal', 'Kosher'
  ];

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Egg', 'Soy', 
    'Wheat', 'Fish', 'Shellfish'
  ];

  const activityLevels = {
    sedentary: 'Little to no exercise',
    light: '1-3 days/week',
    moderate: '3-5 days/week',
    active: '6-7 days/week',
    very_active: 'Very active & physical job'
  };

  const goals = {
    lose: 'Lose Weight',
    maintain: 'Maintain Weight',
    gain: 'Gain Weight',
    muscle: 'Build Muscle'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRecommendation(true);
  };

  const toggleRestriction = (restriction) => {
    setPreferences(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  const toggleAllergy = (allergy) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">AI Diet Planner</h1>
                <p className="text-blue-50 mt-1">Get your personalized meal plan</p>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {!showRecommendation ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={preferences.age}
                    onChange={(e) => setPreferences(prev => ({...prev, age: e.target.value}))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Years"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                  <input
                    type="number"
                    value={preferences.weight}
                    onChange={(e) => setPreferences(prev => ({...prev, weight: e.target.value}))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="kg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                  <input
                    type="number"
                    value={preferences.height}
                    onChange={(e) => setPreferences(prev => ({...prev, height: e.target.value}))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="cm"
                    required
                  />
                </div>
              </div>

              {/* Activity Level & Goal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={preferences.activityLevel}
                    onChange={(e) => setPreferences(prev => ({...prev, activityLevel: e.target.value}))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(activityLevels).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal
                  </label>
                  <select
                    value={preferences.goal}
                    onChange={(e) => setPreferences(prev => ({...prev, goal: e.target.value}))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(goals).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Restrictions
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietaryRestrictions.map(restriction => (
                    <button
                      key={restriction}
                      type="button"
                      onClick={() => toggleRestriction(restriction)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        preferences.restrictions.includes(restriction)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {restriction}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonAllergies.map(allergy => (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => toggleAllergy(allergy)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        preferences.allergies.includes(allergy)
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Diet Recommendation</span>
              </button>
            </form>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Personalized Plan</h2>
                <button
                  onClick={() => setShowRecommendation(false)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Adjust Preferences
                </button>
              </div>

              {/* Calorie and Macro Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Flame, label: 'Daily Calories', value: '2,200 kcal' },
                  { icon: Activity, label: 'Protein', value: '120g' },
                  { icon: Apple, label: 'Carbs', value: '250g' },
                  { icon: Scale, label: 'Fats', value: '73g' }
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-gray-50 p-4 rounded-lg text-center">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm text-gray-600">{label}</div>
                    <div className="font-semibold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>

              {/* AI Recommendations */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Bot className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-blue-900">AI Recommendation</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on your profile and goals, I recommend focusing on a balanced diet with slightly higher protein intake to support your fitness goals. Here's your personalized plan:
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meal Timing */}
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">Recommended Meal Timing</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Breakfast</span>
                      <span>7:00 - 8:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lunch</span>
                      <span>12:00 - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Snack</span>
                      <span>3:30 - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dinner</span>
                      <span>7:00 - 8:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-green-900">Personalized Tips</h3>
                      <ul className="text-sm text-green-700 mt-2 space-y-2">
                        <li>• Drink water 30 minutes before meals</li>
                        <li>• Include protein with every meal</li>
                        <li>• Eat slowly and mindfully</li>
                        <li>• Get 7-8 hours of sleep</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}