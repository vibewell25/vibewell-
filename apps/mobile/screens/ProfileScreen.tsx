import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileForm } from '@vibewell/ui-native/components/ProfileForm';
import { 
  getUserProfile, 
  updateUserProfile 
} from '@vibewell/api/src/users';

export default function ProfileScreen({ navigation }: any) {
  const [userId, setUserId] = useState<string>('mock-user-id');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd get the userId from auth context
        const mockUserId = 'mock-user-id';
        setUserId(mockUserId);
        
        // Fetch user profile data
        const profileResponse = await getUserProfile(mockUserId);
        if (profileResponse.data) {
          setUserProfile(profileResponse.data);
        } else {
          // Mock data for demo
          setUserProfile({
            id: 'profile-1',
            user_id: mockUserId,
            name: 'Sarah Johnson',
            avatar_url: 'https://example.com/profile.jpg', // Mock URL
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
            default_payment_method: 'pm_123456'
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (data: any) => {
    try {
      await updateUserProfile(userId, data);
      setUserProfile({ ...userProfile, ...data });
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating profile:', error);
      return Promise.reject(error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F56565" />
        <Text style={styles.loadingText}>Loading profile...</Text>
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.backButton} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          {userProfile?.avatar_url ? (
            <Image 
              source={{ uri: userProfile.avatar_url }} 
              style={styles.avatar} 
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>
                {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          )}
          <Text style={styles.userName}>{userProfile?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{userProfile?.email || ''}</Text>
        </View>
        
        <View style={styles.formContainer}>
          <ProfileForm
            userId={userId}
            initialData={userProfile}
            onSave={handleUpdateProfile}
            isLoading={isLoading}
          />
        </View>
        
        <View style={styles.otherOptions}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('PreferencesScreen')}
          >
            <Text style={styles.optionButtonText}>Preferences</Text>
            <Text style={styles.optionButtonIcon}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('PaymentMethodsScreen')}
          >
            <Text style={styles.optionButtonText}>Payment Methods</Text>
            <Text style={styles.optionButtonIcon}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F56565',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarPlaceholderText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
  },
  formContainer: {
    paddingTop: 16,
  },
  otherOptions: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  optionButtonIcon: {
    fontSize: 18,
    color: '#999999',
  },
}); 