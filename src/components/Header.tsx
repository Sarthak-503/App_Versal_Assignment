// src/components/Header.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { switchRole } from '../redux/slices/roleSlice';
import { toggleTheme } from '../redux/slices/themeSlice';

const Header: React.FC = () => {
  const { currentRole, currentUser } = useAppSelector((state) => state.role);
  const { darkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleRoleSwitch = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  return (
    <header className={`ml-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm transition-colors duration-200 z-30 relative`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Team Pulse
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-medium">{currentUser}</span>
              <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
              <span className="capitalize">{currentRole}</span>
            </div>
            
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
            
            <button
              onClick={handleRoleSwitch}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Switch to {currentRole === 'lead' ? 'Member' : 'Lead'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;