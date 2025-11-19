// src/redux/slices/membersSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TeamMember, Task } from "@/types";

interface MembersState {
  members: TeamMember[];
  tasks: Task[];
}

const initialState: MembersState = {
  members: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "Working",
      lastActivity: new Date().toISOString(),
      department: "Engineering",
      position: "Frontend Developer",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Break",
      lastActivity: new Date().toISOString(),
      department: "Engineering",
      position: "Backend Developer",
      joinDate: "2022-08-22",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Meeting",
      lastActivity: new Date().toISOString(),
      department: "Design",
      position: "UI/UX Designer",
      joinDate: "2023-03-10",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      status: "Offline",
      lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      department: "Product",
      position: "Product Manager",
      joinDate: "2021-11-05",
    },
    {
      id: "5",
      name: "Sarthak Gupta",
      email: "sarthak@example.com",
      status: "Meeting",
      lastActivity: new Date().toISOString(),
      department: "Engineering",
      position: "Full Stack Developer",
      joinDate: "2023-06-18",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Implement dashboard UI",
      dueDate: "2024-12-31",
      progress: 70,
      assignedTo: "1",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Write documentation",
      dueDate: "2024-12-25",
      progress: 30,
      assignedTo: "2",
      completed: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Design user flows",
      dueDate: "2024-12-20",
      progress: 50,
      assignedTo: "3",
      completed: false,
      priority: "high",
    },
    {
      id: "4",
      title: "Product roadmap planning",
      dueDate: "2024-12-28",
      progress: 80,
      assignedTo: "4",
      completed: false,
      priority: "medium",
    },
    {
      id: "5",
      title: "API integration",
      dueDate: "2024-12-22",
      progress: 40,
      assignedTo: "5",
      completed: false,
      priority: "high",
    },
  ],
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    updateMemberStatus: (
      state,
      action: PayloadAction<{ memberId: string; status: TeamMember["status"] }>
    ) => {
      const member = state.members.find(
        (m) => m.id === action.payload.memberId
      );
      if (member) {
        member.status = action.payload.status;
        member.lastActivity = new Date().toISOString();
      }
    },
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "completed">>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
      };
      state.tasks.push(newTask);
    },
    updateTaskProgress: (
      state,
      action: PayloadAction<{ taskId: string; progress: number }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.progress = Math.max(0, Math.min(100, action.payload.progress));
        task.completed = task.progress === 100;
      }
    },
    setMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    updateTaskPriority: (
      state,
      action: PayloadAction<{ taskId: string; priority: Task["priority"] }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { 
  updateMemberStatus, 
  addTask, 
  updateTaskProgress, 
  setMembers,
  updateTaskPriority,
  deleteTask
} = membersSlice.actions;
export default membersSlice.reducer;