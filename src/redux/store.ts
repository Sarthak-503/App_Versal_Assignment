// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './slices/membersSlice';

import roleReducer from './slices/roleSlice';
export const store = configureStore({
  reducer: {
    members: memberReducer,
    role: roleReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;