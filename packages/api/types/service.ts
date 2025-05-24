export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  imageUrl?: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  services?: Service[];
} 