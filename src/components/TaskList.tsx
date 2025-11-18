// src/components/TaskList.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateTaskProgress } from '../redux/slices/membersSlice';
import type{ Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  showProgressControls?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, showProgressControls = false }) => {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.members.members);

  const handleProgressChange = (taskId: string, change: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + change));
      dispatch(updateTaskProgress({ taskId, progress: newProgress }));
    }
  };

  const getMemberName = (memberId: string): string => {
    const member = members.find(m => m.id === memberId);
    return member?.name || 'Unknown';
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center">No tasks assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{task.title}</h4>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
                {!showProgressControls && ` • Assigned to: ${getMemberName(task.assignedTo)}`}
              </p>
            </div>
            {task.completed && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  task.completed ? 'bg-green-500' : 'bg-blue-500'
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
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -10%
              </button>
              <button
                onClick={() => handleProgressChange(task.id, 10)}
                disabled={task.progress >= 100}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-3 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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