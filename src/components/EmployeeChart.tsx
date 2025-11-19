// src/components/EmployeeChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../hooks/redux';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeChart: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.theme);

  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const employeeData = [320, 350, 380, 400, 420, 430, 423];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Employees',
        data: employeeData,
        backgroundColor: darkMode 
          ? 'rgba(16, 185, 129, 0.8)'  // green-500 with opacity
          : 'rgba(16, 185, 129, 0.7)',
        borderColor: darkMode 
          ? 'rgb(16, 185, 129)'  // green-500
          : 'rgb(5, 150, 105)',  // green-600
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
        bodyColor: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
        borderColor: darkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Employees: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
      <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Employees Info
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default EmployeeChart;