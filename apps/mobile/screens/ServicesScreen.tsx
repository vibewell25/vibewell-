import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { BookingCard } from '@vibewell/ui-native';
import { supabase } from '@vibewell/api/supabaseClient';

// Define the Service type
interface Service {
  id: string;
  name: string;
  location: string;
  image: string;
}

export default function ServicesScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) {
          setError(error.message);
        } else {
          setServices(data || []);
        }
      } catch (e) {
        setError('Failed to fetch services');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {services.map(item => (
        <BookingCard key={item.id} destination={item} onPress={() => {}} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  errorText: {
    color: 'red',
    fontSize: 16
  }
}); 