/**
 * Root layout with providers
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SettingsProvider } from '../src/contexts/SettingsContext';
import { StorageService } from '../src/services/storageService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  useEffect(() => {
    // Initialize storage on app start
    StorageService.initialize().catch((error) => {
      console.error('Failed to initialize storage:', error);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="home" />
          <Stack.Screen name="library" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="camera" />
          <Stack.Screen name="reader" />
        </Stack>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
