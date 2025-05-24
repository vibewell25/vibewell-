import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { HomePage } from '../../web/components/HomePage';

// Mock HomePage component if it doesn't exist
const HomePageComponent = HomePage || (({ children }: { children?: React.ReactNode }) => (
  <div className="home-page bg-neutral-50 dark:bg-neutral-900 min-h-screen pb-20">
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-6">
          Welcome back!
        </h1>
        
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex-grow">
              <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">
                Complete your skin profile
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Get personalized recommendations based on your skin type and concerns.
              </p>
            </div>
            <button className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-md self-start">
              Start Now
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className={`border-l-4 border-${appointment.color}-500 pl-4 py-1`}>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {appointment.date}
                  </div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {appointment.service}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300">
                    with {appointment.provider}
                  </div>
                </div>
              ))}
              <button className="text-coral-500 hover:text-coral-600 text-sm font-medium mt-2">
                View All Appointments
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-coral-500/20 to-teal-500/20 dark:from-coral-500/10 dark:to-teal-500/10 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">
              AI Skin Analysis
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Get personalized skincare recommendations based on advanced AI analysis.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/80 dark:bg-neutral-800/80 rounded-lg p-3">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Hydration</p>
                <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">72%</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 rounded-lg p-3">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Elasticity</p>
                <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">68%</p>
              </div>
            </div>
            <button className="w-full bg-coral-500 hover:bg-coral-600 text-white py-2 rounded-md font-medium">
              View Detailed Results
            </button>
          </div>
        </div>
        
        <h2 className="font-serif text-2xl text-neutral-900 dark:text-white mb-4">
          Recommended for You
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedServices.map((service, index) => (
            <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm">
              <div className="h-40 bg-neutral-200 dark:bg-neutral-700 relative">
                {service.image && (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 text-neutral-900 dark:text-white">
                  {service.name}
                </h3>
                <div className="flex items-center mb-2">
                  <span className="text-coral-500 mr-1">★</span>
                  <span className="text-sm">{service.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-900 dark:text-white font-medium">${service.price}</span>
                  <button className="text-sm bg-coral-500 hover:bg-coral-600 text-white px-3 py-1 rounded">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {children}
  </div>
));

// Sample data for story
const appointments = [
  {
    date: 'Tomorrow, 2:30 PM',
    service: 'Facial Treatment',
    provider: 'Sarah Johnson',
    color: 'coral'
  },
  {
    date: 'Friday, 10:00 AM',
    service: 'Massage Therapy',
    provider: 'Michael Chen',
    color: 'teal'
  }
];

const recommendedServices = [
  {
    name: 'Hydrating Facial',
    rating: 4.8,
    price: 120,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Deep Tissue Massage',
    rating: 4.9,
    price: 95,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Skin Consultation',
    rating: 4.7,
    price: 75,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  }
];

const meta: Meta<typeof HomePageComponent> = {
  title: 'Pages/HomePage',
  component: HomePageComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomePageComponent>;

// Default HomePage
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default home page for logged-in users.',
      },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Dark mode version of the home page.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
}; 