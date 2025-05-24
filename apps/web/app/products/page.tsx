'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductCard, Product } from '@vibewell/ui-web';

export default function ProductsPage() {
  // Mock products data
  const products: Product[] = [
    {
      id: 'serum-001',
      name: 'Hydrating Serum',
      price: 49.00,
      description: 'Intense hydration for all skin types with hyaluronic acid.',
      rating: 4.5,
      isNew: true,
      image: '/images/services/serum.jpg'
    },
    {
      id: 'moisturizer-001',
      name: 'Rejuvenating Moisturizer',
      price: 32.00,
      description: 'Deeply nourishing daily moisturizer for a radiant glow.',
      rating: 4.7,
      image: '/images/services/moisturizer.jpg'
    },
    {
      id: 'cleanser-001',
      name: 'Facial Cleanser',
      price: 28.00,
      description: 'Gentle yet effective cleanser that removes impurities.',
      rating: 4.3,
      image: '/images/services/cleanser.jpg'
    },
    {
      id: 'mask-001',
      name: 'Clarifying Mask',
      price: 34.99,
      description: 'Weekly treatment to purify and refresh your skin.',
      rating: 4.8,
      isNew: true,
      image: '/images/services/mask.jpg'
    },
    {
      id: 'spf-001',
      name: 'Daily SPF 50',
      price: 25.99,
      description: 'Lightweight sun protection that wears beautifully under makeup.',
      rating: 4.6,
      image: '/images/services/spf.jpg'
    },
    {
      id: 'toner-001',
      name: 'Balancing Toner',
      price: 22.00,
      description: "Alcohol-free toner that restores your skin's natural pH.",
      rating: 4.4,
      image: '/images/services/toner.jpg'
    }
  ];

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: string) => {
    alert(`Added ${productId} to cart`);
  };

  return (
    <div className="py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
          Shop Products
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          High-quality skincare products formulated for effective results
        </p>
      </div>

      {/* Product Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button className="px-4 py-2 bg-coral-500 text-white rounded-full text-sm font-medium">
          All Products
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700">
          Serums
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700">
          Moisturizers
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700">
          Cleansers
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700">
          Treatments
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onFavoriteToggle={() => toggleFavorite(product.id)}
            onAddToCart={() => addToCart(product.id)}
            onClick={() => alert(`Viewing details for ${product.name}`)}
          />
        ))}
      </div>
    </div>
  );
} 