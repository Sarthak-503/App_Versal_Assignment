// src/pages/Dashboard.tsx
import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../hooks/redux';
import StatusSelector from '../components/StatusSelector';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard: React.FC = () => {
  const { currentRole, currentUser } = useAppSelector((state) => state.role);
  const { members, tasks } = useAppSelector((state) => state.members);
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortByTasks, setSortByTasks] = useState<boolean>(false);

  // Calculate status summary
  const statusSummary = useMemo(() => {
    const summary = { Working: 0, Break: 0, Meeting: 0, Offline: 0 };
    members.forEach(member => {
      summary[member.status]++;
    });
    return summary;
  }, [members]);

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

  if (currentRole === 'member') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Dashboard</h2>
              <p className="text-gray-600">Manage your status and tasks</p>
            </div>
            
            <StatusSelector />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
              <TaskList tasks={userTasks} showProgressControls={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Working</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{statusSummary.Working}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Break</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{statusSummary.Break}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Meeting</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{statusSummary.Meeting}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Offline</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{statusSummary.Offline}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Team Members */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                  <div className="flex space-x-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Working">Working</option>
                      <option value="Break">Break</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Offline">Offline</option>
                    </select>
                    <button
                      onClick={() => setSortByTasks(!sortByTasks)}
                      className={`text-sm px-3 py-1 rounded-md border ${
                        sortByTasks
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      Sort by Tasks
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAndSortedMembers.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      taskCount={tasks.filter(task => task.assignedTo === member.id && !task.completed).length}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Task Management */}
            <div className="space-y-6">
              <TaskForm />
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Tasks</h3>
                <TaskList tasks={tasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;