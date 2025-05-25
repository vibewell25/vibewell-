import React from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  cta: {
    label: string;
    href: string;
  };
  bgImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  cta,
  bgImage = '/images/hero-image.jpg'
}) => {
  return (
    <section className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-neutral-900/40"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-5xl font-bold mb-4 text-center">{title}</h1>
        <p className="text-xl mb-8 max-w-2xl text-center">{subtitle}</p>
        <Link 
          href={cta.href} 
          className="bg-coral-500 hover:bg-coral-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}; 