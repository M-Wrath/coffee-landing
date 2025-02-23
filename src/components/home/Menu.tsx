'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import OrderModal from '@/components/shared/OrderModal';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import type { MenuItem } from '@/types';

const categories = ['All', 'Hot Coffee', 'Cold Coffee', 'Signature Drinks', 'Pastries', 'Light Bites'];

const menuItems: MenuItem[] = [
  // Hot Coffee
  {
    id: '1',  // Change to string
    name: 'Classic Espresso',
    description: 'Pure and intense single shot of coffee',
    price: 3.49,
    category: 'Hot Coffee',
    image: '/images/menu/espresso.jpg'
  },
  {
    id: '2',  // Change to string
    name: 'Cappuccino',
    description: 'Espresso with steamed milk foam',
    price: 4.99,
    category: 'Hot Coffee',
    image: '/images/menu/cappuccino.jpg'
  },
  {
    id: '3',  // Change to string
    name: 'Café Latte',
    description: 'Espresso with steamed milk and light foam',
    price: 4.79,
    category: 'Hot Coffee',
    image: '/images/menu/latte.jpg'
  },
  {
    id: '4',  // Change to string
    name: 'Americano',
    description: 'Espresso with hot water',
    price: 3.99,
    category: 'Hot Coffee',
    image: '/images/menu/americano.jpg'
  },

  // Cold Coffee
  {
    id: '5',  // Change to string
    name: 'Iced Latte',
    description: 'Espresso with cold milk and ice',
    price: 5.49,
    category: 'Cold Coffee',
    image: '/images/menu/iced-latte.jpg'
  },
  {
    id: '6',  // Change to string
    name: 'Cold Brew',
    description: '12-hour slow-steeped coffee',
    price: 4.99,
    category: 'Cold Coffee',
    image: '/images/menu/cold-brew.jpg'
  },
  {
    id: '7',  // Change to string
    name: 'Frappuccino',
    description: 'Blended coffee with cream and ice',
    price: 5.99,
    category: 'Cold Coffee',
    image: '/images/menu/frappuccino.jpg'
  },

  // Signature Drinks
  {
    id: '8',  // Change to string
    name: 'Mocha & Co Special',
    description: 'Our signature blend with secret recipe',
    price: 6.99,
    category: 'Signature Drinks',
    image: '/images/menu/signature.jpg'
  },
  {
    id: '9',  // Change to string
    name: 'Caramel Macchiato',
    description: 'Vanilla-flavored drink with caramel drizzle',
    price: 5.99,
    category: 'Signature Drinks',
    image: '/images/menu/caramel-macchiato.jpg'
  },
  {
    id: '10',  // Change to string
    name: 'Honey Lavender Latte',
    description: 'Espresso with honey and lavender syrup',
    price: 6.49,
    category: 'Signature Drinks',
    image: '/images/menu/honey-lavender.jpg'
  },

  // Pastries
  {
    id: '11',  // Change to string
    name: 'Butter Croissant',
    description: 'Classic French-style butter croissant',
    price: 3.99,
    category: 'Pastries',
    image: '/images/menu/croissant.jpg'
  },
  {
    id: '12',  // Change to string
    name: 'Chocolate Muffin',
    description: 'Double chocolate chip muffin',
    price: 3.79,
    category: 'Pastries',
    image: '/images/menu/muffin.jpg'
  },
  {
    id: '13',  // Change to string
    name: 'Cinnamon Roll',
    description: 'Freshly baked with cream cheese frosting',
    price: 4.49,
    category: 'Pastries',
    image: '/images/menu/cinnamon-roll.jpg'
  },

  // Light Bites
  {
    id: '14',  // Change to string
    name: 'Avocado Toast',
    description: 'Sourdough with smashed avocado and seeds',
    price: 8.99,
    category: 'Light Bites',
    image: '/images/menu/avocado-toast.jpg'
  },
  {
    id: '15',  // Change to string
    name: 'Granola Bowl',
    description: 'House-made granola with yogurt and berries',
    price: 7.99,
    category: 'Light Bites',
    image: '/images/menu/granola.jpg'
  }
];

export default function Menu() {
  const { dispatch } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null); // Change to string
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>(); // Change to undefined

  const filteredItems = menuItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const handleAddToCart = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <section id="menu" className="relative py-20 bg-gradient-to-b from-background via-coffee-dark/5 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-coffee-dark/5 to-background" />
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-1/4 top-1/4 w-96 h-96 bg-coffee-light/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-1/4 bottom-1/4 w-96 h-96 bg-coffee-dark/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Enhanced Header with responsive spacing */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm text-coffee-light/80 tracking-wider uppercase"
          >
            Delightful Selection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold 
              text-coffee-dark mt-2 mb-3 sm:mb-4"
          >
            Our Menu
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            className="w-24 h-1 bg-gradient-to-r from-coffee-dark to-coffee-light mx-auto"
          />
        </div>
        
        {/* Enhanced Category Filters */}
        <div className="relative -mx-4 sm:mx-0 mb-8 sm:mb-12">
          <motion.div 
            className="flex overflow-x-auto scrollbar-hide sm:flex-wrap sm:justify-center
              px-4 sm:px-0 py-2 gap-2 sm:gap-3 relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className={`
                  relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full
                  font-medium text-xs sm:text-sm
                  whitespace-nowrap flex-shrink-0
                  transition-all duration-300
                  ${activeCategory === category 
                    ? 'bg-gradient-to-r from-coffee-dark to-coffee-light text-white shadow-lg' 
                    : 'bg-white/80 text-coffee-dark hover:bg-coffee-light/10'
                  }
                  backdrop-blur-sm border border-coffee-light/10
                  hover:shadow-xl hover:border-coffee-light/20
                  overflow-hidden
                `}
              >
                {/* Subtle background animation */}
                {activeCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-coffee-dark to-coffee-light"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  {category}
                  {activeCategory === category && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced fade edges */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent sm:hidden pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent sm:hidden pointer-events-none" />
        </div>

        {/* Updated Menu Grid with Fixed Animations */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          layout="position"
        >
          <AnimatePresence mode="sync" initial={false}>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout="position"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden
                  border border-coffee-light/10 shadow-md hover:shadow-xl
                  transition-all duration-500"
              >
                {/* Image Container - Adjusted height */}
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-all duration-700 
                      group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t 
                    from-black/60 via-black/20 to-transparent 
                    group-hover:from-black/70 transition-all duration-300" 
                  />
                  
                  {/* Category Tag - Adjusted sizing */}
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 
                      rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-xs 
                      font-medium text-coffee-dark shadow-lg"
                  >
                    {item.category}
                  </motion.div>
                </div>

                {/* Content - Adjusted padding and text sizes */}
                <div className="p-4 sm:p-6 bg-white">
                  <div className="flex justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <h3 className="font-display text-lg sm:text-xl text-coffee-dark 
                      group-hover:text-coffee-light transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="px-2 sm:px-3 py-1 rounded-full bg-coffee-light 
                      text-white font-bold text-xs sm:text-sm">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Order Button - Adjusted sizing */}
                  <motion.button
                    onClick={() => handleAddToCart(item)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl
                      bg-gradient-to-r from-coffee-dark to-coffee-light
                      text-white text-sm font-medium shadow-lg shadow-coffee-dark/10
                      hover:shadow-xl hover:shadow-coffee-dark/20 
                      transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Add to Order</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-2 -right-2 w-20 h-20 bg-coffee-light/10 
                        rounded-full blur-xl pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <OrderModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(undefined)} // Change to undefined
        selectedItem={selectedItem}
      />
    </section>
  );
}
