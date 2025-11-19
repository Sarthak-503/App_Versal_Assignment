// src/components/TaskList.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateTaskProgress, deleteTask } from '../redux/slices/membersSlice';
import { useAutoResetStatus } from '../hooks/useAutoResetStatus';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  showProgressControls?: boolean;
  showDeleteButton?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  showProgressControls = false, 
  showDeleteButton = false 
}) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.theme);
  const members = useAppSelector((state) => state.members.members);
  const { updateActivity } = useAutoResetStatus(); // Add this hook

  const handleProgressChange = (taskId: string, change: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + change));
      dispatch(updateTaskProgress({ taskId, progress: newProgress }));
      updateActivity(); // Track activity when task progress changes
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  const getMemberName = (memberId: string): string => {
    const member = members.find(m => m.id === memberId);
    return member?.name || 'Unknown';
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  const getDarkPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-green-900/50 text-green-300',
      medium: 'bg-yellow-900/50 text-yellow-300',
      high: 'bg-red-900/50 text-red-300'
    };
    return colors[priority];
  };

  if (tasks.length === 0) {
    return (
      <div className={`p-6 rounded-xl border-2 text-center ${
        darkMode ? 'bg-gray-800/50 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <p>No tasks assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`p-4 rounded-xl border-2 transition-colors duration-200 ${
            darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {task.title}
                </h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  darkMode ? getDarkPriorityColor(task.priority) : getPriorityColor(task.priority)
                }`}>
                  {task.priority}
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
                {!showProgressControls && ` • Assigned to: ${getMemberName(task.assignedTo)}`}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {task.completed && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              )}
              {showDeleteButton && (
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className={`p-1 rounded transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
                  }`}
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Progress
              </span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {task.progress}%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  task.completed 
                    ? 'bg-green-500' 
                    : task.priority === 'high'
                    ? 'bg-red-500'
                    : task.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>

          {showProgressControls && !task.completed && (
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleProgressChange(task.id, -10)}
                disabled={task.progress <= 0}
                className={`flex-1 py-1 px-3 rounded text-sm transition-colors ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:bg-gray-800 disabled:text-gray-500'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400'
                }`}
              >
                -10%
              </button>
              <button
                onClick={() => handleProgressChange(task.id, 10)}
                disabled={task.progress >= 100}
                className={`flex-1 py-1 px-3 rounded text-sm transition-colors ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-900 disabled:text-blue-300'
                    : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 disabled:text-blue-100'
                }`}
              >
                +10%
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;