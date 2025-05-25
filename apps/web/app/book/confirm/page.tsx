'use client';

import { useSearchParams } from 'next/navigation';
import { createBooking } from '@vibewell/api/src/bookings';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ConfirmPage() {
  const params = useSearchParams();
  const [status, setStatus] = useState<'pending'|'error'|'confirmed'>('pending');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const bookingParam = params.get('booking');
    
    if (!bookingParam) {
      setStatus('error');
      setError('No booking information found.');
      return;
    }
    
    try {
      const booking = JSON.parse(bookingParam);
      
      // Create the booking
      createBooking(booking).then(({ error }) => {
        if (error) {
          setStatus('error');
          setError(error.message || 'Error creating booking.');
        } else {
          setStatus('confirmed');
          
          // In a production app, we would call the Stripe API here
          // const { sessionId } = await supabase.functions.invoke('create-stripe-session', { body:{ bookingId } });
          // window.location.href = sessionId.url;
          
          // Also invoke notification function
          // supabase.functions.invoke('notify-booking', { body:{ bookingId } });
        }
      });
    } catch (err) {
      setStatus('error');
      setError('Invalid booking data.');
    }
  }, [params]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      {status === 'pending' && (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-coral-500 mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Processing Your Booking</h2>
          <p className="text-neutral-600">Please wait while we confirm your appointment...</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-50 p-8 rounded-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-semibold mb-2">Booking Failed</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <Link 
            href="/book" 
            className="px-6 py-3 bg-coral-500 text-white rounded-md font-medium hover:bg-coral-600 inline-block"
          >
            Try Again
          </Link>
        </div>
      )}
      
      {status === 'confirmed' && (
        <div className="bg-green-50 p-8 rounded-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-semibold mb-2">Booking Confirmed! 🎉</h2>
          <p className="text-neutral-600 mb-6">Your appointment has been scheduled successfully. You will receive a confirmation email and SMS shortly.</p>
          <Link 
            href="/profile" 
            className="px-6 py-3 bg-coral-500 text-white rounded-md font-medium hover:bg-coral-600 inline-block"
          >
            View My Bookings
          </Link>
        </div>
      )}
    </div>
  );
} 