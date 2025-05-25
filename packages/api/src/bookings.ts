import { supabase } from '../supabaseClient';

export async function createBooking(booking: {
  user_id: string;
  service_id: string;
  date: string;
  time: string;
}) {
  return supabase.from('bookings').insert([booking]);
}

export async function getUserBookings(userId: string) {
  return supabase.from('bookings').select('*').eq('user_id', userId);
} 