import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@vibewell/ui-core-theme';

export interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  children,
  style,
  onPress,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        {title && (
          <Text style={styles.title}>
            {title}
          </Text>
        )}
        
        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
        
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </View>
    </CardComponent>
  );
};

export interface BookingDestination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating?: number;
}

export interface BookingCardProps {
  destination: BookingDestination;
  onPress?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  destination,
  onPress,
  onSave,
  isSaved = false,
}) => {
  return (
    <Card
      title={destination.name}
      subtitle={destination.location}
      image={destination.image}
      onPress={onPress}
      style={styles.bookingCard}
    >
      <View style={styles.bookingCardFooter}>
        {destination.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>★</Text>
            <Text style={styles.rating}>{destination.rating.toFixed(1)}</Text>
          </View>
        )}
        
        <TouchableOpacity
          onPress={onSave}
          style={styles.saveButton}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={[styles.saveIcon, isSaved && styles.savedIcon]}>
            {isSaved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 4,
  },
  childrenContainer: {
    marginTop: 12,
  },
  
  // BookingCard specific styles
  bookingCard: {
    marginBottom: 16,
  },
  bookingCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: colors.coral[500],
    fontSize: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.neutral[700],
  },
  saveButton: {
    padding: 4,
  },
  saveIcon: {
    fontSize: 20,
    color: colors.neutral[400],
  },
  savedIcon: {
    color: colors.coral[500],
  },
});

export default {
  Card,
  BookingCard,
}; 