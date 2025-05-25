import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentMethods } from '@vibewell/ui-native/components/PaymentMethods';
import { 
  getUserProfile,
  setDefaultPaymentMethod,
  listPaymentMethods
} from '@vibewell/api/src/users';

export default function PaymentMethodsScreen({ navigation }: any) {
  const [userId, setUserId] = useState<string>('mock-user-id');
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user payment info
  useEffect(() => {
    const fetchUserPaymentInfo = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd get the userId from auth context
        const mockUserId = 'mock-user-id';
        setUserId(mockUserId);
        
        // Fetch user profile data to get default payment method
        const profileResponse = await getUserProfile(mockUserId);
        if (profileResponse.data) {
          setDefaultPaymentMethodId(profileResponse.data.default_payment_method);
        } else {
          // Mock data for demo
          setDefaultPaymentMethodId('pm_123456');
        }
      } catch (error) {
        console.error('Error fetching user payment info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserPaymentInfo();
  }, []);

  const handleSetDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      await setDefaultPaymentMethod(userId, paymentMethodId);
      setDefaultPaymentMethodId(paymentMethodId);
      return Promise.resolve();
    } catch (error) {
      console.error('Error setting default payment method:', error);
      return Promise.reject(error);
    }
  };
  
  const handleAddPaymentMethod = async (paymentMethodId: string) => {
    // In a real app, this would be handled by your backend
    console.log('Adding payment method:', paymentMethodId);
    return Promise.resolve();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F56565" />
        <Text style={styles.loadingText}>Loading payment methods...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.backButton} />
      </View>
      
      <PaymentMethods
        userId={userId}
        defaultPaymentMethodId={defaultPaymentMethodId}
        onSetDefaultMethod={handleSetDefaultPaymentMethod}
        onAddPaymentMethod={handleAddPaymentMethod}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#F56565',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
}); 