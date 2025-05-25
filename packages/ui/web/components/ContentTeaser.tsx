'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  type: 'blog' | 'video';
  slug: string;
  date: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  participants: number;
  daysRemaining: number;
  slug: string;
}

interface ContentTeaserProps {
  initialContent?: ContentItem[];
  featuredChallenge?: Challenge;
}

export const ContentTeaser: React.FC<ContentTeaserProps> = ({
  initialContent = [],
  featuredChallenge
}) => {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [challenge, setChallenge] = useState<Challenge | undefined>(featuredChallenge);
  const [loading, setLoading] = useState<boolean>(initialContent.length === 0);

  useEffect(() => {
    const fetchContent = async () => {
      if (initialContent.length > 0) {
        setContent(initialContent);
        return;
      }

      setLoading(true);
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/api/content/latest?type=blog,video&limit=3');
        // const data = await response.json();
        
        // Mock data for demo
        setTimeout(() => {
          const mockContent: ContentItem[] = [
            {
              id: '1',
              title: 'The Science Behind Our New Vitamin C Serum',
              excerpt: 'Learn how our revolutionary formula combines stability and potency for maximum results.',
              image: '/images/content/blog-1.jpg',
              type: 'blog',
              slug: 'science-vitamin-c-serum',
              date: 'June 15, 2023'
            },
            {
              id: '2',
              title: 'Morning Skincare Routine for Dry Skin',
              excerpt: 'Watch this step-by-step guide to create the perfect morning routine for dry or dehydrated skin.',
              image: '/images/content/video-1.jpg',
              type: 'video',
              slug: 'morning-skincare-routine-dry-skin',
              date: 'May 28, 2023'
            },
            {
              id: '3',
              title: 'How Stress Affects Your Skin - And What To Do About It',
              excerpt: 'Discover the connection between stress and skin conditions, plus our expert tips for management.',
              image: '/images/content/blog-2.jpg',
              type: 'blog',
              slug: 'stress-skin-connection',
              date: 'June 3, 2023'
            }
          ];
          
          const mockChallenge: Challenge = {
            id: '1',
            title: '30-Day Glow Challenge',
            description: 'Join our community challenge for radiant skin. Follow our daily regimen and track your progress!',
            image: '/images/content/challenge.jpg',
            participants: 3240,
            daysRemaining: 22,
            slug: '30-day-glow-challenge'
          };
          
          setContent(mockContent);
          setChallenge(mockChallenge);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching content:', error);
        setLoading(false);
      }
    };

    fetchContent();
  }, [initialContent]);

  return (
    <section className="py-16 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Wellness Resources</h2>
            <Link 
              href="/resources" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
            >
              View all resources
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Featured Challenge Card */}
              {challenge && (
                <div className="lg:col-span-1 row-span-2 bg-gradient-to-br from-secondary-500 to-secondary-700 text-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src={challenge.image} 
                      alt={challenge.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <p className="text-white/90 mb-4 text-sm">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/80">Participants</span>
                        <span className="font-semibold">{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-white/80">Days Left</span>
                        <span className="font-semibold">{challenge.daysRemaining}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/challenges/${challenge.slug}`}
                      className="block w-full bg-white text-secondary-600 hover:bg-secondary-50 font-medium py-2 rounded-md text-center transition-colors"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Content Grid */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative h-48">
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      
                      {/* Content type badge */}
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                        {item.type === 'blog' ? (
                          <span className="text-primary-600 dark:text-primary-400">Blog Post</span>
                        ) : (
                          <span className="text-red-500 dark:text-red-400">Video</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-neutral-900 dark:text-white text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">{item.date}</span>
                        <Link 
                          href={`/${item.type === 'blog' ? 'blog' : 'videos'}/${item.slug}`}
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 