// src/components/MemberCard.tsx
import React from 'react';
import type { TeamMember } from '../types';
import { useAppSelector } from '../hooks/redux';

interface MemberCardProps {
  member: TeamMember;
  taskCount: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, taskCount }) => {
  const { darkMode } = useAppSelector((state) => state.theme);

  const getStatusColor = (status: string): string => {
    const colors = {
      Working: 'bg-green-100 text-green-800',
      Break: 'bg-yellow-100 text-yellow-800',
      Meeting: 'bg-blue-100 text-blue-800',
      Offline: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDarkStatusColor = (status: string): string => {
    const colors = {
      Working: 'bg-green-900/50 text-green-300',
      Break: 'bg-yellow-900/50 text-yellow-300',
      Meeting: 'bg-blue-900/50 text-blue-300',
      Offline: 'bg-gray-700 text-gray-300'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-700 text-gray-300';
  };

  return (
    <div className={`p-4 rounded-lg border transition-colors duration-200 ${
      darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {member.name}
            </h4>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {member.position}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {member.department}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            darkMode ? getDarkStatusColor(member.status) : getStatusColor(member.status)
          }`}>
            {member.status}
          </span>
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;