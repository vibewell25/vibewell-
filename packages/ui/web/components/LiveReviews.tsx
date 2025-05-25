'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  content: string;
  date: string;
  service: string;
}

interface LiveReviewsProps {
  initialReviews?: Review[];
}

export const LiveReviews: React.FC<LiveReviewsProps> = ({
  initialReviews = []
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState<boolean>(initialReviews.length === 0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (initialReviews.length > 0) {
        setReviews(initialReviews);
        return;
      }

      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/api/reviews/latest?limit=3');
        // const data = await response.json();
        
        // Mock data for demo
        setTimeout(() => {
          const mockReviews: Review[] = [
            {
              id: '1',
              customerName: 'Emily Johnson',
              customerAvatar: '/images/avatars/avatar-1.jpg',
              rating: 5,
              content: 'The facial treatment was absolutely incredible! My skin feels so refreshed and the staff was extremely professional.',
              date: '2 days ago',
              service: 'Hydrating Facial'
            },
            {
              id: '2',
              customerName: 'Michael Chen',
              customerAvatar: '/images/avatars/avatar-2.jpg',
              rating: 4.5,
              content: 'The massage therapy helped me so much with my back pain. The therapist was knowledgeable and attentive to my needs.',
              date: '1 week ago',
              service: 'Deep Tissue Massage'
            },
            {
              id: '3',
              customerName: 'Sophia Rodriguez',
              customerAvatar: '/images/avatars/avatar-3.jpg',
              rating: 4.8,
              content: 'I love their product recommendations! The personalized skincare routine has made such a difference for my sensitive skin.',
              date: '3 days ago',
              service: 'Skin Consultation'
            }
          ];
          setReviews(mockReviews);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [initialReviews]);

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg key={i} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <svg key={i} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else {
            return (
              <svg key={i} className="w-4 h-4 text-neutral-300 dark:text-neutral-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">What Our Clients Say</h2>
            <Link 
              href="/reviews" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
            >
              Read all reviews
              <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div 
                  key={review.id}
                  className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02]"
                  aria-label={`Review by ${review.customerName}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image 
                        src={review.customerAvatar}
                        alt={review.customerName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">{review.customerName}</h3>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-neutral-700 dark:text-neutral-300 line-clamp-3">{review.content}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-500">
                    <span>{review.service}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 