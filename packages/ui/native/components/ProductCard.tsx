import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from './Card';
import { colors } from '@vibewell/ui-core-theme';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  isNew?: boolean;
  rating?: number;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onFavoriteToggle?: () => void;
  isFavorite?: boolean;
  currency?: string;
  style?: any;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onFavoriteToggle,
  isFavorite = false,
  currency = '$',
  style,
  onPress,
}) => {
  return (
    <Card
      title={product.name}
      subtitle={`${currency}${product.price.toFixed(2)}`}
      image={product.image}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {product.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
      
      <View style={styles.favoriteButton}>
        <TouchableOpacity
          onPress={onFavoriteToggle}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoritedIcon]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>★</Text>
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          </View>
        )}
        
        {product.description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}
        
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={onAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.coral[500],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  newBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: 18,
    color: colors.neutral[400],
  },
  favoritedIcon: {
    color: colors.coral[500],
  },
  footer: {
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  description: {
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: colors.coral[500],
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 14,
  },
});

export default ProductCard; 