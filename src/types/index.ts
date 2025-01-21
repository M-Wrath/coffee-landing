// ...existing code...

export type MenuCategory = 'All' | 'Hot Coffee' | 'Cold Coffee' | 'Signature Drinks' | 'Pastries' | 'Light Bites';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isPopular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface OrderDetails {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface PaymentDetails {
  paymentIntentId: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed';
}

export interface Order extends OrderDetails {
  id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  paymentDetails: PaymentDetails;
  createdAt: Date;
  updatedAt: Date;
}
