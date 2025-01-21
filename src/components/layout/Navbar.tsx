import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import OrderModal from '@/components/shared/OrderModal';
import { useCart } from '@/context/CartContext'; // Fix import path
import type { CartItem } from '@/types'; // Add type import

const navLinks = [
  { href: '#home', label: 'Home', icon: '🏠' },
  { href: '#menu', label: 'Our Menu', icon: '☕' },
  { href: '#about', label: 'Story', icon: '📖' },
  { href: '#gallery', label: 'Gallery', icon: '🖼️' },
  { href: '#contact', label: 'Visit Us', icon: '📍' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const { state } = useCart();
  const itemCount = state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  // Enhanced scroll to section function
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false); // Close mobile menu
    const element = document.querySelector(sectionId);
    const navHeight = 80; // Approximate navbar height
    
    if (element) {
      // Wait for mobile menu to close before scrolling
      setTimeout(() => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 300); // Match this with your menu close animation duration
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="mobile-menu fixed top-0 right-0 w-[280px] sm:w-[320px] h-[100dvh] 
                bg-gradient-to-b from-white/95 to-white/90 z-50 md:hidden backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-h-[100dvh] flex flex-col">
                {/* Menu Header */}
                <div className="px-6 py-8 border-b border-coffee-light/10">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xl font-semibold text-coffee-dark">Menu</span>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-coffee-light/5"
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6 text-coffee-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Menu Items */}
                <motion.div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="mb-2 w-full text-left"
                      onClick={() => scrollToSection(link.href)}
                    >
                      <div className="flex items-center p-4 rounded-xl transition-all
                        hover:bg-gradient-to-r hover:from-coffee-light/5 hover:to-transparent
                        group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {link.icon}
                        </span>
                        <span className="ml-4 text-gray-700 font-medium group-hover:text-coffee-dark">
                          {link.label}
                        </span>
                        <motion.span
                          className="ml-auto text-gray-400"
                          initial={false}
                          animate={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Order Now Button */}
                <div className="sticky bottom-0 mt-auto pt-6 pb-6 px-4 bg-white/80 backdrop-blur-md
                  border-t border-gray-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full p-4 bg-gradient-to-r from-coffee-dark to-coffee-light
                      text-white rounded-xl shadow-lg flex items-center justify-center gap-2
                      hover:shadow-xl transition-all duration-300"
                  >
                    <span>Order Now</span>
                    <span className="text-lg">✨</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-coffee-dark/95 backdrop-blur-md shadow-lg py-1 sm:py-2' 
          : 'bg-transparent py-3 sm:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <AnimatedLogo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  className="relative"
                  onHoverStart={() => setActiveLink(link.href)}
                  onHoverEnd={() => setActiveLink('')}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-2 text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: activeLink === link.href ? 1 : 0,
                        scale: activeLink === link.href ? 1 : 0.5
                      }}
                      className="text-sm"
                    >
                      {link.icon}
                    </motion.span>
                  </button>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-full bg-white/10 rounded-lg -z-10"
                    initial={false}
                    animate={{
                      scaleX: activeLink === link.href ? 1 : 0,
                      opacity: activeLink === link.href ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOrderModalOpen(true)}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-coffee-dark to-coffee-light text-white rounded-full 
                  shadow-[0_4px_12px_rgba(139,94,52,0.3)] hover:shadow-[0_6px_20px_rgba(139,94,52,0.4)]
                  transition-all duration-300"
              >
                Order Now ✨
              </motion.button>
              <motion.button
                onClick={() => setIsOrderModalOpen(true)}
                className="relative ml-4 p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              {/* Cart Icon for Mobile */}
              <motion.button
                onClick={() => setIsOrderModalOpen(true)}
                className="relative p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full 
                      flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Existing Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                  border border-white/20 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-5 h-4 relative">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute left-0 h-[2px] bg-white rounded-full"
                      style={{ top: `${i * 8}px` }}
                      animate={{
                        width: isOpen && i === 1 ? "0%" : "100%",
                        left: isOpen && i === 1 ? "50%" : "0%",
                        rotate: isOpen
                          ? (i === 0
                            ? 45
                            : i === 2
                            ? -45
                            : 0)
                          : 0,
                        y: isOpen
                          ? (i === 0
                            ? 8
                            : i === 2
                            ? -8
                            : 0)
                          : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="mobile-menu fixed top-0 right-0 w-[280px] sm:w-[320px] h-[100dvh] 
                bg-gradient-to-b from-white/95 to-white/90 z-50 md:hidden backdrop-blur-xl"
            >
              <div className="min-h-[100dvh] flex flex-col">
                {/* Menu Header */}
                <div className="px-6 py-8 border-b border-coffee-light/10">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xl font-semibold text-coffee-dark">Menu</span>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-coffee-light/5"
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6 text-coffee-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Menu Items */}
                <motion.div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="mb-2 w-full text-left"
                      onClick={() => scrollToSection(link.href)}
                    >
                      <div className="flex items-center p-4 rounded-xl transition-all
                        hover:bg-gradient-to-r hover:from-coffee-light/5 hover:to-transparent
                        group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {link.icon}
                        </span>
                        <span className="ml-4 text-gray-700 font-medium group-hover:text-coffee-dark">
                          {link.label}
                        </span>
                        <motion.span
                          className="ml-auto text-gray-400"
                          initial={false}
                          animate={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Order Now Button */}
                <div className="sticky bottom-0 mt-auto pt-6 pb-6 px-4 bg-white/80 backdrop-blur-md
                  border-t border-gray-100"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOrderModalOpen(true)}
                    className="w-full p-4 bg-gradient-to-r from-coffee-dark to-coffee-light
                      text-white rounded-xl shadow-lg flex items-center justify-center gap-2
                      hover:shadow-xl transition-all duration-300"
                  >
                    <span>Order Now</span>
                    <span className="text-lg">✨</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Add OrderModal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
}
