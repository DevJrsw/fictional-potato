// Local storage utilities for data persistence
export class StorageManager {
  private static instance: StorageManager;
  
  private constructor() {}
  
  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // Products
  saveProducts(products: any[]): void {
    localStorage.setItem('pos_products', JSON.stringify(products));
  }

  loadProducts(): any[] {
    const data = localStorage.getItem('pos_products');
    return data ? JSON.parse(data) : [];
  }

  // Customers
  saveCustomers(customers: any[]): void {
    localStorage.setItem('pos_customers', JSON.stringify(customers));
  }

  loadCustomers(): any[] {
    const data = localStorage.getItem('pos_customers');
    return data ? JSON.parse(data) : [];
  }

  // Transactions
  saveTransactions(transactions: any[]): void {
    localStorage.setItem('pos_transactions', JSON.stringify(transactions));
  }

  loadTransactions(): any[] {
    const data = localStorage.getItem('pos_transactions');
    return data ? JSON.parse(data) : [];
  }

  // Settings
  saveSettings(settings: any): void {
    localStorage.setItem('pos_settings', JSON.stringify(settings));
  }

  loadSettings(): any {
    const data = localStorage.getItem('pos_settings');
    return data ? JSON.parse(data) : {
      businessName: 'Your Business Name',
      businessAddress: '123 Main Street, City, State 12345',
      businessPhone: '(555) 123-4567',
      taxRate: 0.08,
      currency: 'USD',
      receiptFooter: 'Thank you for your business!',
      lowStockThreshold: 10,
      enableLoyaltyProgram: true,
      loyaltyPointsRate: 1, // 1 point per dollar
      autoBackup: true
    };
  }

  // Backup and restore
  exportData(): string {
    const data = {
      products: this.loadProducts(),
      customers: this.loadCustomers(),
      transactions: this.loadTransactions(),
      settings: this.loadSettings(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.products) this.saveProducts(data.products);
      if (data.customers) this.saveCustomers(data.customers);
      if (data.transactions) this.saveTransactions(data.transactions);
      if (data.settings) this.saveSettings(data.settings);
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  // Clear all data (for testing or reset)
  clearAllData(): void {
    localStorage.removeItem('pos_products');
    localStorage.removeItem('pos_customers');
    localStorage.removeItem('pos_transactions');
    localStorage.removeItem('pos_settings');
  }
}