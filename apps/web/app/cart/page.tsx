'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">Your Cart</h1>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8">
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
            Your cart is empty.
          </p>
          <Link href="/products" className="inline-block px-6 py-3 bg-coral-500 text-white rounded-md hover:bg-coral-600 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">Your Cart</h1>
      
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Cart Items */}
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex flex-col md:flex-row items-start md:items-center">
                {/* Product Image */}
                <div className="w-24 h-24 relative flex-shrink-0 mb-4 md:mb-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-md"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-grow md:ml-6">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{item.name}</h3>
                  <p className="text-coral-600 dark:text-coral-400 font-medium mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center mt-4 md:mt-0">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-300 dark:border-neutral-600 rounded-l-md text-neutral-600 dark:text-neutral-400"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center border-t border-b border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-neutral-300 dark:border-neutral-600 rounded-r-md text-neutral-600 dark:text-neutral-400"
                  >
                    +
                  </button>
                </div>
                
                {/* Price */}
                <div className="min-w-[100px] text-right mt-4 md:mt-0 md:ml-6">
                  <p className="font-medium text-neutral-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-neutral-500 hover:text-coral-500 dark:text-neutral-400 dark:hover:text-coral-400 mt-4 md:mt-0"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6">
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
            <span className="font-medium text-neutral-900 dark:text-white">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
            <span className="font-medium text-neutral-900 dark:text-white">Free</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-neutral-600 dark:text-neutral-400">Tax</span>
            <span className="font-medium text-neutral-900 dark:text-white">${(totalPrice * 0.08).toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-700 pt-4 mb-6">
            <span className="text-lg font-bold text-neutral-900 dark:text-white">Total</span>
            <span className="text-lg font-bold text-coral-600 dark:text-coral-400">
              ${(totalPrice + (totalPrice * 0.08)).toFixed(2)}
            </span>
          </div>
          
          <button className="w-full py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 