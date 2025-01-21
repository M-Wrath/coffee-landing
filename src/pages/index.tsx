import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import Menu from '@/components/home/Menu';
import Gallery from '@/components/home/Gallery';
import About from '@/components/home/About';
import Testimonials from '@/components/home/Testimonials';
import Location from '@/components/home/Location';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className="relative">
        <Hero />
        <Menu />
        <Gallery />
        <About />
        <Testimonials />
        <Location />
        <Contact />
        {/* Next sections to add:
          - Contact Form
          - Footer
        */}
      </main>
    </motion.div>
  );
}
