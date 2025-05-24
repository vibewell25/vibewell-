import { createClient } from '../supabase';
import { Service, ServiceCategory } from '../types';

export const getServices = async (): Promise<Service[]> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('isActive', true)
    .order('name');
    
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[];
};

export const getServiceById = async (serviceId: string): Promise<Service | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', serviceId)
    .single();
    
  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }
  
  return data as Service;
};

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('service_categories')
    .select('*, services(*)')
    .order('name');
    
  if (error) {
    console.error('Error fetching service categories:', error);
    return [];
  }
  
  return data as ServiceCategory[];
}; 