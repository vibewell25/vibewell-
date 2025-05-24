import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from './Card';
import { colors } from '@vibewell/ui-core-theme';

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
}

export const BookingCard: React.FC<BookingCardProps> = ({
  destination,
  onPress,
  onSave,
}) => {
  const { name, location, image, rating } = destination;
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Card style={styles.card}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.image} 
            resizeMode="cover"
          />
          
          {/* Rating badge */}
          {rating && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {rating.toFixed(1)}</Text>
            </View>
          )}
          
          {/* Save button */}
          {onSave && (
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={onSave}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Text style={styles.saveButtonText}>♡</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{location}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  saveButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: colors.coral[500],
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.neutral[600],
  },
}); 