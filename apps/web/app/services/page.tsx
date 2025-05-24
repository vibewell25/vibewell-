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
  image: string;
  description?: string;
  price?: number;
  duration?: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 font-serif">
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
              className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-full transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: Service }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden" data-testid="service-card">
      <div className="h-48 relative">
        {service.image && !imageError ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-coral-500 to-teal-500 flex items-center justify-center">
            <span className="text-white font-medium text-lg">{service.name}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 card-title">
          {service.name}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
          {service.location}
        </p>
        {service.description && (
          <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
            {service.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          {service.price && (
            <span className="font-bold text-coral-600 dark:text-coral-400 card-price">
              ${service.price}
            </span>
          )}
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => alert(`Booking ${service.name} at ${service.location}`)}
          >
            Book Now
          </Button>
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