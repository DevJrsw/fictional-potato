import { CartItem } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = items.reduce((sum, item) => sum + (item.subtotal * item.tax), 0);
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
};

export const generateReceiptId = (): string => {
  return `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
};

export const generateBarcode = (): string => {
  return Math.random().toString().substr(2, 13);
};