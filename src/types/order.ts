export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface OrderTrackingInfo {
  orderId: string;
  status: OrderStatus;
  estimatedTime?: number; // in minutes
  lastUpdated: Date;
}
