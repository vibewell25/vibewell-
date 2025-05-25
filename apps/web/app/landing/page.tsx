'use client';

import { useEffect, useState } from 'react';
import { Hero } from '@vibewell/ui-web/components/Hero';
import { RecommendationsCarousel } from '@vibewell/ui-web/components/RecommendationsCarousel';
import { BookingTeaser } from '@vibewell/ui-web/components/BookingTeaser';
import { LiveReviews } from '@vibewell/ui-web/components/LiveReviews';
import { ContentTeaser } from '@vibewell/ui-web/components/ContentTeaser';
import { ArTryOnCard } from '@vibewell/ui-web/components/ArTryOnCard';

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  type: 'product' | 'service';
  price: number;
  slug: string;
}

export default function LandingPage() {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    userName: '',
    hasPendingAnalysis: false,
    hasUpcomingBookings: false,
    loyaltyPoints: 0,
    loyaltyTier: 'Bronze'
  });

  // Fetch user info (would normally come from auth provider or API)
  useEffect(() => {
    // Simulate API/Auth call
    setTimeout(() => {
      // For demo purposes, randomize the user state
      const randomUserState = Math.random() > 0.5;
      
      if (randomUserState) {
        setUserInfo({
          isLoggedIn: true,
          userName: 'Sarah',
          hasPendingAnalysis: Math.random() > 0.5,
          hasUpcomingBookings: Math.random() > 0.7,
          loyaltyPoints: Math.floor(Math.random() * 80),
          loyaltyTier: 'Bronze'
        });
      }
    }, 500);
  }, []);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/recommendations/for-user');
        const data = await response.json();
        setRecommendations(data.recommendations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero 
        userName={userInfo.isLoggedIn ? userInfo.userName : undefined}
        hasPendingAnalysis={userInfo.hasPendingAnalysis}
        hasUpcomingBookings={userInfo.hasUpcomingBookings}
        loyaltyPoints={userInfo.loyaltyPoints}
        loyaltyTier={userInfo.loyaltyTier}
      />
      
      {/* Recommendations Carousel */}
      <RecommendationsCarousel items={recommendations} />
      
      {/* Booking Teaser */}
      <BookingTeaser />
      
      {/* Live Reviews */}
      <LiveReviews />
      
      {/* Content Teaser */}
      <ContentTeaser />
      
      {/* AR Try-On Card */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <ArTryOnCard />
        </div>
      </section>
    </>
  );
} 