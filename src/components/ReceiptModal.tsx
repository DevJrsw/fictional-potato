import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any;
  settings?: any;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  transaction,
  settings
}) => {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Receipt</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Print Receipt"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 bg-white print:p-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{settings?.businessName || 'POS Pro'}</h1>
            <p className="text-gray-600">Point of Sale System</p>
            <p className="text-sm text-gray-500">{settings?.businessAddress || '123 Main Street, City, State 12345'}</p>
            <p className="text-sm text-gray-500">Phone: {settings?.businessPhone || '(555) 123-4567'}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Receipt #:</span>
              <span className="font-mono">{transaction.id.slice(-8)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Date:</span>
              <span>{formatDate(transaction.timestamp)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Cashier:</span>
              <span>{transaction.cashier}</span>
            </div>
            {transaction.customerName && (
              <div className="flex justify-between text-sm">
                <span>Customer:</span>
                <span>{transaction.customerName}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="mb-4">
            {transaction.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {formatCurrency(item.price)}
                  </p>
                </div>
                <span className="font-medium text-gray-900 text-sm">
                  {formatCurrency(item.subtotal)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatCurrency(transaction.subtotal)}</span>
            </div>
            {transaction.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(transaction.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>{formatCurrency(transaction.tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
              <span>Total:</span>
              <span>{formatCurrency(transaction.total)}</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Payment Method:</span>
              <span className="capitalize">{transaction.paymentMethod}</span>
            </div>
            {transaction.paymentMethod === 'cash' && transaction.cashReceived && (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <span>Cash Received:</span>
                  <span>{formatCurrency(transaction.cashReceived)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Change:</span>
                  <span>{formatCurrency(transaction.cashReceived - transaction.total)}</span>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{settings?.receiptFooter || 'Thank you for your business!'}</p>
            <p className="text-xs text-gray-500 mt-2">
              Please keep this receipt for your records
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;