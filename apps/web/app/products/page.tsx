'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@vibewell/types';
import { useCart } from '../../context/CartContext';

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
      image: '/images/products/serum.jpg'
    },
    {
      id: 'moisturizer-001',
      name: 'Rejuvenating Moisturizer',
      price: 32.00,
      description: 'Deeply nourishing daily moisturizer for a radiant glow.',
      rating: 4.7,
      image: '/images/products/moisturizer.jpg'
    },
    {
      id: 'cleanser-001',
      name: 'Facial Cleanser',
      price: 28.00,
      description: 'Gentle yet effective cleanser that removes impurities.',
      rating: 4.3,
      image: '/images/products/cleanser.jpg'
    },
    {
      id: 'mask-001',
      name: 'Clarifying Mask',
      price: 34.99,
      description: 'Weekly treatment to purify and refresh your skin.',
      rating: 4.8,
      isNew: true,
      image: '/images/products/eye-cream.jpg'
    },
    {
      id: 'spf-001',
      name: 'Daily SPF 50',
      price: 25.99,
      description: 'Lightweight sun protection that wears beautifully under makeup.',
      rating: 4.6,
      image: '/images/products/serum.jpg'
    },
    {
      id: 'toner-001',
      name: 'Balancing Toner',
      price: 22.00,
      description: "Alcohol-free toner that restores your skin's natural pH.",
      rating: 4.4,
      image: '/images/products/moisturizer.jpg'
    }
  ];

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || ''
    });
  };

  return (
    <div className="py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
          Shop Products
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          High-quality skincare products formulated for effective results
        </p>
      </div>

      {/* Product Filters */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button className="px-4 py-2 bg-coral-500 text-white rounded-full text-sm font-medium shadow-sm hover:bg-coral-600 transition-colors">
          All Products
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
          Serums
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
          Moisturizers
        </button>
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium border border-neutral-200 dark:border-neutral-700 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
          Cleansers
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square relative overflow-hidden">
                {product.isNew && (
                  <span className="absolute top-3 left-3 z-10 bg-coral-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                
                <div className="absolute top-3 right-3 z-10">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                    className="bg-white dark:bg-neutral-700 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
                  >
                    {favorites.includes(product.id) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-coral-500">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-5.201-3.48 10.967 10.967 0 01-2.987-7.596c0-3.905 2.755-6.503 5.619-6.503 1.656 0 3.112.795 4.121 2.053 1.01-1.258 2.465-2.053 4.12-2.053 2.864 0 5.62 2.598 5.62 6.503a10.967 10.967 0 01-2.987 7.596 15.247 15.247 0 01-5.201 3.48l-.022.012-.007.003-.001.001a.998.998 0 01-.992 0l-.001-.001z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-500 dark:text-neutral-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    )}
                  </button>
                </div>
                {isMounted && product.image && (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                )}
                {!isMounted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-medium">{product.name}</span>
                  </div>
                )}
              </div>
              </Link>
              
              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{product.name}</h3>
                  <span className="font-bold text-coral-600 dark:text-coral-400">${product.price.toFixed(2)}</span>
                </div>
                
                {/* Star Rating */}
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-coral-500' : 'text-neutral-300 dark:text-neutral-600'}`}>★</span>
                  ))}
                  <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">{product.rating.toFixed(1)}</span>
                </div>
                
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                  {product.description}
                </p>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 