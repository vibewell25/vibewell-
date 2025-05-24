import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AiSkinAnalysisCard } from '../components/AiSkinAnalysisCard';

// Add jest-dom matchers
import '@testing-library/jest-dom';

// Define mock type for better TypeScript support
type MockSupabaseFunctions = {
  invoke: jest.Mock;
};

type MockSupabase = {
  functions: MockSupabaseFunctions;
};

// Extend global for tests
declare global {
  // eslint-disable-next-line no-var
  var mockSupabase: MockSupabase;
}

// Create a more complete mock implementation for the Card component that mimics the actual one
jest.mock('../components/Card', () => {
  return {
    Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className} data-testid="card">
        {children}
      </div>
    ),
  };
});

// Mock supabase and make it accessible to the component
const mockSupabaseFunctions = {
  invoke: jest.fn()
};

const mockSupabase = {
  functions: mockSupabaseFunctions
};

// Replace the global object with our mock
global.mockSupabase = mockSupabase;

// Mock the component's internal supabase object
jest.mock('@vibewell/api', () => ({
  supabase: mockSupabase
}));

// Set up a mock for window.mockData
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'mockData', {
    value: { supabase: mockSupabase },
    writable: true,
  });
}

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('AiSkinAnalysisCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    mockSupabaseFunctions.invoke.mockResolvedValue({
      data: null,
      error: null
    });
  });

  test('renders initial state with start button', () => {
    render(<AiSkinAnalysisCard userId="user123" onStartAnalysis={() => {}} />);
    
    expect(screen.getByText('AI Skin Analysis')).toBeInTheDocument();
    expect(screen.getByText('Get personalized skincare recommendations')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start your analysis/i })).toBeInTheDocument();
  });

  test('shows loading state when analysis starts', async () => {
    // Add a delay to the mock to allow loading state to be seen
    mockSupabaseFunctions.invoke.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        data: null,
        error: null
      }), 100))
    );
    
    render(<AiSkinAnalysisCard userId="user123" onStartAnalysis={() => {}} />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Since we're now using the role attribute on the spinner div, this should work
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows error state when analysis fails', async () => {
    // Mock Supabase to return an error
    mockSupabaseFunctions.invoke.mockResolvedValue({
      error: { message: 'Analysis failed' },
      data: null,
    });
    
    render(<AiSkinAnalysisCard userId="user123" onStartAnalysis={() => {}} />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to analyze skin')).toBeInTheDocument();
    });
    
    // Check for Try Again button
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  test('displays analysis data when successful', async () => {
    // Mock Supabase to return analysis data
    const mockData = {
      hydration: 75,
      elasticity: 82,
      recommendedProducts: ['Hydrating Serum', 'Moisture Cream', 'Night Repair']
    };
    
    mockSupabaseFunctions.invoke.mockResolvedValue({
      error: null,
      data: mockData,
    });
    
    render(<AiSkinAnalysisCard userId="user123" onStartAnalysis={() => {}} />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Wait for data to be displayed
    await waitFor(() => {
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
    
    // Now check the rest of the elements
    expect(screen.getByText('82%')).toBeInTheDocument();
    expect(screen.getByText('Hydrating Serum')).toBeInTheDocument();
    expect(screen.getByText('Moisture Cream')).toBeInTheDocument();
    expect(screen.getByText('+ 1 more')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });

  test('calls onStartAnalysis prop when provided', () => {
    const mockOnStartAnalysis = jest.fn();
    
    render(<AiSkinAnalysisCard userId="user123" onStartAnalysis={mockOnStartAnalysis} />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Expect the callback to be called
    expect(mockOnStartAnalysis).toHaveBeenCalled();
  });
}); 