// src/hooks/useAutoResetStatus.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { resetInactiveMembers, updateMemberActivity } from '../redux/slices/membersSlice';

export const useAutoResetStatus = () => {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.members.members);
  const { currentUser } = useAppSelector((state) => state.role);

  useEffect(() => {
    // Check for inactive members every minute
    const interval = setInterval(() => {
      dispatch(resetInactiveMembers());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  // Function to update user activity (call this on user interactions)
  const updateActivity = () => {
    if (currentUser) {
      const currentMember = members.find(m => m.name === currentUser);
      if (currentMember) {
        dispatch(updateMemberActivity({ memberId: currentMember.id }));
      }
    }
  };

  return { updateActivity };
};