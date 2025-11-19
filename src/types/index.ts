// src/types/index.ts
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: 'Working' | 'Break' | 'Meeting' | 'Offline';
  avatar?: string;
  lastActivity?: string;
  department: string;
  position: string;
  joinDate: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  assignedTo: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Interview {
  id: string;
  company: string;
  position: string;
  candidate: string;
  date: string;
  time: string;
  duration: string;
}

export type UserRole = 'lead' | 'member';

export interface DashboardStats {
  totalMembers: number;
  activeTasks: number;
  completedTasks: number;
  productivityScore: number;
  attendance: number;
  lateComing: number;
  absent: number;
  leaveApply: number;
}