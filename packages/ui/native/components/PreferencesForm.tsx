import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PreferencesFormProps {
  userId: string;
  initialPreferences?: {
    skinType?: string[];
    skinGoals?: string[];
    notifications?: {
      email?: boolean;
      sms?: boolean;
      promotions?: boolean;
    };
    preferredLanguage?: string;
  };
  onSave: (preferences: {
    skinType: string[];
    skinGoals: string[];
    notifications: {
      email: boolean;
      sms: boolean;
      promotions: boolean;
    };
    preferredLanguage: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

const SKIN_TYPES = [
  { id: 'normal', label: 'Normal' },
  { id: 'dry', label: 'Dry' },
  { id: 'oily', label: 'Oily' },
  { id: 'combination', label: 'Combination' },
  { id: 'sensitive', label: 'Sensitive' },
];

const SKIN_GOALS = [
  { id: 'hydration', label: 'Hydration' },
  { id: 'anti-aging', label: 'Anti-Aging' },
  { id: 'acne', label: 'Acne Control' },
  { id: 'brightening', label: 'Brightening' },
  { id: 'firming', label: 'Firming' },
  { id: 'even-tone', label: 'Even Tone' },
];

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
];

export function PreferencesForm({
  userId,
  initialPreferences = {},
  onSave,
  isLoading = false,
}: PreferencesFormProps) {
  const [skinType, setSkinType] = useState<string[]>(
    initialPreferences?.skinType || []
  );
  const [skinGoals, setSkinGoals] = useState<string[]>(
    initialPreferences?.skinGoals || []
  );
  const [notificationEmail, setNotificationEmail] = useState<boolean>(
    initialPreferences?.notifications?.email ?? true
  );
  const [notificationSms, setNotificationSms] = useState<boolean>(
    initialPreferences?.notifications?.sms ?? false
  );
  const [notificationPromotions, setNotificationPromotions] = useState<boolean>(
    initialPreferences?.notifications?.promotions ?? false
  );
  const [preferredLanguage, setPreferredLanguage] = useState<string>(
    initialPreferences?.preferredLanguage || 'en'
  );
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialPreferences) {
      setSkinType(initialPreferences.skinType || []);
      setSkinGoals(initialPreferences.skinGoals || []);
      setNotificationEmail(initialPreferences.notifications?.email ?? true);
      setNotificationSms(initialPreferences.notifications?.sms ?? false);
      setNotificationPromotions(initialPreferences.notifications?.promotions ?? false);
      setPreferredLanguage(initialPreferences.preferredLanguage || 'en');
    }
  }, [initialPreferences]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await onSave({
        skinType,
        skinGoals,
        notifications: {
          email: notificationEmail,
          sms: notificationSms,
          promotions: notificationPromotions,
        },
        preferredLanguage,
      });
      Alert.alert('Success', 'Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      Alert.alert('Error', 'Failed to update preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSkinType = (id: string) => {
    setSkinType((current) =>
      current.includes(id)
        ? current.filter((type) => type !== id)
        : [...current, id]
    );
  };

  const toggleSkinGoal = (id: string) => {
    setSkinGoals((current) =>
      current.includes(id)
        ? current.filter((goal) => goal !== id)
        : [...current, id]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preferences & Settings</Text>

      {/* Skin Type Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skin Type</Text>
        <Text style={styles.sectionDescription}>
          Select all that apply to receive personalized recommendations
        </Text>
        <View style={styles.optionsGrid}>
          {SKIN_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.optionButton,
                skinType.includes(type.id) && styles.selectedOptionButtonCoral,
              ]}
              onPress={() => toggleSkinType(type.id)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  skinType.includes(type.id) && styles.selectedOptionTextCoral,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Skin Goals Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skin Goals</Text>
        <Text style={styles.sectionDescription}>
          What are you looking to improve?
        </Text>
        <View style={styles.optionsGrid}>
          {SKIN_GOALS.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.optionButton,
                skinGoals.includes(goal.id) && styles.selectedOptionButtonTeal,
              ]}
              onPress={() => toggleSkinGoal(goal.id)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  skinGoals.includes(goal.id) && styles.selectedOptionTextTeal,
                ]}
              >
                {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notification Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.switchItem}>
          <Text style={styles.switchLabel}>
            Email notifications for bookings and appointments
          </Text>
          <Switch
            value={notificationEmail}
            onValueChange={setNotificationEmail}
            trackColor={{ false: '#DDD', true: '#F56565' }}
            thumbColor={Platform.OS === 'android' ? '#F56565' : ''}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchLabel}>
            SMS reminders for upcoming appointments
          </Text>
          <Switch
            value={notificationSms}
            onValueChange={setNotificationSms}
            trackColor={{ false: '#DDD', true: '#F56565' }}
            thumbColor={Platform.OS === 'android' ? '#F56565' : ''}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.switchLabel}>
            Promotional offers and new service announcements
          </Text>
          <Switch
            value={notificationPromotions}
            onValueChange={setNotificationPromotions}
            trackColor={{ false: '#DDD', true: '#F56565' }}
            thumbColor={Platform.OS === 'android' ? '#F56565' : ''}
          />
        </View>
      </View>

      {/* Language Preference */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Preference</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={preferredLanguage}
            onValueChange={(itemValue) => setPreferredLanguage(itemValue)}
            style={styles.picker}
          >
            {LANGUAGES.map((language) => (
              <Picker.Item
                key={language.id}
                label={language.label}
                value={language.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, (isSaving || isLoading) && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isSaving || isLoading}
      >
        {isSaving ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        )}
      </TouchableOpacity>
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
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    minWidth: '45%',
    alignItems: 'center',
  },
  selectedOptionButtonCoral: {
    backgroundColor: '#FEF2F2',
    borderColor: '#F56565',
  },
  selectedOptionButtonTeal: {
    backgroundColor: '#E6FFFA',
    borderColor: '#38B2AC',
  },
  optionButtonText: {
    color: '#4A5568',
    fontSize: 14,
  },
  selectedOptionTextCoral: {
    color: '#E53E3E',
    fontWeight: '500',
  },
  selectedOptionTextTeal: {
    color: '#2C7A7B',
    fontWeight: '500',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  switchLabel: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
    paddingRight: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#F7FAFC',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#F56565',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 