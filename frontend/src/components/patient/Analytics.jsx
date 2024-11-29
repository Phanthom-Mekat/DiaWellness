import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaUserCircle } from "react-icons/fa";
import { MdExpandMore, MdMenu } from "react-icons/md";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Analytics() {
  const [selectedMetric, setSelectedMetric] = useState("Heart Rate");
  const [selectedUser, setSelectedUser] = useState("Grey");
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  // Sample data for the chart
  const data = {
    "Heart Rate": [85, 65, 35, 110, 90, 120, 95],
    "Blood Pressure": [95, 75, 45, 100, 85, 110, 90],
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Chart.js data configuration
  const chartData = {
    labels: days,
    datasets: [
      {
        label: selectedMetric,
        data: data[selectedMetric],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 150,
        ticks: {
          stepSize: 30,
        },
      },
      x: {
        ticks: {
          color: "#6b7280", // Gray color for labels
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="flex gap-3">
          
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
            <span>{selectedPeriod}</span>
            <MdExpandMore className="text-gray-500 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {["Heart Rate", "Blood Pressure"].map((metric) => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedMetric === metric
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {metric}
          </button>
        ))}
      </div>

      <div className="relative h-80">
        <Bar data={chartData} options={chartOptions} />
        <button className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-lg">
          <MdMenu className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
