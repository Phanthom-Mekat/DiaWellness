import { useState } from 'react';
import { 
  Pill, 
  Bell, 
  Calendar,
  Clock,
  FileText,
  Plus,
  Search,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Download,
  Eye
} from 'lucide-react';

export default function Prescription() {
  const [activeTab, setActiveTab] = useState('current');
  const [showNotification, setShowNotification] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      date: "2024-03-21",
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "5 days" }
      ],
      status: "active",
      notes: "Take with food. Complete full course.",
      lastUpdated: "2024-03-21 14:30"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      date: "2024-03-15",
      medications: [
        { name: "Loratadine", dosage: "10mg", frequency: "Once daily", duration: "30 days" }
      ],
      status: "active",
      notes: "Take in the morning",
      lastUpdated: "2024-03-15 09:15"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">My Prescriptions</h1>
            <div className="relative">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                {showNotification && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {showNotification && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  New prescription received from Dr. Sarah Wilson
                </p>
                <button 
                  className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-600 md:mt-0 md:ml-6"
                  onClick={() => setShowNotification(false)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Doctors</option>
              <option>Dr. Sarah Wilson</option>
              <option>Dr. Michael Chen</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['current', 'past', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Prescriptions
              </button>
            ))}
          </nav>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Pill className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{prescription.doctor}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{prescription.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>Last updated: {prescription.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Medications */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Medications</h4>
                <div className="space-y-3">
                  {prescription.medications.map((medication, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{medication.name}</p>
                          <p className="text-sm text-gray-500">
                            {medication.dosage} • {medication.frequency} • {medication.duration}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {prescription.notes && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                  <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                    {prescription.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}