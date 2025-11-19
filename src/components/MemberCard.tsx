// src/components/MemberCard.tsx
import React from 'react';
import type { TeamMember } from '@/types';
// import {type TeamMember } from '@/types';

interface MemberCardProps {
  member: TeamMember;
  taskCount: number;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, taskCount }) => {
  const getStatusColor = (status: string): string => {
    const colors = {
      Working: 'bg-green-100 text-green-800',
      Break: 'bg-yellow-100 text-yellow-800',
      Meeting: 'bg-blue-100 text-blue-800',
      Offline: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
            {member.status}
          </span>
          <span className="text-xs text-gray-500">{taskCount} tasks</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;