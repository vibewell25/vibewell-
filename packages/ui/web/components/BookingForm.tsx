'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { BookingCard } from './BookingCard';
import { createBooking } from '@vibewell/api/src/bookings';
import { getMockServices } from '@vibewell/api/supabaseClient';
import 'react-datepicker/dist/react-datepicker.css';

interface Service {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  price: number;
  duration: number;
}

// Time slots from 9 AM to 5 PM
const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
];

export default function BookingForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // In a real app, this would call the API to get services
    const fetchServices = async () => {
      const mockServices = getMockServices();
      setServices(mockServices);
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Please select a service, date, and time');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real app, replace hardcoded user_id with actual authenticated user's ID
      const booking = {
        user_id: 'current-user-id',
        service_id: selectedService.id,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
      };

      // Redirect to confirmation page with booking data
      window.location.href = `/book/confirm?booking=${encodeURIComponent(JSON.stringify(booking))}`;
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">Book Your Appointment</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Select Service */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <BookingCard
                key={service.id}
                destination={{
                  id: service.id,
                  name: service.name,
                  location: service.location,
                  image: service.image,
                }}
                className={selectedService?.id === service.id ? 'ring-2 ring-coral-500' : ''}
                onPress={() => setSelectedService(service)}
              />
            ))}
          </div>
          
          {selectedService && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-md">
              <h3 className="font-semibold">{selectedService.name}</h3>
              <p className="text-neutral-600">{selectedService.description}</p>
              <div className="mt-2 flex justify-between">
                <span>${selectedService.price}</span>
                <span>{selectedService.duration} minutes</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Step 2: Select Date */}
        {selectedService && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
              className="w-full rounded-md border-neutral-300"
            />
          </div>
        )}
        
        {/* Step 3: Select Time */}
        {selectedDate && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a Time</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-2 rounded-md text-center ${
                    selectedTime === time
                      ? 'bg-coral-500 text-white'
                      : 'bg-white border border-neutral-300 hover:bg-neutral-50'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        {selectedService && selectedDate && selectedTime && (
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-coral-500 text-white rounded-md font-medium hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
} 