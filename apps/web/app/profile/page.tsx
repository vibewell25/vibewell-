'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@vibewell/ui-web';
import { ProfileForm } from '@vibewell/ui-web/components/ProfileForm';
import { PreferencesForm } from '@vibewell/ui-web/components/PreferencesForm';
import { PaymentMethods } from '@vibewell/ui-web/components/PaymentMethods';
import BookingCard from '../../components/BookingCard';
import { 
  getUserProfile, 
  updateUserProfile, 
  getUserPreferences, 
  updateUserPreferences,
  setDefaultPaymentMethod,
  listPaymentMethods
} from '@vibewell/api/src/users';

// Define Status type
type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

// Define the tab options
type TabOption = 'bookings' | 'profile' | 'preferences' | 'payment';

export default function ProfilePage() {
  // User information state
  const [userId, setUserId] = useState<string>('mock-user-id');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // UI state
  const [activeTab, setActiveTab] = useState<TabOption>('profile');
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fetch user data
  useEffect(() => {
    setIsMounted(true);
    
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd get the userId from auth context
        const mockUserId = 'mock-user-id';
        setUserId(mockUserId);
        
        // Fetch user profile data
        const profileResponse = await getUserProfile(mockUserId);
        if (profileResponse.data) {
          setUserProfile(profileResponse.data);
        } else {
          // Mock data for demo
          setUserProfile({
            id: 'profile-1',
            user_id: mockUserId,
            name: 'Sarah Johnson',
            avatar_url: '/images/profile-placeholder.svg',
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
            default_payment_method: 'pm_123456'
          });
        }
        
        // Fetch user preferences
        const preferencesResponse = await getUserPreferences(mockUserId);
        if (preferencesResponse.data?.preferences) {
          setUserPreferences(preferencesResponse.data.preferences);
        } else {
          // Mock data for demo
          setUserPreferences({
            skinType: ['combination', 'sensitive'],
            skinGoals: ['hydration', 'anti-aging'],
            notifications: {
              email: true,
              sms: false,
              promotions: true
            },
            preferredLanguage: 'en'
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  // Handler functions
  const handleUpdateProfile = async (data: any) => {
    try {
      await updateUserProfile(userId, data);
      setUserProfile({ ...userProfile, ...data });
      return await Promise.resolve();
    } catch (error) {
      console.error('Error updating profile:', error);
      return await Promise.reject(error);
    }
  };
  
  const handleUpdatePreferences = async (preferences: any) => {
    try {
      await updateUserPreferences(userId, preferences);
      setUserPreferences(preferences);
      return await Promise.resolve();
    } catch (error) {
      console.error('Error updating preferences:', error);
      return await Promise.reject(error);
    }
  };
  
  const handleSetDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      await setDefaultPaymentMethod(userId, paymentMethodId);
      setUserProfile({ ...userProfile, default_payment_method: paymentMethodId });
      return await Promise.resolve();
    } catch (error) {
      console.error('Error setting default payment method:', error);
      return await Promise.reject(error);
    }
  };
  
  const handleAddPaymentMethod = async (paymentMethodId: string) => {
    // In a real app, this would be handled by your backend
    console.log('Adding payment method:', paymentMethodId);
    return Promise.resolve();
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-coral-400 to-teal-500 relative overflow-hidden">
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <div className="absolute inset-0 bg-[url('/images/patterns/pattern-dots.svg')] bg-repeat opacity-30"></div>
            </div>
          </div>
          <div className="px-6 py-4 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative -mt-20 mb-4 sm:mb-0">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 overflow-hidden bg-neutral-200 shadow-lg">
                  {isMounted && userProfile?.avatar_url && !imageError ? (
                    <Image
                      src={userProfile.avatar_url}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-coral-500 flex items-center justify-center">
                      <span className="text-white font-bold text-4xl">
                        {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'S'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {userProfile?.name || 'Loading...'}
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {userProfile?.email || ''}
                </p>
                <div className="mt-4">
                  <button 
                    className="px-4 py-2 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
                    onClick={() => setActiveTab('profile')}
                  >
                    Edit Profile
                  </button>
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
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'bookings' 
                    ? 'border-coral-500 text-coral-500' 
                    : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                onClick={() => setActiveTab('bookings')}
              >
                Bookings
              </button>
              <button 
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'profile' 
                    ? 'border-coral-500 text-coral-500' 
                    : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Personal Info
              </button>
              <button 
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'preferences' 
                    ? 'border-coral-500 text-coral-500' 
                    : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </button>
              <button 
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'payment' 
                    ? 'border-coral-500 text-coral-500' 
                    : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                Payment Methods
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'bookings' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Upcoming Bookings
                </h2>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => window.location.href = '/book'}
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
            </>
          )}
          
          {activeTab === 'profile' && (
            <ProfileForm 
              userId={userId}
              initialData={userProfile}
              onSave={handleUpdateProfile}
              isLoading={isLoading}
            />
          )}
          
          {activeTab === 'preferences' && (
            <PreferencesForm 
              userId={userId}
              initialPreferences={userPreferences}
              onSave={handleUpdatePreferences}
              isLoading={isLoading}
            />
          )}
          
          {activeTab === 'payment' && (
            <PaymentMethods 
              userId={userId}
              defaultPaymentMethodId={userProfile?.default_payment_method}
              onSetDefaultMethod={handleSetDefaultPaymentMethod}
              onAddPaymentMethod={handleAddPaymentMethod}
              isLoading={isLoading}
            />
          )}
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