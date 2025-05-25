'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@vibewell/ui-web';
import { useCart } from '../../../context/CartContext';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, we would fetch the product details based on params.id
  // For now, we'll use mock data
  const product = {
    id: params.id,
    name: 'Hydrating Facial Serum',
    description: 'A lightweight, fast-absorbing serum that delivers intense hydration and helps to improve skin texture and tone. Formulated with hyaluronic acid, vitamin C, and niacinamide to provide multiple benefits in one powerful product.',
    price: 48.99,
    rating: 4.7,
    reviewCount: 124,
    images: [
      '',
      '',
      '',
    ],
    ingredients: 'Water, Glycerin, Sodium Hyaluronate, Niacinamide, Ascorbic Acid, Tocopherol, Panthenol, Allantoin, Xanthan Gum, Citric Acid, Phenoxyethanol, Ethylhexylglycerin',
    howToUse: 'Apply 2-3 drops to clean, dry skin morning and night. Gently pat into skin, avoiding the eye area. Follow with moisturizer.',
    benefits: [
      'Deeply hydrates and plumps skin',
      'Helps reduce the appearance of fine lines',
      'Improves skin texture and tone',
      'Brightens dull complexion',
      'Suitable for all skin types',
    ],
    category: 'Skin Care',
    brand: 'VibeWell Essentials',
    image: '/images/products/serum.jpg'
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Add multiple items based on quantity
    for (let i = 1; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  return (
    <div className="py-12">
      <div>
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-coral-500">
            Home
          </Link>
          <span className="mx-2 text-neutral-500">/</span>
          <Link href="/products" className="text-neutral-600 dark:text-neutral-400 hover:text-coral-500">
            Products
          </Link>
          <span className="mx-2 text-neutral-500">/</span>
          <span className="text-neutral-900 dark:text-neutral-200">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-coral-400 to-teal-500 flex items-center justify-center">
              {product.images[selectedImage] ? (
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="text-white text-2xl font-medium p-8 text-center">
                      {product.name}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden relative bg-gradient-to-br from-coral-400/80 to-teal-500/80 ${
                    selectedImage === index ? 'ring-2 ring-coral-500' : 'ring-1 ring-neutral-200 dark:ring-neutral-700'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-white">
                      {index + 1}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex text-coral-500">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-30'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-neutral-600 dark:text-neutral-400 text-sm">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex space-x-4">
                <div className="w-20 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md flex items-center">
                  <button 
                    className="w-12 h-12 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button 
                    className="w-12 h-12 flex items-center justify-center text-neutral-600 dark:text-neutral-400"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <button className="w-12 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                  ♡
                </button>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Key Benefits
                </h2>
                <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  How to Use
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300">{product.howToUse}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  Ingredients
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300">{product.ingredients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 