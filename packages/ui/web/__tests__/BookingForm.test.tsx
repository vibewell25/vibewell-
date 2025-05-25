import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../components/BookingForm';

// Mock the services data
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
  }
];

// Mock the API functions
jest.mock('@vibewell/api/supabaseClient', () => ({
  getMockServices: jest.fn().mockReturnValue(mockServices),
}));

jest.mock('@vibewell/api/src/bookings', () => ({
  createBooking: jest.fn().mockResolvedValue({ data: { id: 'test-booking-id' }, error: null }),
}));

// Mock window.location
const mockLocation = {
  href: '',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.href = '';
  });

  it('renders the booking form with services', async () => {
    render(<BookingForm />);
    
    // Check title is rendered
    expect(screen.getByText('Book Your Appointment')).toBeInTheDocument();
    
    // Wait for services to load
    await waitFor(() => {
      expect(screen.getByText('Deep Tissue Massage')).toBeInTheDocument();
      expect(screen.getByText('Haircut & Styling')).toBeInTheDocument();
    });
  });

  it('shows date picker after selecting a service', async () => {
    render(<BookingForm />);
    
    // Wait for services to load
    await waitFor(() => {
      expect(screen.getByText('Deep Tissue Massage')).toBeInTheDocument();
    });
    
    // Select a service
    const serviceCards = screen.getAllByTestId('booking-card');
    fireEvent.click(serviceCards[0]);
    
    // Check if date picker appears
    expect(screen.getByText('Select a Date')).toBeInTheDocument();
  });

  it('shows time slots after selecting a date', async () => {
    render(<BookingForm />);
    
    // Wait for services to load and select a service
    await waitFor(() => {
      const serviceCards = screen.getAllByTestId('booking-card');
      fireEvent.click(serviceCards[0]);
    });
    
    // Find and click on a date
    const datePicker = screen.getByRole('application');
    const dateCell = datePicker.querySelector('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
    if (dateCell) {
      fireEvent.click(dateCell);
    }
    
    // Check if time slots appear
    expect(screen.getByText('Select a Time')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
  });

  it('enables the Book Now button when all selections are made', async () => {
    render(<BookingForm />);
    
    // Wait for services to load and select a service
    await waitFor(() => {
      const serviceCards = screen.getAllByTestId('booking-card');
      fireEvent.click(serviceCards[0]);
    });
    
    // Select a date
    const datePicker = screen.getByRole('application');
    const dateCell = datePicker.querySelector('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
    if (dateCell) {
      fireEvent.click(dateCell);
    }
    
    // Select a time
    const timeButton = screen.getByText('9:00 AM');
    fireEvent.click(timeButton);
    
    // Check if Book Now button is enabled
    const bookButton = screen.getByText('Book Now');
    expect(bookButton).not.toBeDisabled();
  });

  it('redirects to confirmation page when form is submitted', async () => {
    render(<BookingForm />);
    
    // Complete the form
    await waitFor(() => {
      const serviceCards = screen.getAllByTestId('booking-card');
      fireEvent.click(serviceCards[0]);
    });
    
    const datePicker = screen.getByRole('application');
    const dateCell = datePicker.querySelector('.react-datepicker__day:not(.react-datepicker__day--outside-month)');
    if (dateCell) {
      fireEvent.click(dateCell);
    }
    
    const timeButton = screen.getByText('9:00 AM');
    fireEvent.click(timeButton);
    
    // Submit the form
    const bookButton = screen.getByText('Book Now');
    fireEvent.click(bookButton);
    
    // Check if redirect happens
    await waitFor(() => {
      expect(mockLocation.href).toContain('/book/confirm?booking=');
    });
  });
}); 