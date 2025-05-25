'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-[#F8F6F2] dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text content */}
            <motion.div 
              className="max-w-lg"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6 text-[#2D3142] dark:text-white leading-tight"
                variants={fadeIn}
              >
                Your <span className="text-[#E07A5F]">Wellness</span>, Elevated
              </motion.h1>
              
              <motion.p 
                className="text-lg mb-8 text-[#504537] dark:text-neutral-300"
                variants={fadeIn}
              >
                Book treatments, discover products, and connect with a community for all things beauty & wellness.
              </motion.p>
              
              <motion.div variants={fadeIn}>
                <Link href="/services">
                  <button className="px-8 py-3 rounded-md bg-[#E07A5F] hover:bg-[#D65F40] text-white transition-all duration-300 font-medium">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Hero image */}
            {isMounted && (
              <motion.div 
                className="relative w-full max-w-xl mt-8 md:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/hero-image.svg"
                    alt="Woman with glowing skin"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Three Services Section */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Analyze Service */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#2D3142] dark:text-white">Analyze Your Skin</h3>
              <p className="text-[#6A5D50] dark:text-neutral-400 mb-4">Get personalized recommendations for your skin type and concerns.</p>
              <Link href="/analyze">
                <button className="px-6 py-2 bg-[#FAE3DD] text-[#C44A28] dark:bg-[#C44A28]/20 dark:text-[#F0A999] font-medium rounded-md hover:bg-[#F5C7BB] dark:hover:bg-[#C44A28]/30 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Shop Service */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#2D3142] dark:text-white">Shop Products</h3>
              <p className="text-[#6A5D50] dark:text-neutral-400 mb-4">Browse our curated collection of premium skincare products.</p>
              <Link href="/products">
                <button className="px-6 py-2 bg-[#FAE3DD] text-[#C44A28] dark:bg-[#C44A28]/20 dark:text-[#F0A999] font-medium rounded-md hover:bg-[#F5C7BB] dark:hover:bg-[#C44A28]/30 transition-colors">
                  Browse
                </button>
              </Link>
            </div>

            {/* Treatment Service */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#2D3142] dark:text-white">Plan Treatments</h3>
              <p className="text-[#6A5D50] dark:text-neutral-400 mb-4">Schedule professional spa treatments and services.</p>
              <Link href="/services">
                <button className="px-6 py-2 bg-[#FAE3DD] text-[#C44A28] dark:bg-[#C44A28]/20 dark:text-[#F0A999] font-medium rounded-md hover:bg-[#F5C7BB] dark:hover:bg-[#C44A28]/30 transition-colors">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 