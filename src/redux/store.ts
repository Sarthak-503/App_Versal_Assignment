// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    members: memberReducer,
    role: roleReducer,
       theme: themeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;