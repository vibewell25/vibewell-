import { prisma } from './index';
import { Prisma, Status } from '@prisma/client';

// Types
export type BookingWithDetails = Prisma.BookingGetPayload<{
  include: { user: true; service: { include: { provider: true } } };
}>;

export type BookingInput = {
  date: Date;
  userId: string;
  serviceId: string;
  notes?: string;
  status?: Status;
};

// Get all bookings with optional filtering
export async function getBookings({
  userId,
  serviceId,
  providerId,
  status,
  fromDate,
  toDate,
  limit = 10,
  offset = 0,
}: {
  userId?: string;
  serviceId?: string;
  providerId?: string;
  status?: Status;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
} = {}) {
  const where: Prisma.BookingWhereInput = {};

  if (userId) {
    where.userId = userId;
  }

  if (serviceId) {
    where.serviceId = serviceId;
  }

  if (providerId) {
    where.service = {
      providerId,
    };
  }

  if (status) {
    where.status = status;
  }

  if (fromDate || toDate) {
    where.date = {};
    if (fromDate) {
      where.date.gte = fromDate;
    }
    if (toDate) {
      where.date.lte = toDate;
    }
  }

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        user: true,
        service: {
          include: {
            provider: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: { date: 'asc' },
    }),
    prisma.booking.count({ where }),
  ]);

  return { bookings, total };
}

// Get booking by ID
export async function getBookingById(id: string) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      service: {
        include: {
          provider: true,
        },
      },
    },
  });
}

// Create a new booking
export async function createBooking(data: BookingInput) {
  return prisma.booking.create({
    data,
    include: {
      user: true,
      service: {
        include: {
          provider: true,
        },
      },
    },
  });
}

// Update a booking
export async function updateBooking(id: string, data: Partial<BookingInput>) {
  return prisma.booking.update({
    where: { id },
    data,
    include: {
      user: true,
      service: {
        include: {
          provider: true,
        },
      },
    },
  });
}

// Update booking status
export async function updateBookingStatus(id: string, status: Status) {
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      user: true,
      service: {
        include: {
          provider: true,
        },
      },
    },
  });
}

// Delete a booking
export async function deleteBooking(id: string) {
  return prisma.booking.delete({
    where: { id },
  });
}

// Get upcoming bookings for a user
export async function getUpcomingBookingsForUser(userId: string, limit = 5) {
  const now = new Date();
  
  return prisma.booking.findMany({
    where: {
      userId,
      date: { gte: now },
      status: { in: [Status.PENDING, Status.CONFIRMED] },
    },
    include: {
      service: {
        include: {
          provider: true,
        },
      },
    },
    orderBy: { date: 'asc' },
    take: limit,
  });
} 