'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, BookingCard } from '@vibewell/ui-web';
import { supabase, getMockServices } from '@vibewell/api/supabaseClient';

// Define the Service type
interface Service {
  id: string;
  name: string;
  location: string;
  image?: string;
  description?: string;
  price?: number;
  duration?: number;
  category?: string;
}

// Function to get image path based on service type
const getImagePath = (service: Service): string => {
  if (service.name.toLowerCase().includes('massage')) {
    return '/images/services/massage.svg';
  } else if (service.name.toLowerCase().includes('hair')) {
    return '/images/services/haircut.svg';
  } else if (service.name.toLowerCase().includes('facial')) {
    return '/images/services/facial.svg';
  } else if (service.category === 'spa') {
    return '/images/services/massage.svg';
  } else if (service.category === 'hair') {
    return '/images/services/haircut.svg';
  } else if (service.category === 'skin') {
    return '/images/services/facial.svg';
  } else {
    return '/images/services/mask.svg';
  }
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const fetchServices = async () => {
      try {
        // First try to fetch from Supabase
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) {
          console.error('Supabase error:', error.message);
          // If Supabase fails, use mock data
          setServices(getMockServices());
        } else if (data && data.length > 0) {
          setServices(data);
        } else {
          // If no data returned, use mock data
          setServices(getMockServices());
        }
      } catch (e) {
        console.error('Failed to fetch services:', e);
        // If any error occurs, use mock data
        setServices(getMockServices());
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to get gradient color based on service name
  const getGradient = (service: Service): string => {
    if (service.category === 'spa' || service.name.toLowerCase().includes('massage')) {
      return 'from-coral-400 to-coral-600';
    } else if (service.category === 'hair' || service.name.toLowerCase().includes('hair')) {
      return 'from-teal-400 to-teal-600';
    } else if (service.category === 'skin' || service.name.toLowerCase().includes('facial')) {
      return 'from-blush-400 to-blush-600';
    } else {
      return 'from-coral-400 to-teal-600';
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Discover and book the best beauty and wellness services tailored to your needs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-coral-500 text-white shadow-sm'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-coral-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                gradient={getGradient(service)}
                isMounted={isMounted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service, gradient, isMounted }: { service: Service; gradient: string, isMounted: boolean }) {
  const [imageError, setImageError] = React.useState(false);
  const imagePath = getImagePath(service);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" data-testid="service-card">
      <div className={`h-48 relative bg-gradient-to-r ${gradient}`}>
        {isMounted && !imageError && (
          <Image
            src={imagePath}
            alt={service.name}
            fill
            className="object-cover mix-blend-overlay opacity-60"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white text-center px-4">{service.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
          {service.location}
        </p>
        {service.description && (
          <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-5">
            {service.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          {service.price && (
            <span className="font-bold text-coral-600 dark:text-coral-400 text-xl">
              ${service.price}
            </span>
          )}
          <button 
            className="px-5 py-2 border-2 border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white rounded-md transition-colors font-medium"
            onClick={() => alert(`Booking ${service.name} at ${service.location}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'spa', name: 'Spa & Massage' },
  { id: 'hair', name: 'Hair Care' },
  { id: 'skin', name: 'Skin Care' },
  { id: 'nails', name: 'Nail Care' },
  { id: 'makeup', name: 'Makeup' },
]; 