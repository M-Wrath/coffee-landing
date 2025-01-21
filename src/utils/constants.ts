import type { MenuItem, MenuCategory } from '@/types';

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Hot Coffee',
  'Cold Coffee',
  'Signature Drinks',
  'Pastries',
  'Light Bites'
];

export const MENU_ITEMS: MenuItem[] = [
  // Hot Coffee
  {
    id: 'hot-1',
    name: 'Classic Espresso',
    description: 'Rich and bold signature espresso shot',
    price: 3.49,
    category: 'Hot Coffee',
    image: '/images/menu/espresso.jpg',
    isPopular: true
  },
  {
    id: 'hot-2',
    name: 'Mocha & Co Cappuccino',
    description: 'Our signature espresso with perfectly steamed milk and dense foam',
    price: 4.99,
    category: 'Hot Coffee',
    image: '/images/menu/cappuccino.jpg',
    isPopular: true
  },
  {
    id: 'hot-3',
    name: 'Artisan Café Latte',
    description: 'Smooth espresso with silky steamed milk and light foam',
    price: 4.79,
    category: 'Hot Coffee',
    image: '/images/menu/latte.jpg'
  },

  // Cold Coffee
  {
    id: 'cold-1',
    name: 'Signature Cold Brew',
    description: '18-hour slow-steeped coffee with subtle chocolate notes',
    price: 4.99,
    category: 'Cold Coffee',
    image: '/images/menu/cold-brew.jpg',
    isPopular: true
  },
  {
    id: 'cold-2',
    name: 'Iced Vanilla Latte',
    description: 'Espresso and milk over ice with vanilla syrup',
    price: 5.49,
    category: 'Cold Coffee',
    image: '/images/menu/iced-latte.jpg'
  },
  {
    id: 'cold-3',
    name: 'Mocha Frappuccino',
    description: 'Blended coffee with rich chocolate and whipped cream',
    price: 5.99,
    category: 'Cold Coffee',
    image: '/images/menu/frappuccino.jpg'
  },

  // Signature Drinks
  {
    id: 'sig-1',
    name: 'Mocha & Co Special',
    description: 'House blend with caramel, vanilla, and a secret ingredient',
    price: 6.99,
    category: 'Signature Drinks',
    image: '/images/menu/signature.jpg',
    isPopular: true
  },
  {
    id: 'sig-2',
    name: 'Honey Lavender Latte',
    description: 'Local honey and organic lavender with our signature espresso',
    price: 6.49,
    category: 'Signature Drinks',
    image: '/images/menu/honey-lavender.jpg'
  },
  {
    id: 'sig-3',
    name: 'Maple Cinnamon Cappuccino',
    description: 'Real maple syrup and Ceylon cinnamon with espresso',
    price: 6.29,
    category: 'Signature Drinks',
    image: '/images/menu/maple-cinnamon.jpg'
  },

  // Pastries
  {
    id: 'pastry-1',
    name: 'Butter Croissant',
    description: 'Freshly baked French-style butter croissant',
    price: 3.99,
    category: 'Pastries',
    image: '/images/menu/croissant.jpg',
    isPopular: true
  },
  {
    id: 'pastry-2',
    name: 'Pain au Chocolat',
    description: 'Chocolate-filled butter croissant',
    price: 4.29,
    category: 'Pastries',
    image: '/images/menu/pain-au-chocolat.jpg'
  },
  {
    id: 'pastry-3',
    name: 'Almond Croissant',
    description: 'Butter croissant filled with almond cream',
    price: 4.49,
    category: 'Pastries',
    image: '/images/menu/almond-croissant.jpg'
  },

  // Light Bites
  {
    id: 'bite-1',
    name: 'Avocado Toast',
    description: 'Sourdough with smashed avocado, seeds, and microgreens',
    price: 8.99,
    category: 'Light Bites',
    image: '/images/menu/avocado-toast.jpg',
    isPopular: true
  },
  {
    id: 'bite-2',
    name: 'Acai Bowl',
    description: 'Organic acai blend with granola and fresh fruits',
    price: 9.49,
    category: 'Light Bites',
    image: '/images/menu/acai-bowl.jpg'
  },
  {
    id: 'bite-3',
    name: 'Quinoa Breakfast Bowl',
    description: 'Warm quinoa with poached egg and vegetables',
    price: 10.99,
    category: 'Light Bites',
    image: '/images/menu/quinoa-bowl.jpg'
  }
];
