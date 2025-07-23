import React, { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: (paymentMethod: string, amountPaid: number) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  total,
  onPaymentComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    setTimeout(() => {
      const amountPaid = selectedMethod === 'cash' ? parseFloat(cashAmount) || total : total;
      onPaymentComplete(selectedMethod, amountPaid);
      setPaymentSuccess(false);
      setCashAmount('');
      onClose();
    }, 1500);
  };

  const cashAmountNum = parseFloat(cashAmount) || 0;
  const change = cashAmountNum - total;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'blue' },
    { id: 'cash', name: 'Cash', icon: Banknote, color: 'green' },
    { id: 'digital', name: 'Digital Wallet', icon: Smartphone, color: 'purple' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Transaction completed successfully</p>
            </div>
          ) : (
            <>
              {/* Total Amount */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(total)}</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</p>
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedMethod === method.id
                            ? `border-${method.color}-500 bg-${method.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          selectedMethod === method.id 
                            ? `text-${method.color}-600` 
                            : 'text-gray-500'
                        }`} />
                        <span className={`font-medium ${
                          selectedMethod === method.id 
                            ? `text-${method.color}-900` 
                            : 'text-gray-700'
                        }`}>
                          {method.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cash Payment Input */}
              {selectedMethod === 'cash' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cash Amount Received
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {cashAmountNum > 0 && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Total:</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Received:</span>
                        <span>{formatCurrency(cashAmountNum)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-2 mt-2">
                        <span>Change:</span>
                        <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(Math.max(0, change))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Process Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || (selectedMethod === 'cash' && cashAmountNum < total)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Process Payment</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;