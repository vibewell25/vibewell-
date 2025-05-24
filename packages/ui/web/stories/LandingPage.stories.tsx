import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from '../../web/components/LandingPage';

// Mock LandingPage component if it doesn't exist
const LandingPageComponent = LandingPage || (({ children }: { children?: React.ReactNode }) => (
  <div className="landing-page">
    <header className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Wellness background" 
          className="h-full w-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coral-500/20 to-teal-500/20 dark:from-coral-500/10 dark:to-teal-500/10"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-neutral-900 dark:text-white mb-6">
            Experience Beauty & Wellness
          </h1>
          <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 mb-8">
            Discover a sanctuary where beauty meets wellness. Our expert treatments and products are designed to rejuvenate your body and mind.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-md font-medium">
              Book an Appointment
            </button>
            <button className="bg-transparent border border-coral-500 text-coral-500 hover:bg-coral-50 dark:hover:bg-neutral-800 px-6 py-3 rounded-md font-medium">
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <section className="py-16 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl text-center mb-12 text-neutral-900 dark:text-white">
          Our Featured Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, i) => (
            <div key={i} className="bg-neutral-50 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-neutral-200 dark:bg-neutral-600 relative">
                {service.image && (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium text-xl mb-2 text-neutral-900 dark:text-white">
                  {service.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-coral-500 font-medium">${service.price}</span>
                  <button className="text-sm bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="font-serif text-3xl mb-6 text-neutral-900 dark:text-white">
              Why Choose VibeWell?
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              At VibeWell, we believe in a holistic approach to beauty and wellness. Our expert practitioners use only premium products and techniques to ensure you receive the best care.
            </p>
            <ul className="space-y-3">
              {['Expert Practitioners', 'Premium Products', 'Personalized Treatments', 'Relaxing Environment'].map((item, i) => (
                <li key={i} className="flex items-center text-neutral-700 dark:text-neutral-300">
                  <span className="mr-2 text-coral-500">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 bg-neutral-200 dark:bg-neutral-700 h-64 md:h-96 rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Wellness center" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
    
    {children}
  </div>
));

// Sample data for story
const featuredServices = [
  {
    name: 'Facial Treatment',
    description: 'Rejuvenate your skin with our specialized facial treatments.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Body Massage',
    description: 'Relax and relieve tension with our therapeutic massages.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  },
  {
    name: 'Skin Consultation',
    description: 'Get personalized skin analysis and treatment recommendations.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  }
];

const meta: Meta<typeof LandingPageComponent> = {
  title: 'Pages/LandingPage',
  component: LandingPageComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingPageComponent>;

// Default LandingPage
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default landing page for VibeWell.',
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
        story: 'Dark mode version of the landing page.',
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