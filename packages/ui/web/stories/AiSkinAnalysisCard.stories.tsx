import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AiSkinAnalysisCard } from '../components/AiSkinAnalysisCard';
import { supabase } from '@vibewell/api';

// Define mock type for better TypeScript support
type MockSupabaseFunctions = {
  invoke: jest.Mock;
};

type MockSupabase = {
  functions: MockSupabaseFunctions;
};

// Mock supabase for Storybook
jest.mock('@vibewell/api', () => {
  const mockFunctions = {
    invoke: jest.fn(),
  };
  
  const mockSupabase = {
    functions: mockFunctions,
  };
  
  return {
    supabase: mockSupabase,
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Cast for TypeScript compatibility
const mockedSupabase = supabase as unknown as MockSupabase;

const meta: Meta<typeof AiSkinAnalysisCard> = {
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
type Story = StoryObj<typeof AiSkinAnalysisCard>;

// Default state
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default state of the AiSkinAnalysisCard before analysis starts.',
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Loading state when analysis is in progress.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Mock the Supabase function to not resolve immediately
    mockedSupabase.functions.invoke.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 10000))
    );
    
    // Find and click the start button to trigger loading state
    const startButton = canvasElement.querySelector('button');
    if (startButton) {
      startButton.click();
    }
  },
};

// Error state
export const Error: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Error state when analysis fails.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Mock the Supabase function to return an error
    mockedSupabase.functions.invoke.mockResolvedValue({
      data: null,
      error: { message: 'Analysis failed due to server error' },
    });
    
    // Find and click the start button to trigger error state
    const startButton = canvasElement.querySelector('button');
    if (startButton) {
      startButton.click();
    }
  },
};

// Success state
export const Success: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Success state showing analysis results.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Mock the Supabase function to return successful data
    mockedSupabase.functions.invoke.mockResolvedValue({
      data: {
        hydration: 78,
        elasticity: 83,
        recommendedProducts: [
          'Hydrating Serum',
          'Collagen Booster',
          'Night Repair Cream',
        ],
      },
      error: null,
    });
    
    // Find and click the start button to trigger success state
    const startButton = canvasElement.querySelector('button');
    if (startButton) {
      startButton.click();
    }
  },
};

// Dark mode
export const DarkMode: Story = {
  args: {},
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