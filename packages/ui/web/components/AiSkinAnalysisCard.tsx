'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { supabase } from '@vibewell/api';
import { useRouter } from 'next/navigation';

export interface AiSkinAnalysisCardProps {
  userId: string;
  className?: string;
  onStartAnalysis?: () => void;
}

interface SkinAnalysisData {
  hydration: number;
  elasticity: number;
  recommendedProducts: string[];
}

export const AiSkinAnalysisCard: React.FC<AiSkinAnalysisCardProps> = ({
  userId,
  className = '',
  onStartAnalysis,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<SkinAnalysisData | null>(null);
  const router = useRouter();

  const startAnalysis = async () => {
    if (onStartAnalysis) {
      onStartAnalysis();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-skin', {
        body: { userId }
      });
      
      if (error) {
        throw error;
      }
      
      setAnalysisData(data);
    } catch (err) {
      console.error('Error during skin analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze skin');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = () => {
    router.push('/skin-analysis');
  };

  return (
    <Card className={`bg-gradient-to-r from-coral-50 to-coral-100 dark:from-coral-900/20 dark:to-coral-800/20 ${className}`}>
      <div className="p-5">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-coral-500/20 dark:bg-coral-500/30 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600 dark:text-coral-400">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">AI Skin Analysis</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Get personalized skincare recommendations</p>
          </div>
        </div>
        
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-coral-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">
              {error}
              <button 
                onClick={startAnalysis}
                className="block w-full mt-2 text-xs font-medium text-coral-600 hover:text-coral-700"
              >
                Try Again
              </button>
            </div>
          ) : analysisData ? (
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Hydration</p>
                  <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {analysisData.hydration}%
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Elasticity</p>
                  <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {analysisData.elasticity}%
                  </p>
                </div>
              </div>
              
              {analysisData.recommendedProducts && analysisData.recommendedProducts.length > 0 && (
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Recommended Products</p>
                  <ul className="text-sm space-y-1">
                    {analysisData.recommendedProducts.slice(0, 2).map((product, index) => (
                      <li key={index} className="text-neutral-700 dark:text-neutral-300">{product}</li>
                    ))}
                    {analysisData.recommendedProducts.length > 2 && (
                      <li className="text-coral-600 dark:text-coral-400 text-xs">+ {analysisData.recommendedProducts.length - 2} more</li>
                    )}
                  </ul>
                </div>
              )}
              
              <button
                onClick={viewDetails}
                className="w-full rounded-md bg-coral-500 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 dark:bg-coral-600 dark:hover:bg-coral-700"
              >
                View Details
              </button>
            </div>
          ) : (
            <button
              onClick={startAnalysis}
              className="w-full rounded-md bg-coral-500 py-2 text-sm font-medium text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 dark:bg-coral-600 dark:hover:bg-coral-700"
            >
              Start Your Analysis
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}; 