import React, { useState, useEffect } from 'react';

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
  const [message, setMessage] = useState({ text: '', type: '' });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

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
      setMessage({ text: 'Preferences updated successfully', type: 'success' });
    } catch (error) {
      console.error('Error updating preferences:', error);
      setMessage({ text: 'Failed to update preferences', type: 'error' });
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
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
        Preferences & Settings
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

      <form onSubmit={handleSubmit}>
        {/* Skin Type Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-3">
            Skin Type
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            Select all that apply to receive personalized recommendations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SKIN_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleSkinType(type.id)}
                className={`px-4 py-2 rounded-md border ${
                  skinType.includes(type.id)
                    ? 'border-coral-500 bg-coral-50 text-coral-700 dark:bg-coral-900 dark:text-coral-300'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Goals Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-3">
            Skin Goals
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
            What are you looking to improve?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SKIN_GOALS.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => toggleSkinGoal(goal.id)}
                className={`px-4 py-2 rounded-md border ${
                  skinGoals.includes(goal.id)
                    ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
              >
                {goal.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-3">
            Notification Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="notification-email"
                type="checkbox"
                checked={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.checked)}
                className="h-5 w-5 text-coral-500 focus:ring-coral-500 rounded"
              />
              <label
                htmlFor="notification-email"
                className="ml-3 text-neutral-700 dark:text-neutral-300"
              >
                Email notifications for bookings and appointments
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="notification-sms"
                type="checkbox"
                checked={notificationSms}
                onChange={(e) => setNotificationSms(e.target.checked)}
                className="h-5 w-5 text-coral-500 focus:ring-coral-500 rounded"
              />
              <label
                htmlFor="notification-sms"
                className="ml-3 text-neutral-700 dark:text-neutral-300"
              >
                SMS reminders for upcoming appointments
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="notification-promo"
                type="checkbox"
                checked={notificationPromotions}
                onChange={(e) => setNotificationPromotions(e.target.checked)}
                className="h-5 w-5 text-coral-500 focus:ring-coral-500 rounded"
              />
              <label
                htmlFor="notification-promo"
                className="ml-3 text-neutral-700 dark:text-neutral-300"
              >
                Promotional offers and new service announcements
              </label>
            </div>
          </div>
        </div>

        {/* Language Preference */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-3">
            Language Preference
          </h3>
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            {LANGUAGES.map((language) => (
              <option key={language.id} value={language.id}>
                {language.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || isLoading}
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
} 