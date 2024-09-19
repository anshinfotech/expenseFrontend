// Import necessary libraries
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Chart = ({ totalIncome, totalExpenses, type }) => {
  // Define the data for the chart
  const data = {
    labels: ["Total Income", "Total Expenses"],
    datasets: [
      {
        label: "Income vs Expenses",
        data: [totalIncome, totalExpenses],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Color for income
          "rgba(255, 99, 132, 0.2)", // Color for expenses
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border for income
          "rgba(255, 99, 132, 1)", // Border for expenses
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options to configure the chart
  const options = {
    responsive : true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let total = context.dataset.data.reduce((a, b) => a + b, 0);
            let percentage = ((context.raw / total) * 100).toFixed(2);
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
    scales:
      type === "bar"
        ? {
            // For bar chart, show scales
            y: {
              beginAtZero: true,
            },
          }
        : {},
  };

  // Render the chart based on the type
  return (
    <div>
      {type === "pie" ? (
        <Pie data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default Chart;
