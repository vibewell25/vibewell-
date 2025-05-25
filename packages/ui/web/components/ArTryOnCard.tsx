'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArTryOnCardProps {
  imageUrl?: string;
  animationUrl?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  isAnimated?: boolean;
}

export const ArTryOnCard: React.FC<ArTryOnCardProps> = ({
  imageUrl = '/images/ar-tryon-preview.jpg',
  animationUrl = '/videos/ar-tryon.mp4',
  title = 'Try on makeup virtually',
  description = 'See how our products look on you before you buy with our state-of-the-art AR technology.',
  ctaLabel = 'Learn More',
  ctaLink = '/virtual-try-on',
  isAnimated = true
}) => {
  return (
    <div className="relative w-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8 md:order-1">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">{title}</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">{description}</p>
          
          <div className="flex gap-3">
            <Link 
              href={ctaLink}
              className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-5 rounded-md transition-all duration-300 hover:shadow-md"
            >
              {ctaLabel}
            </Link>
            
            <Link
              href="/products/makeup"
              className="inline-flex items-center justify-center bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-600 font-medium py-2 px-5 rounded-md transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-600"
            >
              Browse Products
            </Link>
          </div>
          
          <div className="mt-6 flex items-center">
            <span className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-1 rounded-full mr-2">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              New
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Works on mobile & desktop</span>
          </div>
        </div>
        
        <div className="relative h-60 md:h-full md:order-2 overflow-hidden">
          {isAnimated ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={imageUrl}
            >
              <source src={animationUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={imageUrl}
              alt="AR Try-On Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent dark:from-neutral-800/60"></div>
          
          {/* AR Icon */}
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}; 