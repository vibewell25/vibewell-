import { createClient } from '@supabase/supabase-js';
// Create a mock client if environment variables are not available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-anon-key';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Mock data functions for development
export const getMockServices = () => {
    return [
        {
            id: '1',
            name: 'Deep Tissue Massage',
            location: 'Serenity Spa',
            image: '/images/services/massage.jpg',
            description: 'A therapeutic massage that focuses on realigning deeper layers of muscles.',
            price: 85,
            duration: 60
        },
        {
            id: '2',
            name: 'Haircut & Styling',
            location: 'Glow Beauty Salon',
            image: '/images/services/haircut.jpg',
            description: 'Professional haircut and styling to refresh your look.',
            price: 55,
            duration: 45
        },
        {
            id: '3',
            name: 'Facial Treatment',
            location: 'Pure Skin Clinic',
            image: '/images/services/facial.jpg',
            description: 'Revitalizing facial treatment to cleanse and rejuvenate your skin.',
            price: 75,
            duration: 50
        }
    ];
};
//# sourceMappingURL=supabaseClient.js.map