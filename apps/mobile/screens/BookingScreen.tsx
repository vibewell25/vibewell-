import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '@vibewell/ui-core-theme';
import { Button } from '@vibewell/ui-native';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM',
];

export default function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const dates = generateDates();
  
  // Format date for display
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };
  
  // Check if date is selected
  const isDateSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Book Your Appointment</Text>
          <Text style={styles.subtitle}>Deep Tissue Massage - 60 min</Text>
        </View>
        
        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.datesContainer}>
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    isDateSelected(date) && styles.selectedDateItem,
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isDateSelected(date) && styles.selectedText,
                    ]}
                  >
                    {formatDay(date)}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      isDateSelected(date) && styles.selectedText,
                    ]}
                  >
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        
        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeItem,
                  selectedTime === time && styles.selectedTimeItem,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.serviceDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Provider</Text>
              <Text style={styles.detailValue}>Serenity Spa</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>Deep Tissue Massage</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>60 minutes</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>$85.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Confirm Button */}
      <View style={styles.footer}>
        <Button
          variant="primary"
          onPress={() => console.log('Booking confirmed')}
          disabled={!selectedTime}
        >
          Confirm Booking
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.neutral[800],
  },
  datesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDateItem: {
    backgroundColor: colors.coral[500],
  },
  dayText: {
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 4,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutral[900],
  },
  selectedText: {
    color: colors.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '30%',
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedTimeItem: {
    backgroundColor: colors.coral[500],
  },
  timeText: {
    fontSize: 14,
    color: colors.neutral[800],
  },
  serviceDetails: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  detailLabel: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.neutral[900],
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    backgroundColor: colors.white,
  },
}); 