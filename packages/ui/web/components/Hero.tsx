'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  userName?: string;
  hasPendingAnalysis?: boolean;
  hasUpcomingBookings?: boolean;
  loyaltyPoints?: number;
  loyaltyTier?: string;
}

export const Hero: React.FC<HeroProps> = ({
  userName,
  hasPendingAnalysis = false,
  hasUpcomingBookings = false,
  loyaltyPoints = 0,
  loyaltyTier = 'Bronze'
}) => {
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [nextTier, setNextTier] = useState('Silver');
  const [pointsToNextTier, setPointsToNextTier] = useState(100);

  useEffect(() => {
    const getTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'morning';
      if (hour < 18) return 'afternoon';
      return 'evening';
    };

    setTimeOfDay(getTimeOfDay());
    
    // Calculate loyalty tier info
    if (loyaltyTier === 'Bronze') {
      setNextTier('Silver');
      setPointsToNextTier(100 - loyaltyPoints);
    } else if (loyaltyTier === 'Silver') {
      setNextTier('Gold');
      setPointsToNextTier(250 - loyaltyPoints);
    } else if (loyaltyTier === 'Gold') {
      setNextTier('Platinum');
      setPointsToNextTier(500 - loyaltyPoints);
    }
  }, [loyaltyPoints, loyaltyTier]);

  useEffect(() => {
    if (userName) {
      setGreeting(`Good ${timeOfDay}, ${userName}!`);
    } else {
      setGreeting('Your Wellness, Elevated');
    }
  }, [userName, timeOfDay]);

  const getPrimaryCta = () => {
    if (hasPendingAnalysis) {
      return { label: 'Continue Skin Analysis', href: '/analyze' };
    }
    return { label: 'Get Started', href: '/landing' };
  };

  return (
    <div className="relative w-full h-[85vh] max-h-[800px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/wellness-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-secondary-900/70 z-10"></div>
      </div>

      {/* Loyalty Banner */}
      {userName && loyaltyPoints > 0 && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 text-center text-sm font-medium">
          <Link href="/profile" className="hover:underline inline-flex items-center">
            You're {pointsToNextTier} points from {nextTier} Tier — View Rewards
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center leading-tight">{greeting}</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl text-center">
          Discover personalized treatments, products, and wellness routines tailored just for you.
        </p>
        
        {/* Primary CTA */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Link 
            href={getPrimaryCta().href} 
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-coral-400 to-coral-600 transition-all duration-300 group-hover:w-full"></span>
            <span className="relative z-10">{getPrimaryCta().label}</span>
          </Link>
          
          {/* Secondary CTA - only shows if user has upcoming bookings */}
          {hasUpcomingBookings && (
            <Link 
              href="/profile/appointments" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              View My Appointments
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}; 