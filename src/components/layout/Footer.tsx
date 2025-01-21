'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedLogo from './AnimatedLogo';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#' },
  ],
  menu: [
    { label: 'Hot Coffee', href: '#menu' },
    { label: 'Cold Coffee', href: '#menu' },
    { label: 'Pastries', href: '#menu' },
    { label: 'Light Bites', href: '#menu' },
  ],
  social: [
    { label: 'Instagram', href: '#', icon: '📸' },
    { label: 'Facebook', href: '#', icon: '👥' },
    { label: 'Twitter', href: '#', icon: '🐦' },
    { label: 'LinkedIn', href: '#', icon: '💼' },
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    const navHeight = 80;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="relative py-16 sm:py-24 bg-gradient-to-b from-background via-coffee-dark/5 to-background/80">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] -top-32 -right-32 bg-coffee-light/5 rounded-full blur-[100px]" />
        <div className="absolute w-[500px] h-[500px] -bottom-32 -left-32 bg-coffee-dark/5 rounded-full blur-[100px]" />
        {/* Animated coffee beans */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full border border-coffee-light/20"
            initial={{ opacity: 0.1 }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              rotate: 360,
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Enhanced Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatedLogo />
            <p className="text-gray-600 text-sm leading-relaxed">
              Crafting moments of joy through exceptional coffee experiences, 
              one cup at a time.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(139, 94, 52, 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-coffee-light/10
                    flex items-center justify-center text-lg
                    shadow-lg shadow-coffee-light/5 backdrop-blur-sm
                    border border-coffee-light/10 hover:border-coffee-light/30
                    transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Link Columns */}
          {["company", "menu"].map((section, sectionIndex) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              className="relative"
            >
              <h3 className="text-coffee-dark font-bold mb-6 text-lg">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
              <motion.div
                className="h-1 w-12 bg-gradient-to-r from-coffee-dark to-coffee-light
                  absolute -top-2 left-0 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
              <ul className="space-y-4">
                {footerLinks[section as keyof typeof footerLinks].map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-600 hover:text-coffee-light transition-colors
                        flex items-center gap-2 group"
                    >
                      <motion.span
                        className="h-px w-0 bg-coffee-light"
                        animate={{ width: 0 }}
                        whileHover={{ width: "1rem" }}
                      />
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Enhanced Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <h3 className="text-coffee-dark font-bold mb-6 text-lg">Contact Us</h3>
            <motion.div
              className="h-1 w-12 bg-gradient-to-r from-coffee-dark to-coffee-light
                absolute -top-2 left-0 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
            />
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPinIcon className="w-5 h-5 text-coffee-light flex-shrink-0 mt-1" />
                <span>123 Coffee Street, Downtown, City 12345</span>
              </li>
              <li>
                <a 
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-gray-600 hover:text-coffee-light 
                    transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-coffee-light/10 group-hover:bg-coffee-light/20
                    transition-colors duration-300">
                    <PhoneIcon className="w-5 h-5 text-coffee-light" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@mochaandco.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-coffee-light 
                    transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-coffee-light/10 group-hover:bg-coffee-light/20
                    transition-colors duration-300">
                    <EnvelopeIcon className="w-5 h-5 text-coffee-light" />
                  </div>
                  <span>hello@mochaandco.com</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Enhanced Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-coffee-light/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} Mocha & Co. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((text, index) => (
                <motion.div
                  key={text}
                  whileHover={{ y: -2 }}
                >
                  <Link 
                    href="#" 
                    className="text-sm text-gray-600 hover:text-coffee-light 
                      transition-colors relative group"
                  >
                    {text}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-px bg-coffee-light"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
