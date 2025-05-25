import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../page';

// Mock the necessary components and API functions
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

jest.mock('../../../../packages/ui/web/components/ProfileForm', () => ({
  ProfileForm: ({ onSave, initialData }: any) => (
    <div data-testid="profile-form">
      <div>Mock Profile Form</div>
      <div data-testid="initial-name">{initialData?.name}</div>
      <button onClick={() => onSave(initialData)}>Save Profile</button>
    </div>
  ),
}));

jest.mock('../../../../packages/ui/web/components/PreferencesForm', () => ({
  PreferencesForm: ({ onSave, initialPreferences }: any) => (
    <div data-testid="preferences-form">
      <div>Mock Preferences Form</div>
      <div data-testid="initial-skin-type">
        {initialPreferences?.skinType?.join(', ')}
      </div>
      <button onClick={() => onSave(initialPreferences)}>Save Preferences</button>
    </div>
  ),
}));

jest.mock('../../../../packages/ui/web/components/PaymentMethods', () => ({
  PaymentMethods: ({ onSetDefaultMethod, defaultPaymentMethodId }: any) => (
    <div data-testid="payment-methods">
      <div>Mock Payment Methods</div>
      <div data-testid="default-payment-method">{defaultPaymentMethodId}</div>
      <button onClick={() => onSetDefaultMethod('new-pm-123')}>
        Set Default Payment Method
      </button>
    </div>
  ),
}));

jest.mock('../../../../packages/api/src/users', () => ({
  getUserProfile: jest.fn().mockResolvedValue({
    data: {
      id: 'profile-1',
      user_id: 'mock-user-id',
      name: 'Sarah Johnson',
      avatar_url: '/images/profile-placeholder.jpg',
      email: 'sarah@example.com',
      phone: '(555) 123-4567',
      default_payment_method: 'pm_123456',
    },
  }),
  updateUserProfile: jest.fn().mockResolvedValue({ data: null, error: null }),
  getUserPreferences: jest.fn().mockResolvedValue({
    data: {
      preferences: {
        skinType: ['combination', 'sensitive'],
        skinGoals: ['hydration', 'anti-aging'],
        notifications: {
          email: true,
          sms: false,
          promotions: true,
        },
        preferredLanguage: 'en',
      },
    },
  }),
  updateUserPreferences: jest.fn().mockResolvedValue({ data: null, error: null }),
  setDefaultPaymentMethod: jest.fn().mockResolvedValue({ data: null, error: null }),
}));

// Mock BookingCard component
jest.mock('../../../components/BookingCard', () => ({
  __esModule: true,
  default: ({ booking }: any) => (
    <div data-testid={`booking-card-${booking.id}`}>
      <div>Booking: {booking.service.name}</div>
      <div>Date: {booking.date.toLocaleString()}</div>
      <div>Status: {booking.status}</div>
    </div>
  ),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the profile page with user data', async () => {
    render(<ProfilePage />);
    
    // Wait for the profile data to load
    await waitFor(() => {
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    
    // Check that the email is displayed
    expect(screen.getByText('sarah@example.com')).toBeInTheDocument();
  });

  it('switches between tabs when clicking tab buttons', async () => {
    render(<ProfilePage />);
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    
    // Initially, the profile form should be visible
    expect(screen.getByTestId('profile-form')).toBeInTheDocument();
    
    // Click on the Preferences tab
    fireEvent.click(screen.getByText('Preferences'));
    
    // The preferences form should now be visible
    expect(screen.getByTestId('preferences-form')).toBeInTheDocument();
    
    // Click on the Payment Methods tab
    fireEvent.click(screen.getByText('Payment Methods'));
    
    // The payment methods component should now be visible
    expect(screen.getByTestId('payment-methods')).toBeInTheDocument();
    
    // Click on the Bookings tab
    fireEvent.click(screen.getByText('Bookings'));
    
    // The bookings list should now be visible
    expect(screen.getByText('Upcoming Bookings')).toBeInTheDocument();
    expect(screen.getByTestId('booking-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('booking-card-2')).toBeInTheDocument();
  });

  it('updates profile data when saving the profile form', async () => {
    const { getUserProfile, updateUserProfile } = require('../../../../packages/api/src/users');
    
    render(<ProfilePage />);
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByTestId('profile-form')).toBeInTheDocument();
    });
    
    // Click the save button on the profile form
    fireEvent.click(screen.getByText('Save Profile'));
    
    // Check that updateUserProfile was called
    await waitFor(() => {
      expect(updateUserProfile).toHaveBeenCalled();
    });
  });

  it('updates preferences when saving the preferences form', async () => {
    const { updateUserPreferences } = require('../../../../packages/api/src/users');
    
    render(<ProfilePage />);
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    
    // Click on the Preferences tab
    fireEvent.click(screen.getByText('Preferences'));
    
    // Wait for the preferences form to be visible
    await waitFor(() => {
      expect(screen.getByTestId('preferences-form')).toBeInTheDocument();
    });
    
    // Click the save button on the preferences form
    fireEvent.click(screen.getByText('Save Preferences'));
    
    // Check that updateUserPreferences was called
    await waitFor(() => {
      expect(updateUserPreferences).toHaveBeenCalled();
    });
  });

  it('updates default payment method when setting a new default', async () => {
    const { setDefaultPaymentMethod } = require('../../../../packages/api/src/users');
    
    render(<ProfilePage />);
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    });
    
    // Click on the Payment Methods tab
    fireEvent.click(screen.getByText('Payment Methods'));
    
    // Wait for the payment methods component to be visible
    await waitFor(() => {
      expect(screen.getByTestId('payment-methods')).toBeInTheDocument();
    });
    
    // Click the button to set a default payment method
    fireEvent.click(screen.getByText('Set Default Payment Method'));
    
    // Check that setDefaultPaymentMethod was called
    await waitFor(() => {
      expect(setDefaultPaymentMethod).toHaveBeenCalledWith('mock-user-id', 'new-pm-123');
    });
  });
}); 