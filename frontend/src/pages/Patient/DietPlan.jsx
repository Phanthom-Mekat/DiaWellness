import { useState } from 'react';
import { 
  Apple, 
  Coffee, 
  Utensils, 
  Salad,
  Moon,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DietPlan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const dietPlan = {
    breakfast: {
      time: '8:00 AM',
      items: [
        { name: 'Oatmeal with Berries', calories: 280, protein: '8g', carbs: '45g', fats: '6g' },
        { name: 'Greek Yogurt', calories: 120, protein: '15g', carbs: '8g', fats: '0g' },
        { name: 'Almonds (10 pieces)', calories: 70, protein: '3g', carbs: '2g', fats: '6g' }
      ],
      notes: 'Start your day with this energy-packed breakfast. Eat slowly and mindfully.'
    },
    lunch: {
      time: '1:00 PM',
      items: [
        { name: 'Grilled Chicken Breast', calories: 165, protein: '31g', carbs: '0g', fats: '3.6g' },
        { name: 'Quinoa Salad', calories: 120, protein: '4g', carbs: '21g', fats: '1.9g' },
        { name: 'Steamed Vegetables', calories: 45, protein: '2g', carbs: '10g', fats: '0g' }
      ],
      notes: 'Ensure to drink water 30 minutes before the meal. Chew thoroughly.'
    },
    snacks: {
      time: '4:00 PM',
      items: [
        { name: 'Apple', calories: 95, protein: '0.5g', carbs: '25g', fats: '0.3g' },
        { name: 'Protein Shake', calories: 120, protein: '24g', carbs: '3g', fats: '1g' }
      ],
      notes: 'Perfect time for a light snack to maintain energy levels.'
    },
    dinner: {
      time: '7:00 PM',
      items: [
        { name: 'Salmon Fillet', calories: 208, protein: '22g', carbs: '0g', fats: '13g' },
        { name: 'Brown Rice', calories: 216, protein: '5g', carbs: '45g', fats: '1.8g' },
        { name: 'Mixed Greens', calories: 10, protein: '1g', carbs: '2g', fats: '0g' }
      ],
      notes: 'Last major meal of the day. Try to eat 3 hours before bedtime.'
    }
  };

  const mealIcons = {
    breakfast: Coffee,
    lunch: Utensils,
    snacks: Apple,
    dinner: Moon
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getTotalNutrition = (items) => {
    return items.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: parseFloat(acc.protein) + parseFloat(item.protein),
      carbs: parseFloat(acc.carbs) + parseFloat(item.carbs),
      fats: parseFloat(acc.fats) + parseFloat(item.fats)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
            <h1 className="text-2xl font-bold text-white">Your Personalized Diet Plan</h1>
            <p className="text-green-50 mt-1">
              Customized nutrition plan by your nutritionist
            </p>
          </div>

          {/* Date Navigation */}
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-green-500" />
                <span className="text-lg font-medium">{formatDate(selectedDate)}</span>
              </div>
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Meal Navigation */}
          <div className="grid grid-cols-4 gap-4 p-4 border-b">
            {Object.entries(mealIcons).map(([meal, Icon]) => (
              <button
                key={meal}
                onClick={() => setSelectedMeal(meal)}
                className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                  selectedMeal === meal 
                    ? 'bg-green-50 text-green-600' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="capitalize text-sm font-medium">{meal}</span>
              </button>
            ))}
          </div>

          {/* Meal Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Recommended Time: {dietPlan[selectedMeal].time}</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Nutritionist Approved</span>
              </div>
            </div>

            {/* Food Items */}
            <div className="space-y-4 mb-6">
              {dietPlan[selectedMeal].items.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span className="text-green-600 font-medium">{item.calories} cal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Protein:</span>
                      <span>{item.protein}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Carbs:</span>
                      <span>{item.carbs}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Fats:</span>
                      <span>{item.fats}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nutritional Summary */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-green-800 mb-3">Meal Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(getTotalNutrition(dietPlan[selectedMeal].items)).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm text-green-600 font-medium capitalize">{key}</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {typeof value === 'number' ? value.toFixed(0) : value.toFixed(1)}
                      {key !== 'calories' ? 'g' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="flex items-start space-x-3 text-gray-600 bg-blue-50 p-4 rounded-lg">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Nutritionist's Notes</h4>
                <p className="text-sm">{dietPlan[selectedMeal].notes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}