'use client';

import React from 'react';
import { Button } from '@vibewell/ui-web';
import { AiSkinAnalysisCard } from '@vibewell/ui-web/components/AiSkinAnalysisCard';

export default function AnalyzePage() {
  return (
    <div className="py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Analyze Your Skin
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Get personalized recommendations based on your unique skin profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="custom-card">
            <div className="card-placeholder gradient-coral">
              <span>AI Skin Analysis</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Visual Analysis</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Our advanced AI technology analyzes your skin to provide personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="custom-card p-6">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex">
                <span className="bg-coral-100 dark:bg-coral-900 text-coral-600 dark:text-coral-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <p>Take a clear photo of your face in good lighting</p>
              </li>
              <li className="flex">
                <span className="bg-coral-100 dark:bg-coral-900 text-coral-600 dark:text-coral-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <p>Our AI analyzes your skin's unique characteristics</p>
              </li>
              <li className="flex">
                <span className="bg-coral-100 dark:bg-coral-900 text-coral-600 dark:text-coral-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <p>Get personalized product and treatment recommendations</p>
              </li>
            </ol>
          </div>

          <div className="custom-card p-5">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-coral-500/20 dark:bg-coral-500/30 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600 dark:text-coral-400">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Skin Analysis</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Get personalized skincare recommendations</p>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => console.log('Starting analysis')}
                className="button-primary w-full py-2 text-sm"
              >
                Start Your Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 