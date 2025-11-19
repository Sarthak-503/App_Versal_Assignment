// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { addTask } from '../redux/slices/membersSlice';
import type { Task } from '@/types';

const TaskForm: React.FC = () => {
  const members = useAppSelector((state) => state.members.members);
  const { darkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    assignedTo: '',
    title: '',
    dueDate: '',
    priority: 'medium' as Task['priority']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.assignedTo && formData.title && formData.dueDate) {
      dispatch(addTask({
        assignedTo: formData.assignedTo,
        title: formData.title,
        dueDate: formData.dueDate,
        progress: 0,
        priority: formData.priority
      }));
      setFormData({ 
        assignedTo: '', 
        title: '', 
        dueDate: '',
        priority: 'medium'
      });
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority];
  };

  const getDarkPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-green-900/50 text-green-300 border-green-700',
      medium: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      high: 'bg-red-900/50 text-red-300 border-red-700'
    };
    return colors[priority];
  };

  return (
    <div className={`p-6 rounded-xl border-2 transition-colors duration-200 ${
      darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Assign New Task
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Assign to
          </label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-700'
            }`}
            required
          >
            <option value="">Select a team member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.position}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Task Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-700'
            }`}
            placeholder="Enter task description"
            required
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-700'
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as Task['priority'][]).map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setFormData({ ...formData, priority })}
                className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors ${
                  formData.priority === priority
                    ? darkMode 
                      ? getDarkPriorityColor(priority)
                      : getPriorityColor(priority)
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;