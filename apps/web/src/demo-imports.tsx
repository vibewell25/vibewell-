import React from 'react';
import { BookingCard } from '@vibewell/ui-web';

// Demo component to verify imports
export const ImportDemo = () => {
  const demoDestination = {
    id: '1',
    name: 'Spa Resort',
    location: 'Bali, Indonesia',
    image: '/images/spa.jpg',
    rating: 4.7
  };
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Import Demo</h1>
      <BookingCard 
        destination={demoDestination}
        onPress={() => console.log('Booking card pressed')}
        onSave={() => console.log('Saved')}
      />
    </div>
  );
}; 