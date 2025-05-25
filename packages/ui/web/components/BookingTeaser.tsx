'use client';

import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface BookingTeaserProps {
  onCheckAvailability?: (category: string, date: Date) => void;
}

export const BookingTeaser: React.FC<BookingTeaserProps> = ({
  onCheckAvailability
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryOption[]>([
    { id: '1', name: 'Facial Treatments', slug: 'facial-treatments' },
    { id: '2', name: 'Massage Therapy', slug: 'massage-therapy' },
    { id: '3', name: 'Skin Consultation', slug: 'skin-consultation' },
    { id: '4', name: 'Body Treatments', slug: 'body-treatments' }
  ]);

  // Format date for display
  const formattedDate = format(selectedDate, 'EEEE, MMMM d');
  
  // Generate next 7 days for date picker
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: date,
      label: i === 0 ? 'Today' : format(date, 'EEE, MMM d')
    };
  });

  const fetchTimeSlots = async () => {
    if (!selectedCategory || !selectedDate) return;
    
    setLoading(true);
    try {
      // This would be replaced with an actual API call
      // const response = await fetch(`/api/availability?category=${selectedCategory}&date=${format(selectedDate, 'yyyy-MM-dd')}`);
      // const data = await response.json();
      
      // Mock data for demo
      setTimeout(() => {
        const mockSlots: TimeSlot[] = [
          { id: '1', time: '9:00 AM', available: Math.random() > 0.5 },
          { id: '2', time: '10:00 AM', available: Math.random() > 0.5 },
          { id: '3', time: '11:00 AM', available: Math.random() > 0.5 },
          { id: '4', time: '1:00 PM', available: Math.random() > 0.5 },
          { id: '5', time: '2:00 PM', available: Math.random() > 0.5 },
          { id: '6', time: '3:00 PM', available: Math.random() > 0.5 },
          { id: '7', time: '4:00 PM', available: Math.random() > 0.5 },
        ];
        setTimeSlots(mockSlots);
        setLoading(false);
      }, 600);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setLoading(false);
    }
  };

  const handleCheckAvailability = () => {
    fetchTimeSlots();
    setShowModal(true);
    if (onCheckAvailability) {
      onCheckAvailability(selectedCategory, selectedDate);
    }
  };

  const handleSelectTimeSlot = (slotId: string) => {
    // This would integrate with a booking flow
    console.log(`Selected time slot: ${slotId}`);
    setShowModal(false);
    // Redirect to full booking page with pre-filled info
    // router.push(`/book?category=${selectedCategory}&date=${format(selectedDate, 'yyyy-MM-dd')}&slot=${slotId}`);
  };

  useEffect(() => {
    if (showModal) {
      fetchTimeSlots();
    }
  }, [showModal, selectedDate]);

  // Mock a real-time channel that updates availability
  useEffect(() => {
    if (!showModal) return;
    
    const interval = setInterval(() => {
      setTimeSlots(prev => 
        prev.map(slot => ({
          ...slot,
          available: Math.random() > 0.3 // Randomly update availability for demo
        }))
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [showModal]);

  return (
    <section className="py-16 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-neutral-50 dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
              <h2 className="text-3xl font-bold mb-4">Book Your Next Session</h2>
              <p className="mb-6">Schedule your wellness appointment in just a few clicks.</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time availability</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant confirmation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible rescheduling</span>
                </li>
              </ul>
            </div>
            
            <div className="p-8">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">Find Available Appointments</h3>
              
              <div className="space-y-4">
                {/* Treatment Category Dropdown */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Treatment Type
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-label="Select treatment category"
                  >
                    <option value="" disabled>Select a treatment</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Date Selector */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Preferred Date
                  </label>
                  <select
                    id="date"
                    value={dateOptions.findIndex(option => 
                      format(option.value, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    )}
                    onChange={(e) => setSelectedDate(dateOptions[parseInt(e.target.value)].value)}
                    className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    aria-label="Select preferred date"
                  >
                    {dateOptions.map((option, index) => (
                      <option key={index} value={index}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Check Availability Button */}
                <div className="pt-2">
                  <button
                    onClick={handleCheckAvailability}
                    disabled={!selectedCategory}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
                    aria-label="Check appointment availability"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Availability Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Available Times for {formattedDate}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : timeSlots.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-neutral-600 dark:text-neutral-400">No available time slots for this date.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && handleSelectTimeSlot(slot.id)}
                      disabled={!slot.available}
                      className={`py-3 px-4 rounded-md text-center transition-colors ${
                        slot.available 
                          ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white' 
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                      }`}
                      aria-label={`Select time slot at ${slot.time}${!slot.available ? ' (unavailable)' : ''}`}
                    >
                      {slot.time}
                      {!slot.available && <span className="block text-xs mt-1">(Booked)</span>}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors mr-3"
                >
                  Cancel
                </button>
                <button
                  onClick={() => window.location.href = '/book'}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  View All Times
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}; 