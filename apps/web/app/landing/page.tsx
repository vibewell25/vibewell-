import { BookingCard, ProductCard } from '@vibewell/ui-web';
import Link from 'next/link';

export default function LandingPage() {
  const sampleDestinations = [
    { id: '1', name: 'Spa Retreat', location: 'Bali', image: '/images/spa.jpg', rating: 4.8 },
    { id: '2', name: 'Wellness Resort', location: 'Thailand', image: '/images/resort.jpg', rating: 4.6 },
    { id: '3', name: 'City Spa', location: 'London', image: '/images/cityspa.jpg', rating: 4.7 },
    { id: '4', name: 'Mountain Retreat', location: 'Switzerland', image: '/images/mountain.jpg', rating: 4.9 },
    { id: '5', name: 'Beach Wellness', location: 'Maldives', image: '/images/beach.jpg', rating: 4.8 },
  ];
  
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-image.jpg)' }}>
        <div className="absolute inset-0 bg-neutral-900/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-5xl font-bold mb-4 text-center">Your Wellness Journey Begins Here</h1>
          <p className="text-xl mb-8 max-w-2xl text-center">Discover personalized beauty and wellness experiences tailored just for you</p>
          <Link 
            href="/services" 
            className="bg-coral-500 hover:bg-coral-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-12 px-8 bg-neutral-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-8">Popular Destinations</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-2 px-2">
            {sampleDestinations.map(dest => (
              <div key={dest.id} className="flex-shrink-0 w-[300px]">
                <BookingCard destination={dest} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-8 text-center">Why Choose VibeWell</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Personalized Experience</h3>
              <p className="text-neutral-600">Tailored recommendations based on your preferences and needs.</p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Verified Providers</h3>
              <p className="text-neutral-600">All our wellness partners are thoroughly vetted for quality.</p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Instant Booking</h3>
              <p className="text-neutral-600">Book appointments with ease and get instant confirmations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-8 bg-coral-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">Ready to start your wellness journey?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">Join thousands of users who have transformed their wellness routine with VibeWell.</p>
          <Link 
            href="/signup" 
            className="bg-coral-500 hover:bg-coral-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </main>
  );
} 