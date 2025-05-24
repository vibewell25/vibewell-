import { AiSkinAnalysisCard, BookingCard, ProductCard } from '@vibewell/ui-web';
import Link from 'next/link';

export default function HomePage() {
  const upcoming = [
    { id: 'a1', name: 'Facial Treatment', location: 'Paris Spa', image: '/images/facial.jpg', date: '2023-08-15', time: '14:00' },
    { id: 'b2', name: 'Yoga Retreat', location: 'Bali Resort', image: '/images/yoga.jpg', date: '2023-08-20', time: '09:30' },
    { id: 'c3', name: 'Massage Therapy', location: 'Zen Wellness', image: '/images/massage.jpg', date: '2023-08-25', time: '16:15' },
  ];

  const recommended = [
    { id: 'd4', name: 'Hot Stone Massage', location: 'Tranquil Spa', image: '/images/hot-stone.jpg', rating: 4.8 },
    { id: 'e5', name: 'Deep Tissue Massage', location: 'Relief Center', image: '/images/deep-tissue.jpg', rating: 4.7 },
    { id: 'f6', name: 'Aromatherapy', location: 'Scent Haven', image: '/images/aromatherapy.jpg', rating: 4.9 },
    { id: 'g7', name: 'Facial Rejuvenation', location: 'Glow Studio', image: '/images/facial-rejuv.jpg', rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Welcome Banner */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Welcome back, User</h1>
          <p className="text-neutral-600">Your wellness journey continues</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* AI Skin Analysis Card */}
        <div className="mb-8">
          <AiSkinAnalysisCard userId="demo-user" className="shadow-sm" />
        </div>
        
        {/* Upcoming Appointments */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-900">Your Upcoming Appointments</h2>
            <Link href="/appointments" className="text-coral-600 hover:text-coral-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-2 px-2">
            {upcoming.map(item => (
              <div key={item.id} className="flex-shrink-0 w-[320px]">
                <BookingCard 
                  destination={item} 
                  className="h-full shadow-sm hover:shadow-md transition-shadow"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommended Services */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-900">Recommended for You</h2>
            <Link href="/services" className="text-coral-600 hover:text-coral-700 text-sm font-medium">
              Browse All
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-2 px-2">
            {recommended.map(item => (
              <div key={item.id} className="flex-shrink-0 w-[280px]">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full">
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-cover w-full h-40"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-neutral-900">{item.name}</h3>
                    <p className="text-sm text-neutral-600">{item.location}</p>
                    <div className="flex items-center mt-2">
                      <div className="text-amber-500 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'fill-none'}`} 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-neutral-700">{item.rating}</span>
                    </div>
                    <button className="mt-3 w-full py-2 bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium rounded transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Wellness Tips */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Wellness Tips</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-lg text-neutral-900 mb-2">Stay Hydrated</h3>
            <p className="text-neutral-600">Drinking enough water is essential for your skin's health and overall wellbeing. Aim for at least 8 glasses per day.</p>
            <Link href="/wellness-tips" className="inline-block mt-4 text-coral-600 hover:text-coral-700 text-sm font-medium">
              More Tips →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 