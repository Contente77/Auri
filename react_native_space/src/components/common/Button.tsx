/**
 * Custom Button component with accessibility features
 */

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useSettings } from '../../contexts/SettingsContext';
import { getThemeColors } from '../../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  accessibilityLabel,
  accessibilityHint,
  icon,
}: ButtonProps) {
  const { settings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size
    const sizeStyles = {
      small: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
      medium: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 44 },
      large: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 52 },
    };

    // Variant
    const variantStyles = {
      primary: {
        backgroundColor: Colors.primary,
      },
      secondary: {
        backgroundColor: colors?.surface ?? '#FFFFFF',
        borderWidth: 1,
        borderColor: colors?.border ?? '#E5E5EA',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantStyles = {
      primary: { color: '#FFFFFF' },
      secondary: { color: colors?.text ?? '#1C1C1E' },
      outline: { color: Colors.primary },
    };

    return {
      fontWeight: '600',
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      {icon && <>{icon}</>}
      <Text style={[getTextStyle(), icon && { marginLeft: 8 }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
