import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ServicesPage from '../app/services/page';
import { supabase } from '@vibewell/api';

// Define mock type for better TypeScript support
type MockSupabase = {
  from: jest.Mock;
  select: jest.Mock;
  eq: jest.Mock;
  order: jest.Mock;
  limit: jest.Mock;
  single: jest.Mock;
};

// Mock the supabase client with proper method chaining
jest.mock('@vibewell/api', () => {
  // Create a mock object that better supports chaining
  const mockSupabase = {
    from: jest.fn(),
    select: jest.fn(),
    eq: jest.fn(),
    order: jest.fn(),
    limit: jest.fn(),
    single: jest.fn(),
  };

  // Set up chaining for each method
  mockSupabase.from.mockReturnValue(mockSupabase);
  mockSupabase.select.mockReturnValue(mockSupabase);
  mockSupabase.eq.mockReturnValue(mockSupabase);
  mockSupabase.order.mockReturnValue(mockSupabase);
  mockSupabase.limit.mockReturnValue(mockSupabase);
  mockSupabase.single.mockReturnValue(mockSupabase);
  
  return {
    supabase: mockSupabase as unknown as typeof supabase,
    getMockServices: jest.fn().mockReturnValue([
      {
        id: '1',
        name: 'Deep Tissue Massage',
        location: 'Serenity Spa',
        image: '/images/services/massage.jpg',
        price: 85,
      },
      {
        id: '2',
        name: 'Haircut & Styling',
        location: 'Glow Beauty Salon',
        image: '/images/services/haircut.jpg',
        price: 55,
      },
    ]),
  };
});

// Mock next/image since it's used in the page
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

describe('ServicesPage', () => {
  // Cast the mocked supabase for TypeScript compatibility
  const mockedSupabase = supabase as unknown as MockSupabase;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state initially', async () => {
    // Setup a promise that won't resolve immediately to keep the loading state
    const promise = new Promise(() => {});
    mockedSupabase.select.mockReturnValue(promise);

    render(<ServicesPage />);

    // Check for loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders service cards after data is loaded', async () => {
    // Setup mock services data
    const mockServices = [
      {
        id: '1',
        name: 'Deep Tissue Massage',
        location: 'Serenity Spa',
        image: '/images/services/massage.jpg',
        price: 85,
      },
      {
        id: '2',
        name: 'Haircut & Styling',
        location: 'Glow Beauty Salon',
        image: '/images/services/haircut.jpg',
        price: 55,
      },
    ];

    // Mock successful API response
    mockedSupabase.select.mockResolvedValue({
      data: mockServices,
      error: null,
    });

    render(<ServicesPage />);

    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for service cards to appear
    await waitFor(() => {
      expect(screen.getByText('Deep Tissue Massage')).toBeInTheDocument();
      expect(screen.getByText('Haircut & Styling')).toBeInTheDocument();
      expect(screen.getByText('Serenity Spa')).toBeInTheDocument();
      expect(screen.getByText('Glow Beauty Salon')).toBeInTheDocument();
      expect(screen.getByText('$85')).toBeInTheDocument();
      expect(screen.getByText('$55')).toBeInTheDocument();
    });
  });

  test('displays error message when API fails', async () => {
    // Mock API error
    mockedSupabase.select.mockResolvedValue({
      data: null,
      error: { message: 'Failed to fetch services' },
    });

    render(<ServicesPage />);

    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch services')).toBeInTheDocument();
    });
  });

  test('falls back to mock data when API fails', async () => {
    // Mock API error but with getMockServices returning data
    mockedSupabase.select.mockResolvedValue({
      data: null,
      error: { message: 'Failed to fetch services' },
    });

    render(<ServicesPage />);

    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for mock data to be rendered instead
    await waitFor(() => {
      expect(screen.getByText('Deep Tissue Massage')).toBeInTheDocument();
      expect(screen.getByText('Haircut & Styling')).toBeInTheDocument();
    });
  });
}); 