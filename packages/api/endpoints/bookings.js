import { createClient } from '../supabase';
export const getUserBookings = async (userId) => {
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
    return data;
};
export const createBooking = async (booking) => {
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
    return data;
};
export const updateBookingStatus = async (bookingId, status) => {
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
    return data;
};
//# sourceMappingURL=bookings.js.map