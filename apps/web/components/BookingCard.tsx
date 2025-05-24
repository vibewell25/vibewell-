'use client';

import React from 'react';
import { format } from 'date-fns';
import { Button } from '@vibewell/ui-web';

// Define Status enum directly instead of importing from @prisma/client
type Status = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

interface BookingCardProps {
  booking: {
    id: string;
    date: Date;
    status: Status;
    service: {
      id: string;
      name: string;
      duration: number;
      price: number;
      provider: {
        id: string;
        name: string;
      };
    };
  };
  onCancel?: () => void;
  onReschedule?: () => void;
}

export default function BookingCard({ booking, onCancel, onReschedule }: BookingCardProps) {
  const isPending = booking.status === 'PENDING';
  const isConfirmed = booking.status === 'CONFIRMED';
  const isCancelled = booking.status === 'CANCELLED';
  const isCompleted = booking.status === 'COMPLETED';

  const getStatusColor = () => {
    switch (booking.status) {
      case 'PENDING':
        return 'bg-warning/10 text-warning';
      case 'CONFIRMED':
        return 'bg-info/10 text-info';
      case 'CANCELLED':
        return 'bg-error/10 text-error';
      case 'COMPLETED':
        return 'bg-success/10 text-success';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {booking.service.name}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {booking.service.provider.name}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {booking.status}
        </span>
      </div>

      <div className="border-t border-b border-neutral-200 dark:border-neutral-700 py-3 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Date</p>
            <p className="text-neutral-900 dark:text-neutral-100 font-medium">
              {format(new Date(booking.date), 'MMMM d, yyyy')}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Time</p>
            <p className="text-neutral-900 dark:text-neutral-100 font-medium">
              {format(new Date(booking.date), 'h:mm a')}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Duration</p>
            <p className="text-neutral-900 dark:text-neutral-100 font-medium">
              {booking.service.duration} minutes
            </p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Price</p>
            <p className="text-neutral-900 dark:text-neutral-100 font-medium">
              ${booking.service.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {(isPending || isConfirmed) && (
        <div className="flex space-x-4">
          {onReschedule && (
            <Button variant="secondary" size="sm" onClick={onReschedule}>
              Reschedule
            </Button>
          )}
          {onCancel && (
            <Button variant="danger" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}

      {isCompleted && (
        <Button variant="secondary" size="sm">
          Book Again
        </Button>
      )}
    </div>
  );
} 