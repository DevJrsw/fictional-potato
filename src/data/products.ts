import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Beans',
    price: 24.99,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '1234567890123',
    stock: 45,
    description: 'Artisan roasted coffee beans',
    tax: 0.08
  },
  {
    id: '2',
    name: 'Organic Green Tea',
    price: 18.50,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '2345678901234',
    stock: 32,
    description: 'Premium organic green tea leaves',
    tax: 0.08
  },
  {
    id: '3',
    name: 'Artisan Chocolate Bar',
    price: 8.99,
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '3456789012345',
    stock: 67,
    description: 'Dark chocolate with sea salt',
    tax: 0.08
  },
  {
    id: '4',
    name: 'Fresh Croissant',
    price: 3.25,
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '4567890123456',
    stock: 28,
    description: 'Buttery, flaky croissant',
    tax: 0.08
  },
  {
    id: '5',
    name: 'Gourmet Sandwich',
    price: 12.75,
    category: 'Food',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '5678901234567',
    stock: 19,
    description: 'Turkey and avocado on sourdough',
    tax: 0.08
  },
  {
    id: '6',
    name: 'Fresh Fruit Smoothie',
    price: 7.50,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '6789012345678',
    stock: 41,
    description: 'Mixed berry smoothie with yogurt',
    tax: 0.08
  },
  {
    id: '7',
    name: 'Organic Salad Bowl',
    price: 14.25,
    category: 'Food',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '7890123456789',
    stock: 23,
    description: 'Mixed greens with vinaigrette',
    tax: 0.08
  },
  {
    id: '8',
    name: 'Pastry Assortment',
    price: 16.99,
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=300',
    barcode: '8901234567890',
    stock: 15,
    description: 'Selection of Danish pastries',
    tax: 0.08
  }
];

export const categories = ['All', 'Beverages', 'Food', 'Snacks', 'Bakery'];