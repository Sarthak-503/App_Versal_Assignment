// src/components/ProductivityChart.tsx
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

const ProductivityChart: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.theme);

  const weeklyData = [
    { day: 'Mon', productivity: 85 },
    { day: 'Tue', productivity: 92 },
    { day: 'Wed', productivity: 78 },
    { day: 'Thu', productivity: 88 },
    { day: 'Fri', productivity: 95 },
    { day: 'Sat', productivity: 60 },
    { day: 'Sun', productivity: 45 },
  ];

  const data = {
    labels: weeklyData.map(data => data.day),
    datasets: [
      {
        label: 'Productivity %',
        data: weeklyData.map(data => data.productivity),
        backgroundColor: darkMode 
          ? 'rgba(59, 130, 246, 0.8)'  // blue-500 with opacity
          : 'rgba(59, 130, 246, 0.7)',
        borderColor: darkMode 
          ? 'rgb(59, 130, 246)'  // blue-500
          : 'rgb(37, 99, 235)',  // blue-600
        borderWidth: 1,
        borderRadius: 6,
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
            return `Productivity: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false
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
        max: 100,
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)',
        },
        ticks: {
          color: darkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)',
          font: {
            size: 11,
          },
          callback: function(value) {
            return value + '%';
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
        Weekly Productivity
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProductivityChart;