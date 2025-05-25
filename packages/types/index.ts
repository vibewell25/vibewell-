// Define the Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  isNew?: boolean;
  image?: string;
  reviewCount?: number;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Export other types as needed 