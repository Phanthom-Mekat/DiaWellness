import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  
  ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);
  
  const DiabetesTypeChart = () => {
    const data = {
      labels: ["Type-1", "Type-2", "Pre-Diabetes", "Gestational Diabetes"],
      datasets: [
        {
          label: "Diabetes Type",
          data: [30, 20, 10, 40],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // Soft red
            "rgba(54, 162, 235, 0.6)", // Soft blue
            "rgba(75, 192, 192, 0.6)", // Soft teal
            "rgba(153, 102, 255, 0.6)", // Soft purple
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: "#374151", // Tailwind gray-700
            font: {
              size: 14,
              family: "'Poppins', sans-serif",
            },
          },
        },
        title: {
          display: true,
          text: "Diabetes Type Distribution",
          font: {
            size: 18,
            weight: "bold",
            family: "'Poppins', sans-serif",
          },
          color: "#1F2937", // Tailwind gray-800
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "#D1D5DB", // Tailwind gray-300
          borderWidth: 1,
          bodyColor: "#1F2937", // Tailwind gray-800
          titleColor: "#1F2937",
          titleFont: { size: 14, family: "'Poppins', sans-serif" },
          bodyFont: { size: 12, family: "'Poppins', sans-serif" },
        },
      },
      cutout: "70%", // Inner cutout for the donut chart
    };
  
    return (
      <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-xl shadow-lg p-6 max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 w-64 mx-auto">
          <Doughnut data={data} options={options} />
          {/* Centered content inside the doughnut */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm"></p>
              <p className="text-gray-800 text-xl font-bold"> </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DiabetesTypeChart;
  