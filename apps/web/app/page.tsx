'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@vibewell/ui-web';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-coral-500 to-teal-600">
          <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 text-white">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Wellness, Elevated
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Book treatments, discover products, and connect with a community for all things beauty & wellness.
            </p>
            <Link href="/analyze">
              <button className="button-primary px-6 py-3 text-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Analyze Your Skin */}
            <div className="custom-card">
              <div className="card-placeholder gradient-coral">
                <span>Skin Analysis</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Analyze Your Skin</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">Get personalized recommendations</p>
                <Link href="/analyze">
                  <button className="button-primary px-4 py-2">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Shop Products */}
            <div className="custom-card">
              <div className="card-placeholder gradient-teal">
                <span>Products</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Shop Products</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">Discover skincare essentials</p>
                <Link href="/products">
                  <button className="button-primary px-4 py-2">
                    Browse
                  </button>
                </Link>
              </div>
            </div>

            {/* Plan Treatments */}
            <div className="custom-card">
              <div className="card-placeholder gradient-blush">
                <span>Treatments</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Plan Treatments</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">Book your next appointment</p>
                <Link href="/services">
                  <button className="button-primary px-4 py-2">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="custom-card relative">
                  <div className="card-placeholder gradient-coral">
                    <span>{product.name}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">${product.price.toFixed(2)}</p>
                    
                    {product.rating && (
                      <div className="flex items-center my-2">
                        <span className="text-coral-500">★</span>
                        <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    
                    <button className="button-primary w-full py-2 text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredProducts = [
  {
    id: '1',
    name: 'Hydrating Serum',
    price: 49,
    description: 'Intense hydration for all skin types',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Rejuvenating Moisturizer',
    price: 32,
    description: 'Deeply nourishing daily moisturizer',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Facial Cleanser',
    price: 24,
    description: 'Gentle yet effective cleansing',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Soothing Eye Cream',
    price: 19,
    description: 'Reduces dark circles and puffiness',
    rating: 4.3,
  },
]; 