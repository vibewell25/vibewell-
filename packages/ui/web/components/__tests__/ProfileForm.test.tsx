import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfileForm } from '../ProfileForm';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ProfileForm', () => {
  const mockOnSave = jest.fn().mockResolvedValue(undefined);
  
  const defaultProps = {
    userId: 'test-user-id',
    initialData: {
      name: 'John Doe',
      avatar_url: '/test-avatar.jpg',
      email: 'john@example.com',
      phone: '555-1234',
    },
    onSave: mockOnSave,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with initial data', () => {
    render(<ProfileForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('555-1234');
  });

  it('shows avatar placeholder when no avatar URL is provided', () => {
    const propsWithoutAvatar = {
      ...defaultProps,
      initialData: {
        ...defaultProps.initialData,
        avatar_url: '',
      },
    };
    
    render(<ProfileForm {...propsWithoutAvatar} />);
    
    // Check if placeholder is rendered
    const placeholderElement = screen.getByText('J');
    expect(placeholderElement).toBeInTheDocument();
  });

  it('updates form fields when user types', () => {
    render(<ProfileForm {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '555-5678' } });
    
    expect(nameInput).toHaveValue('Jane Smith');
    expect(emailInput).toHaveValue('jane@example.com');
    expect(phoneInput).toHaveValue('555-5678');
  });

  it('calls onSave with updated data when form is submitted', async () => {
    render(<ProfileForm {...defaultProps} />);
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '555-5678' } });
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        name: 'Jane Smith',
        avatar_url: '/test-avatar.jpg',
        email: 'jane@example.com',
        phone: '555-5678',
      });
    });
  });

  it('shows success message after saving', async () => {
    render(<ProfileForm {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully')).toBeInTheDocument();
    });
  });

  it('shows error message when save fails', async () => {
    const mockErrorOnSave = jest.fn().mockRejectedValue(new Error('Save failed'));
    
    render(
      <ProfileForm
        {...defaultProps}
        onSave={mockErrorOnSave}
      />
    );
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => {
      expect(screen.getByText('Failed to update profile')).toBeInTheDocument();
    });
  });

  it('disables the save button when loading', () => {
    render(<ProfileForm {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('Save Changes')).toBeDisabled();
  });

  it('shows saving state while saving', async () => {
    // Create a mock that doesn't resolve immediately
    const mockSlowSave = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), 100);
      });
    });
    
    render(
      <ProfileForm
        {...defaultProps}
        onSave={mockSlowSave}
      />
    );
    
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Should show "Saving..." while the operation is in progress
    expect(screen.getByText('Saving...')).toBeInTheDocument();
    
    // Wait for the operation to complete
    await waitFor(() => {
      expect(screen.queryByText('Saving...')).not.toBeInTheDocument();
    });
  });
}); 