import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerInfoSchema } from '@/utils/validationSchema';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import type { FieldError } from 'react-hook-form';
import type { MenuItem } from '@/types'; // Add this import

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: MenuItem; // Keep as optional with undefined
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Add state for showing different sections
  const [activeSection, setActiveSection] = useState<'cart' | 'checkout'>('cart');

  const handleContinueToCheckout = () => {
    setActiveSection('checkout');
  };

  const handleBackToCart = () => {
    setActiveSection('cart');
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(customerInfoSchema)
  });

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const handleCheckout = async (customerData: any) => {
    try {
      setIsProcessing(true);
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          customerInfo: customerData
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      
      if (error) {
        toast.error(error.message || 'Payment failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderError = (error: FieldError | undefined) => {
    return error ? (
      <p className="mt-1 text-sm text-red-600">{error.message?.toString()}</p>
    ) : null;
  };

  const EmptyCart = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
      <p className="text-gray-500 mb-6">Browse our menu to add some delicious items!</p>
      <button
        onClick={() => {
          onClose();
          // Scroll to menu section
          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white bg-coffee-dark 
          hover:bg-coffee-dark/90 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-coffee-dark"
      >
        View Menu
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 backdrop-blur-sm"
        >
          <div className="flex min-h-[100dvh] items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              className="bg-white w-full min-h-[100dvh] sm:min-h-0 sm:w-full sm:max-w-md 
                sm:rounded-xl shadow-xl overflow-hidden relative"
            >
              {/* Header - Always visible */}
              <div className="sticky top-0 z-10 border-b px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-md
                flex items-center justify-between"
              >
                <h2 className="text-xl font-semibold">
                  {activeSection === 'cart' ? 'Your Order' : 'Checkout'}
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="px-4 sm:px-6 py-4 max-h-[calc(100dvh-80px)] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeSection === 'cart' ? (
                    <motion.div
                      key="cart"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {/* Cart Items Section */}
                      <div className="space-y-4">
                        {state.items.length === 0 ? (
                          <EmptyCart />
                        ) : (
                          <>
                            {state.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded-full hover:bg-gray-200"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded-full hover:bg-gray-200"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* Order Summary */}
                            <div className="border-t pt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>${state.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Tax</span>
                                <span>${state.tax.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                <span>Total</span>
                                <span>${state.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="checkout"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {/* Checkout Form */}
                      <button
                        onClick={handleBackToCart}
                        className="mb-4 text-coffee-dark hover:text-coffee-light flex items-center gap-2"
                      >
                        ← Back to Cart
                      </button>
                      <form onSubmit={handleSubmit(handleCheckout)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                              {...register('name')}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee-dark focus:ring-coffee-dark"
                            />
                            {renderError(errors.name)}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              {...register('email')}
                              type="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee-dark focus:ring-coffee-dark"
                            />
                            {renderError(errors.email)}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                              {...register('phone')}
                              type="tel"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-coffee-dark focus:ring-coffee-dark"
                            />
                            {renderError(errors.phone)}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isProcessing || state.items.length === 0}
                          className="w-full py-3 px-4 bg-coffee-dark text-white rounded-lg hover:bg-coffee-dark/90
                            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span>Pay ${state.total.toFixed(2)}</span>
                              <span>→</span>
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer - Always visible */}
              {state.items.length > 0 && activeSection === 'cart' && (
                <div className="sticky bottom-0 mt-auto pt-4 pb-4 px-4 sm:px-6 bg-white/80 
                  backdrop-blur-md border-t border-gray-100"
                >
                  <button
                    onClick={handleContinueToCheckout}
                    className="w-full py-3 px-4 bg-coffee-dark text-white rounded-lg 
                      hover:bg-coffee-dark/90 transition-colors"
                  >
                    Continue to Checkout (${state.total.toFixed(2)})
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
