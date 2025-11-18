// src/components/Header.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { switchRole } from '../redux/slices/roleSlice';

const Header: React.FC = () => {
  const { currentRole, currentUser } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();

  const handleRoleSwitch = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Team Pulse</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {currentUser}</span>
            <button
              onClick={handleRoleSwitch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Switch to {currentRole === 'lead' ? 'Member' : 'Lead'} View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;