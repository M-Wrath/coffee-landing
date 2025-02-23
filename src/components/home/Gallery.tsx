'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const galleryImages = [
  // Interior shots
  {
    id: 1,
    src: '/images/gallery/interior-1.jpg',
    alt: 'Main Seating Area',
    category: 'Interior',
    description: 'Our warm and inviting main seating area with natural lighting'
  },
  {
    id: 2,
    src: '/images/gallery/interior-2.jpg',
    alt: 'Coffee Bar',
    category: 'Interior',
    description: 'Modern coffee bar where magic happens'
  },
  {
    id: 3,
    src: '/images/gallery/interior-3.jpg',
    alt: 'Cozy Corner',
    category: 'Interior',
    description: 'Perfect spot for reading or working'
  },

  // Coffee shots
  {
    id: 4,
    src: '/images/gallery/coffee-1.jpg',
    alt: 'Latte Art Heart',
    category: 'Coffee',
    description: 'Perfectly crafted latte art'
  },
  {
    id: 5,
    src: '/images/gallery/coffee-2.jpg',
    alt: 'Pour Over',
    category: 'Coffee',
    description: 'Hand-crafted pour over coffee'
  },
  {
    id: 6,
    src: '/images/gallery/coffee-3.jpg',
    alt: 'Espresso Shot',
    category: 'Coffee',
    description: 'Rich and bold espresso extraction'
  },

  // People shots
  {
    id: 7,
    src: '/images/gallery/people-1.jpg',
    alt: 'Barista at Work',
    category: 'People',
    description: 'Our skilled baristas crafting perfect drinks'
  },
  {
    id: 8,
    src: '/images/gallery/people-2.jpg',
    alt: 'Happy Customers',
    category: 'People',
    description: 'Friends enjoying their coffee moment'
  },
  {
    id: 9,
    src: '/images/gallery/people-3.jpg',
    alt: 'Coffee Training',
    category: 'People',
    description: 'Barista training session'
  },

  // Events
  {
    id: 10,
    src: '/images/gallery/events-1.jpg',
    alt: 'Coffee Tasting',
    category: 'Events',
    description: 'Monthly coffee tasting experience'
  },
  {
    id: 11,
    src: '/images/gallery/events-2.jpg',
    alt: 'Latte Art Competition',
    category: 'Events',
    description: 'Local barista championship'
  },
  {
    id: 12,
    src: '/images/gallery/events-3.jpg',
    alt: 'Coffee Workshop',
    category: 'Events',
    description: 'Learn the art of coffee making'
  }
];

const categories = ['All', 'Interior', 'Coffee', 'People', 'Events'];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredImages = galleryImages.filter(
    img => activeCategory === 'All' || img.category === activeCategory
  );

  const handleNext = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
    const nextImage = galleryImages[(currentIndex + 1) % galleryImages.length];
    setSelectedImage(nextImage.id);
  };

  const handlePrevious = () => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
    const previousImage = galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length];
    setSelectedImage(previousImage.id);
  };

  return (
    <section id="gallery" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Decorative Elements - Adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 -left-32 sm:-left-48 top-0 bg-coffee-light/10 rounded-full blur-3xl" />
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 -right-32 sm:-right-48 bottom-0 bg-coffee-dark/10 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Section Header - Better mobile spacing */}
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto px-4 sm:px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-coffee-light/10 rounded-full
              text-coffee-light text-sm tracking-wider uppercase mb-4"
          >
            Our Space
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-coffee-dark mb-6"
          >
            Capture the Moments
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-coffee-dark to-coffee-light mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-lg"
          >
            Step into our world where every corner tells a story of passion for coffee and community.
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filters - Scrollable on mobile */}
        <div className="relative -mx-4 sm:mx-0 mt-8 sm:mt-10">
          <div className="flex overflow-x-auto scrollbar-hide sm:flex-wrap sm:justify-center 
            gap-2 sm:gap-3 px-4 sm:px-0 pb-4 sm:pb-0">
            {categories.map((category, index) => {
              const count = category === 'All' 
                ? galleryImages.length 
                : galleryImages.filter(img => img.category === category).length;
              
              return (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium
                    whitespace-nowrap flex-shrink-0 transition-all
                    relative overflow-hidden group
                    ${activeCategory === category 
                      ? 'bg-gradient-to-r from-coffee-dark to-coffee-light text-white shadow-lg' 
                      : 'bg-white/80 text-coffee-dark hover:bg-coffee-light/10'}`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {category}
                    <span className="opacity-60 text-xs">({count})</span>
                  </span>
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-coffee-dark to-coffee-light"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Fade edges on mobile */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background to-transparent sm:hidden" />
          <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-background to-transparent sm:hidden" />
        </div>
      </div>

      {/* Enhanced Gallery Grid - Responsive masonry */}
      <div className="container mx-auto px-4 sm:px-6" ref={containerRef}>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -8 }}
                className="aspect-[4/5] relative"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="absolute inset-0 group rounded-lg sm:rounded-xl lg:rounded-2xl 
                  overflow-hidden cursor-pointer shadow-lg hover:shadow-xl 
                  transition-all duration-300 hover:scale-[1.02]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-700 
                      group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={image.id <= 6} // Prioritize loading first 6 images
                  />
                  
                  {/* Enhanced Overlay - Better mobile readability */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 
                      transform translate-y-6 group-hover:translate-y-0 
                      transition-transform duration-300">
                      <h3 className="text-base sm:text-lg font-display text-white mb-1 sm:mb-2">
                        {image.alt}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 line-clamp-2">
                        {image.description}
                      </p>
                      <span className="inline-block px-2 sm:px-3 py-1 bg-white/20 
                        rounded-full text-[10px] sm:text-xs text-white">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Modal - Better mobile view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm px-4 py-8 sm:p-8"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-[3/4] sm:aspect-[16/10] 
                  rounded-lg sm:rounded-2xl overflow-hidden"
              >
                <Image
                  src={galleryImages.find(img => img.id === selectedImage)?.src || ''}
                  alt="Gallery preview"
                  fill
                  className="object-contain"
                />
                
                {/* Navigation Controls - Hide on mobile touch */}
                <div className="hidden sm:block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                      bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                      bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Close Button - Adjusted for mobile */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full
                    bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
