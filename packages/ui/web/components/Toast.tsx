'use client';

import React, { useEffect } from 'react';

export interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  autoClose: number | false;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  title,
  message,
  onClose,
  autoClose = 3000,
}) => {
  useEffect(() => {
    if (autoClose !== false) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  // Define color schemes based on type
  const colorSchemes = {
    success: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-200',
    error: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-200',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200',
    info: 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-200',
  };

  // Define icons based on type
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-fade-in">
      <div className={`rounded-md border-l-4 p-4 shadow-md ${colorSchemes[type]}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <span className="text-lg">{icons[type]}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium">{title}</h3>
            <div className="mt-1 text-sm opacity-90">{message}</div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 inline-flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 