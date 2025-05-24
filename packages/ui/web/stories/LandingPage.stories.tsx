import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

// Mock LandingPage component
function LandingPageComponent(props) {
  const { children } = props;
  return (
    <div className="landing-page">
      <header className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-coral-500 to-teal-500">
              VibeWell
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-neutral-700 dark:text-neutral-300">
              Your complete wellness platform for healthier skin and better habits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary py-3 px-8 text-lg">
                Get Started
              </button>
              <button className="btn btn-secondary py-3 px-8 text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

const meta = {
  title: 'Pages/LandingPage',
  component: LandingPageComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {
  args: {},
};

export const WithFeatures = {
  args: {
    children: (
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <h3 className="text-xl font-medium mb-3">AI Skin Analysis</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Get personalized skincare recommendations based on advanced analysis.
              </p>
            </div>
            <div className="p-6 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Health Tracking</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Monitor your progress and achieve your wellness goals.
              </p>
            </div>
            <div className="p-6 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Expert Guidance</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Connect with professionals for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
  },
}; 