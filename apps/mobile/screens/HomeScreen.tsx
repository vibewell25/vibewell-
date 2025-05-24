import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AiSkinAnalysisCard, BookingCard } from '@vibewell/ui-native';
import { colors } from '@vibewell/ui-core-theme';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const upcoming = [
    { id: 'x1', name: 'Facial Treatment', location: 'Paris Spa', image: 'https://example.com/facial.jpg', date: '2023-08-15', time: '14:00' },
    { id: 'x2', name: 'Yoga Session', location: 'Wellness Retreat', image: 'https://example.com/yoga.jpg', date: '2023-08-20', time: '09:30' },
    { id: 'x3', name: 'Massage Therapy', location: 'Zen Wellness', image: 'https://example.com/massage.jpg', date: '2023-08-25', time: '16:15' },
  ];

  const recommended = [
    { id: 'r1', name: 'Hot Stone Massage', location: 'Tranquil Spa', image: 'https://example.com/hot-stone.jpg', rating: 4.8 },
    { id: 'r2', name: 'Deep Tissue Massage', location: 'Relief Center', image: 'https://example.com/deep-tissue.jpg', rating: 4.7 },
    { id: 'r3', name: 'Aromatherapy', location: 'Scent Haven', image: 'https://example.com/aromatherapy.jpg', rating: 4.9 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, User</Text>
        <Text style={styles.welcomeSubtitle}>Your wellness journey continues</Text>
      </View>

      {/* AI Skin Analysis Card */}
      <View style={styles.section}>
        <AiSkinAnalysisCard userId="demo" onStartAnalysis={() => {}} />
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Upcoming Appointments</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {upcoming.map(item => (
            <View key={item.id} style={styles.bookingCardContainer}>
              <BookingCard 
                destination={item} 
                onPress={() => navigation.navigate('AppointmentDetails', { id: item.id })} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recommended Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Services')}>
            <Text style={styles.viewAllText}>Browse All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {recommended.map(item => (
            <View key={item.id} style={styles.recommendedCardContainer}>
              <BookingCard 
                destination={item} 
                onPress={() => navigation.navigate('ServiceDetails', { id: item.id })} 
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Wellness Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wellness Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Stay Hydrated</Text>
          <Text style={styles.tipDescription}>
            Drinking enough water is essential for your skin's health and overall wellbeing. Aim for at least 8 glasses per day.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('WellnessTips')}>
            <Text style={styles.moreTipsText}>More Tips →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: colors.white,
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  viewAllText: {
    fontSize: 14,
    color: colors.coral[600],
    fontWeight: '500',
  },
  horizontalScrollContent: {
    paddingRight: 16,
  },
  bookingCardContainer: {
    width: width * 0.7,
    marginRight: 16,
  },
  recommendedCardContainer: {
    width: width * 0.6,
    marginRight: 16,
  },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    lineHeight: 20,
    marginBottom: 12,
  },
  moreTipsText: {
    fontSize: 14,
    color: colors.coral[600],
    fontWeight: '500',
    marginTop: 8,
  },
}); 