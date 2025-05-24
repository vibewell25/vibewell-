'use client';

import React from 'react';
import { Card, CardProps } from './Card';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  isNew?: boolean;
  rating?: number;
}

export interface ProductCardProps extends Omit<CardProps, 'title' | 'subtitle' | 'image'> {
  product: Product;
  onAddToCart?: () => void;
  onFavoriteToggle?: () => void;
  isFavorite?: boolean;
  currency?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onFavoriteToggle,
  isFavorite = false,
  currency = '$',
  className = '',
  onClick,
  ...props
}) => {
  const imageUrl = product.image || '';
  
  return (
    <Card
      title={product.name}
      subtitle={`${currency}${product.price.toFixed(2)}`}
      image={imageUrl}
      onClick={onClick}
      className={`relative ${className}`}
      {...props}
    >
      {product.isNew && (
        <div className="absolute top-2 left-2 bg-coral-500 text-white text-xs px-2 py-1 rounded-full z-10">
          New
        </div>
      )}
      
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.();
          }}
          className="bg-white dark:bg-neutral-800 rounded-full p-1.5 shadow-sm text-neutral-400 hover:text-coral-500"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <span className="text-coral-500">♥</span>
          ) : (
            <span>♡</span>
          )}
        </button>
      </div>
      
      <div className="mt-2">
        {product.rating && (
          <div className="flex items-center mb-2">
            <span className="text-coral-500">★</span>
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>
        )}
        
        {product.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
            {product.description}
          </p>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="w-full bg-coral-500 hover:bg-coral-600 text-white rounded-md py-2 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductCard; 