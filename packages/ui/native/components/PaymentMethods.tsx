import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
  Platform
} from 'react-native';

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

    try {
      await onSetDefaultMethod(paymentMethodId);
      
      // Update UI to reflect the change
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === paymentMethodId,
      }));
      
      setPaymentMethods(updatedMethods);
      Alert.alert('Success', 'Default payment method updated');
    } catch (error) {
      console.error('Error setting default payment method:', error);
      Alert.alert('Error', 'Failed to update default payment method');
    } finally {
      setIsProcessing(false);
    }
  };

  const addNewPaymentMethod = async () => {
    if (!cardDetails.cardNumber || !cardDetails.expMonth || !cardDetails.expYear || !cardDetails.cvc) {
      Alert.alert('Validation Error', 'Please fill in all card details');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock payment method
      const mockPaymentMethod: PaymentMethod = {
        id: `pm_mock_${Date.now()}`,
        card: {
          brand: 'visa',
          last4: cardDetails.cardNumber.slice(-4) || '1234',
          exp_month: parseInt(cardDetails.expMonth) || 12,
          exp_year: parseInt(cardDetails.expYear) || 2025,
        },
        isDefault: paymentMethods.length === 0 // Set as default if it's the first card
      };
      
      // Call the onAddPaymentMethod prop (which would make the API call in a real app)
      await onAddPaymentMethod(mockPaymentMethod.id);
      
      // Update the UI
      setPaymentMethods([...paymentMethods, mockPaymentMethod]);
      setIsAddingCard(false);
      setCardDetails({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        cardholderName: ''
      });
      Alert.alert('Success', 'Payment method added successfully');
      
    } catch (error) {
      console.error('Error adding payment method:', error);
      Alert.alert('Error', 'Failed to add payment method');
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Methods</Text>

      {paymentMethods.length > 0 ? (
        <View style={styles.methodsList}>
          {paymentMethods.map((method) => (
            <View
              key={method.id}
              style={[
                styles.paymentMethodCard,
                method.isDefault && styles.defaultPaymentMethodCard,
              ]}
            >
              <View style={styles.cardInfo}>
                <Text style={styles.cardIcon}>{getCardIcon(method.card.brand)}</Text>
                <View>
                  <Text style={styles.cardNumber}>
                    •••• {method.card.last4}
                  </Text>
                  <Text style={styles.cardExpiry}>
                    Expires {formatExpiryDate(method.card.exp_month, method.card.exp_year)}
                  </Text>
                </View>
              </View>
              {method.isDefault ? (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.setDefaultButton}
                  onPress={() => setDefaultPaymentMethod(method.id)}
                  disabled={isProcessing || isLoading}
                >
                  <Text style={styles.setDefaultButtonText}>Set as Default</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            You don't have any payment methods yet.
          </Text>
        </View>
      )}

      {!isAddingCard ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddingCard(true)}
        >
          <Text style={styles.addButtonText}>+ Add Payment Method</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.addCardForm}>
          <Text style={styles.formTitle}>Add New Card</Text>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              value={cardDetails.cardholderName}
              onChangeText={(text) => setCardDetails({...cardDetails, cardholderName: text})}
              placeholder="John Smith"
              placeholderTextColor="#AAAAAA"
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={cardDetails.cardNumber}
              onChangeText={(text) => setCardDetails({...cardDetails, cardNumber: text})}
              placeholder="4242 4242 4242 4242"
              placeholderTextColor="#AAAAAA"
              keyboardType="number-pad"
              maxLength={19}
            />
          </View>
          
          <View style={styles.row}>
            <View style={[styles.formField, styles.column]}>
              <Text style={styles.label}>Exp. Month</Text>
              <TextInput
                style={styles.input}
                value={cardDetails.expMonth}
                onChangeText={(text) => setCardDetails({...cardDetails, expMonth: text})}
                placeholder="MM"
                placeholderTextColor="#AAAAAA"
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
            
            <View style={[styles.formField, styles.column]}>
              <Text style={styles.label}>Exp. Year</Text>
              <TextInput
                style={styles.input}
                value={cardDetails.expYear}
                onChangeText={(text) => setCardDetails({...cardDetails, expYear: text})}
                placeholder="YYYY"
                placeholderTextColor="#AAAAAA"
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
            
            <View style={[styles.formField, styles.column]}>
              <Text style={styles.label}>CVC</Text>
              <TextInput
                style={styles.input}
                value={cardDetails.cvc}
                onChangeText={(text) => setCardDetails({...cardDetails, cvc: text})}
                placeholder="123"
                placeholderTextColor="#AAAAAA"
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsAddingCard(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.submitButton, isProcessing && styles.disabledButton]}
              onPress={addNewPaymentMethod}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Add Card</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333333',
  },
  methodsList: {
    marginBottom: 20,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  defaultPaymentMethodCard: {
    borderColor: '#F56565',
    backgroundColor: '#FEF2F2',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 12,
    fontSize: 18,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666666',
  },
  defaultBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F56565',
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  setDefaultButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
  },
  setDefaultButtonText: {
    color: '#666666',
    fontSize: 12,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 20,
  },
  emptyStateText: {
    color: '#666666',
    fontSize: 16,
  },
  addButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#F56565',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#F56565',
    fontSize: 16,
    fontWeight: '500',
  },
  addCardForm: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F56565',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 