'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Coffee Enthusiast",
    image: "/images/testimonials/person1.jpg",
    content: "The best coffee I've ever had! The ambiance is perfect for both work and relaxation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Food Blogger",
    image: "/images/testimonials/person2.jpg",
    content: "Exceptional service and amazing pastries. Their lattes are consistently perfect!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Local Artist",
    image: "/images/testimonials/person3.jpg",
    content: "My favorite spot for creative inspiration. The atmosphere is just right.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Digital Nomad",
    image: "/images/testimonials/person4.jpg",
    content: "Perfect workspace environment with amazing coffee. The staff is incredibly friendly!",
    rating: 5,
    featured: true
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Food Critic",
    image: "/images/testimonials/person5.jpg",
    content: "Their attention to detail in every cup is remarkable. A must-visit for coffee lovers.",
    rating: 5,
    featured: true
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = { mobile: 1, tablet: 2, desktop: 3 };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage.desktop);

  const handleNext = () => setActivePage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setActivePage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section 
      ref={containerRef} 
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <motion.div style={{ opacity }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-coffee-dark/5 to-background" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute w-[30rem] h-[30rem] rounded-full blur-3xl
              ${i === 0 ? 'bg-coffee-light/10 -right-1/4 top-0' :
                i === 1 ? 'bg-coffee-dark/10 -left-1/4 bottom-0' :
                'bg-coffee-light/5 right-1/4 top-1/2'}`}
          />
        ))}
      </motion.div>

      <motion.div 
        style={{ y }}
        className="container mx-auto px-4 sm:px-6"
      >
        {/* Enhanced Header with Animation */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 bg-coffee-light/10 rounded-full
              text-coffee-light text-sm tracking-wider uppercase mb-4"
          >
            What People Say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-coffee-dark mb-4"
          >
            Customer Stories
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-1 bg-gradient-to-r from-coffee-dark to-coffee-light mx-auto"
          />
        </div>

        {/* Enhanced Testimonials Carousel/Grid */}
        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            layout
          >
            {testimonials
              .slice(
                activePage * itemsPerPage.desktop,
                (activePage + 1) * itemsPerPage.desktop
              )
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative bg-white rounded-2xl p-6 sm:p-8
                    shadow-lg hover:shadow-xl transition-all duration-300
                    ${testimonial.featured ? 'border-2 border-coffee-light/20' : 'border border-coffee-light/10'}`}
                >
                  {testimonial.featured && (
                    <div className="absolute -top-3 left-4 px-4 py-1 bg-coffee-light text-white text-xs
                      rounded-full shadow-lg">
                      Featured
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden
                        ring-2 ring-coffee-light/20 group-hover:ring-coffee-light/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl text-coffee-dark">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-coffee-light">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 my-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating 
                            ? 'text-yellow-400' 
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-3 -right-3 w-6 h-6 bg-coffee-light/10 
                      rounded-full blur-xl pointer-events-none"
                  />
                </motion.div>
              ))}
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 sm:mt-12">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg
                text-coffee-dark hover:text-coffee-light transition-all"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePage(i)}
                  className={`w-2 h-2 rounded-full transition-all
                    ${activePage === i 
                      ? 'bg-coffee-light w-6' 
                      : 'bg-coffee-light/20 hover:bg-coffee-light/40'}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg
                text-coffee-dark hover:text-coffee-light transition-all"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
