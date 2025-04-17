import { useState } from 'react';
import { Heart, Thermometer, Activity, Scale, Droplets, Save, RefreshCw, AlertCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLungs } from "react-icons/fa";

export default function DailyHealthData() {
  const [formData, setFormData] = useState({
    heartRate: '',
    temperature: '',
    glucoseLevel: '',
    spo2: '',
    bloodPressure: {
      systolic: '',
      diastolic: ''
    },
    weight: '',
    height: '',
  });

  const [loading, setLoading] = useState(false);

  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      return bmi;
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Health data saved successfully!');
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      heartRate: '',
      temperature: '',
      glucoseLevel: '',
      spo2: '',
      bloodPressure: {
        systolic: '',
        diastolic: ''
      },
      weight: '',
      height: '',
    });
  };

  const metrics = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: formData.heartRate,
      unit: 'bpm',
      placeholder: '60-100',
      name: 'heartRate',
      type: 'number',
      min: '40',
      max: '200',
      color: 'text-red-500',
      info: 'Normal resting heart rate is typically 60-100 beats per minute'
    },
    {
      icon: Thermometer,
      label: 'Body Temperature',
      value: formData.temperature,
      unit: '°C',
      placeholder: '36.1-37.2',
      name: 'temperature',
      type: 'number',
      step: '0.1',
      min: '35',
      max: '42',
      color: 'text-orange-500',
      info: 'Normal body temperature ranges from 36.1°C to 37.2°C'
    },
    {
      icon: Droplets,
      label: 'Glucose Level',
      value: formData.glucoseLevel,
      unit: 'mg/dL',
      placeholder: '70-140',
      name: 'glucoseLevel',
      type: 'number',
      min: '20',
      max: '600',
      color: 'text-purple-500',
      info: 'Normal blood glucose level is between 70-140 mg/dL when fasting'
    },
    {
      icon: FaLungs,
      label: 'SPo2',
      value: formData.spo2,
      unit: '%',
      placeholder: '95-100',
      name: 'spo2',
      type: 'number',
      min: '1',
      max: '100',
      color: 'text-blue-500',
      info: 'Normal oxygen saturation is typically above 95%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6">
      <div className="max-w-xl md:max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 sm:px-5 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Daily Health Tracker</h1>
            <p className="text-blue-100 text-sm mt-1">Record your daily health metrics</p>
          </div>

          <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6">
            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
              {metrics.map((metric) => (
                <div key={metric.label} className="relative group">
                  <div className="absolute -right-1 -top-1 sm:-right-2 sm:-top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 max-w-xs">
                      {metric.info}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <label className="text-gray-700 text-sm sm:text-base font-medium flex items-center">
                        <metric.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${metric.color} mr-1 sm:mr-2`} />
                        {metric.label}
                      </label>
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 cursor-help" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type={metric.type}
                        name={metric.name}
                        value={metric.value}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          [metric.name]: e.target.value
                        }))}
                        placeholder={metric.placeholder}
                        className="block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        min={metric.min}
                        max={metric.max}
                        step={metric.step}
                      />
                      <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">{metric.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blood Pressure Section */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white p-3 sm:p-4 rounded border border-gray-200 hover:border-blue-500 transition-colors">
                <label className="text-gray-700 text-sm sm:text-base font-medium flex items-center mb-1 sm:mb-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2" />
                  Blood Pressure
                </label>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={formData.bloodPressure.systolic}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        bloodPressure: {
                          ...prev.bloodPressure,
                          systolic: e.target.value
                        }
                      }))}
                      placeholder="Systolic"
                      className="block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      min="70"
                      max="200"
                    />
                  </div>
                  <span className="text-gray-500">/</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={formData.bloodPressure.diastolic}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        bloodPressure: {
                          ...prev.bloodPressure,
                          diastolic: e.target.value
                        }
                      }))}
                      placeholder="Diastolic"
                      className="block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      min="40"
                      max="130"
                    />
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">mmHg</span>
                </div>
              </div>
            </div>

            {/* BMI Calculator Section */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white p-3 sm:p-4 rounded border border-gray-200 hover:border-blue-500 transition-colors">
                <label className="text-gray-700 text-sm sm:text-base font-medium flex items-center mb-1 sm:mb-2">
                  <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 mr-1 sm:mr-2" />
                  BMI Calculator
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        weight: e.target.value
                      }))}
                      placeholder="Weight (kg)"
                      className="block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      min="20"
                      max="300"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        height: e.target.value
                      }))}
                      placeholder="Height (cm)"
                      className="block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      min="100"
                      max="250"
                    />
                  </div>
                </div>
                {calculateBMI() && (
                  <div className="mt-2 text-center">
                    <span className="text-gray-600 text-sm">Your BMI: </span>
                    <span className={`font-semibold ${getBMICategory(calculateBMI()).color} text-sm sm:text-base`}>
                      {calculateBMI()} ({getBMICategory(calculateBMI()).label})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center sm:justify-start text-sm"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center sm:justify-start disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                ) : (
                  <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                )}
                Save Data
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}