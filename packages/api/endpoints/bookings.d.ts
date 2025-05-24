import { Booking, BookingWithDetails } from '../types';
export declare const getUserBookings: (userId: string) => Promise<BookingWithDetails[]>;
export declare const createBooking: (booking: Omit<Booking, "id" | "createdAt" | "updatedAt">) => Promise<Booking | null>;
export declare const updateBookingStatus: (bookingId: string, status: Booking["status"]) => Promise<Booking | null>;
//# sourceMappingURL=bookings.d.ts.map