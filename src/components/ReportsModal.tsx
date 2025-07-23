import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, ShoppingCart, Users, Calendar, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: any[];
}

const ReportsModal: React.FC<ReportsModalProps> = ({
  isOpen,
  onClose,
  transactions
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  if (!isOpen) return null;

  // Calculate metrics
  const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = transactions.length;
  const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;
  const totalItems = transactions.reduce((sum, t) => sum + t.items.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0), 0);

  const periods = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' }
  ];

  const metrics = [
    {
      title: 'Total Sales',
      value: formatCurrency(totalSales),
      icon: DollarSign,
      color: 'green',
      change: '+12.5%'
    },
    {
      title: 'Transactions',
      value: totalTransactions.toString(),
      icon: ShoppingCart,
      color: 'blue',
      change: '+8.2%'
    },
    {
      title: 'Average Order',
      value: formatCurrency(averageTransaction),
      icon: TrendingUp,
      color: 'purple',
      change: '+5.1%'
    },
    {
      title: 'Items Sold',
      value: totalItems.toString(),
      icon: Users,
      color: 'orange',
      change: '+15.3%'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sales Reports</h2>
            <p className="text-gray-600">Analytics and insights for your business</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Period Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>
            <button className="ml-auto flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <span className="text-green-600 text-sm font-medium">{metric.change}</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-gray-600 text-sm">{metric.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[65, 45, 78, 52, 89, 67, 93].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {[
                  { name: 'Premium Coffee Beans', sales: 85, revenue: '$2,125' },
                  { name: 'Gourmet Sandwich', sales: 67, revenue: '$854' },
                  { name: 'Fresh Croissant', sales: 54, revenue: '$175' },
                  { name: 'Organic Green Tea', sales: 43, revenue: '$796' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 w-4">{index + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${product.sales}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{product.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Payment</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">
                        #{transaction.id.slice(-8)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(transaction.timestamp)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.customerName || 'Walk-in'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {transaction.items.length} items
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 capitalize">
                        {transaction.paymentMethod}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                        {formatCurrency(transaction.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModal;