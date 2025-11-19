// src/components/ActivityTracker.tsx
import { useEffect } from 'react';
import { useAutoResetStatus } from '../hooks/useAutoResetStatus';

const ActivityTracker: React.FC = () => {
  const { updateActivity } = useAutoResetStatus();

  useEffect(() => {
    // Update activity on user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [updateActivity]);

  // This component doesn't render anything
  return null;
};

export default ActivityTracker;