import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@vibewell/ui-core-theme';

// Button Component
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onPress,
  children,
  style,
  textStyle,
}) => {
  // Get button styles based on variant and size
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];
  
  // Get text styles based on variant and size
  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Variant styles
  primaryButton: {
    backgroundColor: colors.coral[500],
  },
  secondaryButton: {
    backgroundColor: colors.neutral[200],
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
  disabledButton: {
    backgroundColor: colors.neutral[200],
  },
  
  // Size styles
  smButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mdButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  lgButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  
  // Text styles
  text: {
    fontWeight: '500',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.neutral[900],
  },
  tertiaryText: {
    color: colors.coral[500],
  },
  dangerText: {
    color: colors.white,
  },
  disabledText: {
    color: colors.neutral[400],
  },
  
  // Text size styles
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
});

// Export Card
export * from './components/Card';

// Export AiSkinAnalysisCard
export * from './components/AiSkinAnalysisCard';

// Import and re-export the enhanced BookingCard
import { BookingCard as EnhancedBookingCard } from './components/BookingCard';
export { EnhancedBookingCard as BookingCard };

// Export ProductCard
export * from './components/ProductCard';

// Default export
export default {
  Button,
}; 