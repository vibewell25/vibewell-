import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { createBooking } from '@vibewell/api/src/bookings';
import { colors } from '@vibewell/ui-core-theme';
import { Button } from '@vibewell/ui-native';

export default function ConfirmScreen({ route, navigation }: any) {
  const { booking } = route.params;
  const [status, setStatus] = useState<'pending'|'error'|'confirmed'>('pending');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Create the booking
    createBooking(booking).then(({ error }) => {
      if (error) {
        setStatus('error');
        setError(error.message || 'Error creating booking.');
      } else {
        setStatus('confirmed');
        
        // In a production app, payment would be implemented here using Stripe React Native SDK
        // Also invoke notification function
        // supabase.functions.invoke('notify-booking', { body:{ bookingId } });
      }
    }).catch(() => {
      setStatus('error');
      setError('Network error. Please try again.');
    });
  }, [booking]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {status === 'pending' && (
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color={colors.coral[500]} style={styles.loader} />
          <Text style={styles.title}>Processing Your Booking</Text>
          <Text style={styles.message}>Please wait while we confirm your appointment...</Text>
        </View>
      )}
      
      {status === 'error' && (
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.errorIcon}>!</Text>
          </View>
          <Text style={styles.title}>Booking Failed</Text>
          <Text style={styles.message}>{error}</Text>
          <Button
            variant="primary"
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            Try Again
          </Button>
        </View>
      )}
      
      {status === 'confirmed' && (
        <View style={styles.contentContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.title}>Booking Confirmed! 🎉</Text>
          <Text style={styles.message}>
            Your appointment has been scheduled successfully. You will receive a confirmation email and SMS shortly.
          </Text>
          <Button
            variant="primary"
            onPress={() => navigation.navigate('Profile')}
            style={styles.button}
          >
            View My Bookings
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.neutral[50],
  },
  contentContainer: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.neutral[900],
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.neutral[600],
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EF4444', // Standard red color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorIcon: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981', // Standard green color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
  },
  button: {
    minWidth: 200,
  },
}); 