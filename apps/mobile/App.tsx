import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import { colors } from '@vibewell/ui-core-theme';
import { createNativeThemeProvider, useTheme } from '@vibewell/ui-core';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import BookingScreen from './screens/BookingScreen';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Create Native Theme Provider
const NativeThemeProvider = createNativeThemeProvider(AsyncStorage);

// Theme Toggle Button Component
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme === 'dark' ? colors.neutral[800] : colors.neutral[200],
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={toggleTheme}
    >
      <View>
        {/* Moon or Sun icon depending on theme */}
        {theme === 'dark' ? (
          <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.coral[400] }} />
        ) : (
          <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.coral[600] }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NativeThemeProvider>
      <SafeAreaProvider>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor={colors.neutral[50]} 
        />
        <NavigationContainer>
          <ThemeToggleButton />
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: { 
                position: 'absolute',
                backgroundColor: colors.neutral[50],
                borderTopColor: colors.neutral[200],
              },
              tabBarActiveTintColor: colors.coral[500],
              tabBarInactiveTintColor: colors.neutral[400],
            })}
          >
            <Tab.Screen 
              name="Landing" 
              component={LandingScreen}
            />
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
            />
            <Tab.Screen 
              name="Services" 
              component={ServicesScreen} 
            />
            <Tab.Screen 
              name="Booking" 
              component={BookingScreen} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeThemeProvider>
  );
} 