'use client';

import React, { ReactNode } from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  children,
  className = '',
  onClick,
}) => {
  const cardClasses = `
    bg-white dark:bg-neutral-800
    rounded-lg
    shadow-md
    overflow-hidden
    transition-transform duration-200
    border border-neutral-200 dark:border-neutral-700
    ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {image ? (
        <div className="h-48 w-full">
          <div 
            className="h-full w-full bg-center bg-cover" 
            style={image ? { backgroundImage: `url(${image})` } : undefined}
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-coral-400 to-teal-500 flex items-center justify-center">
          {title && <div className="text-white text-xl font-medium p-4 text-center">{title}</div>}
        </div>
      )}
      
      <div className="p-4">
        {title && (
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
        
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export const BookingCard: React.FC<{
  destination: {
    id: string;
    name: string;
    location: string;
    image: string;
    rating?: number;
  };
  onPress?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}> = ({ destination, onPress, onSave, isSaved = false }) => {
  return (
    <Card
      image={destination.image}
      title={destination.name}
      subtitle={destination.location}
      onClick={onPress}
      className="relative"
    >
      <div className="flex justify-between items-center mt-2">
        {destination.rating && (
          <div className="flex items-center">
            <span className="text-coral-500">★</span>
            <span className="ml-1 text-sm">{destination.rating.toFixed(1)}</span>
          </div>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
          className="text-neutral-400 hover:text-coral-500"
          aria-label={isSaved ? 'Remove from saved' : 'Save to favorites'}
        >
          {isSaved ? (
            <span className="text-coral-500">♥</span>
          ) : (
            <span>♡</span>
          )}
        </button>
      </div>
    </Card>
  );
};

// Other card variants can be exported here
export * from './ProductCard';

export default {
  Card,
  BookingCard,
}; 