// src/components/StatsCards.tsx
import React from 'react';
import { useAppSelector } from '../hooks/redux';
import type { DashboardStats } from '../types';

interface StatsCardsProps {
  stats?: DashboardStats; // Make it optional
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const { darkMode } = useAppSelector((state) => state.theme);
  const members = useAppSelector((state) => state.members.members);

  // Provide default stats if not provided
  const defaultStats: DashboardStats = {
    totalMembers: members.length,
    activeTasks: 0,
    completedTasks: 0,
    productivityScore: 0,
    attendance: members.filter(member => member.status !== 'Offline').length * 10,
    lateComing: Math.floor(members.length * 0.1),
    absent: members.filter(member => member.status === 'Offline').length,
    leaveApply: Math.floor(members.length * 0.2),
  };

  const displayStats = stats || defaultStats;

  const cards = [
    {
      title: 'Attendance',
      value: displayStats.attendance,
      icon: '✅',
      color: 'green',
    },
    {
      title: 'Late Coming',
      value: displayStats.lateComing,
      icon: '⏰',
      color: 'yellow',
    },
    {
      title: 'Absent',
      value: displayStats.absent,
      icon: '❌',
      color: 'red',
    },
    {
      title: 'Leave Apply',
      value: displayStats.leaveApply,
      icon: '📝',
      color: 'blue',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: darkMode ? 'bg-green-900/50 border-green-700' : 'bg-green-50 border-green-200',
      yellow: darkMode ? 'bg-yellow-900/50 border-yellow-700' : 'bg-yellow-50 border-yellow-200',
      red: darkMode ? 'bg-red-900/50 border-red-700' : 'bg-red-50 border-red-200',
      blue: darkMode ? 'bg-blue-900/50 border-blue-700' : 'bg-blue-50 border-blue-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColor = (color: string) => {
    const colors = {
      green: 'text-green-600',
      yellow: 'text-yellow-600',
      red: 'text-red-600',
      blue: 'text-blue-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`p-6 rounded-xl border-2 ${getColorClasses(card.color)} transition-colors duration-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {card.value}
              </p>
            </div>
            <div className={`text-2xl ${getTextColor(card.color)}`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;