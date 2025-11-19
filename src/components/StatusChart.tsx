// src/components/StatusChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
 type  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAppSelector } from '../hooks/redux';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const StatusChart: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.theme);
  const members = useAppSelector((state) => state.members.members);

  const statusData = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusColors = {
    Working: '#10B981', // green-500
    Break: '#F59E0B',   // yellow-500
    Meeting: '#3B82F6', // blue-500
    Offline: '#6B7280', // gray-500
  };

  const data = {
    labels: Object.keys(statusData),
    datasets: [
      {
        data: Object.values(statusData),
        backgroundColor: Object.keys(statusData).map(status => 
          statusColors[status as keyof typeof statusColors]
        ),
        borderColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
        bodyColor: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
        borderColor: darkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
      <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Team Status Distribution
      </h3>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default StatusChart;