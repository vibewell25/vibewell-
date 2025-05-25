import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BookingCard } from './BookingCard';
import { getMockServices } from '@vibewell/api/supabaseClient';
import { colors } from '@vibewell/ui-core-theme';
import { Button } from '../index';

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
  const navigation = useNavigation();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    // In a real app, this would call the API to get services
    const fetchServices = async () => {
      const mockServices = getMockServices();
      setServices(mockServices);
    };

    fetchServices();
  }, []);

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedTime) {
      Alert.alert('Error', 'Please select a service, date, and time');
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, replace hardcoded user_id with actual authenticated user's ID
      const booking = {
        user_id: 'current-user-id',
        service_id: selectedService.id,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
      };

      // Navigate to confirmation screen with booking data
      navigation.navigate('Confirm', { booking });
    } catch (err) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Your Appointment</Text>
      
      {/* Step 1: Select Service */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select a Service</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.servicesContainer}>
            {services.map((service) => (
              <BookingCard
                key={service.id}
                destination={{
                  id: service.id,
                  name: service.name,
                  location: service.location,
                  image: service.image,
                }}
                style={[
                  styles.serviceCard,
                  selectedService?.id === service.id && styles.selectedServiceCard
                ]}
                onPress={() => setSelectedService(service)}
              />
            ))}
          </View>
        </ScrollView>
        
        {selectedService && (
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceName}>{selectedService.name}</Text>
            <Text style={styles.serviceDescription}>{selectedService.description}</Text>
            <View style={styles.serviceInfo}>
              <Text style={styles.servicePriceText}>${selectedService.price}</Text>
              <Text style={styles.serviceDurationText}>{selectedService.duration} minutes</Text>
            </View>
          </View>
        )}
      </View>
      
      {/* Step 2: Select Date */}
      {selectedService && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Date</Text>
          <TouchableOpacity 
            style={styles.dateSelector}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}
        </View>
      )}
      
      {/* Step 3: Select Time */}
      {selectedService && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Time</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeItem,
                  selectedTime === time && styles.selectedTimeItem
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text 
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      
      {/* Submit Button */}
      {selectedService && selectedTime && (
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Book Now'}
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.neutral[50],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: colors.neutral[800],
  },
  servicesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  serviceCard: {
    width: 200,
    marginRight: 12,
  },
  selectedServiceCard: {
    borderWidth: 2,
    borderColor: colors.coral[500],
  },
  serviceDetails: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  serviceDescription: {
    marginTop: 4,
    color: colors.neutral[600],
  },
  serviceInfo: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicePriceText: {
    fontWeight: '500',
    color: colors.coral[600],
  },
  serviceDurationText: {
    color: colors.neutral[600],
  },
  dateSelector: {
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 8,
  },
  dateText: {
    fontSize: 16,
    color: colors.neutral[800],
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '30%',
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  selectedTimeItem: {
    backgroundColor: colors.coral[500],
  },
  timeText: {
    color: colors.neutral[800],
  },
  selectedTimeText: {
    color: colors.white,
  },
  buttonContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
}); 