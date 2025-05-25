import { NextApiRequest, NextApiResponse } from 'next';

// Types for content items
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

// Mock data
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
  },
  {
    id: '4',
    title: 'DIY Face Masks Using Kitchen Ingredients',
    excerpt: 'Learn how to make effective face masks using simple ingredients you already have at home.',
    image: '/images/content/blog-3.jpg',
    type: 'blog',
    slug: 'diy-face-masks',
    date: 'June 10, 2023'
  },
  {
    id: '5',
    title: 'Facial Massage Techniques for Lymphatic Drainage',
    excerpt: 'Watch our expert demonstrate easy massage techniques to reduce puffiness and improve circulation.',
    image: '/images/content/video-2.jpg',
    type: 'video',
    slug: 'facial-massage-techniques',
    date: 'May 20, 2023'
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add a small delay to simulate network request
  setTimeout(() => {
    // Get params if available
    const { type, limit = 3 } = req.query;
    
    // Filter by type if specified
    let filteredContent = [...mockContent];
    if (type) {
      const types = String(type).split(',');
      filteredContent = mockContent.filter(item => types.includes(item.type));
    }
    
    // Return the content, most recent first
    res.status(200).json({
      content: filteredContent.slice(0, Number(limit)),
      total: filteredContent.length,
      challenge: mockChallenge
    });
  }, 300);
} 