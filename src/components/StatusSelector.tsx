// src/components/StatusSelector.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';

const StatusSelector: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.role);
  const members = useAppSelector((state) => state.members.members);
  const dispatch = useAppDispatch();

  const currentMember = members.find(m => m.name === currentUser);
  const statuses: Array<'Working' | 'Break' | 'Meeting' | 'Offline'> = ['Working', 'Break', 'Meeting', 'Offline'];

  const handleStatusChange = (status: typeof statuses[number]) => {
    if (currentMember) {
      dispatch(updateMemberStatus({ memberId: currentMember.id, status }));
    }
  };

  if (!currentMember) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Your Status</h3>
      <div className="flex space-x-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentMember.status === status
                ? getStatusColor(status, true)
                : `bg-gray-100 text-gray-700 hover:bg-gray-200`
            }`}
          >
            {status}
          </button>
        ))}
      </div>
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