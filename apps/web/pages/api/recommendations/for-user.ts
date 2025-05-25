import { NextApiRequest, NextApiResponse } from 'next';

// Types for recommendation items
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

// Mock data
const mockRecommendations: RecommendationItem[] = [
  {
    id: '1',
    title: 'Hydrating Facial Treatment',
    description: 'Restore moisture and glow with our premium hydrating facial.',
    image: '/images/services/hydrating-facial.jpg',
    rating: 4.9,
    type: 'service',
    price: 89.99,
    slug: 'hydrating-facial'
  },
  {
    id: '2',
    title: 'Vitamin C Serum',
    description: 'Brighten and protect your skin with our advanced antioxidant formula.',
    image: '/images/products/vitamin-c-serum.jpg',
    rating: 4.7,
    type: 'product',
    price: 49.99,
    slug: 'vitamin-c-serum'
  },
  {
    id: '3',
    title: 'Deep Tissue Massage',
    description: 'Release tension and improve circulation with targeted pressure.',
    image: '/images/services/deep-tissue.jpg',
    rating: 4.8,
    type: 'service',
    price: 110.00,
    slug: 'deep-tissue-massage'
  },
  {
    id: '4',
    title: 'Niacinamide Moisturizer',
    description: 'Balance oil production and reduce pores with this lightweight formula.',
    image: '/images/products/niacinamide-moisturizer.jpg',
    rating: 4.6,
    type: 'product',
    price: 38.99,
    slug: 'niacinamide-moisturizer'
  },
  {
    id: '5',
    title: 'Customized Skin Analysis',
    description: 'Get personalized skincare recommendations with our in-depth analysis.',
    image: '/images/services/skin-analysis.jpg',
    rating: 5.0,
    type: 'service',
    price: 75.00,
    slug: 'customized-skin-analysis'
  },
  {
    id: '6',
    title: 'Hyaluronic Acid Serum',
    description: 'Deeply hydrate and plump skin with this powerful moisture-binding serum.',
    image: '/images/products/hyaluronic-acid.jpg',
    rating: 4.8,
    type: 'product',
    price: 42.99,
    slug: 'hyaluronic-acid-serum'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add a small delay to simulate network request
  setTimeout(() => {
    // Randomize the order slightly to simulate personalization
    const shuffled = [...mockRecommendations].sort(() => 0.5 - Math.random());
    
    // Get user-specific params if available
    const { userId, limit = 6 } = req.query;
    
    // Return the recommendations
    res.status(200).json({
      recommendations: shuffled.slice(0, Number(limit)),
      userId: userId || null
    });
  }, 300);
} 