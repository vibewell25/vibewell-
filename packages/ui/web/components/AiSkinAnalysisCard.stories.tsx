import React from 'react';
import { AiSkinAnalysisCard } from './AiSkinAnalysisCard';

// Mock for API modules
// We need to add this to the global window object for the component
if (typeof window !== 'undefined') {
  window.mockData = {
    supabase: {
      functions: {
        invoke: async () => ({
          data: {
            hydration: 75,
            elasticity: 82,
            recommendedProducts: [
              'Hydrating Serum',
              'Moisture Cream',
              'Retinol Treatment'
            ]
          },
          error: null
        })
      }
    }
  };
}

// Define the meta object
const meta = {
  title: 'Components/AiSkinAnalysisCard',
  component: AiSkinAnalysisCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    userId: {
      control: 'text',
      description: 'User ID for the skin analysis',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onStartAnalysis: {
      action: 'onStartAnalysis',
      description: 'Callback when analysis starts',
    },
  },
  args: {
    userId: 'user-123',
    onStartAnalysis: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

// Default state
export const Default = {
  args: {
    userId: 'user-123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default state of the AiSkinAnalysisCard before analysis starts.',
      },
    },
  },
};

// Loading state
export const Loading = {
  args: {
    userId: 'user-123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state when analysis is in progress.',
      },
    },
  },
};

// Error state
export const Error = {
  args: {
    userId: 'user-123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state when analysis fails.',
      },
    },
  },
};

// Success state
export const Success = {
  args: {
    userId: 'user-123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success state showing analysis results.',
      },
    },
  },
};

// Dark mode
export const DarkMode = {
  args: {
    userId: 'user-123',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Dark mode version of the card.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md p-6 bg-neutral-900 dark dark:text-white">
        <Story />
      </div>
    ),
  ],
}; 