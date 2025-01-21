'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const features = [
    { icon: "☕️", title: "Specialty Coffee", desc: "Single-origin beans and expert roasting" },
    { icon: "🌱", title: "Sustainable", desc: "Eco-friendly practices and fair trade" },
    { icon: "👨‍🍳", title: "Expert Baristas", desc: "Trained and passionate professionals" },
    { icon: "🤝", title: "Community", desc: "A welcoming space for everyone" },
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background Elements - Adjusted for mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-coffee-dark/5 to-background" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-1/4 top-1/4 w-[20rem] sm:w-[40rem] h-[20rem] sm:h-[40rem] 
            bg-coffee-light/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-1/4 bottom-1/4 w-[20rem] sm:w-[40rem] h-[20rem] sm:h-[40rem] 
            bg-coffee-dark/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start lg:items-center">
          {/* Image Section - Enhanced mobile layout */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-2xl mx-auto lg:mx-0"
          >
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/coffee-shop.jpg"
                alt="Our Coffee Shop"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Established Card - Responsive positioning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-white rounded-lg sm:rounded-xl 
                p-3 sm:p-4 shadow-xl border border-coffee-light/20 backdrop-blur-sm z-20"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-coffee-dark 
                  to-coffee-light flex items-center justify-center text-white font-bold shadow-lg">
                  <span className="text-lg sm:text-xl">24</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-coffee-light font-medium">Established</p>
                  <p className="text-lg sm:text-xl font-bold text-coffee-dark">Since 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Feature Cards Grid - Responsive layout */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index }}
                  className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl
                    border border-coffee-light/10 hover:border-coffee-light/30 
                    transition-all duration-300"
                >
                  <span className="text-xl sm:text-2xl mb-2 block">{feature.icon}</span>
                  <h3 className="font-bold text-coffee-dark text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section - Enhanced responsive typography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:pl-10 max-w-2xl mx-auto lg:mx-0"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-coffee-light/10 rounded-full">
                <span className="text-coffee-light text-xs sm:text-sm tracking-wider uppercase font-medium">
                  Our Story
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-coffee-dark 
                leading-tight sm:leading-tight">
                Crafting Moments,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-coffee-light">One Cup at a Time</span>
                  <motion.span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 
                      bg-coffee-light/20 -z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </span>
              </h2>

              <div className="space-y-4 sm:space-y-6 text-gray-600">
                <p className="text-base sm:text-lg leading-relaxed">
                  Born in 2024, Mocha & Co emerged from a vision to revolutionize the coffee experience. 
                  What started as a passion project has blossomed into a beloved community hub, where 
                  innovation meets tradition.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Our commitment goes beyond serving exceptional coffee. We're creating a space where 
                  connections flourish, ideas spark, and every visit becomes a memorable moment. Our 
                  expert baristas craft each drink with precision and care, ensuring every sip tells 
                  our story of dedication to quality.
                </p>

                {/* Stats Grid - Responsive layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8">
                  {[
                    { number: '10K+', label: 'Happy Customers' },
                    { number: '50+', label: 'Coffee Varieties' },
                    { number: '15+', label: 'Years Experience', className: 'col-span-2 sm:col-span-1' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className={`text-center ${stat.className || ''}`}
                    >
                      <div className="text-xl sm:text-2xl font-bold text-coffee-dark">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-coffee-light/70">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button - Enhanced mobile touch target */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 
                    bg-gradient-to-r from-coffee-dark to-coffee-light 
                    text-white text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl 
                    transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More About Us
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-coffee-light to-coffee-dark"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
