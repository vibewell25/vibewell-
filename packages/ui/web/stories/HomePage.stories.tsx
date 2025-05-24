import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

// Mock HomePage component
function HomePageComponent(props) {
  const { children } = props;
  return (
    <div className="home-page bg-neutral-50 dark:bg-neutral-900 min-h-screen pb-20">
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif mb-4">Welcome to VibeWell</h1>
          <p className="text-lg mb-8">Your personal wellness companion for healthier skin and better habits.</p>
        </div>
      </section>
      <section className="py-8 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured products would go here */}
            <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg h-64"></div>
            <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg h-64"></div>
            <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg h-64"></div>
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}

const meta = {
  title: 'Pages/HomePage',
  component: HomePageComponent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {},
};

export const WithChildren = {
  args: {
    children: (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-coral-50 dark:bg-coral-900/20 p-6 rounded-lg border border-coral-200 dark:border-coral-800">
          <h3 className="text-2xl font-serif text-coral-800 dark:text-coral-200 mb-2">Custom Section</h3>
          <p className="text-coral-700 dark:text-coral-300">This is an example of custom content passed as children.</p>
        </div>
      </div>
    ),
  },
}; 