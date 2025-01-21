'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPinIcon, PhoneIcon, ClockIcon, EnvelopeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const businessHours = [
  { day: 'Monday - Friday', hours: '7:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
  { day: 'Sunday', hours: '9:00 AM - 7:00 PM' }
];

const contactInfo = {
  address: '123 Coffee Street, Downtown, City 12345',
  phone: '+1 (555) 123-4567',
  email: 'hello@mochaandco.com'
};

export default function Location() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMapHovered, setIsMapHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactInfo.address)}`, '_blank');
  };

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div style={{ opacity }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-coffee-dark/5 to-background" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-1/4 top-1/4 w-96 h-96 bg-coffee-light/10 rounded-full blur-3xl"
        />
        {/* Add animated coffee bean shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-coffee-light/20"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        {/* Add animated coffee beans pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full" style={{ 
            backgroundImage: 'radial-gradient(circle, #8B5E34 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }} />
        </div>
      </motion.div>

      <motion.div 
        style={{ y }}
        className="container mx-auto px-4 sm:px-6"
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1.5 bg-coffee-light/10 rounded-full
              text-coffee-light text-sm tracking-wider uppercase mb-4"
          >
            Visit Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-coffee-dark mb-4"
          >
            Find Us Here
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-1 bg-gradient-to-r from-coffee-dark to-coffee-light mx-auto"
          />
        </div>

        {/* Enhanced Main Content with Better Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Enhanced Map Container with Mobile Optimization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative w-full h-[300px] sm:h-[400px] lg:h-[500px] 
              rounded-2xl overflow-hidden shadow-xl group"
            onHoverStart={() => setIsMapHovered(true)}
            onHoverEnd={() => setIsMapHovered(false)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={`w-full h-full transition-all duration-700
                ${isMapHovered ? 'grayscale-0 scale-105' : 'grayscale scale-100'}`}
            />
            {/* Map Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                pointer-events-none"
              animate={{
                opacity: isMapHovered ? 0 : 0.5
              }}
            />
            {/* Location Pin */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                y: [0, -10, 0],
                scale: isMapHovered ? 1.2 : 1,
              }}
              transition={{
                y: { duration: 1.5, repeat: Infinity },
                scale: { duration: 0.3 },
              }}
            >
              <div className="relative">
                <MapPinIcon className="w-8 h-8 text-coffee-light" />
                <motion.div
                  className="absolute -inset-1 bg-coffee-light/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>

            {/* Enhanced Map Controls for Mobile */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center
              bg-white/90 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg
              transform transition-all duration-300 group-hover:translate-y-0
              translate-y-24 sm:translate-y-0"
            >
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-coffee-light" />
                <p className="text-sm sm:text-base text-coffee-dark font-medium line-clamp-1">
                  {contactInfo.address}
                </p>
              </div>
              <button
                onClick={handleGetDirections}
                className="flex-shrink-0 p-2 rounded-lg bg-coffee-light/10 
                  hover:bg-coffee-light/20 transition-colors"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-coffee-light" />
              </button>
            </div>
          </motion.div>

          {/* Enhanced Info Container with Better Spacing */}
          <div className="order-1 lg:order-2 lg:pl-8 space-y-4 sm:space-y-6">
            {/* Enhanced Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl
                border border-coffee-light/20 hover:border-coffee-light/40 transition-all duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-display font-bold text-coffee-dark mb-6">
                Contact Information
              </h3>
              
              {/* Enhanced Contact Grid */}
              <div className="grid gap-4">
                {Object.entries(contactInfo).map(([key, value], index) => (
                  <motion.a
                    key={key}
                    href={
                      key === 'email' ? `mailto:${value}` :
                      key === 'phone' ? `tel:${value.replace(/\D/g, '')}` :
                      `https://maps.google.com/?q=${encodeURIComponent(value)}`
                    }
                    target={key === 'address' ? '_blank' : undefined}
                    rel={key === 'address' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-coffee-light/5
                      transition-colors duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-coffee-light/10 group-hover:bg-coffee-light/20
                      transition-colors duration-300">
                      {key === 'address' && <MapPinIcon className="w-6 h-6 text-coffee-light flex-shrink-0" />}
                      {key === 'phone' && <PhoneIcon className="w-6 h-6 text-coffee-light flex-shrink-0" />}
                      {key === 'email' && <EnvelopeIcon className="w-6 h-6 text-coffee-light flex-shrink-0" />}
                    </div>
                    <div>
                      <p className="text-gray-600 group-hover:text-coffee-dark transition-colors">
                        {value}
                      </p>
                      <p className="text-xs text-coffee-light/70">
                        {key === 'email' ? 'Email us' :
                         key === 'phone' ? 'Call us' : 'Visit us'}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Business Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl
                border border-coffee-light/20 hover:border-coffee-light/40 transition-all duration-300"
            >
              <h3 className="text-2xl font-display font-bold text-coffee-dark mb-6">
                Business Hours
              </h3>
              <div className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between gap-4 p-3 rounded-xl
                      hover:bg-coffee-light/5 transition-colors duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-coffee-light/10 group-hover:bg-coffee-light/20
                        transition-colors duration-300">
                        <ClockIcon className="w-4 h-4 text-coffee-light" />
                      </div>
                      <div>
                        <span className="text-gray-600 group-hover:text-coffee-dark transition-colors">
                          {schedule.day}
                        </span>
                        <p className="text-xs text-coffee-light/70">Open</p>
                      </div>
                    </div>
                    <span className="font-medium text-coffee-dark">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full py-4 bg-gradient-to-r from-coffee-dark to-coffee-light
                text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                Get Directions
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-coffee-light to-coffee-dark"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
