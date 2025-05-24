// Test imports
import { BookingCard as NativeBookingCard } from '@vibewell/ui-native';
import { BookingCard as WebBookingCard } from '@vibewell/ui-web';

// Test function that uses the imported components
function testImports() {
  const destination = {
    id: '1',
    name: 'Test Destination',
    location: 'Test Location',
    image: 'test.jpg',
    rating: 4.5
  };
  
  console.log('Native BookingCard:', NativeBookingCard);
  console.log('Web BookingCard:', WebBookingCard);
  console.log('Destination details:', destination);
  
  // This would be used in a React component
  /*
  return (
    <div>
      <NativeBookingCard 
        destination={destination}
        onPress={() => {}}
        onSave={() => {}}
      />
      <WebBookingCard 
        destination={destination}
        onPress={() => {}}
        onSave={() => {}}
      />
    </div>
  );
  */
}

export default testImports; 