import { supabase } from '../supabaseClient';

export async function getUserProfile(userId: string) {
  return supabase.from('user_profiles').select('*').eq('user_id', userId).single();
}

export async function updateUserProfile(userId: string, data: Partial<{
  name: string;
  avatar_url: string;
  email: string;
  phone: string;
}>) {
  return supabase.from('user_profiles').update(data).eq('user_id', userId);
}

export async function getUserPreferences(userId: string) {
  return supabase.from('user_profiles').select('preferences').eq('user_id', userId).single();
}

export async function updateUserPreferences(userId: string, preferences: Record<string, any>) {
  return supabase.from('user_profiles').update({ preferences }).eq('user_id', userId);
}

export async function listPaymentMethods(userId: string) {
  return supabase.functions.invoke('list-payment-methods', { body: { userId } });
}

export async function setDefaultPaymentMethod(userId: string, paymentMethodId: string) {
  return supabase.from('user_profiles').update({ default_payment_method: paymentMethodId }).eq('user_id', userId);
} 