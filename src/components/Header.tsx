import React from 'react';
import { User, Search, Settings, BarChart3, Users, Package, LogOut, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  onOpenReports: () => void;
  onOpenCustomers: () => void;
  onOpenInventory: () => void;
  onOpenSettings: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  lowStockCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenReports,
  onOpenCustomers,
  onOpenInventory,
  onOpenSettings,
  searchQuery,
  onSearchChange,
  lowStockCount = 0
}) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">POS Pro</h1>
              <p className="text-sm text-gray-500">Point of Sale System</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Navigation and User */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenReports}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Reports"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenCustomers}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Customers"
            >
              <Users className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={onOpenInventory}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Inventory"
              >
                <Package className="w-5 h-5" />
              </button>
              {lowStockCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {lowStockCount}
                </div>
              )}
            </div>
            <button 
              onClick={onOpenSettings}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
              <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;