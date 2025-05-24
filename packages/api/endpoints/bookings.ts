import { createClient } from '../supabase';
import { Booking, BookingWithDetails } from '../types';

export const getUserBookings = async (userId: string): Promise<BookingWithDetails[]> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('bookings')
    .select('*, services(*)')
    .eq('userId', userId)
    .order('startTime', { ascending: true });
    
  if (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
  
  return data as BookingWithDetails[];
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }
  
  return data as Booking;
};

export const updateBookingStatus = async (bookingId: string, status: Booking['status']): Promise<Booking | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('bookings')
    .update({ status, updatedAt: new Date().toISOString() })
    .eq('id', bookingId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating booking status:', error);
    return null;
  }
  
  return data as Booking;
}; 