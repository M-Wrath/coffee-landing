import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OrderStatus, OrderTrackingInfo } from '@/types/order';

const statusSteps: OrderStatus[] = [
  'confirmed',
  'preparing',
  'ready',
  'completed'
];

interface OrderTrackingProps {
  orderId: string;
}

export default function OrderTracking({ orderId }: OrderTrackingProps) {
  const [orderInfo, setOrderInfo] = useState<OrderTrackingInfo | null>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        setOrderInfo(data);
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    // Initial fetch
    fetchOrderStatus();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrderStatus, 30000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!orderInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Order #{orderId}</h2>
      
      <div className="relative">
        {statusSteps.map((step, index) => {
          const isCompleted = statusSteps.indexOf(orderInfo.status) >= index;
          const isCurrent = orderInfo.status === step;
          
          return (
            <div key={step} className="flex items-center mb-4">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? '#3C2A21' : '#E5E7EB',
                  scale: isCurrent ? 1.1 : 1,
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              >
                {isCompleted ? '✓' : index + 1}
              </motion.div>
              <div className="ml-4">
                <p className="font-medium capitalize">{step}</p>
                {isCurrent && orderInfo.estimatedTime && (
                  <p className="text-sm text-gray-500">
                    Est. time: {orderInfo.estimatedTime} mins
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
