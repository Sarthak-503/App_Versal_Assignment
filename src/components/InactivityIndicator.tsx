// src/components/InactivityIndicator.tsx
import React from 'react';
import { useAppSelector } from '../hooks/redux';

const InactivityIndicator: React.FC = () => {
  const members = useAppSelector((state) => state.members.members);
  const { darkMode } = useAppSelector((state) => state.theme);

  const inactiveMembers = members.filter(member => {
    if (member.status === 'Offline') return false;
    
    const lastActivity = new Date(member.lastActivity);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    return lastActivity < tenMinutesAgo;
  });

  if (inactiveMembers.length === 0) return null;

  return (
    <div className={`p-4 mb-4 rounded-lg border ${
      darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
    }`}>
      <div className="flex items-center">
        <span className="text-yellow-500 mr-2">⚠️</span>
        <span className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
          {inactiveMembers.length} team member(s) will be marked offline due to inactivity
        </span>
      </div>
    </div>
  );
};

export default InactivityIndicator;