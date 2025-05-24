import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { OfflineBanner } from '../components/OfflineBanner';

// Mocking the online/offline status for the stories
const meta: Meta<typeof OfflineBanner> = {
  title: 'Components/OfflineBanner',
  component: OfflineBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OfflineBanner>;

// Online state (banner showing "Back Online" message)
export const Online: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Banner showing when the user comes back online.',
      },
    },
  },
  decorators: [
    (Story) => {
      // Mock the navigator.onLine to be true (online)
      Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
      
      // Simulate the "online" event to show the banner
      setTimeout(() => {
        window.dispatchEvent(new Event('online'));
      }, 100);
      
      return <Story />;
    },
  ],
};

// Offline state (banner showing "You are offline" message)
export const Offline: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Banner showing when the user goes offline.',
      },
    },
  },
  decorators: [
    (Story) => {
      // Mock the navigator.onLine to be false (offline)
      Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
      
      // Simulate the "offline" event to show the banner
      setTimeout(() => {
        window.dispatchEvent(new Event('offline'));
      }, 100);
      
      return <Story />;
    },
  ],
};

// Dark mode version
export const OfflineDarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Offline banner in dark mode.',
      },
    },
  },
  decorators: [
    (Story) => {
      // Mock the navigator.onLine to be false (offline)
      Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
      
      // Simulate the "offline" event to show the banner
      setTimeout(() => {
        window.dispatchEvent(new Event('offline'));
      }, 100);
      
      return (
        <div className="p-4 bg-neutral-900 dark dark:text-white min-h-screen">
          <Story />
        </div>
      );
    },
  ],
}; 