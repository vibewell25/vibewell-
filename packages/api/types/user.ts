export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  preferences?: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    marketing?: boolean;
  };
} 