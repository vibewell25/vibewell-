'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface RecommendationsCarouselProps {
  items: RecommendationItem[];
  title?: string;
}

export const RecommendationsCarousel: React.FC<RecommendationsCarouselProps> = ({
  items = [],
  title = 'Just for You'
}) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainer.current?.offsetLeft || 0));
    setScrollLeft(scrollContainer.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainer.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <section className="py-12 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">{title}</h2>
          <Link 
            href="/recommendations" 
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
          >
            View All
            <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div 
          ref={scrollContainer}
          className="flex overflow-x-auto space-x-6 pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {items.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface RecommendationCardProps {
  item: RecommendationItem;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item }) => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const shareItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: `/${item.type}s/${item.slug}`,
      });
    }
  };

  return (
    <div 
      className="flex-shrink-0 w-[280px] snap-start bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02]"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
      onTouchStart={() => {}}
      onTouchEnd={() => {}}
    >
      <div className="relative h-[180px] w-full">
        <Image 
          src={item.image} 
          alt={item.title}
          fill
          sizes="280px"
          className="object-cover"
          priority={true}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold flex items-center">
          <svg className="w-3 h-3 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {item.rating.toFixed(1)}
        </div>
        
        {/* Quick Actions */}
        <div 
          className={`absolute top-2 right-2 flex space-x-2 transition-all duration-300 ${
            showQuickActions ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <button 
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            className="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-neutral-700 transition-colors"
          >
            {isBookmarked ? (
              <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
          
          <button 
            onClick={shareItem}
            aria-label="Share"
            className="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white text-lg mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-medium text-neutral-900 dark:text-white">${item.price.toFixed(2)}</span>
          
          <Link
            href={`/${item.type}s/${item.slug}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              item.type === 'service' 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-secondary-600 hover:bg-secondary-700 text-white'
            }`}
          >
            {item.type === 'service' ? 'Book Now' : 'Add to Cart'}
          </Link>
        </div>
      </div>
    </div>
  );
}; 