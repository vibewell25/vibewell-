import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PreferencesForm } from '@vibewell/ui-native/components/PreferencesForm';
import { 
  getUserPreferences,
  updateUserPreferences
} from '@vibewell/api/src/users';

export default function PreferencesScreen({ navigation }: any) {
  const [userId, setUserId] = useState<string>('mock-user-id');
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user preferences
  useEffect(() => {
    const fetchUserPreferences = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd get the userId from auth context
        const mockUserId = 'mock-user-id';
        setUserId(mockUserId);
        
        // Fetch user preferences
        const preferencesResponse = await getUserPreferences(mockUserId);
        if (preferencesResponse.data?.preferences) {
          setUserPreferences(preferencesResponse.data.preferences);
        } else {
          // Mock data for demo
          setUserPreferences({
            skinType: ['combination', 'sensitive'],
            skinGoals: ['hydration', 'anti-aging'],
            notifications: {
              email: true,
              sms: false,
              promotions: true
            },
            preferredLanguage: 'en'
          });
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserPreferences();
  }, []);

  const handleUpdatePreferences = async (preferences: any) => {
    try {
      await updateUserPreferences(userId, preferences);
      setUserPreferences(preferences);
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating preferences:', error);
      return Promise.reject(error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F56565" />
        <Text style={styles.loadingText}>Loading preferences...</Text>
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
        <Text style={styles.headerTitle}>Preferences</Text>
        <View style={styles.backButton} />
      </View>
      
      <PreferencesForm 
        userId={userId}
        initialPreferences={userPreferences}
        onSave={handleUpdatePreferences}
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