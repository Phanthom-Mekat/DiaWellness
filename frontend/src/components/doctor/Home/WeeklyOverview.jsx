import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyOverview = () => {
  // State to toggle between Revenue and Appointments
  const [activeTab, setActiveTab] = useState("Appointments");

  // Weekly data for Revenue and Appointments
  const data = {
    Revenue: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [
        {
          label: "Revenue",
          data: [40, 50, 20, 60, 50, 60, 80],
          backgroundColor: "#ADD8E6", //  primary color
          borderRadius: {
            topLeft: 25,
            topRight: 25,
          },
          borderSkipped: false, //rounded edges to all sides
        },
      ],
    },
    Appointments: {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [
        {
          label: "Appointments",
          data: [30, 20, 10, 50, 40, 60, 70],
          backgroundColor: "#3498db", //  secondary color
          borderRadius: {
            topLeft: 25,
            topRight: 25,
          },
          borderSkipped: false,
        },
      ],
    },
  };

  // Chart.js options to mimic the design
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        backgroundColor: "#fff", // Tooltip background
        titleColor: "#000", // Tooltip title color
        bodyColor: "#333", // Tooltip body color
        borderColor: "#ddd", // Tooltip border
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#F5F5F5", // Light grid lines
        },
        ticks: {
          stepSize: 20,
          font: {
            family: "Arial, sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: false, // Hide grid lines for x-axis
        },
        ticks: {
          font: {
            family: "Arial, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Weekly Overview</h3>
        <p className="text-gray-500 text-sm">Nov 1 - Nov 11</p>
      </div>

      {/* Tab Section */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`btn btn-sm ${
            activeTab === "Revenue" ? "bg-primary text-white" : "btn-outline"
          }`}
          onClick={() => setActiveTab("Revenue")}
        >
          Revenue
        </button>
        <button
          className={`btn btn-sm ${
            activeTab === "Appointments" ? "bg-secondary text-white" : "btn-outline"
          }`}
          onClick={() => setActiveTab("Appointments")}
        >
          Appointments
        </button>
      </div>

      {/* Chart Section */}
      <div className="h-64">
        <Bar data={data[activeTab]} options={options} />
      </div>
    </div>
  );
};

export default WeeklyOverview;
