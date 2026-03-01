/**
 * Color palette for Auri app
 * Dyslexia-friendly colors with high contrast options
 */

export const Colors = {
  // Primary colors
  primary: '#4A90E2',
  primaryDark: '#2E5C8A',
  primaryLight: '#7AB8F5',
  
  // Theme backgrounds
  light: {
    background: '#FFF8E7', // Cream - easier on eyes than pure white
    surface: '#FFFFFF',
    text: '#1C1C1E',
    textSecondary: '#6C6C70',
    border: '#E5E5EA',
    highlight: '#FFD700', // Gold for word highlighting
    highlightSentence: '#87CEEB', // Sky blue for sentence highlighting
  },
  
  dark: {
    background: '#1C1C1E',
    surface: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#98989D',
    border: '#38383A',
    highlight: '#FFD700',
    highlightSentence: '#4A90E2',
  },
  
  highContrast: {
    background: '#000000',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#333333',
    border: '#000000',
    highlight: '#FFFF00', // Bright yellow
    highlightSentence: '#00FF00', // Bright green
  },
  
  sepia: {
    background: '#F4ECD8',
    surface: '#FFF9E6',
    text: '#5C4A3A',
    textSecondary: '#8B7355',
    border: '#D4C4A8',
    highlight: '#FFD700',
    highlightSentence: '#B8A080',
  },
  
  // Semantic colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',
  
  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export type ThemeColors = typeof Colors.light;

export function getThemeColors(theme: 'light' | 'dark' | 'highContrast' | 'sepia'): ThemeColors {
  return Colors[theme];
}
