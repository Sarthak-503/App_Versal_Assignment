// src/pages/Dashboard.tsx
import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../hooks/redux';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';
import StatusChart from '../components/StatusChart';
import ProductivityChart from '../components/ProductivityChart';
import StatusSelector from '../components/StatusSelector';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import EmployeeChart from '../components/EmployeeChart';
import type { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const { currentRole, currentUser } = useAppSelector((state) => state.role);
  const { darkMode } = useAppSelector((state) => state.theme);
  const { members, tasks } = useAppSelector((state) => state.members);
  
  const [activeSection, setActiveSection] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortByTasks, setSortByTasks] = useState<boolean>(false);

  // Calculate dashboard stats with all required properties
  const stats: DashboardStats = useMemo(() => ({
    totalMembers: members.length,
    activeTasks: tasks.filter(task => !task.completed).length,
    completedTasks: tasks.filter(task => task.completed).length,
    productivityScore: Math.round((tasks.reduce((sum, task) => sum + task.progress, 0) / (tasks.length * 100)) * 100) || 0,
    attendance: members.filter(member => member.status !== 'Offline').length * 10,
    lateComing: Math.floor(members.length * 0.1),
    absent: members.filter(member => member.status === 'Offline').length,
    leaveApply: Math.floor(members.length * 0.2),
  }), [members, tasks]);

  // Filter and sort members for Team Lead view
  const filteredAndSortedMembers = useMemo(() => {
    let filtered = members;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }
    
    if (sortByTasks) {
      filtered = [...filtered].sort((a, b) => {
        const aTasks = tasks.filter(task => task.assignedTo === a.id && !task.completed).length;
        const bTasks = tasks.filter(task => task.assignedTo === b.id && !task.completed).length;
        return bTasks - aTasks;
      });
    }
    
    return filtered;
  }, [members, tasks, statusFilter, sortByTasks]);

  // Get tasks for current user (Team Member view)
  const userTasks = useMemo(() => {
    const currentMember = members.find(m => m.name === currentUser);
    if (!currentMember) return [];
    return tasks.filter(task => task.assignedTo === currentMember.id);
  }, [tasks, members, currentUser]);

  // Create employee stats cards component inline
  const EmployeeStats = () => {
    const cards = [
      {
        title: 'Attendance',
        value: stats.attendance,
        icon: '✅',
        color: 'green',
      },
      {
        title: 'Late Coming',
        value: stats.lateComing,
        icon: '⏰',
        color: 'yellow',
      },
      {
        title: 'Absent',
        value: stats.absent,
        icon: '❌',
        color: 'red',
      },
      {
        title: 'Leave Apply',
        value: stats.leaveApply,
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

  // Create TotalEmployeesCard inline
  const TotalEmployeesCard = () => {
    const newEmployees = 9;
    const experienced = members.length - newEmployees;

    return (
      <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Total Employees
        </h3>
        
        <div className="text-center mb-6">
          <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {members.length}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Active Team Members
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              New Employees
            </span>
            <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {newEmployees}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Experienced
            </span>
            <span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {experienced}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(newEmployees / members.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>New</span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Experienced</span>
          </div>
        </div>
      </div>
    );
  };

  // Create AdminProfileCard inline
  const AdminProfileCard = () => {
    const adminStats = [
      { label: 'Applications', value: 1546, color: 'blue' },
      { label: 'Interviews', value: 246, color: 'green' },
      { label: 'Hired', value: 101, color: 'purple' },
    ];

    return (
      <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
            darkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            {currentUser.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentUser}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Admin Profile
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {adminStats.map((stat) => (
            <div key={stat.label} className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {stat.label}
              </span>
              <span className={`font-semibold text-lg ${
                stat.color === 'blue' 
                  ? darkMode ? 'text-blue-400' : 'text-blue-600'
                  : stat.color === 'green'
                  ? darkMode ? 'text-green-400' : 'text-green-600'
                  : darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Create UpcomingInterviews inline
  const UpcomingInterviews = () => {
    const interviews = [
      {
        id: '1',
        company: 'Nasdaq Ghana',
        position: 'UI/UX Designer',
        candidate: 'Peter Pipers',
        date: 'Today',
        time: '11:30 - 12:30',
        duration: '1h',
      },
      {
        id: '2',
        company: 'Latin Games',
        position: 'Game Developer',
        candidate: 'Sarah Wilson',
        date: 'Today',
        time: '14:00 - 15:30',
        duration: '1.5h',
      },
    ];

    return (
      <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Upcoming Interviews
        </h3>
        
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div 
              key={interview.id}
              className={`p-4 rounded-lg border transition-colors ${
                darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {interview.company}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {interview.position}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-600'
                }`}>
                  {interview.date}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {interview.candidate}
                </span>
                <div className="text-right">
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {interview.time}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {interview.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLeadContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Dashboard
              </h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Welcome to your team management dashboard
              </p>
            </div>

            <EmployeeStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <EmployeeChart />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProductivityChart />
                  <StatusChart />
                </div>
              </div>

              <div className="space-y-6">
                <TotalEmployeesCard />
                <AdminProfileCard />
                <UpcomingInterviews />
              </div>
            </div>
          </div>
        );

      case 'overview':
        return (
          <div className="space-y-6">
            <StatsCards stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatusChart />
              <ProductivityChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {members.slice(0, 4).map((member) => (
                      <div key={member.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {member.name}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === 'Working' ? 'bg-green-100 text-green-800' :
                          member.status === 'Break' ? 'bg-yellow-100 text-yellow-800' :
                          member.status === 'Meeting' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                      📋 Generate Report
                    </button>
                    <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                      👥 Schedule Meeting
                    </button>
                    <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                      ✅ Bulk Assign Tasks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Team Management
              </h2>
              <div className="flex space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`text-sm border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="Working">Working</option>
                  <option value="Break">Break</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Offline">Offline</option>
                </select>
                <button
                  onClick={() => setSortByTasks(!sortByTasks)}
                  className={`text-sm px-3 py-1 rounded-md border transition-colors ${
                    sortByTasks
                      ? 'bg-blue-500 text-white border-blue-500'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Sort by Tasks
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  taskCount={tasks.filter(task => task.assignedTo === member.id && !task.completed).length}
                />
              ))}
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  All Tasks
                </h3>
                <TaskList tasks={tasks} showDeleteButton={true} />
              </div>
            </div>
            <div>
              <TaskForm />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Analytics & Reports
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatusChart />
              <ProductivityChart />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                This section is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  const renderMemberContent = () => {
    switch (activeSection) {
      case 'my-tasks':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              My Tasks
            </h2>
            <TaskList tasks={userTasks} showProgressControls={true} />
          </div>
        );

      case 'status':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Update Status
            </h2>
            <StatusSelector />
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              My Progress
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Task Completion
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500 mb-2">
                    {userTasks.filter(t => t.completed).length}/{userTasks.length}
                  </div>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Tasks Completed</p>
                </div>
              </div>
              <ProductivityChart />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                This section is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <main className="flex-1 ml-64 p-8">
          {currentRole === 'lead' ? renderLeadContent() : renderMemberContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;