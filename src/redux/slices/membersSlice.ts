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
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Break",
      lastActivity: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Meeting",
      lastActivity: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      status: "Offline",
      lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      name: "Sarthak gupta",
      email: "sarthak@example.com",
      status: "Meeting",
      lastActivity: new Date().toISOString(),
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
    },
    {
      id: "2",
      title: "Write documentation",
      dueDate: "2024-12-25",
      progress: 30,
      assignedTo: "2",
      completed: false,
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
  },
});

export const { updateMemberStatus, addTask, updateTaskProgress, setMembers } =
  membersSlice.actions;
export default membersSlice.reducer;
