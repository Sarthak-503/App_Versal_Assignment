// src/components/Sidebar.tsx
import React from 'react';
import { useAppSelector } from '../hooks/redux';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { darkMode } = useAppSelector((state) => state.theme);
  const { currentRole } = useAppSelector((state) => state.role);

  const leadSections = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'team', label: 'Team Management', icon: '👥' },
    { id: 'tasks', label: 'Task Assignment', icon: '✅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'clients', label: 'Our Clients', icon: '💼' },
    { id: 'employees', label: 'Employees', icon: '👨‍💼' },
    { id: 'accounts', label: 'Accounts', icon: '💰' },
    { id: 'payroll', label: 'Payroll', icon: '💵' },
  ];

  const memberSections = [
    { id: 'my-tasks', label: 'My Tasks', icon: '✅' },
    { id: 'status', label: 'Status Update', icon: '🔄' },
    { id: 'progress', label: 'Progress', icon: '📊' },
  ];

  const sections = currentRole === 'lead' ? leadSections : memberSections;

  const commonSections = [
    { id: 'app', label: 'App', icon: '📱' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className={`w-64 min-h-screen fixed left-0 top-0 bottom-0 overflow-y-auto ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    } border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-200 z-40`}>
      {/* Sidebar Header */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Team Pulse
        </h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {currentRole === 'lead' ? 'Team Lead Dashboard' : 'Team Member Dashboard'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className={`relative rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <input
            type="text"
            placeholder="Search..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-700 placeholder-gray-500'
            }`}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="p-4">
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-500 text-white shadow-lg'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <span className="text-lg w-6 text-center">{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className={`px-4 py-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`text-xs font-semibold uppercase tracking-wider ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          App & Settings
        </div>
      </div>

      {/* Common Sections */}
      <div className="p-4 pt-2">
        <nav className="space-y-1">
          {commonSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-500 text-white shadow-lg'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <span className="text-lg w-6 text-center">{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Toggles */}
      <div className="p-4 border-t dark:border-gray-700 mt-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Dark Mode
            </span>
            <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notifications
            </span>
            <div className="w-12 h-6 flex items-center bg-green-500 rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6" />
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              John Doe
            </p>
            <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Team {currentRole === 'lead' ? 'Lead' : 'Member'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;