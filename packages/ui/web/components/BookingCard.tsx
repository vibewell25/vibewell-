'use client';

import React from 'react';
import { Card } from './Card';

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
  className?: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  destination,
  onPress,
  onSave,
  className = '',
}) => {
  const { name, location, image, rating } = destination;
  
  return (
    <Card 
      className={`overflow-hidden ${className}`}
      onClick={onPress}
      data-test-id="booking-card"
    >
      <div className="relative">
        {/* Image */}
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        
        {/* Save button */}
        {onSave && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-neutral-900 shadow-sm hover:bg-white"
            aria-label="Save to favorites"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        )}
        
        {/* Rating */}
        {rating && (
          <div className="absolute bottom-2 left-2 flex items-center rounded-full bg-white/80 px-2 py-1 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB400" stroke="#FFB400" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-neutral-900">{name}</h3>
        <p className="text-neutral-600">{location}</p>
      </div>
    </Card>
  );
}; 