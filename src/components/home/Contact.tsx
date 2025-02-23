'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactMethods = [
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    title: "Call us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Mon-Fri from 8am to 5pm"
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: "Email us",
    value: "hello@mochaandco.com",
    href: "mailto:hello@mochaandco.com",
    description: "We'll respond within 24 hours"
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    title: "Visit us",
    value: "123 Coffee Street",
    href: "https://maps.google.com",
    description: "Open daily from 7am to 9pm"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-coffee-dark/5 to-background" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute w-[30rem] h-[30rem] rounded-full blur-3xl
              ${i === 0 ? 'bg-coffee-light/10 -right-1/4 top-0' :
                i === 1 ? 'bg-coffee-dark/10 -left-1/4 bottom-0' :
                'bg-coffee-light/5 right-1/4 top-1/2'}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-1.5 bg-coffee-light/10 rounded-full
                text-coffee-light text-sm tracking-wider uppercase mb-4"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold text-coffee-dark mb-4"
            >
              Contact Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Have questions or feedback? We&apos;d love to hear from you. 
              Send us a message and we&apos;ll respond as soon as possible.
            </motion.p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg
                  border border-coffee-light/20 hover:border-coffee-light/40
                  transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-coffee-light/10 rounded-xl mb-4 group-hover:bg-coffee-light/20
                    transition-colors duration-300">
                    <div className="text-coffee-light">{method.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-coffee-dark mb-1">{method.title}</h3>
                  <p className="text-coffee-dark/80 font-medium mb-1">{method.value}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl
              border border-coffee-light/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input - Enhanced */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-coffee-dark mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20
                      focus:border-coffee-light focus:ring-2 focus:ring-coffee-light/20
                      bg-white/50 backdrop-blur-sm transition-all duration-300
                      placeholder:text-gray-400 text-coffee-dark"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Input - Enhanced */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-coffee-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20
                      focus:border-coffee-light focus:ring-2 focus:ring-coffee-light/20
                      bg-white/50 backdrop-blur-sm transition-all duration-300
                      placeholder:text-gray-400 text-coffee-dark"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                {/* Subject Input - Enhanced */}
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-coffee-dark mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20
                      focus:border-coffee-light focus:ring-2 focus:ring-coffee-light/20
                      bg-white/50 backdrop-blur-sm transition-all duration-300
                      placeholder:text-gray-400 text-coffee-dark"
                    placeholder="Subject of your message"
                    required
                  />
                </div>

                {/* Message Input - Enhanced */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-coffee-dark mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-coffee-light/20
                      focus:border-coffee-light focus:ring-2 focus:ring-coffee-light/20
                      bg-white/50 backdrop-blur-sm transition-all duration-300
                      placeholder:text-gray-400 text-coffee-dark resize-none min-h-[120px]"
                    placeholder="Tell us about your inquiry..."
                    required
                  />
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-coffee-dark to-coffee-light
                  text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <EnvelopeIcon className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
