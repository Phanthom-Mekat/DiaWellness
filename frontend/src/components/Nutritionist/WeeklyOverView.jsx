// Import React and Chart.js components

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyOverView = () => {
  // Sample data for the weekly chart
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Patients Treated",
        data: [12, 19, 10, 17, 15, 20, 14],
        backgroundColor: "rgba(54, 162, 235, 0.6)", 
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Appointments",
        data: [8, 12, 15, 10, 13, 18, 9],
        backgroundColor: "rgba(255, 99, 132, 0.6)", 
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options for customization
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Weekly Overview", // Chart title
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Y-axis starts at zero
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-gray-700 font-medium text-lg mb-4">Weekly Overview</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyOverView;
