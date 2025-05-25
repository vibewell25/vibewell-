import { NextApiRequest, NextApiResponse } from 'next';

// Types for review items
interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  content: string;
  date: string;
  service: string;
}

// Mock data
const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Emily Johnson',
    customerAvatar: '/images/avatars/avatar-1.jpg',
    rating: 5,
    content: 'The facial treatment was absolutely incredible! My skin feels so refreshed and the staff was extremely professional. I will definitely be back for more treatments.',
    date: '2 days ago',
    service: 'Hydrating Facial'
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    customerAvatar: '/images/avatars/avatar-2.jpg',
    rating: 4.5,
    content: 'The massage therapy helped me so much with my back pain. The therapist was knowledgeable and attentive to my needs. I feel so much better now.',
    date: '1 week ago',
    service: 'Deep Tissue Massage'
  },
  {
    id: '3',
    customerName: 'Sophia Rodriguez',
    customerAvatar: '/images/avatars/avatar-3.jpg',
    rating: 4.8,
    content: 'I love their product recommendations! The personalized skincare routine has made such a difference for my sensitive skin. The consultation was thorough and educational.',
    date: '3 days ago',
    service: 'Skin Consultation'
  },
  {
    id: '4',
    customerName: 'David Wilson',
    customerAvatar: '/images/avatars/avatar-4.jpg',
    rating: 5,
    content: 'The anti-aging facial was amazing. I saw immediate results and the esthetician gave me great tips for maintaining the results at home.',
    date: '5 days ago',
    service: 'Anti-Aging Facial'
  },
  {
    id: '5',
    customerName: 'Aisha Patel',
    customerAvatar: '/images/avatars/avatar-5.jpg',
    rating: 4.7,
    content: 'Their vitamin C serum is a game-changer! I have been using it for a month and my dark spots have significantly faded. Highly recommend!',
    date: '1 week ago',
    service: 'Product Purchase'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add a small delay to simulate network request
  setTimeout(() => {
    // Get params if available
    const { limit = 3 } = req.query;
    
    // Return the reviews, sorted by newest first
    res.status(200).json({
      reviews: mockReviews.slice(0, Number(limit)),
      total: mockReviews.length
    });
  }, 300);
} 