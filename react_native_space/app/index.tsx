/**
 * App entry point - checks onboarding status and redirects
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSettings } from '../src/contexts/SettingsContext';
import { Colors } from '../src/constants/Colors';

export default function Index() {
  const router = useRouter();
  const { settings, isLoading } = useSettings();

  useEffect(() => {
    if (!isLoading) {
      if (settings?.onboardingCompleted) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [isLoading, settings, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8E7',
  },
});
