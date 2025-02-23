'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20 sm:py-28">
      {/* Video Background - add object-position for mobile */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.4)' }} // Lightened from 0.3
        >
          <source src="/videos/coffee-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Enhanced overlay gradient for better mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-background/60 to-background/75" />
      </div>

      {/* Content Container - improved responsive spacing */}
      <div className="container mx-auto relative z-20 w-full">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"> 
          <motion.div className="space-y-6 sm:space-y-8">
            {/* Welcome badge - adjusted padding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 rounded-full"
            >
              <span className="text-xs sm:text-sm text-white font-medium">Welcome to Mocha & Co</span>
            </motion.div>

            {/* Heading - improved responsive typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 
                text-white leading-[1.2] sm:leading-tight tracking-[-0.02em]"
            >
              Experience the{' '}
              <span className="bg-gradient-to-r from-coffee-light to-white bg-clip-text text-transparent 
                whitespace-nowrap"
              >
                Perfect Brew
              </span>
              <br className="hidden sm:block" />
              <span className="inline sm:block">Every Morning</span>
            </motion.h1>

            {/* Description - adjusted sizes and max-width */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 
                max-w-[30ch] sm:max-w-xl mx-auto leading-relaxed"
            >
              Discover our artisanal coffee selection, crafted with passion and served with love. 
              Each cup tells a story of carefully selected beans and perfect roasting.
            </motion.p>

            {/* Buttons - improved mobile layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#5C3D2E] to-[#B85C38] text-white 
                  rounded-full shadow-lg hover:shadow-xl text-sm sm:text-base font-medium
                  transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Order Now</span>
                <span className="text-lg">✨</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 border-2 border-[#B85C38]/30 hover:border-[#B85C38]/60 
                  text-white rounded-full transition-all duration-300 text-sm sm:text-base font-medium
                  flex items-center justify-center space-x-2"
              >
                <span>View Menu</span>
                <span>→</span>
              </motion.button>
            </motion.div>

            {/* Stats - improved responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 
                max-w-lg sm:max-w-2xl mx-auto"
            >
              {[
                { number: '15+', label: 'Coffee Types' },
                { number: '20k+', label: 'Customers' },
                { number: '4.9', label: 'Rating', className: 'col-span-2 sm:col-span-1' },
              ].map((stat, i) => (
                <div key={i} className={`text-center ${stat.className || ''}`}>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-1/4 top-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-1/4 bottom-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      {/* Arrow - hide on smaller screens */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 
          text-white/50 text-2xl sm:text-4xl z-20 hidden sm:block"
      >
        ↓
      </motion.div>
    </section>
  );
}


