import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

// Simple offline banner component
function OfflineBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">
      You are currently offline. Some features may not be available.
    </div>
  );
}

const meta = {
  title: 'Components/OfflineBanner',
  component: OfflineBanner,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default = {};

// Custom version as a separate component
function CustomOfflineBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white text-center py-3 z-50 flex justify-center items-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      <span>Network connection lost. Reconnecting...</span>
    </div>
  );
}

export const WithCustomStyling = {
  render: () => <CustomOfflineBanner />
}; 