import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import BookingForm from '../components/BookingForm';

// Mock service data
const mockServices = [
  {
    id: '1',
    name: 'Deep Tissue Massage',
    location: 'Serenity Spa',
    image: '/images/services/massage.jpg',
    description: 'A therapeutic massage that focuses on realigning deeper layers of muscles.',
    price: 85,
    duration: 60
  },
  {
    id: '2',
    name: 'Haircut & Styling',
    location: 'Glow Beauty Salon',
    image: '/images/services/haircut.jpg',
    description: 'Professional haircut and styling to refresh your look.',
    price: 55,
    duration: 45
  },
  {
    id: '3',
    name: 'Facial Treatment',
    location: 'Pure Skin Clinic',
    image: '/images/services/facial.jpg',
    description: 'Revitalizing facial treatment to cleanse and rejuvenate your skin.',
    price: 75,
    duration: 50
  }
];

// Mock the API functions
jest.mock('@vibewell/api/supabaseClient', () => ({
  getMockServices: () => mockServices,
}));

jest.mock('@vibewell/api/src/bookings', () => ({
  createBooking: jest.fn().mockResolvedValue({ data: { id: 'mocked-booking-id' }, error: null }),
}));

const meta: Meta<typeof BookingForm> = {
  title: 'Web/BookingForm',
  component: BookingForm,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof BookingForm>;

export const Default: Story = {};

export const WithSelectedService: Story = {
  decorators: [
    (Story) => {
      // Simulate selecting the first service
      setTimeout(() => {
        const serviceCard = document.querySelector('[data-test-id="booking-card"]');
        if (serviceCard) {
          (serviceCard as HTMLElement).click();
        }
      }, 500);
      
      return <Story />;
    },
  ],
};

export const WithDateSelected: Story = {
  decorators: [
    (Story) => {
      // Simulate selecting the first service and a date
      setTimeout(() => {
        const serviceCard = document.querySelector('[data-test-id="booking-card"]');
        if (serviceCard) {
          (serviceCard as HTMLElement).click();
        }
        
        setTimeout(() => {
          const dateCell = document.querySelector('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
          if (dateCell) {
            (dateCell as HTMLElement).click();
          }
        }, 500);
      }, 500);
      
      return <Story />;
    },
  ],
};

export const Complete: Story = {
  decorators: [
    (Story) => {
      // Simulate selecting service, date, and time
      setTimeout(() => {
        const serviceCard = document.querySelector('[data-test-id="booking-card"]');
        if (serviceCard) {
          (serviceCard as HTMLElement).click();
        }
        
        setTimeout(() => {
          const dateCell = document.querySelector('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
          if (dateCell) {
            (dateCell as HTMLElement).click();
          }
          
          setTimeout(() => {
            const timeSlot = document.querySelector('button[type="button"]');
            if (timeSlot) {
              timeSlot.click();
            }
          }, 500);
        }, 500);
      }, 500);
      
      return <Story />;
    },
  ],
}; 