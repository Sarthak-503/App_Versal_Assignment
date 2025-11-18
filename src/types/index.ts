// src/types/index.ts
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: 'Working' | 'Break' | 'Meeting' | 'Offline';
  avatar?: string;
  lastActivity?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  assignedTo: string;
  completed: boolean;
}

export type UserRole = 'lead' | 'member';