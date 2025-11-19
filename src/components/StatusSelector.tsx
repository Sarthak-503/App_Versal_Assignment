// src/components/StatusSelector.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';
import { useAutoResetStatus } from '../hooks/useAutoResetStatus';

const StatusSelector: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.role);
  const members = useAppSelector((state) => state.members.members);
  const dispatch = useAppDispatch();
  const { updateActivity } = useAutoResetStatus();

  const currentMember = members.find(m => m.name === currentUser);
  const statuses: Array<'Working' | 'Break' | 'Meeting' | 'Offline'> = ['Working', 'Break', 'Meeting', 'Offline'];

  const handleStatusChange = (status: typeof statuses[number]) => {
    if (currentMember) {
      dispatch(updateMemberStatus({ memberId: currentMember.id, status }));
      updateActivity(); // Update activity when status changes
    }
  };

  if (!currentMember) return null;

  return (
    <div className={`p-6 rounded-xl border-2 transition-colors duration-200 ${
      useAppSelector((state) => state.theme.darkMode) 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        useAppSelector((state) => state.theme.darkMode) ? 'text-white' : 'text-gray-900'
      }`}>
        Update Your Status
      </h3>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentMember.status === status
                ? getStatusColor(status, true)
                : `bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600`
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <p className={`text-xs mt-3 ${
        useAppSelector((state) => state.theme.darkMode) ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Status will automatically reset to Offline after 10 minutes of inactivity
      </p>
    </div>
  );
};

const getStatusColor = (status: string, _isActive: boolean): string => {
  const colors = {
    Working: 'bg-green-500 text-white',
    Break: 'bg-yellow-500 text-white',
    Meeting: 'bg-blue-500 text-white',
    Offline: 'bg-gray-500 text-white'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500 text-white';
};

export default StatusSelector;