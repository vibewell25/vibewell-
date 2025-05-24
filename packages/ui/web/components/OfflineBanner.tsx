'use client';

import React, { useEffect, useState } from 'react';
import { Toast } from './Toast';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Set initial online status
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    // Event handlers for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);
      // Hide the "back online" toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showToast) return null;

  return (
    <Toast 
      type={isOnline ? 'success' : 'warning'}
      title={isOnline ? 'Back Online' : 'You are offline'}
      message={isOnline 
        ? 'Your connection has been restored. Any pending actions will be processed.'
        : 'Working in offline mode. Your actions will be synced when you reconnect.'
      }
      onClose={() => setShowToast(false)}
      autoClose={isOnline ? 3000 : false}
    />
  );
};

export default OfflineBanner; 