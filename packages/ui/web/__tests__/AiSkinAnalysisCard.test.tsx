import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AiSkinAnalysisCard } from '../components/AiSkinAnalysisCard';
import { supabase } from '@vibewell/api';

// Define mock type for better TypeScript support
type MockSupabaseFunctions = {
  invoke: jest.Mock;
};

type MockSupabase = {
  functions: MockSupabaseFunctions;
};

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Supabase
jest.mock('@vibewell/api', () => {
  const mockFunctions = {
    invoke: jest.fn(),
  };
  
  const mockSupabase = {
    functions: mockFunctions,
  };
  
  return {
    supabase: mockSupabase,
  };
});

describe('AiSkinAnalysisCard', () => {
  // Cast the mocked supabase for TypeScript compatibility
  const mockedSupabase = supabase as unknown as MockSupabase;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial state with start button', () => {
    render(<AiSkinAnalysisCard userId="user123" />);
    
    expect(screen.getByText('AI Skin Analysis')).toBeInTheDocument();
    expect(screen.getByText('Get personalized skincare recommendations')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start your analysis/i })).toBeInTheDocument();
  });

  test('shows loading state when analysis starts', async () => {
    // Mock the Supabase function to not resolve immediately
    mockedSupabase.functions.invoke.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );
    
    render(<AiSkinAnalysisCard userId="user123" />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Check for loading indicator
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows error state when analysis fails', async () => {
    // Mock Supabase to return an error
    mockedSupabase.functions.invoke.mockResolvedValue({
      error: { message: 'Analysis failed' },
      data: null,
    });
    
    render(<AiSkinAnalysisCard userId="user123" />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Analysis failed')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });

  test('displays analysis data when successful', async () => {
    // Mock Supabase to return analysis data
    const mockData = {
      hydration: 75,
      elasticity: 82,
      recommendedProducts: ['Hydrating Serum', 'Moisture Cream', 'Night Repair']
    };
    
    mockedSupabase.functions.invoke.mockResolvedValue({
      error: null,
      data: mockData,
    });
    
    render(<AiSkinAnalysisCard userId="user123" />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Wait for data to be displayed
    await waitFor(() => {
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('82%')).toBeInTheDocument();
      expect(screen.getByText('Hydrating Serum')).toBeInTheDocument();
      expect(screen.getByText('Moisture Cream')).toBeInTheDocument();
      expect(screen.getByText('+ 1 more')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
    });
  });

  test('calls onStartAnalysis prop when provided', () => {
    const mockOnStartAnalysis = jest.fn();
    
    render(<AiSkinAnalysisCard userId="user123" onStartAnalysis={mockOnStartAnalysis} />);
    
    // Click the start button
    fireEvent.click(screen.getByRole('button', { name: /start your analysis/i }));
    
    // Expect the callback to be called
    expect(mockOnStartAnalysis).toHaveBeenCalled();
    // Expect Supabase not to be called
    expect(mockedSupabase.functions.invoke).not.toHaveBeenCalled();
  });
}); 