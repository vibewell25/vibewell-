import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { BookingCard } from '@vibewell/ui-native';
import { colors } from '@vibewell/ui-core-theme';

export default function LandingScreen({ navigation }: { navigation: any }) {
  const destinations = [
    { id: '1', name: 'Spa Retreat', location: 'Bali', image: 'https://example.com/spa.jpg', rating: 4.8 },
    { id: '2', name: 'Wellness Resort', location: 'Thailand', image: 'https://example.com/resort.jpg', rating: 4.6 },
    { id: '3', name: 'City Spa', location: 'London', image: 'https://example.com/cityspa.jpg', rating: 4.7 },
    { id: '4', name: 'Mountain Retreat', location: 'Switzerland', image: 'https://example.com/mountain.jpg', rating: 4.9 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://example.com/hero-image.jpg' }}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Your Wellness Journey Begins Here</Text>
          <Text style={styles.heroSubtitle}>Discover personalized beauty and wellness experiences</Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Services')}
          >
            <Text style={styles.heroButtonText}>Explore Services</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Popular Destinations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {destinations.map(dest => (
            <View key={dest.id} style={styles.cardContainer}>
              <BookingCard
                destination={dest}
                onPress={() => navigation.navigate('ServiceDetails', { id: dest.id })}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose VibeWell</Text>
        <View style={styles.featureCard}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>♥️</Text>
          </View>
          <Text style={styles.featureTitle}>Personalized Experience</Text>
          <Text style={styles.featureDescription}>Tailored recommendations based on your preferences and needs.</Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>🛡️</Text>
          </View>
          <Text style={styles.featureTitle}>Verified Providers</Text>
          <Text style={styles.featureDescription}>All our wellness partners are thoroughly vetted for quality.</Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIconContainer}>
            <Text style={styles.featureIcon}>⏱️</Text>
          </View>
          <Text style={styles.featureTitle}>Instant Booking</Text>
          <Text style={styles.featureDescription}>Book appointments with ease and get instant confirmations.</Text>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to start your wellness journey?</Text>
        <Text style={styles.ctaDescription}>Join thousands of users who have transformed their wellness routine with VibeWell.</Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.ctaButtonText}>Sign Up Now</Text>
        </TouchableOpacity>
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
  heroImage: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageStyle: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: colors.coral[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  heroButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 16,
  },
  horizontalScrollContent: {
    paddingRight: 16,
  },
  cardContainer: {
    width: width * 0.75,
    marginRight: 16,
  },
  featureCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.coral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    lineHeight: 20,
  },
  ctaSection: {
    margin: 24,
    backgroundColor: colors.coral[50],
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: colors.coral[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 