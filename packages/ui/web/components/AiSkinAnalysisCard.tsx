'use client';

import React, { useState } from 'react';
import { Card } from './Card';

// Types for the analysis data
interface SkinAnalysisData {
  hydration: number;
  elasticity: number;
  recommendedProducts: string[];
}

// Mock supabase for Storybook
const mockSupabase = {
  functions: {
    invoke: async (functionName: string, options?: any) => ({
      data: {
        hydration: 75,
        elasticity: 82,
        recommendedProducts: [
          'Hydrating Serum',
          'Moisture Cream',
          'Retinol Treatment'
        ]
      },
      error: null
    })
  }
};

// Use mock or actual implementation
const supabase = typeof window !== 'undefined' && window.mockData?.supabase 
  ? window.mockData.supabase 
  : mockSupabase;

// Mock router
const useRouter = () => ({
  push: (path: string) => console.log(`Navigating to: ${path}`)
});

export interface AiSkinAnalysisCardProps {
  userId: string;
  className?: string;
  onStartAnalysis?: () => void;
}

export interface SkinAnalysisResult {
  hydration: number;
  elasticity: number;
  recommendedProducts: string[];
}

export const AiSkinAnalysisCard: React.FC<AiSkinAnalysisCardProps> = ({
  userId,
  className = '',
  onStartAnalysis
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);

  const handleStartAnalysis = async () => {
    if (onStartAnalysis) {
      onStartAnalysis();
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real component, we would call the API here
      // For now, we'll use the mock data from the story
      if (typeof window !== 'undefined' && window.mockData?.supabase?.functions?.invoke) {
        const { data, error } = await window.mockData.supabase.functions.invoke();
        
        if (error) {
          throw new Error(error.message || 'An error occurred during analysis');
        }
        
        setResult(data);
      } else {
        // Fallback mock data
        setTimeout(() => {
          setResult({
            hydration: 75,
            elasticity: 82,
            recommendedProducts: [
              'Hydrating Serum',
              'Moisture Cream',
              'Retinol Treatment'
            ]
          });
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setError(null);
    handleStartAnalysis();
  };

  const handleViewDetails = () => {
    router.push(`/analysis/${userId}`);
  };

  const cardContent = (
    <div className="p-5">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-coral-500/20 dark:bg-coral-500/30 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-coral-600 dark:text-coral-400"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            AI Skin Analysis
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Get personalized skincare recommendations
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        {!isLoading && !error && !result && (
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-300">
              Get personalized skin care recommendations based on AI analysis.
            </p>
            <button
              onClick={handleStartAnalysis}
              className="btn btn-primary px-4 py-2"
            >
              Start Analysis
            </button>
          </div>
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral-500"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">Analyzing your skin...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={handleTryAgain}
              className="mt-3 btn btn-secondary px-3 py-1 text-sm"
            >
              Try Again
            </button>
          </div>
        )}
        
        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
                <p className="text-xs text-teal-600 dark:text-teal-400 uppercase font-medium">Hydration</p>
                <p className="text-2xl font-bold">{result.hydration}%</p>
              </div>
              <div className="bg-coral-50 dark:bg-coral-900/20 p-3 rounded-lg">
                <p className="text-xs text-coral-600 dark:text-coral-400 uppercase font-medium">Elasticity</p>
                <p className="text-2xl font-bold">{result.elasticity}%</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Recommended Products</h4>
              <ul className="space-y-1 list-disc list-inside text-neutral-600 dark:text-neutral-300">
                {result.recommendedProducts.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </div>
            
            <button
              onClick={handleViewDetails}
              className="btn btn-secondary px-4 py-2 w-full mt-2"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card
      className={`${className} bg-gradient-to-r from-coral-50 to-coral-100 dark:from-coral-900/20 dark:to-coral-800/20`}
    >
      {cardContent}
    </Card>
  );
}; 