import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from '../components/ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'Profile/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSave: { action: 'onSave' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

// Mock async save function for stories
const mockSave = async (data: any) => {
  console.log('Form data submitted:', data);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Promise.resolve();
};

export const Default: Story = {
  args: {
    userId: 'user-123',
    initialData: {
      name: 'Sarah Johnson',
      avatar_url: 'https://i.pravatar.cc/300?u=sarah',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
    },
    onSave: mockSave,
    isLoading: false,
  },
};

export const Empty: Story = {
  args: {
    userId: 'user-123',
    initialData: {
      name: '',
      avatar_url: '',
      email: '',
      phone: '',
    },
    onSave: mockSave,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    userId: 'user-123',
    initialData: {
      name: 'Sarah Johnson',
      avatar_url: 'https://i.pravatar.cc/300?u=sarah',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
    },
    onSave: mockSave,
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    userId: 'user-123',
    initialData: {
      name: 'Sarah Johnson',
      avatar_url: 'https://i.pravatar.cc/300?u=sarah',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
    },
    onSave: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.reject(new Error('Failed to save profile'));
    },
    isLoading: false,
  },
};

export const DarkMode: Story = {
  args: {
    userId: 'user-123',
    initialData: {
      name: 'Sarah Johnson',
      avatar_url: 'https://i.pravatar.cc/300?u=sarah',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
    },
    onSave: mockSave,
    isLoading: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark" style={{ backgroundColor: '#1A202C', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  args: {
    userId: 'user-123',
    initialData: {
      name: 'Sarah Johnson',
      avatar_url: 'https://i.pravatar.cc/300?u=sarah',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
    },
    onSave: mockSave,
    isLoading: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 