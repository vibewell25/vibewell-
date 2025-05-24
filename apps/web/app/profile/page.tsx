'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@vibewell/ui-web';
import BookingCard from '../../components/BookingCard';

// Define Status type
type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export default function ProfilePage() {
  // Handle image error
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-coral-500 to-teal-500"></div>
          <div className="px-6 py-4 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative -mt-16 mb-4 sm:mb-0">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 overflow-hidden bg-neutral-200">
                  {!imageError ? (
                    <Image
                      src="/images/profile-placeholder.jpg"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-coral-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">SJ</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Sarah Johnson
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Member since January 2023
                </p>
                <div className="mt-4">
                  <Button variant="secondary" size="sm" onClick={() => alert('Edit Profile clicked')}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mb-8">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="flex space-x-8">
              <button 
                className="border-b-2 border-coral-500 px-1 py-4 text-sm font-medium text-coral-500"
                onClick={() => alert('Bookings tab clicked')}
              >
                Bookings
              </button>
              <button 
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                onClick={() => alert('Favorites tab clicked')}
              >
                Favorites
              </button>
              <button 
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                onClick={() => alert('Orders tab clicked')}
              >
                Orders
              </button>
              <button 
                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                onClick={() => alert('Settings tab clicked')}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Bookings Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Upcoming Bookings
            </h2>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => alert('Book New Service clicked')}
            >
              Book New Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={() => alert(`Cancel booking ${booking.id}`)}
                onReschedule={() => alert(`Reschedule booking ${booking.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockBookings = [
  {
    id: '1',
    date: new Date('2023-06-15T10:00:00'),
    status: 'CONFIRMED' as Status,
    service: {
      id: '101',
      name: 'Deep Tissue Massage',
      duration: 60,
      price: 85,
      provider: {
        id: '201',
        name: 'Serenity Spa',
      },
    },
  },
  {
    id: '2',
    date: new Date('2023-06-20T14:30:00'),
    status: 'PENDING' as Status,
    service: {
      id: '102',
      name: 'Haircut & Styling',
      duration: 45,
      price: 55,
      provider: {
        id: '202',
        name: 'Glow Beauty Salon',
      },
    },
  },
]; 