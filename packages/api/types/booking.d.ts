import { Service } from './service';
import { User } from './user';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    status: BookingStatus;
    notes?: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}
export interface BookingWithDetails extends Booking {
    user?: User;
    service?: Service;
}
//# sourceMappingURL=booking.d.ts.map