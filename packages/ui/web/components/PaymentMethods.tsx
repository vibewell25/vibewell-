import React, { useState, useEffect } from 'react';

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  isDefault?: boolean;
}

interface PaymentMethodsProps {
  userId: string;
  defaultPaymentMethodId?: string;
  onSetDefaultMethod: (paymentMethodId: string) => Promise<void>;
  onAddPaymentMethod: (paymentMethodId: string) => Promise<void>;
  isLoading?: boolean;
}

export function PaymentMethods({
  userId,
  defaultPaymentMethodId,
  onSetDefaultMethod,
  onAddPaymentMethod,
  isLoading = false,
}: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    cardholderName: ''
  });

  // Fetch payment methods (mock for now)
  useEffect(() => {
    // In a real implementation, this would call your API
    // For now, we'll mock some data
    const mockPaymentMethods = [
      {
        id: 'pm_123456',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2025,
        },
        isDefault: defaultPaymentMethodId === 'pm_123456',
      },
      {
        id: 'pm_789012',
        card: {
          brand: 'mastercard',
          last4: '8888',
          exp_month: 9,
          exp_year: 2024,
        },
        isDefault: defaultPaymentMethodId === 'pm_789012',
      },
    ];
    
    setPaymentMethods(mockPaymentMethods);
  }, [defaultPaymentMethodId]);

  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    setIsProcessing(true);
    setMessage({ text: '', type: '' });

    try {
      await onSetDefaultMethod(paymentMethodId);
      
      // Update UI to reflect the change
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === paymentMethodId,
      }));
      
      setPaymentMethods(updatedMethods);
      setMessage({ text: 'Default payment method updated', type: 'success' });
    } catch (error) {
      console.error('Error setting default payment method:', error);
      setMessage({ text: 'Failed to update default payment method', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock payment method
      const newPaymentMethod: PaymentMethod = {
        id: `pm_mock_${Date.now()}`,
        card: {
          brand: 'visa',
          last4: cardDetails.cardNumber.slice(-4) || '1234',
          exp_month: parseInt(cardDetails.expMonth) || 12,
          exp_year: parseInt(cardDetails.expYear) || 2025,
        },
        isDefault: paymentMethods.length === 0 // Set as default if it's the first card
      };
      
      await onAddPaymentMethod(newPaymentMethod.id);
      
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setIsAddingCard(false);
      setCardDetails({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        cardholderName: ''
      });
      setMessage({ text: 'Payment method added successfully', type: 'success' });
    } catch (error) {
      console.error('Error adding payment method:', error);
      setMessage({ text: 'Failed to add payment method', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳 Visa';
      case 'mastercard':
        return '💳 Mastercard';
      case 'amex':
        return '💳 American Express';
      case 'discover':
        return '💳 Discover';
      default:
        return '💳 Card';
    }
  };

  const formatExpiryDate = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
        Payment Methods
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {paymentMethods.length > 0 ? (
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-md p-4 flex justify-between items-center ${
                method.isDefault
                  ? 'border-coral-500 bg-coral-50 dark:bg-coral-900/20'
                  : 'border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3 text-xl">{getCardIcon(method.card.brand)}</div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    •••• {method.card.last4}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Expires {formatExpiryDate(method.card.exp_month, method.card.exp_year)}
                  </p>
                </div>
              </div>
              {method.isDefault ? (
                <span className="px-3 py-1 bg-coral-100 text-coral-700 dark:bg-coral-900 dark:text-coral-300 text-xs font-medium rounded-full">
                  Default
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setDefaultPaymentMethod(method.id)}
                  disabled={isProcessing || isLoading}
                  className="px-3 py-1 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 mb-6 bg-neutral-50 dark:bg-neutral-900 rounded-md">
          <p className="text-neutral-500 dark:text-neutral-400">
            You don't have any payment methods yet.
          </p>
        </div>
      )}

      {!isAddingCard ? (
        <button
          type="button"
          onClick={() => setIsAddingCard(true)}
          className="w-full px-4 py-2 border border-coral-500 text-coral-600 dark:text-coral-400 rounded-md hover:bg-coral-50 dark:hover:bg-coral-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
        >
          + Add Payment Method
        </button>
      ) : (
        <div className="border border-neutral-300 dark:border-neutral-700 rounded-md p-4">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
            Add New Card
          </h3>
          <form onSubmit={handleAddCard}>
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="cardholderName" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardholderName"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  placeholder="John Smith"
                  required
                />
              </div>
              
              <div>
                <label 
                  htmlFor="cardNumber" 
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label 
                    htmlFor="expMonth" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Exp. Month
                  </label>
                  <input
                    type="text"
                    id="expMonth"
                    value={cardDetails.expMonth}
                    onChange={(e) => setCardDetails({...cardDetails, expMonth: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                    placeholder="MM"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="expYear" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Exp. Year
                  </label>
                  <input
                    type="text"
                    id="expYear"
                    value={cardDetails.expYear}
                    onChange={(e) => setCardDetails({...cardDetails, expYear: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                    placeholder="YYYY"
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="cvc" 
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingCard(false)}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 disabled:opacity-50"
              >
                {isProcessing ? 'Adding...' : 'Add Card'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 