'use client';

import React from 'react';

export default function AnalyzePage() {
  return (
    <div className="py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
          Analyze Your Skin
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Get personalized recommendations based on your unique skin profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {/* Left Column - Info Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-20 bg-coral-500 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-white">AI Skin Analysis</h2>
          </div>
          <div className="p-6 bg-neutral-800 dark:bg-neutral-900 text-neutral-300">
            <p className="mb-4">
              Our advanced AI technology analyzes your skin to provide personalized recommendations.
            </p>
            <p>
              We use machine learning to identify your skin concerns and match you with the perfect products and treatments.
            </p>
          </div>
        </div>

        {/* Right Column - How it works */}
        <div className="bg-neutral-800 dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <ol className="space-y-6">
              <li className="flex items-center">
                <span className="bg-coral-500 dark:bg-coral-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</span>
                <p className="text-neutral-200">Take a clear photo of your face in good lighting</p>
              </li>
              <li className="flex items-center">
                <span className="bg-coral-500 dark:bg-coral-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</span>
                <p className="text-neutral-200">Our AI analyzes your skin's unique characteristics</p>
              </li>
              <li className="flex items-center">
                <span className="bg-coral-500 dark:bg-coral-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</span>
                <p className="text-neutral-200">Get personalized product and treatment recommendations</p>
              </li>
            </ol>

            <div className="mt-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="rounded-full bg-coral-500 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Get personalized skincare recommendations</h3>
                </div>
              </div>
              
              <button
                onClick={() => console.log('Starting analysis')}
                className="w-full py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-md transition-colors font-medium"
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