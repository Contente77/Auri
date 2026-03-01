/**
 * Loading indicator component
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useSettings } from '../../contexts/SettingsContext';
import { getThemeColors } from '../../constants/Colors';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingIndicator({ message, size = 'large' }: LoadingIndicatorProps) {
  const { settings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={Colors.primary} />
      {message && (
        <Text style={[styles.message, { color: colors?.textSecondary ?? '#6C6C70' }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});
