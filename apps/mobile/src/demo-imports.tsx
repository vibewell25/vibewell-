import React from 'react';
import { View, Text } from 'react-native';
import { BookingCard } from '@vibewell/ui-native';

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
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Import Demo</Text>
      <BookingCard 
        destination={demoDestination}
        onPress={() => console.log('Booking card pressed')}
        onSave={() => console.log('Saved')}
      />
    </View>
  );
}; 