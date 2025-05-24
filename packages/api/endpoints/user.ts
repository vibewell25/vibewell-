import { createClient } from '../supabase';
import { User, UserProfile } from '../types';

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data as UserProfile;
};

export const updateUserProfile = async (userId: string, profile: Partial<UserProfile>): Promise<UserProfile | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  
  return data as UserProfile;
}; 