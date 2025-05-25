import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  href,
  description = 'Explore our personalized wellness features',
  icon
}) => {
  return (
    <Link href={href} className="block">
      <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg hover:shadow-md transition-shadow">
        {icon ? (
          <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900/30 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
        ) : (
          <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900/30 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral-600 dark:text-coral-400">
              <path d="M12 2L20 7L12 12L4 7L12 2Z" />
              <path d="M20 12L12 17L4 12" />
              <path d="M20 17L12 22L4 17" />
            </svg>
          </div>
        )}
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
    </Link>
  );
}; 