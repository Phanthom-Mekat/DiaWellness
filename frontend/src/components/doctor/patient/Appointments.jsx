import { Search, Calendar, Filter, Eye, MessageSquare, X } from 'lucide-react'
import { BsGrid3X3GapFill, BsListUl } from 'react-icons/bs'

export default function Appointments() {
  return (
    <div className="p-6 max-w-7xl mx-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex gap-2 border rounded-lg p-1">
            <button className="p-2 rounded hover:bg-gray-100">
              <BsListUl className="w-5 h-5 text-blue-500" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <BsGrid3X3GapFill className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium">
            Upcoming <span className="ml-1 px-2 py-0.5 bg-white text-blue-500 rounded-full text-sm">21</span>
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium">
            Cancelled <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-sm">16</span>
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium">
            Completed <span className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-sm">214</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            11/23/2024 - 11/29/2024
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter By
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {/* Appointment Item */}
        <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <img
              src="/public/founder.jpg"
              alt="Dr Edalin"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-sm">#Apt0001</span>
                <h3 className="font-medium">Dr Edalin</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>General Visit</span>
                <span>•</span>
                <span>Video Call</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>11 Nov 2024 10:45 AM</span>
              </div>
              <a href="mailto:edalin@example.com" className="text-sm text-gray-500">edalin@example.com</a>
              <div className="text-sm text-gray-500">+1 504 368 6874</div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Attend
            </button>
          </div>
        </div>

        {/* Dr.Shanta Appointment */}
        <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <img
              src="/public/founder.jpg"
              alt="Dr.Shanta"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-sm">#Apt0002</span>
                <h3 className="font-medium">Dr.Shanta</h3>
                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">New</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>General Visit</span>
                <span>•</span>
                <span>Audio Call</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>05 Nov 2024 11:50 AM</span>
              </div>
              <a href="mailto:shanta@example.com" className="text-sm text-gray-500">shanta@example.com</a>
              <div className="text-sm text-gray-500">+1 832 891 8403</div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Attend
            </button>
          </div>
        </div>

        {/* Dr.John Appointment */}
        <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <img
              src="/public/johnDoe.jpg"
              alt="Dr.John"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-sm">#Apt0003</span>
                <h3 className="font-medium">Dr.John</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>General Visit</span>
                <span>•</span>
                <span>Video Call</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>27 Oct 2024 09:30 AM</span>
              </div>
              <a href="mailto:john@example.com" className="text-sm text-gray-500">john@example.com</a>
              <div className="text-sm text-gray-500">+1 749 104 6291</div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Eye className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Attend
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}