export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  barcode: string;
  stock: number;
  description: string;
  tax: number;
}

export interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalSpent: number;
}

export interface Transaction {
  id: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  timestamp: Date;
  cashier: string;
  customerName?: string;
  cashReceived?: number;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'cashier' | 'manager';
  avatar: string;
}